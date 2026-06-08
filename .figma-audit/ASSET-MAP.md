# NAPCO Aqua — Asset Mapping Registry

**Scope:** image & icon/asset correctness only (no UI/flow/style changes).
**Method:** Figma **codegen layer names** (authoritative) + visual confirmation against section captures, cross-referenced with the export pool (`01_figma-design-reference/original-images/` — 49 photos, `original-icons/` — 152 MingCute SVGs) and current `public/images/`.
**Status key:** ✅ correct · ✗ wrong image · ♻ reused (shared file across sections) · ⛔ missing from export (needs new Figma export) · ⚠ placeholder/approx · ❓ name-match unverified

> **Naming caveat:** Figma names generic layers (`Rectangle 1`, `Group`, `Ellipse 3`) **per frame**, and the export zip de-duplicates globally — so a layer name alone is NOT a reliable file key. Every mapping below is corroborated visually where possible; unverified ones are marked ❓.

---

## 1 · FULL ASSET INVENTORY

### A. Photographic images (per page → section)

| Page | Section | Figma asset (layer) | Current file (source) | Status |
|---|---|---|---|---|
| **Home** | Trusted Partner | `image 6` (farm workers) | `trusted.png` ←image 6 | ✅ |
| Home | NAPCO Aqua Services | greenhouse worker *(component fill — not in codegen)* | `services.png` ←istock‑639381912‑2 (aerial cages) | ✗ wrong |
| Home | Vision in Action | CEO portrait | `leadership.png` ←FB_IMG | ✅ |
| Home | Solutions | `Rectangle 27` (indoor tanks) | `solutions.png` ←Rectangle 27 | ✅ |
| Home | CTA banner | `unsplash_eUfnha6ev9g` (aerial cages) | `home-cta.png` ←unsplash | ✅ |
| **About** | Intro / National Partner | `istockphoto‑1145450533‑1` | `about-intro.png` ←istock‑1145450533‑1 | ✅ ♻ (same source as `cta.png`) |
| About | CEO message | CEO portrait | `leadership.png` ←FB_IMG | ✅ ♻ (shared w/ Home vision) |
| About | Work Standards | *(distinct tanks image)* | `solutions.png` ←Rectangle 27 | ♻ ✗ reused from Home Solutions |
| About | Team / 30+ Experience | `Rectangle 22` (team meeting) | `about-team.png` ←Rectangle 22 | ✅ ❓ verify card shows meeting |
| **Services** | Intro | greenhouse | `trusted.png` ←image 6 | ♻ reused from Home |
| Services | Block · Site Assessment | (aerial/site) | `svc-site.png` ←istock‑639381912‑5 | ❓ |
| Services | Block · Feasibility | greenhouse tanks (Figma) | `svc-feasibility.png` ←Rectangle 3 (lab) | ✗ likely wrong block |
| Services | Block · Engineering | `Rectangle 26` (facility) | `svc-engineering.png` ←Rectangle 26 | ✅ confirmed |
| Services | Block · Training | orange greenhouse | `services.png` ←istock‑639381912‑2 (aerial) | ✗ ♻ |
| Services | Block · Operations | underwater fish | `cta.png` ←istock‑1145450533‑1 (surface cages) | ❓ ♻ |
| **Training** | Intro | people at farm | `train-intro.png` ←unsplash‑1 | ✅ |
| Training | Applied Foundation | — | `train-foundation.png` ←unsplash‑2 (classroom) | ✅ |
| Training | Specialized Technical | — | `train-technical.png` ←unsplash (aerial) | ✅ ♻ (same source as `home-cta`) |
| Training | Operations & Mgmt | — | `train-operations.png` ←unsplash‑3 (shrimp) | ✅ |
| **Blog** | Featured article | `Rectangle 1` (net/shrimp) | `blog-featured.png` ←Rectangle 1 | ✅ confirmed |
| Blog | System card · RAS | (codegen: istock‑2 / Rect 3) | `solutions.png` ←Rectangle 27 | ✗ ❓ |
| Blog | System card · Biofloc | — | `svc-site.png` ←istock‑639381912‑5 | ❓ |
| Blog | System card · Smart | — | `services.png` ←istock‑639381912‑2 | ❓ |
| **All Articles** | Card grid (9) | specific per-article thumbs | `content/articles.ts` cycles 7 site photos | ⚠ placeholder/generic |
| **Article** | Hero | `istockphoto‑639381912‑2` | `article.image` (varies by slug) | ⚠ generic |
| Article | Body feature image | `image 4` (water treatment) | `svc-eng.png` ←image 4 | ✅ confirmed |
| Article | Related cards (3) | `Rectangle 1/2/3` | dataset images | ⚠ generic |
| **Media** | Hero background | `istockphoto‑639381912‑3` + dark overlay | gray gradient (no image) | ✗ missing bg image |
| Media | Gallery (6 tiles) | **`Rectangle 1` × 6** (same net/shrimp shot) | 6 **different** photos | ✗ wrong |
| Media | Video cards (4) | `Rectangle 2` + `Rectangle 3` | `cta`/`solutions`/`services`/`svc-site` | ✗ (`Rectangle 2` ⛔ not in pool) |
| **Career** | Testimonial avatar ×3 | person photo(s) (`Rectangle 13` / Ellipse) | `leadership.png` ×3 | ✗ wrong + duplicated (male photo for "Sara") |
| Career | Ambassador banner | (farm group) | `trusted.png` ←image 6 | ♻ ❓ |
| **Contact** | Hero background | `unsplash_eUfnha6ev9g` + dark overlay | gray gradient (no image) | ✗ missing bg image |
| Contact | World map | **`image 9`** (photo/graphic) | CSS pin panel (no image) | ⛔ missing from pool |

### B. Logos & brand

| Asset | Figma layer | Expected location | Current | Status |
|---|---|---|---|---|
| NAPCO horizontal logo | `Napco - horizontal logo 2` (vector) | Navbar + Footer | hand-built placeholder `logo.tsx` | ⛔ not in export pool — needs SVG export |
| Vision 2030 lockup | (graphic, About banner) | About › Vision 2030 | styled text | ⛔ needs export |
| Partner logos (14) | `Artboard …@4x` ×13 + `ReNile-Logo` | Home › Partners row | `partners/partner-1…13.png` + `renile.png` | ✅ correct |

### C. Icons

| Asset | Figma source | Current | Status |
|---|---|---|---|
| Content/feature/stat/checklist icons | **MingCute** set (152 SVGs supplied) | `mingcute-icons.tsx` registry | ✅ wired |
| Language switcher icon | `vuesax/outline/translate` | MingCute `globe` | ⚠ different glyph |
| Navbar **search icon** | *(not present in Figma navbar)* | Lucide `Search` rendered | ✗ extra (not in design) |
| Theme toggle, Play, Maximize, Upload | *(not in MingCute export)* | Lucide fallback | ⚠ acceptable fallback |
| Video play button | `Frame 1321315634` (80px play graphic) | Lucide `Play` in circle | ⚠ approximated |

### D. Background / decorative

| Asset | Figma | Current | Status |
|---|---|---|---|
| Page hero backgrounds | **Media & Contact = photo + navy overlay**; Home/About/Services/Training/Blog/Articles = gray gradient | all gray gradient (light) / navy (dark) | ✗ Media & Contact missing photo bg |
| Hero carousel dot (Home) | small orange indicator | absent | ⛔ minor decorative |
| Navbar "Contact" ellipse glow | `Ellipse 3` | not used | ⚠ minor decorative |

### E. Orphan / lineage notes
- No orphaned files in `public/images` (all 18 + 14 partners referenced).
- `hero.png` (istock‑3) now only used by `content/articles.ts` cycling (Home hero became gradient) — **istock‑3 is actually the Media hero** → re-point.
- **Reused single file in ≥2 sections:** `leadership.png` (Home+About+Career×3), `trusted.png` (Home+Services+Career), `solutions.png` (Home+About+Blog), `services.png` (Home+Services+Blog), several in `articles.ts`.

---

## 2 · MISMATCH SUMMARY BY TYPE

**① Wrong image assigned**
- Home › Services (aerial vs greenhouse), Services › Feasibility (lab vs greenhouse) & Training block (aerial vs greenhouse), Blog system cards, Media gallery (6 varied vs 1 repeated), Career testimonial avatars (incl. female name + male photo).

**② Reused image in multiple places**
- `leadership.png` ×5 slots, `trusted.png` ×3, `solutions.png` ×3, `services.png` ×3, plus `articles.ts` cycling. About Standards reuses Home Solutions image; `about-intro` shares source with `cta`; `train-technical` shares source with `home-cta`.

**③ Missing Figma asset (needs new export)**
- `image 9` (Contact map), `Rectangle 2` (Media video thumb), NAPCO horizontal **logo** SVG, **Vision 2030** lockup, (likely) the exact Home‑Services greenhouse shot.

**④ Placeholder / fallback**
- All-Articles & Article images (generic cycled), Lucide fallback icons (search/play/upload/theme), Contact map (CSS), Vision 2030 (text), logo (hand-built SVG).

**⑤ Incorrect background / treatment**
- Media & Contact heroes implemented as flat gradient but Figma uses a **photo background + navy overlay**.
- Extra navbar **search icon** not in Figma; language icon glyph differs (translate vs globe).

*(No incorrect aspect-ratio defects beyond Home Vision `aspect-square` vs ~4/5 — noted in prior UI audit; out of this asset-only scope.)*

---

## 3 · REQUIRED FIX PLAN (step-by-step, asset layer only)

**Step 0 — Adopt naming convention**
`<' + 'page>-<section>[-index].png`, kebab-case, one file per Figma layer (e.g. `media-gallery.png`, `services-block-feasibility.png`, `contact-map.png`, `hero-media.png`). Partner logos stay `partners/partner-N.png`. Reuse a single file across sections **only** where Figma reuses the same layer.

**Step 1 — Fix mappings using assets ALREADY in the pool (no export needed)**
1. **Media gallery →** use `Rectangle 1.png` (net/shrimp) for all 6 tiles (Figma repeats one shot).
2. **Media hero →** `istockphoto-639381912-612x612 3.png` + existing dark overlay (re-point `hero.png`).
3. **Contact hero →** `unsplash_eUfnha6ev9g.png` + dark overlay.
4. **Media video card #2/#4 →** `Rectangle 3.png` (present); card #1/#3 await `Rectangle 2` (Step 3).
5. **About Standards →** assign a distinct tanks image (e.g. `istockphoto-639381912-612x612 5/6`) instead of reusing `solutions.png`.
6. **Career testimonials →** stop reusing `leadership.png`; map per person (candidates: `Rectangle 13`, `Ellipse 3`); if only one real testimonial exists in Figma, reduce to one.
7. **Services blocks →** re-verify Site/Feasibility/Training/Operations against the 5 block frames; `Engineering = Rectangle 26` is confirmed.
8. **Blog system cards & Article/All-Articles thumbs →** map to the specific Figma layers (`istock‑2`, `Rectangle 3`, etc.) rather than generic site photos.

**Step 2 — Decide on intentional reuse**
Reuse of `leadership.png` for Home Vision + About CEO is **acceptable** (same person, same Figma image). All other multi-use files (`trusted`, `solutions`, `services`) should be **split** into per-section files unless the Figma layer is genuinely shared.

**Step 3 — Request NEW exports from Figma (cannot resolve from current pool)**
| Needed asset | Used for | Format |
|---|---|---|
| **NAPCO horizontal logo** (light + dark) | Navbar, Footer | SVG |
| **`image 9`** (Contact world map) | Contact map section | PNG/SVG |
| **`Rectangle 2`** (Media video thumb) | Media video cards 1 & 3 | PNG |
| **Vision 2030 lockup** | About banner | SVG/PNG |
| Home‑Services greenhouse shot | Home services section | PNG (or confirm it's `istock‑639381912‑4/6` already in pool) |
| `vuesax/outline/translate` icon | Language switcher | SVG (optional — or keep globe) |

**Step 4 — Icon corrections (asset layer)**
- Remove the **search icon** from the navbar (not in Figma) — *flag only; this touches a component, deferred per "assets-only" rule.*
- Optionally swap language `globe` → exported `translate` icon.

**Step 5 — Verify**
After re-mapping, re-render each page (EN/AR, light/dark) and diff against `01_figma-design-reference/section-captures/` to confirm every image and background matches.

---

---

## 4 · RESOLUTION LOG (applied — asset references only)

**Fixed using assets already in the pool (new per-section files copied to `public/images/`):**
| Fix | New file ← source | Reference updated |
|---|---|---|
| Media gallery now repeats one shot ×6 (matches Figma) | `media-gallery.png` ← Rectangle 1 | `media/page.tsx` |
| Media hero photo background + navy overlay | `hero-media.png` ← istock‑639381912‑3 | `media/page.tsx` (PageHero `image`) |
| Contact hero photo background + navy overlay | `hero-contact.png` ← unsplash | `contact/page.tsx` (PageHero `image`) |
| Home Services greenhouse interior (was aerial cages) | `home-services.png` ← Rectangle 28 | `page.tsx` |
| About Standards distinct greenhouse rows (reuse of Solutions broken) | `about-standards.png` ← Rectangle 24 | `about/page.tsx` |
| Services Operations underwater fish (was surface cages) | `svc-operations.png` ← Rectangle 14 | `messages.*` |
| Career testimonials reduced to the single person Figma shows (**fixes male-photo-for-"Sara" + duplication**) | — (kept `leadership.png` for Ahmed) | `messages.*` |
| `PageHero` overlay: dark navy when a photo bg is set, gray gradient otherwise | — | `page-hero.tsx` |

**Reverted (name-collision):** Media "Makka" video briefly mapped to `Rectangle 3.png` (turned out to be a lab image — Figma's `Rectangle 3` is a per-frame name, not the global file) → reverted to an aquaculture thumbnail.

**RESOLVED by exporting directly from the connected Figma (get_screenshot of the exact node):**
- ✅ **NAPCO logo** → `napco-logo.png` (node 4201:45675) — wired in navbar (white over hero / darkened on scroll) + footer.
- ✅ **Contact world map** = `image 9` → `contact-map.png` (node 7126:60089) — real illustrated map with country pins.
- ✅ **Vision 2030 lockup** → `vision-2030.png` (node 7126:58941) — orange-bar lockup, wired into About banner.
- ✅ **Home Services exact worker shot** = `Rectangle 4` → `home-services.png` (node 7126:58649) — exact greenhouse-worker image.
- ✅ **Media video thumbnail** = `Rectangle 2` → `media-video.png` (node 7126:59835) — exact fish thumbnail.
- Remaining: `Rectangle 3` (Makka video alt thumb) still on an aquaculture stand-in — low impact.

Build: 39/39 green; verified in EN/AR + light/dark. No orphaned images.
