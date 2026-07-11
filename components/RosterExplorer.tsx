"use client";

import { useMemo, useState } from "react";
import PlayerCard, { type PlayerOffer } from "@/components/PlayerCard";
import type { PlayerData } from "@/lib/googleSheets";

/** Diacritic-insensitive lowercase, so "Rūdis" matches "rudis". */
function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/** Map a raw position string to a G / F / C bucket for the segmented filter. */
function positionBucket(position?: string): "G" | "F" | "C" | null {
  if (!position) return null;
  const p = position.toUpperCase();
  if (/\b(PG|SG|G|GUARD)\b/.test(p) || p.includes("GUARD")) return "G";
  if (/\b(SF|PF|F|FORWARD|WING)\b/.test(p) || p.includes("FORWARD")) return "F";
  if (/\b(C|CENTER|CENTRE)\b/.test(p) || p.includes("CENT")) return "C";
  return null;
}

const POSITIONS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "G", label: "Guards" },
  { key: "F", label: "Forwards" },
  { key: "C", label: "Centers" },
];

const pillCls = (active: boolean) =>
  `rounded-lg border px-3.5 py-2 text-sm font-semibold transition ${
    active
      ? "border-brand-cyan bg-brand-cyan/10 text-brand-cyan"
      : "border-surface-3 bg-surface-2/60 text-ink-muted hover:border-white/25 hover:text-white"
  }`;

const inputCls =
  "w-full rounded-lg border border-surface-3 bg-surface-2 px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-brand-cyan";

export default function RosterExplorer({
  players,
  offers,
}: {
  players: PlayerData[];
  offers: Record<string, PlayerOffer>;
}) {
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState("all");
  const [country, setCountry] = useState("all");

  const countries = useMemo(() => {
    const set = new Set<string>();
    players.forEach((p) => p.country && set.add(p.country));
    return Array.from(set).sort();
  }, [players]);

  const filtered = useMemo(() => {
    const q = fold(query.trim());
    return players.filter((p) => {
      if (position !== "all" && positionBucket(p.position) !== position) return false;
      if (country !== "all" && p.country !== country) return false;
      if (q) {
        const hay = fold(`${p.name} ${p.country ?? ""} ${p.school ?? ""}`);
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [players, query, position, country]);

  const active = query.trim() !== "" || position !== "all" || country !== "all";

  function clear() {
    setQuery("");
    setPosition("all");
    setCountry("all");
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <div>
        <p className="kicker mb-3">The Roster</p>
        <h1 className="font-display text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
          {players.length > 0 ? players.length : 48} prospects.
          <span className="text-gradient-brand"> One shortlist.</span>
        </h1>
        <p className="mt-4 max-w-xl text-ink-muted">
          Scouted across Europe and beyond, vetted, and put in front of the
          coaches who matter. Open any player for a full profile with bio, stats
          and game film.
        </p>
      </div>

      {/* NCAA eligibility note */}
      <div className="mt-8 inline-flex items-start gap-2.5 rounded-xl border border-surface-3/60 bg-surface-1/50 px-4 py-3 text-sm text-ink-muted">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan/60">
          <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
        </svg>
        <span>
          <span className="font-medium text-white/80">Competing at World 48?</span>{" "}
          International players pursuing US college opportunities may need to register with the{" "}
          <a href="https://web3.ncaa.org/ecwr3/" target="_blank" rel="noreferrer" className="font-medium text-brand-cyan underline-offset-2 hover:underline">
            NCAA Eligibility Center
          </a>
          .
        </span>
      </div>

      {/* Filter bar */}
      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-surface-3/70 bg-surface-1/60 p-4 md:flex-row md:items-center">
        <div className="md:w-64">
          <label htmlFor="roster-search" className="sr-only">
            Search a player or school
          </label>
          <input
            id="roster-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a player or school"
            className={inputCls}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {POSITIONS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPosition(p.key)}
              aria-pressed={position === p.key}
              className={pillCls(position === p.key)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {countries.length > 1 && (
          <div className="md:ml-auto md:w-48">
            <label htmlFor="roster-country" className="sr-only">
              Filter by country
            </label>
            <select
              id="roster-country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={inputCls}
            >
              <option value="all">All countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Result count */}
      <p className="eyebrow mt-4 text-ink-faint">
        <span className="stat-nums">{filtered.length}</span> of{" "}
        <span className="stat-nums">{players.length}</span> prospects
        {active && (
          <button
            type="button"
            onClick={clear}
            className="ml-3 normal-case tracking-normal text-brand-cyan transition hover:text-white"
          >
            Clear filters
          </button>
        )}
      </p>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-surface-3 bg-surface-1/40 px-6 py-20 text-center">
            <h2 className="text-xl font-semibold text-white">No players match.</h2>
            <p className="mt-2 max-w-md text-sm text-ink-muted">
              Nothing fits those filters yet. Clear them to see all{" "}
              {players.length} prospects.
            </p>
            <button onClick={clear} className="btn-secondary mt-6">
              Clear filters
            </button>
          </div>
        ) : (
          <div
            key={`${query}|${position}|${country}`}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((player, i) => (
              <div
                key={player.id}
                className="card-in"
                style={{ animationDelay: `${Math.min(i, 12) * 25}ms` }}
              >
                <PlayerCard player={player} offer={offers[player.id]} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
