// Optimise event photos for the web.
// Usage: node scripts/optimize-event-photos.mjs <sourceDir> <targetDir>
// Resizes to max 2200px on the long edge and compresses to ~82% progressive
// JPEG (mozjpeg). Camera originals (10–40 MB) become ~250–450 KB web files.
// Output is renamed NN.jpg (zero-padded) so the gallery sorts cleanly.
import sharp from "sharp";
import fs from "fs";
import path from "path";

const [, , srcArg, dstArg] = process.argv;
if (!srcArg || !dstArg) {
  console.error("Usage: node scripts/optimize-event-photos.mjs <sourceDir> <targetDir>");
  process.exit(1);
}

const src = path.resolve(srcArg);
const dst = path.resolve(dstArg);
fs.mkdirSync(dst, { recursive: true });

const files = fs
  .readdirSync(src)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort();

if (files.length === 0) {
  console.error(`No images found in ${src}`);
  process.exit(1);
}

let totalIn = 0;
let totalOut = 0;
let n = 0;
for (const f of files) {
  n++;
  const inPath = path.join(src, f);
  const outPath = path.join(dst, `${String(n).padStart(2, "0")}.jpg`);
  totalIn += fs.statSync(inPath).size;
  const info = await sharp(inPath)
    .rotate() // respect EXIF orientation
    .resize({ width: 2200, height: 2200, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(outPath);
  totalOut += info.size;
  console.log(
    `${f}  ->  ${path.basename(outPath)}  (${Math.round(info.size / 1024)} KB, ${info.width}x${info.height})`
  );
}

console.log(
  `\nDone: ${files.length} photos -> ${dst}\n` +
    `Total ${(totalIn / 1048576).toFixed(1)} MB in  ->  ${(totalOut / 1048576).toFixed(1)} MB out`
);
