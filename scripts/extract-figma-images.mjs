// Extracts the FULL-RESOLUTION raster embedded in each Figma SVG export (in
// project-files/all-images) and writes it to public/images at the target width — the clean
// rectangle, WITHOUT the rounded corners the SVG would bake in if rasterized directly. The
// site frames it via its own object-cover + border-radius, so nothing else changes.
//
// Usage: node scripts/extract-figma-images.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const SRC = "D:/nobel-business/projects/napco/project-files/all-images";
const OUT = "public/images";

// slot file  ←  source SVG  @ target max width (capped at native; aspect preserved)
const JOBS = [
  { svg: "Rectangle 4.svg", out: "home-services.png", w: 960 },
  { svg: "image 6.svg", out: "trusted.png", w: 1280 },
  { svg: "Rectangle 27.svg", out: "solutions.png", w: 1134 },
  { svg: "Rectangle 22.svg", out: "about-team.png", w: 1200 },
  { svg: "Rectangle 1.svg", out: "blog-featured.png", w: 1000 },
  { svg: "Rectangle 1.svg", out: "media-gallery.png", w: 1000 },
  { svg: "unsplash_eUfnha6ev9g.svg", out: "home-cta.png", w: 1600 },
  { svg: "unsplash_eUfnha6ev9g.svg", out: "hero-contact.png", w: 1920 },
  { svg: "image 9.svg", out: "contact-map.png", w: 1556 },
];

/** Decode pixel dims from a PNG/JPEG buffer (to pick the largest embedded raster). */
function dims(buf, kind) {
  if (kind === "png") return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const mk = buf[i + 1];
    if (mk >= 0xc0 && mk <= 0xcf && mk !== 0xc4 && mk !== 0xc8 && mk !== 0xcc) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return { w: 0, h: 0 };
}

/** Largest embedded raster in an SVG (the photo, not any small overlay). */
function largestRaster(svgPath) {
  const s = readFileSync(svgPath, "utf8");
  const matches = [...s.matchAll(/data:image\/(png|jpeg|jpg);base64,([A-Za-z0-9+/=]+)/g)];
  let best = null;
  for (const m of matches) {
    const kind = m[1] === "jpg" ? "jpeg" : m[1];
    const buf = Buffer.from(m[2], "base64");
    const d = dims(buf, kind);
    const area = d.w * d.h;
    if (!best || area > best.area) best = { buf, ...d, area };
  }
  return best;
}

for (const j of JOBS) {
  const raster = largestRaster(join(SRC, j.svg));
  if (!raster) { console.warn(`! ${j.svg}: no embedded raster`); continue; }
  const out = join(OUT, j.out);
  await sharp(raster.buf)
    .resize({ width: j.w, withoutEnlargement: true })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(out);
  const m = await sharp(out).metadata();
  console.log(`${j.out.padEnd(22)} ← ${j.svg.padEnd(26)} ${raster.w}x${raster.h} → ${m.width}x${m.height}`);
}
