import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
interface PlayerData {
  name: string;
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
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
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
    const range = process.env.GOOGLE_SHEETS_RANGE || 'Sheet1!A:O';
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });
    const rows = response.data.values || [];
    if (rows.length === 0) return [];
    const players: PlayerData[] = [];
    // Process each row (skip header at index 0)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];

      // Skip empty rows
      if (!row || !row[0]) continue;
      const player: PlayerData = {
        name: row[0] || '',
        position: row[1] || undefined,
        country: row[2] || undefined,
        school: row[3] || undefined,
        height_cm: row[4] ? parseInt(row[4]) : undefined,
        weight_kg: row[5] ? parseInt(row[5]) : undefined,
        ppg: row[6] ? parseFloat(row[6]) : undefined,
        rpg: row[7] ? parseFloat(row[7]) : undefined,
        apg: row[8] ? parseFloat(row[8]) : undefined,
        fg_percentage: row[9] ? parseFloat(row[9]) : undefined,
        three_p_percentage: row[10] ? parseFloat(row[10]) : undefined,
        ft_percentage: row[11] ? parseFloat(row[11]) : undefined,
        bio: row[12] || undefined,
        instagram_url: row[13] || undefined,
        highlight_url: row[14] || undefined,
      };
      players.push(player);
    }
    console.log(`Fetched ${players.length} players from Google Sheets`);
    return players;
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return [];
  }
}
// Cache players data (for performance)
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
