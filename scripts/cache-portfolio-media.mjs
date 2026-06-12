/**
 * Fetches App Store (iTunes) and Play Store (Microlink) preview images into portfolio_media.json.
 * Run: node scripts/cache-portfolio-media.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MEDIA_PATH = path.join(ROOT, "portfolio", "portfolio_media.json");

const APPLE_ID_BY_KEY = {
  prosready: "6473836555",
  petty: "6475017473",
  ambit: "6523413424",
  nomadnurse: "6503719145",
  english_pathway: "6471124956",
  doclink: "6476941293",
  go_amigo: "6738283222",
  vendup: "1546545604",
  foodbuddy: "6505124191",
  fasal360: "6748749929",
  eurojobs: "6477697476"
};

const BUNDLE_BY_KEY = {
  dentclinic: "site.dentclinic.maincompanionapp",
  mybeautydeals: "com.ali.personal.care.sale"
};

const PLAY_BY_KEY = {
  prosready: "com.shees1.services_provider",
  frenzone: "com.sheesX.Frenzone",
  repairoo: "com.repairoo.app",
  ambit: "com.shees.ambit",
  nomadnurse: "com.nomad_nurse.app",
  petty: "com.sheesX.pet_care",
  english_pathway: "com.umerimtiaz.flutter_application_engpath",
  mybeautydeals: "com.ali.personal.care.sale",
  dentclinic: "site.dentclinic.maincompanionapp"
};

async function itunesById(id) {
  for (const country of ["us", "pk", "gb"]) {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${id}&country=${country}`);
    const json = await res.json();
    if (json.results?.[0]) return json.results[0];
  }
  return undefined;
}

async function itunesByBundle(bundleId) {
  const res = await fetch(`https://itunes.apple.com/lookup?bundleId=${bundleId}&country=us`);
  const json = await res.json();
  return json.results?.[0];
}

async function microlinkPreview(url) {
  const api = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false`;
  const res = await fetch(api);
  if (!res.ok) return undefined;
  const json = await res.json();
  return json.data?.screenshot?.url;
}

function hiResShot(url) {
  return url?.replace(/\/\d+x\d+bb\.(jpg|png|webp)$/i, "/1290x2796bb.$1");
}

async function enrichEntry(key, entry) {
  const next = { ...entry };

  if (APPLE_ID_BY_KEY[key]) {
    const app = await itunesById(APPLE_ID_BY_KEY[key]);
    if (app) {
      next.artworkUrl = app.artworkUrl512?.replace("512x512", "512x512bb") ?? next.artworkUrl;
      const shots = (app.screenshotUrls ?? []).map(hiResShot).filter(Boolean);
      if (shots.length) next.previewImages = shots.slice(0, 4);
    }
  }

  if (BUNDLE_BY_KEY[key]) {
    const app = await itunesByBundle(BUNDLE_BY_KEY[key]);
    if (app) {
      next.artworkUrl = app.artworkUrl512?.replace("512x512", "512x512bb") ?? next.artworkUrl;
      const shots = (app.screenshotUrls ?? []).map(hiResShot).filter(Boolean);
      if (shots.length) next.previewImages = shots.slice(0, 4);
    }
  }

  if (PLAY_BY_KEY[key] && !next.previewImages?.length) {
    const playUrl = `https://play.google.com/store/apps/details?id=${PLAY_BY_KEY[key]}`;
    const shot = await microlinkPreview(playUrl);
    if (shot) next.previewImage = shot;
    if (!next.previewWebUrl) next.previewWebUrl = playUrl;
  }

  const web = next.previewWebUrl;
  if (web && !web.includes("apps.apple.com") && !web.includes("play.google.com")) {
    next.previewImage = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(web)}?w=1200`;
  }

  return next;
}

async function main() {
  const raw = JSON.parse(fs.readFileSync(MEDIA_PATH, "utf8"));
  const keys = Object.keys(raw);
  console.log(`Enriching ${keys.length} portfolio media entries...`);

  for (const key of keys) {
    try {
      raw[key] = await enrichEntry(key, raw[key]);
      console.log(`  ✓ ${key}`);
    } catch (err) {
      console.warn(`  ✗ ${key}:`, err.message);
    }
    await new Promise((r) => setTimeout(r, 400));
  }

  fs.writeFileSync(MEDIA_PATH, `${JSON.stringify(raw, null, 2)}\n`);
  console.log("Done.");
}

main();
