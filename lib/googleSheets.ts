import { google } from "googleapis";
import fs from "fs";
import path from "path";

const sheets = google.sheets("v4");

/**
 * Look in /public/players for a local image matching this player's slug.
 * Supports .jpg/.jpeg/.png/.webp. Returns a web path (e.g. "/players/slug.jpg")
 * or undefined if no file is found. This lets Mark drop a JPG into
 * /public/players/<slug>.jpg without having to edit the Google Sheet.
 */
function findLocalPhoto(slug: string): string | undefined {
  try {
    const dir = path.join(process.cwd(), "public", "players");
    if (!fs.existsSync(dir)) return undefined;
    const exts = ["jpg", "jpeg", "png", "webp"];
    for (const ext of exts) {
      const file = `${slug}.${ext}`;
      if (fs.existsSync(path.join(dir, file))) {
        return `/players/${file}`;
      }
    }
    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * Shape of a player record after we read it from the Google Sheet.
 * Keep this in sync with the column order in your sheet header row.
 */
export interface PlayerData {
  id: string; // stable-ish ID derived from name (slug)
  name: string;
  event_number?: number; // jersey # for the event (column P)
  position?: string;
  country?: string;
  school?: string;
  height_cm?: number;
  weight_kg?: number;
  ppg?: number;
  rpg?: number;
  apg?: number;
  fg_percentage?: number;
  three_p_percentage?: number;
  ft_percentage?: number;
  bio?: string;
  instagram_url?: string;
  highlight_url?: string;
  photo_url?: string; // local path like "/players/name.jpg" or a full https URL
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseNumber(raw: unknown): number | undefined {
  if (raw === undefined || raw === null || raw === "") return undefined;
  const n = typeof raw === "number" ? raw : parseFloat(String(raw));
  return Number.isFinite(n) ? n : undefined;
}

function parseInteger(raw: unknown): number | undefined {
  if (raw === undefined || raw === null || raw === "") return undefined;
  const n = typeof raw === "number" ? raw : parseInt(String(raw), 10);
  return Number.isFinite(n) ? n : undefined;
}

function getAuthClient() {
  try {
    const raw = process.env.GOOGLE_SHEETS_CREDENTIALS;
    if (!raw) {
      console.warn(
        "[googleSheets] GOOGLE_SHEETS_CREDENTIALS not set. Returning null auth."
      );
      return null;
    }
    const credentials = JSON.parse(raw);
    return new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
  } catch (error) {
    console.error("[googleSheets] Failed to parse credentials:", error);
    return null;
  }
}

export async function getPlayersFromSheet(): Promise<PlayerData[]> {
  try {
    const auth = getAuthClient();
    if (!auth) return [];

    const sheetId = process.env.GOOGLE_SHEETS_ID;
    const range = process.env.GOOGLE_SHEETS_RANGE || "Players!A:Q";

    if (!sheetId) {
      console.warn("[googleSheets] GOOGLE_SHEETS_ID not set.");
      return [];
    }

    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: sheetId,
      range,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) return [];

    // Skip the header row. We rely on column order A..O as documented in
    // lib/googleSheets.ts header comment.
    const players: PlayerData[] = [];
    const seenIds = new Set<string>();

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || !row[0]) continue;

      const name = String(row[0]).trim();
      let id = slugify(name);
      // Avoid duplicate slugs (two players with same name)
      if (seenIds.has(id)) id = `${id}-${i}`;
      seenIds.add(id);

      players.push({
        id,
        name,
        position: row[1] ? String(row[1]).trim() : undefined,
        country: row[2] ? String(row[2]).trim() : undefined,
        school: row[3] ? String(row[3]).trim() : undefined,
        height_cm: parseInteger(row[4]),
        weight_kg: parseInteger(row[5]),
        ppg: parseNumber(row[6]),
        rpg: parseNumber(row[7]),
        apg: parseNumber(row[8]),
        fg_percentage: parseNumber(row[9]),
        three_p_percentage: parseNumber(row[10]),
        ft_percentage: parseNumber(row[11]),
        bio: row[12] ? String(row[12]).trim() : undefined,
        instagram_url: row[13] ? String(row[13]).trim() : undefined,
        highlight_url: row[14] ? String(row[14]).trim() : undefined,
        event_number: parseInteger(row[15]),
        photo_url:
          (row[16] ? String(row[16]).trim() : "") || findLocalPhoto(id),
      });
    }

    console.log(`[googleSheets] Fetched ${players.length} players`);
    return players;
  } catch (error) {
    console.error("[googleSheets] Error fetching:", error);
    return [];
  }
}

// Simple in-memory cache so we don't hammer the Sheets API on every request.
let cachedPlayers: PlayerData[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000;

export async function getPlayersWithCache(): Promise<PlayerData[]> {
  const now = Date.now();
  if (cachedPlayers && now - cacheTimestamp < CACHE_DURATION_MS) {
    return cachedPlayers;
  }
  cachedPlayers = await getPlayersFromSheet();
  cacheTimestamp = now;
  return cachedPlayers;
}

export async function getPlayerById(id: string): Promise<PlayerData | null> {
  const players = await getPlayersWithCache();
  return players.find((p) => p.id === id) ?? null;
}
