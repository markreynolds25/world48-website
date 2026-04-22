import { NextResponse } from "next/server";
import { google } from "googleapis";

// Diagnostic endpoint — visit /api/debug-sheet in the browser to see
// exactly why the roster isn't loading. Safe to delete once everything
// is working; it deliberately never returns credentials or private keys.
export const revalidate = 0;
export const dynamic = "force-dynamic";

type Step = {
  name: string;
  ok: boolean;
  detail?: string;
};

export async function GET() {
  const steps: Step[] = [];
  let tabNames: string[] = [];
  let rowsPreview: unknown[] = [];
  const rangeConfigured =
    process.env.GOOGLE_SHEETS_RANGE || "(not set; lib default: Sheet1!A:O)";
  const sheetId = process.env.GOOGLE_SHEETS_ID;

  // 1. Env vars present
  steps.push({
    name: "GOOGLE_SHEETS_ID is set",
    ok: Boolean(sheetId),
    detail: sheetId ? `...${sheetId.slice(-6)}` : "missing",
  });
  steps.push({
    name: "GOOGLE_SHEETS_RANGE is set",
    ok: Boolean(process.env.GOOGLE_SHEETS_RANGE),
    detail: rangeConfigured,
  });
  steps.push({
    name: "GOOGLE_SHEETS_CREDENTIALS is set",
    ok: Boolean(process.env.GOOGLE_SHEETS_CREDENTIALS),
  });

  // 2. Credentials parse
  let creds: Record<string, string> | null = null;
  try {
    creds = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || "");
    const keyLooksOk =
      typeof creds?.private_key === "string" &&
      creds.private_key.includes("BEGIN PRIVATE KEY") &&
      creds.private_key.includes("END PRIVATE KEY");
    steps.push({
      name: "Credentials JSON parses",
      ok: true,
      detail: `client_email: ${creds?.client_email ?? "(missing)"}`,
    });
    steps.push({
      name: "Private key looks well-formed",
      ok: keyLooksOk,
      detail: keyLooksOk
        ? "BEGIN/END markers present"
        : "private_key is malformed — likely an escape-character issue in .env.local",
    });
  } catch (e) {
    steps.push({
      name: "Credentials JSON parses",
      ok: false,
      detail: `failed: ${(e as Error).message}`,
    });
  }

  // 3. Sheet metadata (confirms sharing + lists tabs)
  let auth: InstanceType<typeof google.auth.GoogleAuth> | null = null;
  if (creds && sheetId) {
    try {
      auth = new google.auth.GoogleAuth({
        credentials: creds,
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
      });
      const api = google.sheets("v4");
      const meta = await api.spreadsheets.get({ auth, spreadsheetId: sheetId });
      tabNames = (meta.data.sheets ?? [])
        .map((s) => s.properties?.title)
        .filter((t): t is string => Boolean(t));
      steps.push({
        name: "Sheet is reachable (sharing works)",
        ok: true,
        detail: `Spreadsheet: "${meta.data.properties?.title ?? "(untitled)"}"`,
      });
      steps.push({
        name: "Tabs found",
        ok: tabNames.length > 0,
        detail: tabNames.join(", ") || "(none)",
      });
    } catch (e) {
      const msg = (e as Error).message;
      steps.push({
        name: "Sheet is reachable (sharing works)",
        ok: false,
        detail: msg.includes("403")
          ? "403 Forbidden — the service account does NOT have access to this sheet. Share the sheet with the client_email above as Viewer."
          : msg.includes("404")
          ? "404 Not Found — GOOGLE_SHEETS_ID is wrong."
          : msg,
      });
    }
  }

  // 4. Read current range
  if (auth && sheetId) {
    try {
      const api = google.sheets("v4");
      const resp = await api.spreadsheets.values.get({
        auth,
        spreadsheetId: sheetId,
        range: rangeConfigured,
      });
      const rows = resp.data.values ?? [];
      rowsPreview = rows.slice(0, 3);
      steps.push({
        name: `Range "${rangeConfigured}" returns data`,
        ok: rows.length > 0,
        detail: `rows returned: ${rows.length} (incl. header if any)`,
      });
    } catch (e) {
      const msg = (e as Error).message;
      steps.push({
        name: `Range "${rangeConfigured}" returns data`,
        ok: false,
        detail: msg.includes("Unable to parse range")
          ? `The tab name in the range doesn't exist. Tabs actually present: ${tabNames.join(", ") || "(unknown)"}.`
          : msg,
      });
    }
  }

  const allOk = steps.every((s) => s.ok);
  return NextResponse.json(
    {
      verdict: allOk ? "READY" : "NOT READY — see first failing step below",
      steps,
      tabsFound: tabNames,
      rangeConfigured,
      firstThreeRows: rowsPreview,
    },
    { status: allOk ? 200 : 500 }
  );
}
