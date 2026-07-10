import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import MediaHub, { type MediaVideo, type PhotoItem } from "@/components/MediaHub";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Photography and highlight film from World 48 2026 at the National Basketball Arena, Dublin.",
};

// YouTube highlight reels. Optionally tag year/day and link to a player.
const VIDEOS: MediaVideo[] = [];

const IMG_RE = /\.(jpe?g|png|webp)$/i;

/**
 * Scans public/Event for photos, organised as:
 *   public/Event/<year>/day1/*.jpg   → year, day "1"
 *   public/Event/<year>/day2/*.jpg   → year, day "2"
 *   public/Event/<year>/*.jpg        → year, day "" (unassigned)
 */
function collectPhotos(): PhotoItem[] {
  const out: PhotoItem[] = [];
  const root = path.join(process.cwd(), "public", "Event");
  let years: string[] = [];
  try {
    years = fs
      .readdirSync(root, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);
  } catch {
    return out;
  }

  for (const year of years) {
    const yearDir = path.join(root, year);
    let entries: fs.Dirent[] = [];
    try {
      entries = fs.readdirSync(yearDir, { withFileTypes: true });
    } catch {
      continue;
    }

    // Loose files directly under the year = unassigned day.
    for (const e of entries) {
      if (e.isFile() && IMG_RE.test(e.name)) {
        out.push({ src: `/Event/${year}/${e.name}`, year, day: "" });
      }
    }

    // dayN subfolders.
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const dayMatch = e.name.match(/day\s*([0-9]+)/i);
      const day = dayMatch ? dayMatch[1] : "";
      try {
        fs.readdirSync(path.join(yearDir, e.name))
          .filter((f) => IMG_RE.test(f))
          .sort()
          .forEach((f) =>
            out.push({ src: `/Event/${year}/${e.name}/${f}`, year, day })
          );
      } catch {
        // skip unreadable subfolder
      }
    }
  }

  return out;
}

export default function MediaPage() {
  const photos = collectPhotos();
  return <MediaHub photos={photos} videos={VIDEOS} />;
}
