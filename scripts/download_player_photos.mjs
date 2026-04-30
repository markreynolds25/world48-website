/**
 * World 48 — Download player profile pictures from Instagram
 *
 * Uses Node.js built-in modules only. No npm install needed.
 *
 * HOW TO RUN:
 *   node scripts/download_player_photos.mjs
 *
 * Photos are saved to public/Players/ with the correct slug filename.
 * Already-downloaded photos are skipped automatically.
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_FOLDER = path.join(__dirname, "..", "public", "Players");

if (!fs.existsSync(OUTPUT_FOLDER)) fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });

// Player name (must match Google Sheet exactly) → Instagram handle
const PLAYERS = {
  "Darragh Horkan":         "darragh.horkan",
  "Jack Fitzpatrick":       "Jack_Fitzpatrick2007",
  "Aivaras Buzas":          "aivaras_buzas",
  "Adam Charles":           "Adamcharles07_",
  "Markas Mikalickas":      "lth.markas",
  "Mykyta Hural":           "eastmanoid",
  "Wilfred Omorusi":        "Ogosah_08",
  "Zahir Gutierrez":        "zahir.gutierrez4",
  "Joseph Badejo":          "josephbadejoo",
  "Jakub Ofman":            "j_ofman",
  "Viktor Dimitrov":        "iiamdimso",
  "Frank Nasasa Karlsson":  "franknasasakarlsson",
  "Fryderyk Klimas":        "fred_klimas",
  "Colin Schroeder":        "28.colin",
  "Aidan Leacy":            "aidan.leacy",
  "Rokas Liucvaikis":       "rokas_liucvaikis",
  "Nektarios Papadopoulos": "Nektariospap",
  "Maurice Barnard":        "maurice_.b11",
  "Til Peters":             "tp_9904",
  "Zach Trezvant":          "zachtrezvant",
  "Ayo Ibirinde":           "ayo.ibr",
  "Harry Sheehan":          "harry_sheehan7",
  "Magnas Butkus":          "magnas_butkus",
  "Nojus Vasikauskas":      "nojusvasikauskas",
  "Juraj Minarovjech":      "_minarovjech",
};

function slugify(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// Follow redirects and download a URL to a file
function downloadUrl(url, destPath, redirects = 5) {
  return new Promise((resolve, reject) => {
    if (redirects === 0) return reject(new Error("Too many redirects"));
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(downloadUrl(res.headers.location, destPath, redirects - 1));
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const contentType = res.headers["content-type"] || "";
      if (!contentType.startsWith("image/")) return reject(new Error(`Not an image (${contentType})`));
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
      file.on("error", reject);
    }).on("error", reject);
  });
}

// Fetch URL and return body as string
function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => resolve(body));
    }).on("error", reject);
  });
}

// Strategy 1: unavatar.io (public avatar proxy service)
async function tryUnavatar(handle, destPath) {
  const url = `https://unavatar.io/instagram/${handle}?fallback=false`;
  await downloadUrl(url, destPath);
}

// Strategy 2: Instagram og:image meta tag
async function tryOgImage(handle, destPath) {
  const html = await fetchText(`https://www.instagram.com/${handle}/`);
  const match = html.match(/property="og:image"\s+content="([^"]+)"/);
  if (!match) throw new Error("og:image not found");
  await downloadUrl(match[1], destPath);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  let downloaded = 0, skipped = 0, failed = 0;
  const failedList = [];

  console.log(`\n World 48 — Player photo downloader\n${"─".repeat(52)}`);

  for (const [playerName, handle] of Object.entries(PLAYERS)) {
    const slug = slugify(playerName);
    const destPath = path.join(OUTPUT_FOLDER, `${slug}.jpg`);

    if (fs.existsSync(destPath)) {
      console.log(`  ⏭  ${playerName} — already exists`);
      skipped++;
      continue;
    }

    process.stdout.write(`  ↓  ${playerName} (@${handle})... `);

    let success = false;

    // Try unavatar first
    try {
      await tryUnavatar(handle, destPath);
      console.log(`✓  (unavatar)`);
      success = true;
    } catch (_) {}

    // Fallback: og:image scrape
    if (!success) {
      try {
        await tryOgImage(handle, destPath);
        console.log(`✓  (og:image)`);
        success = true;
      } catch (_) {}
    }

    if (!success) {
      // Clean up any partial file
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      console.log(`✗  failed — add manually`);
      failedList.push({ playerName, handle });
      failed++;
    } else {
      downloaded++;
    }

    // Be polite — short pause between requests
    await sleep(800);
  }

  console.log(`\n${"─".repeat(52)}`);
  console.log(`  Downloaded : ${downloaded}`);
  console.log(`  Skipped    : ${skipped} (already existed)`);
  console.log(`  Failed     : ${failed}`);

  if (failedList.length > 0) {
    console.log(`\n  Add these manually (Instagram may have blocked):`);
    for (const { playerName, handle } of failedList) {
      console.log(`    ${playerName} → https://instagram.com/${handle}`);
    }
  }

  if (downloaded > 0) {
    console.log(`\n  Next — commit and push:`);
    console.log(`    git add public/Players/`);
    console.log(`    git commit -m "Add player profile pictures"`);
    console.log(`    git push\n`);
  }
}

main().catch(console.error);
