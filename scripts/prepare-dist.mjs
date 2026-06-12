import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outDir = resolve(root, "out");
const distDir = resolve(root, "dist");

if (!existsSync(outDir)) {
  console.error("Static export folder not found. Run `next build` first.");
  process.exit(1);
}

if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true });
}

cpSync(outDir, distDir, { recursive: true });
console.log(`Production static site copied to ${distDir}`);
