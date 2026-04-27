"use client";

import { useState } from "react";
import { useRegistration } from "@/hooks/useRegistration";
import RegisterModal from "@/components/RegisterModal";
import PlayerCard from "@/components/PlayerCard";
import type { PlayerData } from "@/lib/googleSheets";

export default function RosterGate({ players }: { players: PlayerData[] }) {
  const { registration, register, loaded } = useRegistration();
  const [modalOpen, setModalOpen] = useState(false);

  // Avoid flash of gate before localStorage check completes
  if (!loaded) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="h-96 animate-pulse rounded-2xl bg-surface-1/40" />
      </div>
    );
  }

  if (!registration) {
    return (
      <>
        <RegisterModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={(data) => register(data)}
        />
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">
              The Roster
            </p>
            <h1 className="text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
              48 prospects.
              <span className="text-gradient-brand"> One shortlist.</span>
            </h1>
          </div>

          {/* Gate block */}
          <div className="mt-14 flex flex-col items-center justify-center rounded-2xl border border-surface-3/70 bg-surface-1/40 px-6 py-28 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-surface-3 bg-surface-2 text-white/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">
              Register to access the roster
            </h2>
            <p className="mt-2 max-w-sm text-sm text-white/50">
              Free registration unlocks full player profiles, verified stats, and
              game film for all 48 prospects.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-6 rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-red/90"
            >
              Register for Access
            </button>
          </div>
        </div>
      </>
    );
  }

  // Registered — show full roster
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">
            The Roster
          </p>
          <h1 className="text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            48 prospects.
            <span className="text-gradient-brand"> One shortlist.</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/60">
            Elite international basketball talent curated for top US college
            programs. Click any player to open a full profile with bio, stats,
            and game film.
          </p>
        </div>

        <div className="rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1.5 text-xs font-semibold text-brand-cyan">
          {registration.role} ✓
        </div>
      </div>

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
