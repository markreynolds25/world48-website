import { NextResponse } from "next/server";
import { google } from "googleapis";
import { JWT } from "google-auth-library";

export async function GET() {
  const results: Record<string, unknown> = {};

  // 1. Check env vars exist
  results.GOOGLE_SHEETS_ID_set = !!process.env.GOOGLE_SHEETS_ID;
  results.GOOGLE_SHEETS_CREDENTIALS_set = !!process.env.GOOGLE_SHEETS_CREDENTIALS;
  results.GOOGLE_SHEETS_ID_value = process.env.GOOGLE_SHEETS_ID ?? "(not set)";

  // 2. Parse credentials
  let credentials: Record<string, string> = {};
  try {
    credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || "{}");
    results.credentials_parsed = true;
    results.client_email = credentials.client_email ?? "(missing)";
    results.private_key_present = !!credentials.private_key;
  } catch (e) {
    results.credentials_parsed = false;
    results.credentials_parse_error = String(e);
    return NextResponse.json({ ok: false, results });
  }

  // 3. Build auth client
  let auth: JWT;
  try {
    auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    results.auth_created = true;
  } catch (e) {
    results.auth_created = false;
    results.auth_error = String(e);
    return NextResponse.json({ ok: false, results });
  }

  // 4. Try writing a test row to Registrations tab
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const sheetId = process.env.GOOGLE_SHEETS_ID!;
    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Registrations!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[timestamp, "TEST_NAME", "test@test.com", "TEST_ROLE"]],
      },
    });

    results.write_success = true;
    results.message = "✅ Test row written to Registrations tab successfully";
  } catch (e: unknown) {
    results.write_success = false;
    results.write_error = String(e);
    if (e && typeof e === "object" && "response" in e) {
      const err = e as { response?: { data?: unknown; status?: number } };
      results.http_status = err.response?.status;
      results.http_body = err.response?.data;
    }
  }

  return NextResponse.json({ ok: results.write_success === true, results });
}
