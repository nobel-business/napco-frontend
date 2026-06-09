// Generates tiny LQIP (low-quality image placeholder) data URLs for every image in
// public/images, written to src/lib/blur-map.json keyed by public path
// (e.g. "/images/hero.png"). <MediaImage> looks these up to apply Next's blur-up
// placeholder automatically. Re-run after adding/replacing images:  npm run blur
import { readdir, writeFile, mkdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const imagesDir = join(root, "public", "images");
const outFile = join(root, "src", "lib", "blur-map.json");

const exts = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

/** Recursively collect image files under public/images. */
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (exts.has(e.name.slice(e.name.lastIndexOf(".")).toLowerCase())) files.push(full);
  }
  return files;
}

const files = await walk(imagesDir);
const map = {};

for (const file of files) {
  // Public path: "/images/<...>" with forward slashes.
  const publicPath = "/" + relative(join(root, "public"), file).split(sep).join("/");
  try {
    const buf = await sharp(file)
      .resize(14, 14, { fit: "inside" }) // tiny — keeps the data URL small
      .webp({ quality: 45 })
      .toBuffer();
    map[publicPath] = `data:image/webp;base64,${buf.toString("base64")}`;
  } catch (err) {
    console.warn(`skip ${publicPath}: ${err.message}`);
  }
}

await mkdir(join(root, "src", "lib"), { recursive: true });
// Sort keys for stable diffs.
const sorted = Object.fromEntries(Object.keys(map).sort().map((k) => [k, map[k]]));
await writeFile(outFile, JSON.stringify(sorted, null, 2) + "\n");

const bytes = Buffer.byteLength(JSON.stringify(sorted));
console.log(`blur-map: ${Object.keys(sorted).length} images -> ${(bytes / 1024).toFixed(1)} KB  (${relative(root, outFile)})`);
