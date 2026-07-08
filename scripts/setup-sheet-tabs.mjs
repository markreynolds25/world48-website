// One-off setup: ensure the Waitlist tab exists and both Waitlist/Placements
// have header rows. Run: node scripts/setup-sheet-tabs.mjs
import { google } from "googleapis";
import { JWT } from "google-auth-library";
import fs from "fs";

const env = fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const get = (k) => {
  const m = env.match(new RegExp(`^${k}=(.*)$`, "m"));
  return m ? m[1].trim().replace(/^['"]|['"]$/g, "") : undefined;
};

const credentials = JSON.parse(get("GOOGLE_SHEETS_CREDENTIALS"));
const sheetId = get("GOOGLE_SHEETS_ID");

const auth = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
const titles = meta.data.sheets.map((s) => s.properties.title);
console.log("Existing tabs:", titles.join(" | "));

if (!titles.includes("Waitlist")) {
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: { requests: [{ addSheet: { properties: { title: "Waitlist" } } }] },
  });
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: "Waitlist!A1:D1",
    valueInputOption: "RAW",
    requestBody: { values: [["Timestamp", "Name", "Email", "Role"]] },
  });
  console.log("Created Waitlist tab with header.");
} else {
  console.log("Waitlist tab already exists.");
}

if (titles.includes("Placements")) {
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Placements!A1:E2",
  });
  const rows = existing.data.values || [];
  console.log("Placements first rows:", JSON.stringify(rows));
  if (rows.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: "Placements!A1:E1",
      valueInputOption: "RAW",
      requestBody: { values: [["Player", "School", "Level", "Country", "Note"]] },
    });
    console.log("Added Placements header row.");
  }
} else {
  console.log("NOTE: no Placements tab found — checking for near-miss names:",
    titles.filter((t) => /placem/i.test(t)).join(", ") || "none");
}
