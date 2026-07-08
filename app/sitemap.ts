import type { MetadataRoute } from "next";
import { getPlayersWithCache } from "@/lib/googleSheets";

const BASE = "https://www.undiscoveredworld48.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/players`, priority: 0.9 },
    { url: `${BASE}/about`, priority: 0.6 },
    { url: `${BASE}/ncaa-eligibility`, priority: 0.6 },
    { url: `${BASE}/sponsors`, priority: 0.6 },
    { url: `${BASE}/contact`, priority: 0.5 },
    { url: `${BASE}/privacy`, priority: 0.2 },
  ];

  let playerRoutes: MetadataRoute.Sitemap = [];
  try {
    const players = await getPlayersWithCache();
    playerRoutes = players.map((p) => ({
      url: `${BASE}/players/${p.id}`,
      priority: 0.7,
    }));
  } catch {
    // Sheet unavailable at build — ship the static routes.
  }

  return [...staticRoutes, ...playerRoutes];
}
