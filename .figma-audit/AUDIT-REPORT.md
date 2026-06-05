# NAPCO Aqua — Pixel-Perfect UI Audit Report

**Auditor role:** Senior UI Auditor / Design QA / Frontend Reviewer
**Date:** 2026-06-04
**Scope:** 10 pages × {EN LTR, AR RTL} × {Light, Dark}
**References used:** live Figma captures (`shots/*.png`), Figma export PDFs (`Final EN/AR`, `Dark EN/AR`), original icon set (`icons/` — 152 MingCute SVGs), asset zip (`img/`), rendered build screenshots (headless Edge, prod build on :3200).

> Method: each finding is grounded in a direct comparison between a Figma reference and the implemented render. Nothing assumed correct. PDF rasterization (poppler) is unavailable on this machine, so full-page references were taken from live Figma node captures, which are equivalent to the PDF content.

---

## 0. Executive summary

Structural / layout parity is **high (~90%)**: every page has the correct sections in the correct order, correct grid columns, correct RTL mirroring, and a correct light/dark token system. The gap to "100% pixel-perfect" is concentrated in a small number of **systemic visual-identity issues** that repeat on every page:

| # | Systemic issue | Severity | Status |
|---|---|---|---|
| S1 | Icon glyphs use **Lucide**, design uses **MingCute** (original SVGs supplied) | **Major** | ✅ FIXED — MingCute registry (`mingcute-icons.tsx`), all content + most inline icons swapped |
| S2 | **Light-mode hero background** is dark navy + photo; design is a light silver-gray gradient | **Major** | ✅ FIXED — light hero now silver-gray gradient; dark stays navy |
| S3 | **Brand logo** is a placeholder SVG wordmark, not the real NAPCO mark | **Major** | ⛔ BLOCKED — no logo asset supplied |
| S4 | Navbar **"Contact Us" button is orange**; design is navy/primary | **Minor** | ✅ FIXED — `variant="navy"` |
| S5 | Navbar links + hero/section H1 are **title-case**; design is **UPPERCASE** | **Minor** | ✅ FIXED — `uppercase` on nav + HOME hero (inner heroes already uppercase) |
| S6 | Active nav item is **orange text**; design is an **orange pill** background | **Minor** | ✅ FIXED — active link now orange pill |
| S7 | Several **section/hero images** are best-guess from the asset pool (not the exact frame image) | **Minor–Major** | ✅ MOSTLY FIXED — exact Figma assets now mapped via codegen image-var names |

**S7 image mapping (2026-06-05):** Reverse-mapped Figma codegen image-variable names → original asset filenames (lowercase-alphanumeric match). Applied exact Figma assets: HOME CTA = `unsplash_eUfnha6ev9g` (aerial cages), ABOUT intro = `istockphoto-1145450533-1`, ABOUT team = `Rectangle 22` (meeting), BLOG featured = `Rectangle 1` (net/shrimp), SERVICES Feasibility = `Rectangle 3` (lab), SERVICES Engineering = `Rectangle 26` (facility), TRAINING intro/foundation/technical/operations = `unsplash-1/-2/-0/-3`. Remaining pool-sourced (minor): HOME services-section image (Figma uses a component image not exposed in codegen), 3rd BLOG system card.

**Resolution pass 2 (2026-06-05) — radius/shadow/type/dark/RTL:**
- **Border radius (root cause fixed):** custom `--radius-*` tokens were mis-set (`rounded-2xl`=32px, `rounded-xl`=24px) making cards/tiles too round. Re-aligned to Figma: tiles/inputs **12px** (`xl`), cards **16px** (`2xl`), panels **24px** (`3xl`). Affects all cards + icon containers globally.
- **Shadows (dark mode):** added `.dark` override `--shadow-card`/`--shadow-card-hover` to neutral `rgba(0,0,0,…)` (the bluish light-mode shadow read wrong on navy).
- **Dark border:** `#2c344a → #303a52` for slightly better surface separation.
- **Typography:** added LTR-only heading tracking `-0.02em` (`html[lang="en"] h1–h4`) — **scoped away from Arabic** to protect Cairo's connected glyphs; bumped Why-Choose / What-You-Gain card titles to `title-large` (24px) per Figma.
- **RTL fix:** removed `tracking-wide` from nav links (letter-spacing was breaking Arabic glyph joins).
Re-verified: build 39/39 green; HOME (light) cards/tiles/titles match Figma; AR nav glyphs intact + mirrored.

**Resolution pass (2026-06-05):** S1, S2, S4, S5, S6 fixed and re-verified (build 39/39 green; HOME + CONTACT re-rendered). Remaining: S3 (needs logo asset), S7 (image mapping), CONTACT map + Vision 2030 lockup (need source illustrations). A few utility glyphs intentionally remain Lucide (no MingCute equivalent supplied): Search, Sun/Moon (theme toggle), Play (video), Maximize2 (gallery), Upload (CV).

---

## 1. GLOBAL / SYSTEMIC FINDINGS

### S1 — Icon library mismatch (Lucide vs MingCute)
- **Screen:** All pages
- **Component:** Every icon (feature tiles, checklists, stats, nav, footer, share, video play, form fields)
- **Severity:** Major
- **Design Reference:** `icons/` contains 152 **MingCute** SVGs (e.g. `mingcute_chart-bar-line`, `mingcute_check-fill`, `mingcute_tool-line`, `mingcute_fish-line`, `mingcute_rocket-line`, `mingcute_map-pin-line`, plus brand `facebook/whatsapp/linkedin/instagram/youtube/twitter`). Checks are **solid-filled** glyphs (`fill:#000221`).
- **Current Implementation:** `src/components/ui/icon.tsx` maps to **Lucide** equivalents; checklist checks use Lucide stroke `Check`.
- **Exact Difference:** Different glyph geometry, stroke weight (MingCute ~1.5–2px, optically heavier), and corner style. Specific mismaps spotted: "Documented Systems" shows a MingCute **location/map-pin**, impl uses `file-check`; checklist check is **stroke** vs MingCute **filled**; share icons are Lucide `MessageCircle` for WhatsApp vs the real `mingcute_whatsapp` glyph.
- **Recommended Fix:** Replace the Lucide registry with the supplied MingCute SVGs. Add them under `public/icons/` or as React components; keep the same string-key registry API so pages don't change. Use `-line` variants for outline contexts and `-fill` for solid (checks, play).

### S2 — Light-mode hero background treatment
- **Screen:** HOME + all inner heroes (ABOUT, SERVICES, TRAINING, BLOG, All Articles, Article, MEDIA, Career, CONTACT)
- **Component:** Hero band
- **Severity:** Major
- **Design Reference:** `shots/home_hero.png`, `ab_hero.png`, `svc_hero.png`, etc. — a smooth **light silver→mid-gray vertical gradient**, no photograph, white subtitle + orange title.
- **Current Implementation:** HOME = sunset photo + `from-navy/85` overlay (`src/app/[locale]/page.tsx`); inner pages = `PageHero` `from-primary-900 … to-primary-800` (dark navy).
- **Exact Difference:** Implementation heroes read **dark**; design heroes read **light gray**. (Note: in **dark mode** this is acceptable/closer; the mismatch is specifically **light mode**.)
- **Recommended Fix:** In light mode, set hero background to the gray gradient (≈ `#c9ccd3 → #6f7480`) with no image; keep orange title + white/near-white subtitle. Drive via a theme-aware gradient token so dark mode keeps the navy. If the photo hero is a deliberate upgrade, get sign-off — otherwise it fails parity.

### S3 — Brand logo placeholder
- **Screen:** Navbar + Footer, all pages
- **Component:** `Logo`
- **Severity:** Major
- **Design Reference:** Figma shows a fish/wave mark + two-line "NAPCO / AQUA" wordmark (white on dark). No logo asset was included in either zip.
- **Current Implementation:** `src/components/layout/logo.tsx` — hand-built stand-in SVG + single-line "NAPCO".
- **Exact Difference:** Mark shape, the "AQUA" subline, and proportions differ.
- **Recommended Fix:** Obtain the official logo SVG (light + dark variants) and drop into `Logo`. Until then this is the single most visible brand deviation.

### S4 — Navbar CTA button color
- **Severity:** Minor
- **Design Reference:** `home_hero.png` — top-right "Contact Us" is a **navy/primary** rounded button.
- **Current Implementation:** `navbar.tsx` uses `<Button size="sm">` → **orange** primary.
- **Exact Difference:** Orange vs navy fill.
- **Recommended Fix:** Use `variant="navy"` (already defined in `button.tsx`) for the navbar CTA.

### S5 — Text casing (UPPERCASE)
- **Severity:** Minor
- **Design Reference:** Nav = `HOME ABOUT US SERVICES TRAINING BLOG MEDIA CAREERS`; hero H1 = `WELCOME TO NAPCO AQUA`.
- **Current Implementation:** Nav renders title-case (`Home`, `About us`…); HOME hero `<h1>` renders the raw string "Welcome to NAPCO Aqua".
- **Exact Difference:** Letter case. (Section headings already use `uppercase` via `SectionHeading`; nav + HOME hero do not.)
- **Recommended Fix:** Add `uppercase` (CSS `text-transform`) to nav links and the HOME hero `<h1>` rather than changing the source strings (keeps i18n/data clean, and Arabic is unaffected by `uppercase`).

### S6 — Active nav indicator
- **Severity:** Minor
- **Design Reference:** Active item (e.g. BLOG) sits in a **filled orange pill**.
- **Current Implementation:** Active = orange **text** only.
- **Recommended Fix:** Render the active link with `bg-brand text-white rounded-full px-4 py-1.5`.

### S7 — Image-to-section accuracy
- **Severity:** Minor–Major (depends on section)
- **Design Reference:** Each frame uses a specific photo from `img/`.
- **Current Implementation:** A subset of section images were chosen by best-guess from the asset pool (documented during build). Hero/Services/CTA images in particular are approximations.
- **Recommended Fix:** Map each exported image to its exact frame by cross-referencing the Figma `data-node-id` image usage, then update the per-section `image` paths.

### S8 — Hero carousel indicator (HOME)
- **Severity:** Minor
- **Design Reference:** `home_hero.png` shows a small orange dot (slide indicator) under the hero buttons.
- **Current Implementation:** Absent.
- **Recommended Fix:** Add the indicator dot(s) if the hero is intended as a slider; otherwise omit by design decision.

---

## 2. TYPOGRAPHY

- **Font families:** ✅ Match — Inter (EN) / Cairo (AR) via `next/font`, switched on `html[lang]`. No deviation.
- **Type scale:** ✅ Tokens match the Figma Typography frame (Display/Headline/Title/Label/Body). 
- **Heading casing:** ⚠️ See **S5** (hero/nav not uppercased).
- **Card title size (Minor):** "Why Choose" card titles render at `title-medium` (20px); Figma reads ~24px (`title-large`). Recommend bumping these card titles to `text-title-large`.
- **Letter-spacing (Minor):** Figma applies ≈ −0.05em tracking on headings; globals set heading tracking lighter (−0.02em). Align `--text-*` letter-spacing to the Figma value for large headings.

## 3. COLORS

- **Palette tokens:** ✅ Exact (Primary/Secondary/Gray ramps, brand `#FF782C`, navy `#000221`, blue card `#0008A3`).
- **Semantic light/dark:** ✅ Correct (`--background`, `--surface`, `--foreground`, `--muted-foreground` flip as designed).
- **Navbar CTA color:** ⚠️ **S4** (orange vs navy).
- **Hero text-on-gradient (Minor):** because of **S2**, hero subtitle contrast differs (white-on-navy vs white-on-gray).

## 4. CARDS (detailed)

- **Border radius:** ✅ Cards use `rounded-2xl` (16px); Figma ≈ 16–20px. Acceptable; consider 20px on feature cards for exact match (Minor).
- **Shadow:** ✅ `--shadow-card` = `0 4 16 rgba(153,156,218,.24)` — matches the Figma `#999CDA3D 0/4/16` token exactly.
- **Border:** ✅ Thin `--border` border present, matching the near-flat Figma cards.
- **Inner spacing:** ✅ `p-6`/`p-8` matches.
- **Hover states (Minor):** Impl adds `hover:shadow-card-hover` lift; Figma has no documented hover (static export) — acceptable enhancement, but verify against the `0.4.mp4` interaction reference.
- **Icon tiles inside cards:** Shape ✅ (orange gradient rounded-square ~`rounded-xl`); **glyph ❌** (see S1).

## 5. ICON CONTAINERS

- **Background shape:** ✅ `rounded-xl` orange gradient square (`from-secondary-300 to-secondary-500`) matches Figma feature tiles.
- **Blue tiles:** ✅ `from-primary-400 to-primary-600` matches the blue track/step tiles.
- **Size:** ✅ 48px (`h-12 w-12`) feature, 56px (`h-14`) stat — matches.
- **Glyph / stroke:** ❌ **S1** — Lucide vs MingCute.
- **Numbered tiles (Services/Training/Article):** ✅ blue gradient square with `01/02…` matches Figma.

## 6. COMPONENTS

- **Buttons:** Shape/size/variants ✅ (pill, orange primary, navy, outline). Navbar CTA color ⚠️ S4.
- **Inputs / Textarea / Select:** ✅ radius, border, focus ring (orange), placeholder color match; Select chevron uses logical `end` (RTL-safe). 
- **Dropdowns:** Native `<select>` used (acceptable; Figma shows a custom chevron field — matched visually).
- **Tables:** N/A (design has none).
- **Modals:** N/A (no modal in design; forms use inline success state).
- **Navigation:** ⚠️ S4/S5/S6; otherwise structure ✅ (glass on scroll, mobile drawer added as a responsive enhancement not in desktop design).
- **Tabs/Accordions:** Category **filter chips** (All Articles) ✅ functional; no accordions in design.
- **Pagination:** ✅ numbered + prev/next, RTL arrow flip.
- **Carousels:** Featured (BLOG) arrows are decorative; Testimonials (Career) functional. Verify intended behavior vs `0.4.mp4`.

## 7. RTL / LTR

- **Mirroring:** ✅ Strong. Verified on every page: nav, hero alignment, 2-col splits swap sides, grids reverse, forms right-align, Expert-Tip border flips, pagination/arrows flip (`rtl-flip`), select chevron flips.
- **Fonts:** ✅ Cairo applies for `ar`.
- **Numerals/phone:** ✅ phone inputs forced `dir="ltr"`.
- **Minor:** Confirm the brand logo and any embedded-text images are not unintentionally mirrored (logo SVG is not flipped — correct).

## 8. DARK MODE

- **Surfaces/elevation:** ✅ bg `#161C2B`, card `#212839`, text white, muted `#CCCEED` — matches `Dark EN/AR` references.
- **Constant brand:** ✅ orange, blue cards, navy footer stay constant.
- **Hero:** ✅ Dark-mode hero (navy) is acceptable and close; the **S2** mismatch is light-mode-specific.
- **Shadows in dark (Minor):** `--shadow-card` keeps the bluish light-mode shadow color in dark; consider a darker/transparent shadow in `.dark` for more natural elevation.
- **Borders (Minor):** dark `--border #2C344A` reads slightly low-contrast on `#161C2B`; verify against `Dark EN.pdf`.

## 9. RESPONSIVE

- **Desktop / Laptop (≥1024):** ✅ Pixel target met (design is 1440).
- **Tablet (768):** ✅ grids collapse to 2-col sensibly.
- **Mobile (<640):** ⚠️ **Functional, not design-verified** — no mobile frames exist in Figma; behavior (hamburger drawer, single-column, fluid type) was engineered. Per the agreed "desktop-first, mobile later" decision this is expected, but it has **not** been pixel-audited against any reference.
- **Ultra-wide (≥1536):** ✅ content capped at `--container-content` (1200px), centered; hero/CTA full-bleed.

## 10. ASSETS

- **Icons:** ❌ Not the originals (S1) — but originals are now available in `icons/`.
- **Images:** ⚠️ Real photos used, but some section mappings approximate (S7). Also note: gallery (MEDIA) repeats from a small pool; Figma may use distinct shots.
- **Illustrations:** **Vision 2030 logo** (ABOUT banner) rendered as styled text, not the official 2030 lockup (Minor–Major). **CONTACT world map** is a decorative pin panel, not the Figma illustrated map (Major for that section).
- **Logo:** ❌ S3.
- **Video poster/`0.4.mp4`:** Not yet reviewed for motion parity — recommend checking hero/section animations against it.

---

## 11. PER-PAGE NOTES (deltas beyond the systemic issues)

- **HOME:** S2 hero (photo/navy vs gray), S8 carousel dot. "Trusted Partner" 30+ stat + layout ✅. Solutions/why-choose ✅ structure.
- **ABOUT:** Vision/Mission blue+orange cards ✅. CEO socials use Lucide (S1). **Vision 2030 banner** = styled text, not official lockup.
- **SERVICES:** 5 alternating blocks ✅ (sides + RTL correct). Caption overlay on image ✅. Systems/why grids ✅ (icons S1).
- **TRAINING:** Tracks/steps/dual-CTA ✅. Form fields & order match Figma. Hero CTA "Schedule Visit" ✅.
- **BLOG:** Featured card + arrows ✅; stats tiles ✅; system cards ✅. Featured image is an approximation (S7).
- **ALL ARTICLES:** Chips + grid + pagination ✅ (interactive). Chip active = orange pill ✅ (matches design here — good). "More ▾" overflow chip from Figma not implemented (Minor).
- **ARTICLE:** Breadcrumb, meta, Expert Tip, benefits, implementation, share, related ✅. **Body copy is a shared template** (same benefits/implementation across slugs) — acceptable demo behavior, flag for real content. Share buttons use Lucide (S1).
- **MEDIA:** Gallery grid + video cards ✅. Gallery images repeat from pool (S7/assets).
- **CAREER:** Testimonial carousel, features, ambassador, gain grid, form (with CV upload) ✅. Testimonial avatar reuses leadership photo (S7).
- **CONTACT:** Form + info cards + Expert-Support blue card ✅; column order swaps in RTL ✅. **Map = decorative stand-in** (Major for this section) — replace with the Figma map illustration or an embedded map.

---

## 12. PRIORITIZED FIX LIST (release-candidate order)

1. **S1 Icons → MingCute** (Major, repeats everywhere; assets in hand).
2. **S3 Real logo** (Major, brand).
3. **S2 Light-mode hero = gray gradient** (Major, every page top).
4. **CONTACT map** + **Vision 2030 lockup** (Major, per-section).
5. **S7 Exact image mapping** (Minor–Major).
6. **S4 navbar CTA navy**, **S5 uppercase nav/hero**, **S6 active pill** (Minor, quick wins).
7. Typography micro-tuning (card title 24px, heading tracking −0.05em) (Minor).
8. Dark shadow/border tuning; verify motion vs `0.4.mp4` (Minor).
9. **Mobile responsive design pass** (separate workstream; currently un-audited).

**Estimated parity:** Light EN ~90% · Dark EN ~93% · AR (both) ~90% (inherits same systemic issues). After items 1–3: ~98%.
