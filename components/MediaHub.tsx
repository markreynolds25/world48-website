"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { InstagramMark, PlayBadge } from "@/components/icons";

const INSTAGRAM_URL = "https://www.instagram.com/undiscoveredworld48/";

export interface PhotoItem {
  src: string;
  year: string; // e.g. "2026"
  day: string; // "1" | "2" | "" (unassigned)
}

export interface MediaVideo {
  title: string;
  url: string;
  year?: string;
  day?: string;
  player?: string;
  playerId?: string;
}

function youtubeId(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return url.pathname.slice(1) || null;
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") return url.searchParams.get("v");
      const shorts = url.pathname.match(/^\/shorts\/([^/]+)/);
      if (shorts) return shorts[1];
      const embed = url.pathname.match(/^\/embed\/([^/]+)/);
      if (embed) return embed[1];
    }
    return null;
  } catch {
    return null;
  }
}

const pillCls = (active: boolean) =>
  `rounded-lg border px-4 py-2 text-sm font-semibold transition ${
    active
      ? "border-brand-cyan bg-brand-cyan/10 text-brand-cyan"
      : "border-surface-3 bg-surface-2/60 text-ink-muted hover:border-white/25 hover:text-white"
  }`;

export default function MediaHub({
  photos,
  videos,
}: {
  photos: PhotoItem[];
  videos: MediaVideo[];
}) {
  const hasPhotos = photos.length > 0;
  const hasVideos = videos.length > 0;
  const [tab, setTab] = useState<"photos" | "film">(
    hasPhotos ? "photos" : hasVideos ? "film" : "photos"
  );

  const years = useMemo(() => {
    const set = new Set<string>();
    photos.forEach((p) => p.year && set.add(p.year));
    videos.forEach((v) => v.year && set.add(v.year));
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [photos, videos]);

  const [year, setYear] = useState<string>(years[0] ?? "");
  const [day, setDay] = useState<string>("all");

  // Which days exist for the selected year (across photos + videos).
  const days = useMemo(() => {
    const set = new Set<string>();
    photos.forEach((p) => p.year === year && p.day && set.add(p.day));
    videos.forEach((v) => v.year === year && v.day && set.add(v.day));
    return Array.from(set).sort();
  }, [photos, videos, year]);

  const shownPhotos = useMemo(
    () =>
      photos.filter(
        (p) => p.year === year && (day === "all" || p.day === day)
      ),
    [photos, year, day]
  );

  const shownVideos = useMemo(
    () =>
      videos.filter(
        (v) => (!v.year || v.year === year) && (day === "all" || !v.day || v.day === day)
      ),
    [videos, year, day]
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <p className="kicker mb-3">The 2026 Event</p>
      <h1 className="font-display text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
        Two days in <span className="text-gradient-brand">Dublin.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-ink-muted">
        Photography and film from the National Basketball Arena. The footage
        that turns a weekend into 13 college placements.
      </p>

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-4 border-y border-surface-3/60 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {/* Year (only if more than one) */}
          {years.length > 1 &&
            years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => { setYear(y); setDay("all"); }}
                aria-pressed={year === y}
                className={pillCls(year === y)}
              >
                <span className="stat-nums">{y}</span>
              </button>
            ))}

          {/* Day (only if the year has day-tagged media) */}
          {days.length > 0 && (
            <>
              {years.length > 1 && <span className="mx-1 h-5 w-px bg-surface-3" aria-hidden />}
              <button type="button" onClick={() => setDay("all")} aria-pressed={day === "all"} className={pillCls(day === "all")}>
                All days
              </button>
              {days.map((d) => (
                <button key={d} type="button" onClick={() => setDay(d)} aria-pressed={day === d} className={pillCls(day === d)}>
                  Day {d}
                </button>
              ))}
            </>
          )}
        </div>

        {/* Photos / Film */}
        <div className="flex gap-2">
          <button type="button" onClick={() => setTab("photos")} aria-pressed={tab === "photos"} className={pillCls(tab === "photos")}>
            Photos
          </button>
          <button type="button" onClick={() => setTab("film")} aria-pressed={tab === "film"} className={pillCls(tab === "film")}>
            Film
          </button>
        </div>
      </div>

      {tab === "photos" && (
        <div className="mt-8">
          {hasPhotos ? (
            shownPhotos.length > 0 ? (
              <>
                <p className="eyebrow mb-5 text-ink-faint">
                  <span className="stat-nums">{shownPhotos.length}</span> photos
                </p>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {shownPhotos.map((p, i) => (
                    <div
                      key={p.src}
                      className={`card-in relative overflow-hidden rounded-xl border border-surface-3/60 bg-surface-1 ${
                        i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                      }`}
                      style={{ animationDelay: `${Math.min(i, 12) * 25}ms` }}
                    >
                      <Image
                        src={p.src}
                        alt={`World 48 ${p.year}${p.day ? ` day ${p.day}` : ""} event photo`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="py-12 text-center text-sm text-ink-muted">
                No photos for this selection yet.
              </p>
            )
          ) : (
            <HoldingState label="Photography from both days is being edited now." />
          )}
        </div>
      )}

      {tab === "film" && (
        <div className="mt-8">
          {shownVideos.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {shownVideos.map((v) => (
                <LazyVideo key={v.url} video={v} />
              ))}
            </div>
          ) : (
            <HoldingState label="Highlight reels are being cut now." />
          )}
        </div>
      )}
    </div>
  );
}

function LazyVideo({ video }: { video: MediaVideo }) {
  const [playing, setPlaying] = useState(false);
  const id = youtubeId(video.url);
  if (!id) return null;

  return (
    <figure className="overflow-hidden rounded-xl border border-surface-3/70 bg-black">
      <div className="relative aspect-video w-full">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${video.title}`}
            className="group absolute inset-0 h-full w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
              alt=""
              className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white shadow-lg transition group-hover:scale-110">
                <PlayBadge className="h-6 w-6" />
              </span>
            </span>
          </button>
        )}
      </div>
      {(video.title || video.player) && (
        <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
          <span className="text-sm text-ink-muted">{video.title}</span>
          {video.player && video.playerId && (
            <a href={`/players/${video.playerId}`} className="text-xs font-semibold text-brand-cyan transition hover:text-white">
              {video.player}
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
}

function HoldingState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-start gap-5 rounded-2xl border border-surface-3/70 bg-surface-1 p-8 md:flex-row md:items-center md:justify-between md:p-10">
      <div className="flex items-start gap-4">
        <PlayBadge className="mt-1 h-7 w-7 shrink-0 text-brand-red" />
        <div>
          <p className="text-lg font-bold text-white">{label}</p>
          <p className="mt-1 max-w-md text-sm text-ink-muted">
            The full 2026 story lives on Instagram in the meantime.
          </p>
        </div>
      </div>
      <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary shrink-0">
        <InstagramMark className="h-4 w-4" />
        @undiscoveredworld48
      </a>
    </div>
  );
}
