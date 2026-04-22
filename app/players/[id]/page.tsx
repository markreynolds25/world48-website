import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPlayerById, getPlayersWithCache } from "@/lib/googleSheets";
import type { PlayerData } from "@/lib/googleSheets";
import { countryFlag } from "@/lib/country";

export const revalidate = 300;

// Pre-render static profile pages at build time for all current players.
export async function generateStaticParams() {
  const players = await getPlayersWithCache();
  return players.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const player = await getPlayerById(params.id);
  if (!player) return { title: "Player not found — World 48" };
  const metaParts = [player.position, player.country].filter(Boolean);
  return {
    title: `${player.name} — World 48`,
    description: `${player.name}${metaParts.length ? " · " + metaParts.join(" · ") : ""}`,
  };
}

export default async function PlayerProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const player = await getPlayerById(params.id);
  if (!player) notFound();

  const highlightEmbed = toEmbedUrl(player.highlight_url);
  const initials = getInitials(player.name);
  const flag = countryFlag(player.country);
  const countryDisplay = player.country
    ? `${flag ? flag + " " : ""}${player.country}`
    : undefined;
  const metaParts = [
    player.position,
    countryDisplay,
    formatHeight(player.height_cm),
  ].filter(Boolean) as string[];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      {/* Back link */}
      <Link
        href="/players"
        className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 0 1 0 1.06L9.06 10l3.72 3.71a.75.75 0 1 1-1.06 1.06l-4.25-4.24a.75.75 0 0 1 0-1.06l4.25-4.24a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
        Back to roster
      </Link>

      {/* OPTION 2 layout: side-by-side image + info */}
      <article className="overflow-hidden rounded-2xl border border-surface-3/70 bg-surface-1">
        <div className="flex flex-col md:flex-row">
          {/* LEFT — image (45% on md+) */}
          <div className="relative w-full shrink-0 md:w-[45%]">
            <div className="relative aspect-square w-full bg-surface-2 md:aspect-[3/4]">
              {player.photo_url ? (
                <Image
                  src={player.photo_url}
                  alt={player.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority
                  className="object-cover"
                />
              ) : (
                <div
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center bg-brand-gradient"
                >
                  <span className="font-display text-[8rem] font-black tracking-tighter text-surface-0/70 md:text-[10rem]">
                    {initials}
                  </span>
                </div>
              )}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-surface-0/80 via-transparent to-transparent"
              />

              {/* Jersey number overlay */}
              {player.event_number !== undefined && (
                <div className="absolute left-4 top-4 flex items-baseline gap-1 rounded-lg bg-surface-0/75 px-3 py-2 font-display font-black leading-none tracking-tight text-white backdrop-blur-md md:left-6 md:top-6">
                  <span className="text-base text-white/50 md:text-lg">#</span>
                  <span className="text-2xl md:text-3xl">
                    {player.event_number}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — info section */}
          <div className="flex-1 p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl font-black leading-tight tracking-tight md:text-4xl">
                {player.name}
              </h1>
              {player.event_number !== undefined && (
                <span className="inline-flex items-baseline gap-0.5 rounded-md border border-surface-3 bg-surface-2 px-2 py-1 font-display text-sm font-bold text-white/80">
                  <span className="text-white/50">#</span>
                  {player.event_number}
                </span>
              )}
            </div>
            {metaParts.length > 0 && (
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-white/60">
                {metaParts.join(" · ")}
              </p>
            )}

            {/* Primary stats */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              <PrimaryStat label="PPG" value={player.ppg} accent="text-brand-cyan" />
              <PrimaryStat label="RPG" value={player.rpg} accent="text-brand-green" />
              <PrimaryStat label="APG" value={player.apg} accent="text-brand-gold" />
            </div>

            {/* Secondary stats */}
            <SecondaryStats player={player} />

            {/* Bio */}
            {player.bio && (
              <p className="mt-6 text-[15px] leading-relaxed text-white/80">
                {player.bio}
              </p>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                disabled
                title="Coming soon — contact flow is being built"
                className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-surface-0 opacity-50"
              >
                Request Contact
                <span className="ml-2 rounded-full bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/70">
                  Soon
                </span>
              </button>

              {player.instagram_url && (
                <a
                  href={player.instagram_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-surface-3 bg-surface-2/60 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.849.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Highlights section — separate scrollable below */}
      <section className="mt-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Highlights
          </h2>
          {player.highlight_url && (
            <a
              href={player.highlight_url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/60 transition hover:text-white"
            >
              Open in new tab →
            </a>
          )}
        </div>

        {highlightEmbed ? (
          <div className="overflow-hidden rounded-xl border border-surface-3/70 bg-black">
            <div className="relative aspect-video w-full">
              <iframe
                src={highlightEmbed}
                title={`${player.name} — highlights`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-surface-3 bg-surface-1/40 px-6 py-16 text-center">
            <p className="text-sm text-white/60">
              {player.highlight_url
                ? "Highlight link couldn't be embedded. Use the link above to open it."
                : "No highlight film on file yet."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

/* ------------ helpers & sub-components ------------ */

function PrimaryStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | undefined;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-surface-3/70 bg-surface-2/50 px-4 py-4 text-center">
      <div className={`font-display text-3xl font-black leading-none md:text-4xl ${accent}`}>
        {value !== undefined ? formatStat(value) : "—"}
      </div>
      <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/50">
        {label}
      </div>
    </div>
  );
}

function SecondaryStats({ player }: { player: PlayerData }) {
  const items: { label: string; value: string | undefined }[] = [
    { label: "FG%", value: formatPct(player.fg_percentage) },
    { label: "3P%", value: formatPct(player.three_p_percentage) },
    { label: "FT%", value: formatPct(player.ft_percentage) },
    { label: "Weight", value: player.weight_kg ? `${player.weight_kg} kg` : undefined },
    { label: "School", value: player.school },
  ].filter((i) => i.value);

  if (items.length === 0) return null;

  return (
    <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-surface-3/70 py-4">
      {items.map((i) => (
        <div key={i.label} className="flex items-baseline justify-between gap-3">
          <dt className="text-xs uppercase tracking-wider text-white/50">
            {i.label}
          </dt>
          <dd className="truncate font-medium text-white">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function formatStat(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function formatPct(n: number | undefined): string | undefined {
  if (n === undefined) return undefined;
  // Accept inputs like 42.5 ("percent") or 0.425 ("ratio")
  const pct = n > 1 ? n : n * 100;
  return `${pct.toFixed(1)}%`;
}

function formatHeight(cm: number | undefined): string | undefined {
  if (!cm) return undefined;
  // Also show imperial for US coaches
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches - feet * 12);
  return `${cm} cm (${feet}'${inches}")`;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "··";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Convert a user-supplied highlight URL into an embeddable URL.
 * Supports:
 *  - youtube.com/watch?v=...
 *  - youtu.be/...
 *  - youtube.com/shorts/...
 *  - youtube.com/embed/... (passthrough)
 *  - vimeo.com/{id}
 * Returns null if we can't embed (e.g. Instagram reels, iCloud photo shares).
 */
function toEmbedUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  try {
    const url = new URL(raw.trim());
    const host = url.hostname.replace(/^www\./, "");
    // YouTube
    if (host === "youtu.be") {
      const id = url.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        const id = url.searchParams.get("v");
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      const shortsMatch = url.pathname.match(/^\/shorts\/([^/]+)/);
      if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
      if (url.pathname.startsWith("/embed/")) return url.toString();
    }
    // Vimeo
    if (host === "vimeo.com") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
    }
    return null;
  } catch {
    return null;
  }
}
