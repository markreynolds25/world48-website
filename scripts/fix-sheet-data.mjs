// One-off repair: write the 13 placements as proper rows (roster-matching
// spellings), and consolidate Waitlists → Waitlist.
// Run: node scripts/fix-sheet-data.mjs
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

// Names aligned to the roster sheet spellings so profile badges match.
const PLACEMENTS = [
  ["Adam Charles", "Laramie County Community College", "JUCO", "Ireland", ""],
  ["Rokas Liucvaikis", "Olney Central College", "JUCO", "Ireland", ""],
  ["Mark Burns", "Layton Christian Academy", "Prep", "Ireland", ""],
  ["Junior Kemm", "University of Evansville", "D1", "Brazil", ""],
  ["Jannick Pinas", "University of Evansville", "D1", "Netherlands", ""],
  ["Tristen Kuska", "University at Buffalo", "D1", "Germany", ""],
  ["Colin Schroeder", "Fresno State", "D1", "Germany", "https://www.instagram.com/p/DZLDvSruYFr/"],
  ["Diego Eslava", "Louisiana State University Shreveport", "NAIA", "Spain", ""],
  ["Kristijonas Strackaitis", "Western Wyoming Community College", "JUCO", "Lithuania", ""],
  ["Wilfred Omorusi", "Howard College", "JUCO", "Ireland", ""],
  ["Martin Minarovjech", "Lamar University", "D1", "Slovakia", ""],
  ["Rudis Donis", "Wayne State College", "D2", "Latvia", ""],
  ["Malone Gross", "Houston Christian University", "D1", "France", ""],
];

// 1. Rewrite Placements cleanly.
await sheets.spreadsheets.values.clear({
  spreadsheetId: sheetId,
  range: "Placements!A1:E100",
});
await sheets.spreadsheets.values.update({
  spreadsheetId: sheetId,
  range: `Placements!A1:E${PLACEMENTS.length + 1}`,
  valueInputOption: "RAW",
  requestBody: {
    values: [["Player", "School", "Level", "Country", "Note"], ...PLACEMENTS],
  },
});
console.log(`Placements rewritten: header + ${PLACEMENTS.length} rows.`);

// 2. Check Mark's "Waitlists" tab — migrate any data, then delete it.
const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
const waitlists = meta.data.sheets.find((s) => s.properties.title === "Waitlists");
if (waitlists) {
  const content = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Waitlists!A1:E50",
  });
  const rows = content.data.values || [];
  console.log(`"Waitlists" tab has ${rows.length} row(s):`, JSON.stringify(rows).slice(0, 500));
  const dataRows = rows.filter(
    (r) => r.length && r.some((c) => c) && !/^timestamp$/i.test(String(r[0]))
  );
  if (dataRows.length > 0) {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Waitlist!A:D",
      valueInputOption: "RAW",
      requestBody: { values: dataRows },
    });
    console.log(`Migrated ${dataRows.length} row(s) into Waitlist.`);
  }
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: {
      requests: [{ deleteSheet: { sheetId: waitlists.properties.sheetId } }],
    },
  });
  console.log('Deleted the duplicate "Waitlists" tab.');
}

console.log("Done.");
