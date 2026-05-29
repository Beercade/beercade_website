import "server-only";
import type { OpdbMachine, OpdbTypeaheadResult } from "./types";

// Server-side only. The OPDB token must never reach the browser.
// Get a free token from an OPDB account: https://opdb.org/api

const OPDB_BASE = "https://opdb.org/api";
const token = process.env.OPDB_API_TOKEN;

function requireToken(): string {
  if (!token) {
    throw new Error("OPDB_API_TOKEN is not set");
  }
  return token;
}

/** Parse a year out of OPDB's manufacture_date ("1992-03-01" → 1992). */
export function yearFromManufactureDate(date: string | null): number | null {
  if (!date) return null;
  const match = /^(\d{4})/.exec(date);
  if (!match) return null;
  const year = Number(match[1]);
  return Number.isFinite(year) ? year : null;
}

/**
 * Typeahead search. This is the one OPDB endpoint that needs no token.
 * Returns loose matches ordered by relevance.
 */
export async function typeahead(query: string): Promise<OpdbTypeaheadResult[]> {
  const url = `${OPDB_BASE}/search/typeahead?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`OPDB typeahead failed: ${res.status}`);
  }
  return (await res.json()) as OpdbTypeaheadResult[];
}

/** Full canonical record for a confirmed OPDB id. Requires the token. */
export async function getMachine(opdbId: string): Promise<OpdbMachine> {
  const url = `${OPDB_BASE}/machines/${encodeURIComponent(opdbId)}?api_token=${requireToken()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`OPDB getMachine(${opdbId}) failed: ${res.status}`);
  }
  return (await res.json()) as OpdbMachine;
}

/**
 * Resolve a machine name to a single OPDB id, conservatively.
 * Only returns an id when exactly one typeahead row matches the name
 * case-insensitively. Ambiguous or zero matches return null so the sync
 * leaves the document for a human rather than guessing wrong.
 */
export async function resolveOpdbId(name: string): Promise<string | null> {
  const results = await typeahead(name);
  const wanted = name.trim().toLowerCase();
  const exact = results.filter((r) => r.name.trim().toLowerCase() === wanted);
  if (exact.length === 1) return exact[0].id;
  return null;
}
