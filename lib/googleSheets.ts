import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import path from 'path';

/**
 * Look in /public/players for a local image matching this player's slug.
 * Supports .jpg/.jpeg/.png/.webp. Returns a web path (e.g. "/players/slug.jpg")
 * or undefined if no file is found.
 */
function findLocalPhoto(slug: string): string | undefined {
  try {
    const dir = path.join(process.cwd(), 'public', 'Players');
    if (!fs.existsSync(dir)) return undefined;
    const exts = ['jpg', 'jpeg', 'png', 'webp'];
    for (const ext of exts) {
      const file = `${slug}.${ext}`;
      if (fs.existsSync(path.join(dir, file))) {
        return `/Players/${file}`;
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
  id: string;            // stable-ish ID derived from name (slug)
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
  photo_url?: string;    // local path like "/players/name.jpg" or a full https URL
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseNumber(raw: unknown): number | undefined {
  if (raw === undefined || raw === null || raw === '') return undefined;
  const n = typeof raw === 'number' ? raw : parseFloat(String(raw));
  return Number.isFinite(n) ? n : undefined;
}

function parseInteger(raw: unknown): number | undefined {
  if (raw === undefined || raw === null || raw === '') return undefined;
  const n = typeof raw === 'number' ? raw : parseInt(String(raw), 10);
  return Number.isFinite(n) ? n : undefined;
}

// Get JWT auth client
function getAuthClient(): JWT | null {
  try {
    const credentials = JSON.parse(
      process.env.GOOGLE_SHEETS_CREDENTIALS || '{}'
    );

    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return auth;
  } catch (error) {
    console.error('Failed to parse Google credentials:', error);
    return null;
  }
}

// Fetch all players from Google Sheet
export async function getPlayersFromSheet(): Promise<PlayerData[]> {
  try {
    const auth = getAuthClient();
    if (!auth) {
      console.warn('Google Sheets auth not available, returning empty array');
      return [];
    }

    const sheetId = process.env.GOOGLE_SHEETS_ID;
    // Column Q (index 16) holds the roster status: "yes" | "pending" | blank/no
    const range = process.env.GOOGLE_SHEETS_RANGE || 'Players!A:Q';

    if (!sheetId) {
      console.warn('[googleSheets] GOOGLE_SHEETS_ID not set.');
      return [];
    }

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) return [];

    const players: PlayerData[] = [];
    const seenIds = new Set<string>();

    // Process each row (skip header at index 0)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];

      // Skip empty rows
      if (!row || !row[0]) continue;

      // Column Q (index 16) — only include players with status "yes" or "pending"
      const status = (row[16] ? String(row[16]).trim().toLowerCase() : '');
      if (status !== 'yes' && status !== 'pending') continue;

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
        photo_url: findLocalPhoto(id),
      });
    }

    console.log(`Fetched ${players.length} players from Google Sheets`);
    return players;
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return [];
  }
}

// Simple in-memory cache so we don't hammer the Sheets API on every request.
let cachedPlayers: PlayerData[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getPlayersWithCache(): Promise<PlayerData[]> {
  const now = Date.now();

  if (cachedPlayers && now - cacheTimestamp < CACHE_DURATION) {
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

// Append a new registration row to the "Registrations" tab.
export async function addRegistration(data: {
  name: string;
  email: string;
  role: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const auth = getAuthClient();
    if (!auth) {
      const msg = 'Auth not available — check GOOGLE_SHEETS_CREDENTIALS env var.';
      console.warn('[googleSheets]', msg);
      return { ok: false, error: msg };
    }

    const sheetId = process.env.GOOGLE_SHEETS_ID;
    if (!sheetId) {
      const msg = 'GOOGLE_SHEETS_ID not set.';
      console.warn('[googleSheets]', msg);
      return { ok: false, error: msg };
    }

    const sheets = google.sheets({ version: 'v4', auth });
    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Registrations!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, data.name, data.email, data.role]],
      },
    });

    console.log(`[googleSheets] Registration saved: ${data.email}`);
    return { ok: true };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[googleSheets] Failed to save registration:', error);
    return { ok: false, error: msg };
  }
}
