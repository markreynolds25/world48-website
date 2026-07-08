import fs from "fs";
import path from "path";
import Image from "next/image";
import { InstagramMark, PlayBadge } from "@/components/icons";

const INSTAGRAM_URL = "https://www.instagram.com/undiscoveredworld48/";

/**
 * YouTube highlight reels from the 2026 event.
 * Add plain watch/short URLs here as Mark supplies them.
 */
const VIDEOS: { title: string; url: string }[] = [];

/**
 * 2026 event gallery. Photos are read from /public/Event/2026 at render time —
 * drop image files in that folder and they appear with no code change.
 * Until then, a designed holding block points to Instagram.
 */
export default function EventGallery() {
  let photos: string[] = [];
  try {
    const dir = path.join(process.cwd(), "public", "Event", "2026");
    photos = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .slice(0, 8)
      .map((f) => `/Event/2026/${f}`);
  } catch {
    // Folder doesn't exist yet — show the holding state.
  }

  const embeds = VIDEOS.map((v) => ({ ...v, embed: toEmbedUrl(v.url) })).filter(
    (v) => v.embed
  );

  return (
    <section className="border-b border-surface-3/60">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">
          The 2026 Event
        </p>
        <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight md:text-5xl">
          Two days in Dublin.
        </h2>

        {photos.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {photos.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-xl border border-surface-3/60 bg-surface-1 ${
                  i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                }`}
              >
                <Image
                  src={src}
                  alt={`World 48 2026 — event photo ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-start gap-5 rounded-2xl border border-surface-3/70 bg-surface-1 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex items-start gap-4">
              <PlayBadge className="mt-1 h-7 w-7 shrink-0 text-brand-red" />
              <div>
                <p className="text-lg font-bold text-white">
                  The 2026 film is on the way.
                </p>
                <p className="mt-1 max-w-md text-sm text-white/55">
                  Photography and highlight reels from both days are being cut
                  now. The story so far lives on Instagram.
                </p>
              </div>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-surface-3 bg-surface-2/60 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
            >
              <InstagramMark className="h-4 w-4" />
              @undiscoveredworld48
            </a>
          </div>
        )}

        {embeds.length > 0 && (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {embeds.map((v) => (
              <div
                key={v.url}
                className="overflow-hidden rounded-xl border border-surface-3/70 bg-black"
              >
                <div className="relative aspect-video w-full">
                  <iframe
                    src={v.embed as string}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function toEmbedUrl(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    const host = url.hostname.replace(/^www\./, "");
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
    return null;
  } catch {
    return null;
  }
}
