import Link from "next/link";
import Image from "next/image";
import type { PlayerData } from "@/lib/googleSheets";
import { countryFlag } from "@/lib/country";

/**
 * Trading-card layout:
 *  - Thin brand-gradient accent bar at the very top gives every card a
 *    visible World 48 identity, independent of the photo content.
 *  - Photo is matted (contained inside ~12px padding and rounded-lg),
 *    so the card always has a visible perimeter even when the image's
 *    own background is near-black.
 *  - Identity + PPG/RPG/APG stats live in a solid band below the photo
 *    — no gradient overlay fighting the image.
 *
 * Falls back to a brand-gradient + monogram when no photo is set.
 */
export default function PlayerCard({ player }: { player: PlayerData }) {
  const initials = getInitials(player.name);
  const flag = countryFlag(player.country);
  const countryDisplay = player.country
    ? `${flag ? flag + " " : ""}${player.country}`
    : undefined;
  const metaParts = [
    player.position,
    countryDisplay,
    formatHeightShort(player.height_cm),
  ].filter(Boolean) as string[];

  const hasActions = Boolean(player.instagram_url || player.highlight_url);
  const hasStats =
    player.ppg !== undefined ||
    player.rpg !== undefined ||
    player.apg !== undefined;

  return (
    <article className="group relative overflow-hidden rounded-xl border border-surface-3/70 bg-surface-1 transition hover:-translate-y-1 hover:border-brand-cyan/60 hover:shadow-card-hover">
      {/* Brand-gradient top accent — World 48 signature */}
      <div aria-hidden className="h-[3px] w-full bg-brand-gradient" />

      <Link href={`/players/${player.id}`} className="block">
        {/* Matted photo — padding creates the visible frame */}
        <div className="p-3">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-surface-2 ring-1 ring-surface-3/60">
            {player.photo_url ? (
              <Image
                src={player.photo_url}
                alt={player.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            ) : (
              <div
                aria-hidden
                className="absolute inset-0 flex items-center justify-center bg-brand-gradient opacity-90"
              >
                <span className="font-display text-6xl font-black tracking-tighter text-surface-0/80">
                  {initials}
                </span>
              </div>
            )}

            {/* Jersey number badge (top-left inside the photo) */}
            {player.event_number !== undefined && (
              <div className="absolute left-2.5 top-2.5 flex items-baseline gap-0.5 rounded-md bg-surface-0/75 px-2.5 py-1 font-display font-black leading-none tracking-tight text-white backdrop-blur-md">
                <span className="text-sm text-white/50">#</span>
                <span className="text-lg">{player.event_number}</span>
              </div>
            )}
          </div>
        </div>

        {/* Identity + stats band below the photo */}
        <div className="px-4 pb-4">
          <h3 className="truncate font-display text-lg font-semibold text-white transition group-hover:text-brand-cyan">
            {player.name}
          </h3>
          {metaParts.length > 0 && (
            <p className="mt-0.5 truncate text-xs font-medium uppercase tracking-wider text-white/50">
              {metaParts.join(" · ")}
            </p>
          )}

          {hasStats && (
            <div className="mt-3 grid grid-cols-3 gap-2 border-t border-surface-3/60 pt-3">
              <PrimaryStat label="PPG" value={player.ppg} accent="text-brand-cyan" />
              <PrimaryStat label="RPG" value={player.rpg} accent="text-brand-green" />
              <PrimaryStat label="APG" value={player.apg} accent="text-brand-gold" />
            </div>
          )}
        </div>
      </Link>

      {/* Action row — sibling of main link so nested <a> tags are valid */}
      {hasActions && (
        <div className="flex items-center justify-between gap-3 border-t border-surface-3/60 px-4 py-3">
          {player.instagram_url ? (
            <a
              href={player.instagram_url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${player.name} on Instagram`}
              title="Open Instagram profile"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram
            </a>
          ) : (
            <span />
          )}

          {player.highlight_url && (
            <a
              href={player.highlight_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-cyan transition hover:text-white"
            >
              Player Highlights
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3 w-3"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 5.5a.75.75 0 0 0 0 1.5h8.69l-6.22 6.22a.75.75 0 1 0 1.06 1.06l6.22-6.22v8.69a.75.75 0 0 0 1.5 0V5.5H4.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          )}
        </div>
      )}
    </article>
  );
}

function PrimaryStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | undefined;
  accent: string;
}) {
  // Big brand-colored number on top, tiny neutral label below —
  // standard trading-card hierarchy (value is what coaches scan for).
  return (
    <div className="flex flex-col items-center">
      <span className={`font-display text-2xl font-black leading-none ${accent}`}>
        {value !== undefined ? formatStat(value) : "—"}
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/50">
        {label}
      </span>
    </div>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "··";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatStat(n: number): string {
  // Show one decimal for stats, drop trailing .0 for whole numbers
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function formatHeightShort(cm: number | undefined): string | undefined {
  if (!cm) return undefined;
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches - feet * 12);
  return `${feet}'${inches}"`;
}
