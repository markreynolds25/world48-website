import type { Metadata } from "next";
import RosterGate from "@/components/RosterGate";
import { getPlayersWithCache } from "@/lib/googleSheets";

export const metadata: Metadata = {
  title: "Players — World 48",
  description:
    "48 elite international basketball prospects. Register for free to access full profiles, stats, and game film.",
};

// Revalidate every 5 minutes — the sheet lib has its own in-memory cache too.
export const revalidate = 300;

export default async function PlayersPage() {
  const players = await getPlayersWithCache();
  return <RosterGate players={players} />;
}
