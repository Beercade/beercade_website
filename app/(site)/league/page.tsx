import { Suspense } from "react";
import Standings from "@/components/league/Standings";

// /league — the public ladder page (Run of Show §5).
// Standings come live from Match Play; revalidate every 90s. Match Play is the
// source of truth for scores — nothing here is editable in Sanity.

export const revalidate = 90;

export const metadata = {
  title: "Beercade League — Standings",
  description: "Live ladder for the Beercade pinball league.",
};

const SEASON_ID = Number(process.env.MATCHPLAY_SERIES_ID ?? process.env.MATCHPLAY_TOURNAMENT_ID);
const SEASON_SCOPE: "tournaments" | "series" = process.env.MATCHPLAY_SERIES_ID
  ? "series"
  : "tournaments";
// When showing a series ladder, player names are resolved from one of its
// tournaments. Set MATCHPLAY_TOURNAMENT_ID to any night in the series.
const PLAYER_SOURCE = process.env.MATCHPLAY_TOURNAMENT_ID
  ? Number(process.env.MATCHPLAY_TOURNAMENT_ID)
  : undefined;

export default function LeaguePage() {
  if (!Number.isFinite(SEASON_ID)) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">Beercade League</h1>
        <p className="mt-4 text-[var(--color-text-muted)]">
          The ladder goes live when the season opens. Signup link in our bio.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">Beercade League</h1>
      <p className="mt-2 text-[var(--color-text-muted)]">
        Best two of three qualifying nights. Top eight play the finals.
      </p>

      <section className="mt-10">
        <Suspense fallback={<p className="text-[var(--color-text-muted)]">Loading the ladder…</p>}>
          <Standings
            id={SEASON_ID}
            scope={SEASON_SCOPE}
            playerSourceTournamentId={PLAYER_SOURCE}
            highlightCut={8}
          />
        </Suspense>
      </section>
    </main>
  );
}
