import "server-only";
import type {
  MatchplayEnvelope,
  MatchplayPlayer,
  MatchplayStandingRow,
  MatchplayTournament,
} from "./types";

// Server-side Match Play client. Bearer token, JSON.
// Token comes from a Match Play account (Roger's admin account on the free tier).
//
// IMPORTANT: endpoint paths below follow the documented shapes at
// https://app.matchplay.events/api-docs/ but Match Play iterates their API.
// Confirm each path against the live docs before launch; the response shapes
// are isolated in types.ts so a path change is a one-line fix here.

const MP_BASE = "https://app.matchplay.events/api";

function authHeaders(): HeadersInit {
  const token = process.env.MATCHPLAY_API_TOKEN;
  if (!token) throw new Error("MATCHPLAY_API_TOKEN is not set");
  return { Authorization: `Bearer ${token}`, Accept: "application/json" };
}

// Standings refresh between rounds, not by the second. A short revalidate on
// the page is plenty; we still pass no-store here so the page's own cache,
// not fetch's, controls freshness.
async function mpGet<T>(path: string): Promise<T> {
  const res = await fetch(`${MP_BASE}${path}`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Match Play GET ${path} failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function getTournament(id: number): Promise<MatchplayTournament> {
  const json = await mpGet<MatchplayEnvelope<MatchplayTournament>>(
    `/tournaments/${id}`,
  );
  return json.data;
}

export async function getPlayers(tournamentId: number): Promise<MatchplayPlayer[]> {
  const json = await mpGet<MatchplayEnvelope<MatchplayPlayer[]>>(
    `/tournaments/${tournamentId}/players`,
  );
  return json.data;
}

async function getRawStandings(
  scope: "tournaments" | "series",
  id: number,
): Promise<MatchplayStandingRow[]> {
  const json = await mpGet<MatchplayEnvelope<MatchplayStandingRow[]>>(
    `/${scope}/${id}/standings`,
  );
  return json.data;
}

/**
 * Standings with player names resolved.
 * For a single night use scope "tournaments". For the season ladder
 * (best-2-of-3 aggregate) point this at the Match Play *series* id with
 * scope "series" — Match Play computes the aggregate, we don't.
 */
export async function getStandings(opts: {
  id: number;
  scope?: "tournaments" | "series";
  /** Tournament id used to resolve player names when scope is "series" */
  playerSourceTournamentId?: number;
}): Promise<MatchplayStandingRow[]> {
  const scope = opts.scope ?? "tournaments";
  const [rows, players] = await Promise.all([
    getRawStandings(scope, opts.id),
    getPlayers(opts.playerSourceTournamentId ?? opts.id).catch(() => [] as MatchplayPlayer[]),
  ]);
  const nameById = new Map(players.map((p) => [p.playerId, p.name]));
  return rows
    .map((r) => ({ ...r, name: r.name ?? nameById.get(r.playerId) ?? `Player ${r.playerId}` }))
    .sort((a, b) => a.position - b.position);
}

/**
 * Register a player into a tournament. Used by the Square webhook after a
 * confirmed finals payment. Best-effort: the Sanity registration record is the
 * source of truth for the door check-in; Match Play registration is a convenience.
 * Confirm the exact request body against api-docs before relying on it.
 */
export async function registerPlayer(
  tournamentId: number,
  player: { name: string; email?: string; ifpaId?: number | null },
): Promise<boolean> {
  const res = await fetch(`${MP_BASE}/tournaments/${tournamentId}/players`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({
      name: player.name,
      email: player.email,
      ifpaId: player.ifpaId ?? undefined,
    }),
  });
  return res.ok;
}
