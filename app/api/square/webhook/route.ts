import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/square/client";
import {
  findByOrderId,
  getPrepayEvent,
  markMatchplayRegistered,
  markPaid,
} from "@/lib/league/registrations";
import { registerPlayer } from "@/lib/matchplay/client";

// Square webhook — the financial source of truth for finals prepay.
//
// Subscribe to `payment.updated` in the Square dashboard and point it at:
//   https://beercade.com.au/api/square/webhook
// That exact URL must also be set as NEXT_PUBLIC_SITE_URL + this path, because
// it's part of the signature payload.
//
// Guarantees handled here:
//   - Signature verified before we trust anything.
//   - Idempotent: a registration already "paid" is a no-op (Square may retry).
//   - Don't trust the redirect; this handler is what marks the player paid.
//   - Match Play registration is best-effort; the Sanity record is the truth.

export const dynamic = "force-dynamic";

interface SquarePaymentEvent {
  type?: string;
  data?: {
    object?: {
      payment?: {
        id?: string;
        order_id?: string;
        status?: string; // "APPROVED" | "COMPLETED" | "CANCELED" | "FAILED"
      };
    };
  };
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://beercade.com.au";

  const valid = verifyWebhookSignature({
    rawBody,
    signatureHeader: req.headers.get("x-square-hmacsha256-signature"),
    notificationUrl: `${siteUrl}/api/square/webhook`,
  });
  if (!valid) {
    return NextResponse.json({ error: "bad signature" }, { status: 401 });
  }

  let event: SquarePaymentEvent;
  try {
    event = JSON.parse(rawBody) as SquarePaymentEvent;
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const payment = event.data?.object?.payment;
  // Only act on completed payments. Acknowledge everything else with 200 so
  // Square doesn't retry events we intentionally ignore.
  if (event.type !== "payment.updated" || payment?.status !== "COMPLETED") {
    return NextResponse.json({ ignored: true });
  }
  if (!payment.order_id) {
    return NextResponse.json({ ignored: true, reason: "no order_id" });
  }

  const registration = await findByOrderId(payment.order_id);
  if (!registration) {
    // Payment we don't have a record for (e.g. a Dashboard payment link reused
    // outside this flow). Acknowledge; nothing to register.
    return NextResponse.json({ ignored: true, reason: "no registration" });
  }
  if (registration.status === "paid") {
    return NextResponse.json({ ok: true, idempotent: true });
  }

  await markPaid(registration._id, payment.id ?? "unknown");

  // Best-effort Match Play registration. Failure here doesn't undo the payment;
  // the TD still has the paid record in the studio for door check-in.
  try {
    const finals = await getPrepayEvent();
    const tournamentId = finals?.matchplayTournamentId
      ? Number(finals.matchplayTournamentId)
      : NaN;
    if (Number.isFinite(tournamentId)) {
      const ok = await registerPlayer(tournamentId, {
        name: registration.playerName,
        email: registration.email,
        ifpaId: registration.ifpaNumber ? Number(registration.ifpaNumber) : null,
      });
      if (ok) await markMatchplayRegistered(registration._id);
    }
  } catch {
    // swallow — paid status already committed; reconcile manually if needed
  }

  return NextResponse.json({ ok: true });
}
