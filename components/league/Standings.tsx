import { getStandings, getTournament } from "@/lib/matchplay/client";

// Server component. Renders the live ladder from Match Play.
// Pass a tournament id for a single night, or a series id (scope="series")
// for the season aggregate. Tailwind classes use the brand tokens from
// styles/globals.css.

interface StandingsProps {
  id: number;
  scope?: "tournaments" | "series";
  playerSourceTournamentId?: number;
  /** How many rows to show; the finals cut is 8 (see Run of Show §5). */
  highlightCut?: number;
}

export default async function Standings({
  id,
  scope = "tournaments",
  playerSourceTournamentId,
  highlightCut,
}: StandingsProps) {
  let rows;
  let tournamentName: string | null = null;

  try {
    if (scope === "tournaments") {
      const t = await getTournament(id);
      tournamentName = t.name;
    }
    rows = await getStandings({ id, scope, playerSourceTournamentId });
  } catch {
    return (
      <p className="text-[var(--color-text-muted)]">
        Standings are taking a breather. Refresh in a minute, or check the board at the bar.
      </p>
    );
  }

  if (!rows.length) {
    return (
      <p className="text-[var(--color-text-muted)]">
        No scores in yet. First ball is at 7.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      {tournamentName && (
        <h3 className="mb-3 font-[family-name:var(--font-heading)] text-xl">
          {tournamentName}
        </h3>
      )}
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[var(--color-accent)]/40 text-sm uppercase tracking-wide text-[var(--color-text-muted)]">
            <th className="py-2 pr-4">#</th>
            <th className="py-2 pr-4">Player</th>
            <th className="py-2 pr-4 text-right">Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const inFinals = highlightCut != null && row.position <= highlightCut;
            return (
              <tr
                key={row.playerId}
                className={
                  "border-b border-[var(--color-fg)]/10 " +
                  (inFinals ? "text-[var(--color-action)] font-semibold" : "")
                }
              >
                <td className="py-2 pr-4 tabular-nums">{row.position}</td>
                <td className="py-2 pr-4">{row.name}</td>
                <td className="py-2 pr-4 text-right tabular-nums">{row.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {highlightCut != null && (
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          Top {highlightCut} advance to the finals.
        </p>
      )}
    </div>
  );
}
