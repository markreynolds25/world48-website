import type { Metadata } from "next";
import RosterGrid from "@/components/RosterGrid";
import type { PlayerOffer } from "@/components/PlayerCard";
import { getPlayersWithCache, getPlacements, slugify } from "@/lib/googleSheets";

export const metadata: Metadata = {
  title: "Players — World 48",
  description:
    "The World 48 roster: elite international basketball prospects with full profiles, stats and game film.",
};

// Revalidate every 5 minutes — the sheet lib has its own in-memory cache too.
export const revalidate = 300;

export default async function PlayersPage() {
  const [players, placements] = await Promise.all([
    getPlayersWithCache(),
    getPlacements(),
  ]);

  // Match placements to roster players by slugified name.
  const offers: Record<string, PlayerOffer> = {};
  for (const p of placements) {
    offers[slugify(p.player)] = { school: p.school, level: p.level };
  }

  return <RosterGrid players={players} offers={offers} />;
}
