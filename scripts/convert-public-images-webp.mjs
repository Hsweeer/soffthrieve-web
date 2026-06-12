/**
 * Converts PNG/JPEG assets under public/ to WebP (quality 82).
 * Run: node scripts/convert-public-images-webp.mjs
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const EXT = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (EXT.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

const files = await walk(PUBLIC_DIR);
let converted = 0;

for (const file of files) {
  const out = file.replace(/\.(png|jpe?g)$/i, ".webp");
  await sharp(file).webp({ quality: 82, effort: 4 }).toFile(out);
  converted += 1;
  console.log(path.relative(process.cwd(), out));
}

console.log(`\nConverted ${converted} image(s) to WebP.`);
