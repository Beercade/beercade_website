import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanity/serverClient";
import {
  getMachine,
  resolveOpdbId,
  yearFromManufactureDate,
} from "@/lib/opdb/client";

// OPDB sync — Option B (scheduled).
//
// Runs nightly via Vercel Cron (see vercel.json). Two passes:
//   1. SEED   — machines with no opdbId: try to resolve one by exact name match.
//   2. SYNC   — machines with an opdbId: refresh manufacturer + year from OPDB.
//
// Deliberately conservative:
//   - We only ever write `manufacturer`, `year`, `opdbId`, `opdbLastSynced`.
//   - We do NOT touch `name`, `type`, `status`, `description`, `photo`. Those
//     are editorial/operational and owned by staff. OPDB's `type` is a tech
//     classification (SS/EM/DMD), not our pinball/arcade enum, so we never map it.
//   - We patch only when a value actually changed, to keep document history clean.
//
// Auth: Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`. We reject
// anything else so the endpoint can't be triggered by the public.

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface MachineDoc {
  _id: string;
  name: string;
  opdbId?: string;
  manufacturer?: string;
  year?: number;
}

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const machines = await sanityWriteClient.fetch<MachineDoc[]>(
    `*[_type == "machine"]{ _id, name, opdbId, manufacturer, year }`,
  );

  const summary = {
    scanned: machines.length,
    seeded: 0,
    updated: 0,
    unresolved: [] as string[],
    errors: [] as string[],
  };

  for (const machine of machines) {
    try {
      let opdbId = machine.opdbId;

      // Pass 1 — SEED
      if (!opdbId) {
        const resolved = await resolveOpdbId(machine.name);
        if (!resolved) {
          summary.unresolved.push(machine.name);
          continue; // nothing to sync without an id
        }
        opdbId = resolved;
        summary.seeded += 1;
      }

      // Pass 2 — SYNC
      const opdb = await getMachine(opdbId);
      const manufacturer = opdb.manufacturer?.name ?? machine.manufacturer ?? null;
      const year = yearFromManufactureDate(opdb.manufacture_date) ?? machine.year ?? null;

      const patch: Record<string, unknown> = {
        opdbId,
        opdbLastSynced: new Date().toISOString(),
      };
      if (manufacturer && manufacturer !== machine.manufacturer) {
        patch.manufacturer = manufacturer;
      }
      if (year && year !== machine.year) {
        patch.year = year;
      }

      await sanityWriteClient.patch(machine._id).set(patch).commit({ autoGenerateArrayKeys: true });

      // Count as updated only when a content field moved (not just the timestamp).
      if ("manufacturer" in patch || "year" in patch || machine.opdbId !== opdbId) {
        summary.updated += 1;
      }
    } catch (err) {
      summary.errors.push(`${machine.name}: ${(err as Error).message}`);
    }
  }

  return NextResponse.json(summary);
}
