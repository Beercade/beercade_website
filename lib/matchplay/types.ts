// Typings for the slice of the Match Play API we consume.
// Full docs: https://app.matchplay.events/api-docs/
// The API wraps most payloads in a top-level { data: ... } envelope.

export interface MatchplayEnvelope<T> {
  data: T;
}

export interface MatchplayTournament {
  tournamentId: number;
  name: string;
  /** "planned" | "active" | "completed" (confirm exact values against api-docs) */
  status: string;
  startUtc: string | null;
  seriesId: number | null;
}

export interface MatchplayPlayer {
  playerId: number;
  name: string;
  ifpaId: number | null;
}

/** A row from a tournament or series standings response. */
export interface MatchplayStandingRow {
  playerId: number;
  /** Display name resolved from the players list */
  name?: string;
  position: number;
  points: number;
  gamesPlayed?: number;
}
