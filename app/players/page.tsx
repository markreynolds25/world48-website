import PlayerCard from "@/components/PlayerCard";
import { getPlayersWithCache } from "@/lib/googleSheets";

// Server-render with caching. The sheet lib has its own 5-min cache.
export const revalidate = 300;

export default async function PlayersPage() {
  const players = await getPlayersWithCache();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      {/* Page header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">
            The Roster
          </p>
          <h1 className="font-display text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            48 prospects.
            <span className="text-gradient-brand"> One shortlist.</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/60">
            Elite international basketball talent curated for Division I
            programs. Click any player to open a full profile with bio, stats,
            and game film.
          </p>
        </div>

        <div className="rounded-lg border border-surface-3/70 bg-surface-1/50 px-4 py-2 text-xs text-white/60">
          <span className="font-semibold text-white">{players.length}</span>{" "}
          {players.length === 1 ? "player" : "players"} live
        </div>
      </div>

      {/* Grid / empty state */}
      <div className="mt-10">
        {players.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-surface-3 bg-surface-1/40 px-6 py-20 text-center">
      <h2 className="font-display text-xl font-semibold text-white">
        No players loaded yet
      </h2>
      <p className="mt-2 max-w-md text-sm text-white/60">
        The roster will appear here once your Google Sheet has player rows. If
        you&apos;ve already added rows, check that <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs">GOOGLE_SHEETS_ID</code>,{" "}
        <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs">GOOGLE_SHEETS_RANGE</code>, and{" "}
        <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs">GOOGLE_SHEETS_CREDENTIALS</code>{" "}
        are set in <code>.env.local</code>, and that the service-account email
        has view access to the sheet.
      </p>
    </div>
  );
}
