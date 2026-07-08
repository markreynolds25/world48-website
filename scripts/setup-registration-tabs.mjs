// One-off setup: create CoachRegistrations + PlayerRegistrations tabs with
// the exact header rows the code expects. Run: node scripts/setup-registration-tabs.mjs
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

const TABS = [
  {
    title: "CoachRegistrations",
    header: [
      "Timestamp", "Name", "Job Title", "Institution", "Email", "Attendance",
      "Bio Link", "Accommodation", "Recruiting Focus", "Social", "Days",
      "Dietary", "Irish Night", "Status", "EmailSentAt",
    ],
    headerRange: "CoachRegistrations!A1:O1",
  },
  {
    title: "PlayerRegistrations",
    header: [
      "Timestamp", "Name", "Email", "WhatsApp", "DOB", "Grad Year", "Country",
      "Head Shot URL", "Highlight URL", "Stats Link", "Twitter", "Instagram",
      "Agent", "Days", "Jersey Number", "Jersey Size", "Parent Name",
      "Parent Email", "Consent", "Status", "EmailSentAt",
    ],
    headerRange: "PlayerRegistrations!A1:U1",
  },
];

const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
const titles = meta.data.sheets.map((s) => s.properties.title);
console.log("Existing tabs:", titles.join(" | "));

for (const tab of TABS) {
  if (!titles.includes(tab.title)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: tab.title } } }] },
    });
    console.log(`Created ${tab.title}.`);
  }
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: tab.headerRange,
    valueInputOption: "RAW",
    requestBody: { values: [tab.header] },
  });
  console.log(`${tab.title} header written (${tab.header.length} cols).`);
}
console.log("Done.");
