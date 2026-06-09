# NAPCO Aqua — Image Quality & Matching Audit

### Source: `project-files/all-images` · Reference: `.figma-audit` · **AUDIT/PLAN — no files changed yet**

> Goal: every site image slot uses the **correct Figma image** at **excellent quality**, correct
> format, with **nothing else changed** (no layout/code/style — only image files swapped).

---

## 1. The key finding (changes the whole approach)

The `all-images` folder ships each image in **3 formats** — `.jpg`, `.png`, `.svg`:

- The **`.png` / `.jpg` exports are downscaled to the Figma *frame* size** — often *smaller* than what's
  already on the site (e.g. `Rectangle 1` = 280×218, `Rectangle 4` = 466×422, `image 6` = 440×367).
  Using these would **not** improve quality — several would make it worse.
- The **`.svg` files embed the FULL-RESOLUTION raster** (verified by decoding the embedded data URIs):

  | Source | PNG/JPG export | **Raster embedded in the SVG** |
  |---|---|---|
  | Rectangle 1 (shrimp) | 280×218 | **1664×1060** |
  | Rectangle 4 (greenhouse worker) | 466×422 | **960×1280** |
  | Rectangle 22 (raceway tanks) | 466×787 | **1600×1200** |
  | Rectangle 27 (blue tanks) | 466×720 | **1134×749** |
  | image 6 (men at tank) | 440×367 | **1280×960** |
  | unsplash_… (aerial cages) | 316×316 | **2399×1798** |
  | image 4 (water treatment) | 1440×480 | (wide, high-res) |

- **Caveat:** rendering the SVG bakes in Figma's **rounded corners** (transparent corners) — bad, because
  the site rounds images itself via CSS. **So the plan is to extract the embedded raster directly**
  (clean full-res rectangle), then resize for the slot. The site's existing `object-cover` + radius do
  the framing — identical to how Figma "fill" works, just higher quality.

**Format decision:** keep every slot's existing **`.png` filename** and replace its *contents* with the
high-res extracted raster (re-encoded PNG). This means **zero code changes** (`src="/images/…png"` stays),
and Next.js still serves optimized AVIF/WebP at runtime. So "correct format" = the raster the site/Next
expects, sourced from the high-res Figma original. (SVG is just a transport wrapper here, not a web format
for these photos.)

---

## 2. Source image catalog (what each `all-images` file actually depicts)

| Source file | Content | Max res (in SVG) |
|---|---|---|
| `Rectangle 1` | Worker lifting net of **shrimp** over salt flat | 1664×1060 |
| `Rectangle 3` | **Desert circular earthen ponds** (lined, aerial-ground) | ~hi |
| `Rectangle 4` | **Greenhouse worker feeding** (NAPCO shirt, orange splash) | 960×1280 |
| `Rectangle 22` | **Concrete raceway tanks** (green water, greenhouse) | 1600×1200 |
| `Rectangle 25` | **Clear shallow pond** water + sandy bank | ~hi |
| `Rectangle 26` | **Indoor RAS** facility, circular wooden tanks | ~hi |
| `Rectangle 27` | **Blue indoor tanks** at night (greenhouse) | 1134×749 |
| `image 4` | **Water-treatment clarifier** (sunny, wide 3:1) | ~1440w+ |
| `image 6` | **Men inspecting** green tank (thobes) | 1280×960 |
| `image 9` | **GCC world map** w/ country pins (Contact) | 800×520+ |
| `unsplash (0)` | **Aerial sea-cages**, square | 2399×1798 |
| `unsplash (1)` | Aerial cages, **blurred wide** (low-value) | — |
| `unsplash (2)` | Dusk **tank inspection** (2 people) | — |
| `unsplash (3)` | **Shrimp in hands** (close-up) | — |
| `unsplash (4)` | **Feeding raceway** (brown water) | — |
| `unsplash (5)` | **Two men** talking by blue tank | — |
| `unsplash (6)` | **Green RAS tanks** (wide) | — |
| `unsplash (7)` | **Outdoor fish tanks** (sunny, coastal) | — |
| `unsplash (8)` | Aerial cages **+ boat** (wide) | — |
| `unsplash (9)` | **NAPCO group** under canopy at tank | — |
| `FB_IMG …` | **CEO portrait** (gray suit) | 580×598 |
| `Frame 1321315851` | **Vision 2030** lockup banner (1440×320) | 1440×320 |
| `ae8e20bc…` ×4 | **Maraya mirrored building, AlUla** (NOT aquaculture) | 4096×2006 |

---

## 3. WHICH IMAGES ARE WRONG (the fix list)

### A. Right content, but LOW QUALITY → upgrade from the SVG's high-res raster ✅ confident
| Slot file | Current | Source (SVG raster) |
|---|---|---|
| `home-services.png` | 466×422 | **Rectangle 4** → 960×1280 |
| `trusted.png` | 440×367 | **image 6** → 1280×960 |
| `solutions.png` | 466×678 | **Rectangle 27** → 1134×749 |
| `about-team.png` | 440×295 | **Rectangle 22** → 1600×1200 |
| `blog-featured.png` | 336×311 | **Rectangle 1** → 1664×1060 |
| `media-gallery.png` | 336×311 | **Rectangle 1** → 1664×1060 |
| `home-cta.png` | 280×280 | **unsplash (0)** → 2399×1798 |
| `hero-contact.png` | 280×280 | **unsplash (0)** aerial → 2399×1798 |
| `cta.png` | 1440×808 | **unsplash (0)** (refresh to true source) |
| `contact-map.png` | 800×520 | **image 9** (re-extract clean) |
| `article-feature.png` / `svc-eng.png` | 1462×480 / 1440×480 | **image 4** (re-extract hi-res) |

### B. Possibly WRONG CONTENT / needs your confirmation ❓
| Slot | Current shows | Likely correct source | Note |
|---|---|---|---|
| `about-standards.png` | greenhouse rows | `Rectangle 22` or `Rectangle 26`/`unsplash (6)` | which tanks shot? |
| `svc-feasibility / svc-site / svc-operations / svc-training` (Services blocks) | mixed | `Rectangle 3/25/26` + `unsplash (4/7)` | need per-block confirm |
| `blog-ras / blog-biofloc / blog-smart` (Blog system cards) | site photos | `unsplash (6/7)` / `Rectangle 26/27` | per-card |
| `media-video.png` / `media-farm.png` | fish/farm | `unsplash` thumbs | `Rectangle 2` not in `all-images` |
| `art-*.png` (9 article thumbnails) | cycled site photos | `unsplash (2–9)` / `Rectangle` set | generic in Figma too |
| heroes: `hero-about/services/training/blog/media/articles/career` | 1440×808 photos | — | already decent res; the redesign intentionally uses photo heroes (Figma originals were gradient). Leave unless you want specific swaps. |

### C. Fine as-is (no change)
`leadership.png` (598×598 ≈ source max), `vision-2030.png/-dark` (lockup), `napco-logo.png`,
`partners/*`, `home-values.png` (1280²), and the already-1440-wide heroes.

### D. Anomaly — needs your input ⚠️
`ae8e20bc…png` (×4 identical, 4096×2006) is the **Maraya mirrored building in AlUla** — a Saudi
landmark, **not an aquaculture image**, and it matches **no current slot**. I won't place it anywhere
without knowing its intended use.

---

## 4. Execution plan (on approval)

1. **Extract** the embedded high-res raster from each chosen source SVG (clean, un-rounded).
2. **Resize** per slot target (heroes ~1920w, half-width ~1440w, cards ~900w, avatars ~600w), capped at
   native; preserve native aspect (site `object-cover` frames it). Output **PNG**, same filename.
3. **Regenerate** the blur-map (`npm run blur`) so placeholders match the new images.
4. **Verify:** `tsc` + `next build` (expect 39/39); spot-check the upgraded slots render.
5. Commit per logical group; **no code/layout/style changes** — image files only.

---

## 5. Decisions I need before executing
1. **`ae8e20bc` (Maraya building):** where should it go — or is it not used? *(I'll ignore it unless told.)*
2. **Group B (content) mappings:** confirm the per-block / per-card assignments, or let me propose exact
   ones from the Figma page renders for your sign-off.
3. **Heroes:** keep the current photo heroes (just quality, no swaps), or do you want specific hero images
   from `all-images` on specific pages?
4. **Group A:** proceed with these confident high-res upgrades now? *(recommended — pure quality win.)*
