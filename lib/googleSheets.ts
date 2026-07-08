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

export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics: Rūdis → Rudis
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

/**
 * Shape of a placement row from the "Placements" tab.
 * Columns: Player | School | Level | Country | Note
 * Level is one of D1, D2, JUCO, NAIA, Prep.
 */
export interface Placement {
  player: string;
  school: string;
  level: string;
  country?: string;
  note?: string;
}

let cachedPlacements: Placement[] | null = null;
let placementsTimestamp = 0;

export async function getPlacements(): Promise<Placement[]> {
  const now = Date.now();
  if (cachedPlacements && now - placementsTimestamp < CACHE_DURATION) {
    return cachedPlacements;
  }
  try {
    const auth = getAuthClient();
    const sheetId = process.env.GOOGLE_SHEETS_ID;
    if (!auth || !sheetId) return cachedPlacements ?? [];

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Placements!A:E',
    });

    const rows = response.data.values || [];
    const placements: Placement[] = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || !row[0] || !row[1]) continue;
      placements.push({
        player: String(row[0]).trim(),
        school: String(row[1]).trim(),
        level: row[2] ? String(row[2]).trim() : '',
        country: row[3] ? String(row[3]).trim() : undefined,
        note: row[4] ? String(row[4]).trim() : undefined,
      });
    }
    cachedPlacements = placements;
    placementsTimestamp = now;
    return placements;
  } catch (error) {
    console.error('[googleSheets] Failed to read Placements:', error);
    return cachedPlacements ?? [];
  }
}

// Append a 2027 waitlist signup to the "Waitlist" tab.
export async function addWaitlist(data: {
  name: string;
  email: string;
  role: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const auth = getAuthClient();
    const sheetId = process.env.GOOGLE_SHEETS_ID;
    if (!auth) return { ok: false, error: 'Auth not available.' };
    if (!sheetId) return { ok: false, error: 'GOOGLE_SHEETS_ID not set.' };

    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Waitlist!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[new Date().toISOString(), data.name, data.email, data.role]],
      },
    });
    return { ok: true };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[googleSheets] Failed to save waitlist signup:', error);
    return { ok: false, error: msg };
  }
}

// Persist a contact/request-contact message to the "Registrations" tab so no
// message is ever lost, even while the email service is unconfigured.
export async function addContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const auth = getAuthClient();
    const sheetId = process.env.GOOGLE_SHEETS_ID;
    if (!auth) return { ok: false, error: 'Auth not available.' };
    if (!sheetId) return { ok: false, error: 'GOOGLE_SHEETS_ID not set.' };

    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Registrations!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          data.name,
          data.email,
          `Message: ${data.subject}`,
          data.message,
        ]],
      },
    });
    return { ok: true };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[googleSheets] Failed to save contact message:', error);
    return { ok: false, error: msg };
  }
}

/* ─── 2027 registrations (CoachRegistrations / PlayerRegistrations tabs) ─── */

export type RegistrationTab = 'CoachRegistrations' | 'PlayerRegistrations';

// Column layout per tab. MUST match the sheet header rows exactly.
const TAB_LAYOUT: Record<
  RegistrationTab,
  {
    range: string;
    nameCol: number;
    emailCol: number;
    ccCol?: number;
    statusCol: number;
    sentCol: number;
    sentColLetter: string;
  }
> = {
  CoachRegistrations: {
    range: 'CoachRegistrations!A:O',
    nameCol: 1,
    emailCol: 4,
    statusCol: 13,
    sentCol: 14,
    sentColLetter: 'O',
  },
  PlayerRegistrations: {
    range: 'PlayerRegistrations!A:U',
    nameCol: 1,
    emailCol: 2,
    ccCol: 17,
    statusCol: 19,
    sentCol: 20,
    sentColLetter: 'U',
  },
};

async function appendRow(
  range: string,
  values: string[]
): Promise<{ ok: boolean; error?: string }> {
  try {
    const auth = getAuthClient();
    if (!auth) {
      return { ok: false, error: 'Auth not available — check GOOGLE_SHEETS_CREDENTIALS.' };
    }
    const sheetId = process.env.GOOGLE_SHEETS_ID;
    if (!sheetId) {
      return { ok: false, error: 'GOOGLE_SHEETS_ID not set.' };
    }
    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [values] },
    });
    return { ok: true };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`[googleSheets] Append to ${range} failed:`, error);
    return { ok: false, error: msg };
  }
}

export async function addCoachRegistration(d: {
  name: string;
  title: string;
  institution?: string;
  email: string;
  attendance: string;
  bioLink?: string;
  accommodation: string;
  recruitingFocus?: string;
  social?: string;
  days: string;
  dietary: string;
  irishNight?: string;
}): Promise<{ ok: boolean; error?: string }> {
  return appendRow('CoachRegistrations!A:O', [
    new Date().toISOString(),
    d.name,
    d.title,
    d.institution ?? '',
    d.email,
    d.attendance,
    d.bioLink ?? '',
    d.accommodation,
    d.recruitingFocus ?? '',
    d.social ?? '',
    d.days,
    d.dietary,
    d.irishNight ?? '',
    'pending',
    '',
  ]);
}

export async function addPlayerRegistration(d: {
  name: string;
  email: string;
  whatsapp?: string;
  dob: string;
  gradYear: string;
  country: string;
  headshotUrl?: string;
  highlightUrl?: string;
  statsLink?: string;
  twitter?: string;
  instagram?: string;
  agent?: string;
  days: string;
  jerseyNumber?: string;
  jerseySize?: string;
  parentName?: string;
  parentEmail?: string;
}): Promise<{ ok: boolean; error?: string }> {
  return appendRow('PlayerRegistrations!A:U', [
    new Date().toISOString(),
    d.name,
    d.email,
    d.whatsapp ?? '',
    d.dob,
    d.gradYear,
    d.country,
    d.headshotUrl ?? '',
    d.highlightUrl ?? '',
    d.statsLink ?? '',
    d.twitter ?? '',
    d.instagram ?? '',
    d.agent ?? '',
    d.days,
    d.jerseyNumber ?? '',
    d.jerseySize ?? '',
    d.parentName ?? '',
    d.parentEmail ?? '',
    'yes',
    'pending',
    '',
  ]);
}

export interface RegistrationRow {
  rowNumber: number; // 1-indexed sheet row (header = 1)
  name: string;
  email: string;
  ccEmail?: string;
  status: string;
  emailSentAt: string;
}

export async function getRegistrationRows(
  tab: RegistrationTab
): Promise<RegistrationRow[]> {
  try {
    const auth = getAuthClient();
    if (!auth) return [];
    const sheetId = process.env.GOOGLE_SHEETS_ID;
    if (!sheetId) return [];

    const layout = TAB_LAYOUT[tab];
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: layout.range,
    });

    const rows = response.data.values || [];
    const out: RegistrationRow[] = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || !row[layout.nameCol] || !row[layout.emailCol]) continue;
      out.push({
        rowNumber: i + 1,
        name: String(row[layout.nameCol]).trim(),
        email: String(row[layout.emailCol]).trim(),
        ccEmail:
          layout.ccCol !== undefined && row[layout.ccCol]
            ? String(row[layout.ccCol]).trim()
            : undefined,
        status: row[layout.statusCol] ? String(row[layout.statusCol]).trim() : '',
        emailSentAt: row[layout.sentCol] ? String(row[layout.sentCol]).trim() : '',
      });
    }
    return out;
  } catch (error) {
    console.error(`[googleSheets] Reading ${tab} failed:`, error);
    return [];
  }
}

export async function markRegistrationEmailSent(
  tab: RegistrationTab,
  rowNumber: number
): Promise<void> {
  const auth = getAuthClient();
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  if (!auth || !sheetId) throw new Error('Sheets not configured');
  const layout = TAB_LAYOUT[tab];
  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${tab}!${layout.sentColLetter}${rowNumber}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[new Date().toISOString()]] },
  });
}

/* ─── Reminder engine (Emailschedule tab) ────────────────────────────────── */

export interface ScheduledEmail {
  rowNumber: number;
  key: string;
  audience: string; // players | coaches | both
  sendOn: string; // YYYY-MM-DD
  subject: string;
  heading: string;
  body: string;
  buttonLabel?: string;
  buttonUrl?: string;
  paymentLink?: string;
  sentAt: string;
}

const EMAIL_SCHEDULE_TAB = 'Emailschedule';

export async function getEmailSchedule(): Promise<ScheduledEmail[]> {
  try {
    const auth = getAuthClient();
    const sheetId = process.env.GOOGLE_SHEETS_ID;
    if (!auth || !sheetId) return [];
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${EMAIL_SCHEDULE_TAB}!A:J`,
    });
    const rows = response.data.values || [];
    const out: ScheduledEmail[] = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r || !r[0] || !r[3]) continue; // need Key + Subject
      out.push({
        rowNumber: i + 1,
        key: String(r[0]).trim(),
        audience: (r[1] ? String(r[1]) : 'both').trim().toLowerCase(),
        sendOn: r[2] ? String(r[2]).trim() : '',
        subject: String(r[3]).trim(),
        heading: r[4] ? String(r[4]).trim() : '',
        body: r[5] ? String(r[5]).trim() : '',
        buttonLabel: r[6] ? String(r[6]).trim() : undefined,
        buttonUrl: r[7] ? String(r[7]).trim() : undefined,
        paymentLink: r[8] ? String(r[8]).trim() : undefined,
        sentAt: r[9] ? String(r[9]).trim() : '',
      });
    }
    return out;
  } catch (error) {
    console.error('[googleSheets] Reading Emailschedule failed:', error);
    return [];
  }
}

export interface Recipient {
  name: string;
  email: string;
  ccEmail?: string;
}

// Approved coach/player recipients for a reminder audience, de-duplicated by email.
export async function getApprovedRecipients(audience: string): Promise<Recipient[]> {
  const want = audience.trim().toLowerCase();
  const tabs: RegistrationTab[] = [];
  if (want === 'coaches' || want === 'both') tabs.push('CoachRegistrations');
  if (want === 'players' || want === 'both') tabs.push('PlayerRegistrations');
  const seen = new Set<string>();
  const out: Recipient[] = [];
  for (const tab of tabs) {
    const rows = await getRegistrationRows(tab);
    for (const row of rows) {
      if (row.status.trim().toLowerCase() !== 'approved') continue;
      const key = row.email.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ name: row.name, email: row.email, ccEmail: row.ccEmail });
    }
  }
  return out;
}

export async function markReminderSent(rowNumber: number, summary: string): Promise<void> {
  const auth = getAuthClient();
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  if (!auth || !sheetId) throw new Error('Sheets not configured');
  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${EMAIL_SCHEDULE_TAB}!J${rowNumber}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[`${new Date().toISOString()} · ${summary}`]] },
  });
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
