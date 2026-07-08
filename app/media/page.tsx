import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import MediaHub, { type MediaVideo } from "@/components/MediaHub";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Photography and highlight film from World 48 2026 at the National Basketball Arena, Dublin.",
};

// YouTube highlight reels — add plain watch/short/youtu.be URLs as Mark supplies
// them. Optionally link each clip to a player with player + playerId (slug).
const VIDEOS: MediaVideo[] = [];

export default function MediaPage() {
  let photos: string[] = [];
  try {
    const dir = path.join(process.cwd(), "public", "Event", "2026");
    photos = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .map((f) => `/Event/2026/${f}`);
  } catch {
    // Folder not created yet — MediaHub shows the holding state.
  }

  return <MediaHub photos={photos} videos={VIDEOS} />;
}
