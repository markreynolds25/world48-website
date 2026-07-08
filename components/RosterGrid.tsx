import PlayerCard, { type PlayerOffer } from "@/components/PlayerCard";
import type { PlayerData } from "@/lib/googleSheets";

/**
 * Public roster grid — the gate is gone (EYBL model: the grid sells the
 * event; only "Request Contact" on a profile captures coach details).
 */
export default function RosterGrid({
  players,
  offers,
}: {
  players: PlayerData[];
  offers: Record<string, PlayerOffer>;
}) {
  const count = players.length;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">
            The Roster
          </p>
          <h1 className="font-display text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            {count > 0 ? count : 48} prospects.
            <span className="text-gradient-brand"> One shortlist.</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/60">
            Elite international basketball talent for top US college programs.
            Open any player for a full profile with bio, stats and game film.
          </p>
        </div>
      </div>

      {/* NCAA Eligibility note */}
      <div className="mt-8 inline-flex items-start gap-2.5 rounded-xl border border-surface-3/60 bg-surface-1/50 px-4 py-3 text-sm text-white/60">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan/60">
          <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
        </svg>
        <span>
          <span className="font-medium text-white/80">Competing at World 48?</span>{" "}
          International players pursuing US college opportunities may need to register with the{" "}
          <a
            href="https://web3.ncaa.org/ecwr3/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-brand-cyan underline-offset-2 hover:underline"
          >
            NCAA Eligibility Center
          </a>
          .
        </span>
      </div>

      <div className="mt-10">
        {players.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                offer={offers[player.id]}
              />
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
      <h2 className="text-xl font-semibold text-white">
        No players loaded yet
      </h2>
      <p className="mt-2 max-w-md text-sm text-white/60">
        The roster will appear here once your Google Sheet has player rows with
        status &ldquo;yes&rdquo; or &ldquo;pending&rdquo; in column Q.
      </p>
    </div>
  );
}
