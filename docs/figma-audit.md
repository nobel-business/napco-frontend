# NAPCO Aqua — Frontend Implementation Analysis

> Source: Figma `NAPCO-Aqua-version-3` (file key `ZDNIEHO7S8eWAhZSSEcgjO`)
> Audit date: 2026-06-03 · Status: **Awaiting approval — no code written yet**

---

## PHASE 1 — COMPLETE FIGMA AUDIT

### Document structure
The file is a marketing/corporate website for **NAPCO Aqua** (aquaculture). Relevant content lives on two canvases:

| Canvas | Purpose |
|---|---|
| `🎨 Style` (`0:1`) | Design-system reference: **Typography**, **color**, **Icons** frames + image/photo assets. 2,260 nodes (1,692 vector icons, 152 component symbols). |
| `Final AR & EN` (`7003:11470`) | All application screens. 2,618 nodes (1,155 frames, 1,359 component instances). |

### The 4 design dimensions (quadrants)
The `Final AR & EN` canvas holds four sibling super-frames, each 16,280×8,060, each containing the **same 10 screens**:

| Quadrant frame | Theme | Direction | Node |
|---|---|---|---|
| **Final EN** | Light | English LTR | `7126:58587` |
| **Dark EN**  | Dark  | English LTR | `7130:82495` |
| **Final AR** | Light | Arabic RTL  | `7059:41135` |
| **Dark AR**  | Dark  | Arabic RTL  | `7059:53591` |

→ **10 unique pages × 2 themes × 2 languages = 40 frames.** All designed at **1440px desktop width** (no mobile/tablet frames — responsive must be engineered from the desktop source).

### The 10 unique pages (English-Light node IDs as canonical reference)

| # | Page | Node | Height | Key patterns |
|---|---|---|---|---|
| 1 | **HOME** | `7126:58588` | 7180 | Glass navbar, dark hero + CTA, "trusted partner" split, numbers/stats list, mission split, solutions list (alternating image/checklist), "why choose" feature grid, partner logos, CTA banner, footer |
| 2 | **ABOUT US** | `7126:58861` | 5994 | Image hero, feature row, vision/mission cards (blue+orange), leadership profile, work-standards list, stats row, "25+ years" + "Vision 2030" banners |
| 3 | **SERVICES** | `7126:59048` | 6976 | Hero, alternating image+checklist service blocks, "industry tailored" feature grid, solutions card grid |
| 4 | **TRAINING & VISITS** | `7126:59243` | 6018 | Hero+CTA, tracks cards, programs (image+checklist), 4-step "how it works" blue cards, dual CTA cards, **enrollment form** |
| 5 | **BLOG** | `7126:59424` | 3229 | Hero, category filter, featured-article carousel card, stats row, 3-card system grid w/ category tags |
| 6 | **All Articles** (listing) | `7126:59555` | 3527 | Hero, category filter chips, **3×N article-card grid**, **pagination** |
| 7 | **Articles** (single) | `7126:59659` | 4431 | Hero w/ breadcrumb+tag, meta (date/read-time), body copy, "Expert Tip" callout, key-benefits grid, implementation cards, **share bar**, related-articles grid |
| 8 | **MEDIA** | `7126:59805` | 3698 | Hero, image gallery grid (hover overlay), **video cards** grid (play overlay) |
| 9 | **Career** | `7126:59926` | 4733 | Hero, testimonial carousel card, feature row, "ambassador" banner, "what you gain" grid, **application form** (incl. file upload) |
| 10 | **CONTACT US** | `7126:60059` | 3089 | Image hero, 2-col **contact form** + info cards, "expert support" card, **world map** with location pins |

### Cross-cutting components (appear on most/all pages)
- **Navbar** — glass effect (`Effect(type: GLASS, radius: 100)`), logo, nav links (Home, About us, Services, Training, Blog, Media, Career), language toggle, theme toggle, search icon, orange "Contact us" CTA button. Floats over hero.
- **Footer** — `#000221` navy, logo + address/contact, "Quick Links", "Get Started" (orange buttons), social icons, copyright + "Powered by GAIT".
- **Hero band** — full-width image or gradient, centered/edge title, orange underline accent, optional CTA.
- **Section heading** — centered title + short orange tick/underline.
- **Cards**: feature card (icon tile + title + text), checklist item (orange check + text), article card (image + tag + title + date), service block, stat card, testimonial card, video card, CTA banner card.
- **Forms**: text input, textarea, select/dropdown, phone input, file upload, orange submit button.
- **Buttons**: primary (orange `#FF782C` fill), secondary/outline, icon button, pagination buttons, carousel arrows.
- **Filters/Chips**: category pills.
- **Icons**: 1,692 vector icons; ~152 component symbols.

---

## PHASE 2 — DESIGN SYSTEM SPECIFICATION

### Color tokens (exact, from the `color` frame)

**Primary (blue → navy)**
| Token | Hex |  | Token | Hex |
|---|---|---|---|---|
| Primary 50 | `#F5F5FB` | | Primary 500 | `#0008A3` |
| Primary 100 | `#CCCEED` | | Primary 600 | `#000682` |
| Primary 200 | `#999CDA` | | Primary 700 | `#000562` |
| Primary 300 | `#666BC8` | | Primary 800 | `#000341` |
| Primary 400 | `#3339B5` | | Primary 900 | `#000221` |

**Secondary (orange — brand accent)**
| Token | Hex |  | Token | Hex |
|---|---|---|---|---|
| Secondary 50 | `#FFE4D5` | | Secondary 400 | `#FF782C` |
| Secondary 100 | `#FFC9AB` | | Secondary 500 | `#CC6023` |
| Secondary 200 | `#FFAE80` | | Secondary 600 | `#99481A` |
| Secondary 300 | `#FF9356` | | Secondary 700 | `#663012` |
|  |  | | Secondary 800 | `#331809` |

**Neutrals**: Gray 50 `#F5F5F5`, 100 `#EBEBEB`, 200 `#E1E1E1`, 300 `#D7D7D7`, 400 `#A4A4A4`, 500 `#7B7B7B`, 600 `#525252`, 700 `#292929`; White `#FFFFFF`; Black `#000000`.

**Gradients**: `grad blue`, `grad orang`, `grad orang3`, `grad bg`, `grad blak`, `grad darkblue` (used in heroes, cards, overlays — exact stops to be extracted per-use during build).

### Semantic colors (theme-aware) — confirmed by diffing Light vs Dark screen tokens
| Semantic role | Light | Dark |
|---|---|---|
| `--bg` (main bg) | `#FFFFFF` | `#161C2B` |
| `--surface` (card bg) | `#FFFFFF` | `#212839` |
| `--text` (Primary 900 role) | `#000221` | `#FFFFFF` |
| `--text-muted` (Gray 600 role) | `#525252` | `#CCCEED` |
| `--footer-bg` | `#000221` | `#000221` (constant) |
| `--brand` (orange) | `#FF782C` | `#FF782C` (constant) |
| `--accent-card` (blue card) | `#0008A3` | `#0008A3` (constant) |

> The Figma theming is a **semantic-variable override** model — only a handful of roles flip between modes; brand orange and the deep-navy footer/blue cards stay constant. This maps 1:1 to CSS custom properties.

### Typography
- **Font family — English: `Inter`** · **Arabic: `Cairo`** (confirmed on the Typography spec frame).
- Applied line-height ≈ **1.5**, letter-spacing ≈ **−0.05em** (tightened) on screens.

| Token | Size | Weight | | Token | Size | Weight |
|---|---|---|---|---|---|---|
| Display Large | 56 | Bold (700) | | Title Medium | 20 | SemiBold (600) |
| Display Medium | 48 | Bold (700) | | Title Small | 18 | SemiBold (600) |
| Display Small | 28 | Medium (500) | | Label Large | 24 | Medium (500) |
| Headline Large | 36 | SemiBold (600) | | Label Medium | 20 | Medium (500) |
| Headline Medium | 32 | SemiBold (600) | | Label Small | 16 | Medium (500) |
| Headline Small | 28 | SemiBold (600) | | Body Large | 20 | Regular (400) |
| Title Large | 24 | SemiBold (600) | | Body Medium | 18 | Regular (400) |
|  |  |  | | Body Small | 16 | Regular (400) |

### Other scales
- **Radius**: cards/inputs use medium-large radii; navbar pill uses `radius: 100` (full). Proposed scale: `sm 8 / md 12 / lg 16 / xl 24 / full 9999` (exact per-component values verified at build).
- **Shadow**: card shadow = `DROP_SHADOW color #999CDA3D, offset(0,4), blur 16, spread 0` → `--shadow-card`. Glass/blur effect for navbar & some cards (`backdrop-filter: blur()`).
- **Spacing**: 4px base grid (Tailwind default aligns). Section vertical rhythm large (~80–120px between sections at desktop).
- **Z-index**: base 0 · sticky navbar 50 · dropdowns 100 · modal/overlay 1000 · toast 1100.
- **Breakpoints** (engineered): `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`; design canvas = 1440 (fits `xl`).
- **Motion**: hover lifts on cards, carousel slide, smooth theme transition (~200ms ease). Respect `prefers-reduced-motion`.

---

## PHASE 3 — APPLICATION ARCHITECTURE

**Stack**: Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · `next-themes` (dark/light) · `next-intl` (en/ar + RTL) · `next/font` (Inter + Cairo).

```
napco-frontend/
├─ app/
│  ├─ [locale]/                 # en | ar  (locale segment)
│  │  ├─ layout.tsx             # html dir/lang, fonts, providers, navbar+footer
│  │  ├─ page.tsx               # HOME
│  │  ├─ about/page.tsx
│  │  ├─ services/page.tsx
│  │  ├─ training/page.tsx
│  │  ├─ blog/page.tsx
│  │  ├─ articles/page.tsx              # All Articles (listing)
│  │  ├─ articles/[slug]/page.tsx       # single article
│  │  ├─ media/page.tsx
│  │  ├─ career/page.tsx
│  │  └─ contact/page.tsx
│  ├─ globals.css               # @theme tokens + CSS-var light/dark
│  └─ not-found.tsx
├─ components/
│  ├─ ui/                       # shadcn primitives (button, input, card, select, dialog…)
│  ├─ layout/                   # Navbar, Footer, LocaleSwitcher, ThemeToggle, Container
│  ├─ sections/                 # Hero, FeatureGrid, SolutionsList, StatsRow, CTABanner, PartnerLogos…
│  ├─ cards/                    # ArticleCard, FeatureCard, ServiceBlock, VideoCard, TestimonialCard…
│  └─ forms/                    # ContactForm, EnrollmentForm, CareerForm (+ react-hook-form + zod)
├─ lib/                         # utils, cn(), constants, nav config
├─ messages/                    # en.json, ar.json  (copy extracted from Figma)
├─ i18n/                        # next-intl config, routing, request
├─ public/                      # exported images/icons from Figma
├─ styles/                      # tokens.css (optional split)
└─ middleware.ts                # locale negotiation/redirect
```

**Layering**: tokens (CSS vars) → `ui/` primitives → `cards/` + `sections/` composites → page compositions. Server Components by default; Client Components only for navbar interactivity, theme/locale toggles, carousels, forms.

---

## PHASE 4 — RTL / LTR STRATEGY

The Arabic version is a **full mirror**, not just translated text (confirmed visually).

- **Direction**: `<html dir="rtl" lang="ar">` driven by locale. Single source of truth via `next-intl` locale.
- **Logical properties everywhere**: use Tailwind logical utilities (`ms-*/me-*`, `ps-*/pe-*`, `start-*/end-*`, `text-start/text-end`) instead of physical `ml/mr/left/right`. This auto-mirrors layout.
- **Flex/grid order**: rows naturally reverse under RTL with logical properties; explicit `flex-row-reverse` only where a component must not mirror.
- **Icons**: directional icons (arrows, chevrons, carousel controls, "read more →", breadcrumb separators) flip with `rtl:-scale-x-100`. Non-directional icons (search, social, brand) stay.
- **Navigation**: navbar links right-aligned in AR; logo moves to the right; CTA to the left; dropdown anchoring flips.
- **Forms**: labels/inputs right-aligned; field order mirrored; phone/number inputs keep LTR numerals via `dir="ltr"` on the input where needed.
- **Tables/Grids**: column order mirrors; first cell on the right in AR.
- **Cards**: icon/text order mirrors; alternating image/text split blocks swap sides.
- **Typography**: load **Cairo** for `ar`, **Inter** for `en`, switched by `lang`/CSS var so the correct font applies automatically.

---

## PHASE 5 — DARK / LIGHT STRATEGY

- **Mechanism**: `next-themes` toggling `class="dark"` on `<html>`; tokens defined as CSS custom properties in `:root` (light) and `.dark` (overrides). shadcn consumes the same vars.
- **What changes** (from token diff): page bg `#FFF→#161C2B`, surfaces `#FFF→#212839`, primary text `#000221→#FFF`, muted text `#525252→#CCCEED`, borders/dividers darken.
- **What stays constant**: brand orange `#FF782C`, blue accent cards `#0008A3`, navy footer `#000221`, gradients (with opacity tweaks where needed).
- **States** (to verify per component during build): hover (card lift + slight bg/brightness change), active/pressed, focus-visible ring (orange), disabled (reduced opacity / gray). Each state defined for both themes.
- **No FOUC**: `next-themes` with `suppressHydrationWarning`; theme + locale persisted.

---

## PHASE 6 — RESPONSIVE STRATEGY

Design is desktop-only (1440). We engineer breakpoints down and up:

| Viewport | Behavior |
|---|---|
| **Mobile** (<640) | Single column; navbar → hamburger drawer; multi-col grids → 1 col; hero text scales down; reduced section padding; forms full-width; tables → stacked cards |
| **Tablet** (768) | 2-col grids; condensed nav; medium padding |
| **Laptop** (1024) | 3-col grids restored; full nav bar |
| **Desktop** (1280–1440) | Pixel-match to Figma; max content width ~1200–1280 centered |
| **Ultra-wide** (≥1536) | Cap container width; center; backgrounds/heroes extend full-bleed |

Patterns: fluid type (`clamp()`), `Container` with max-width + responsive gutters, grids via `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, hide decorative elements on small screens, carousels become swipeable.

---

## PHASE 7 — DEVELOPMENT ROADMAP

1. **Scaffold** — Next 15 + TS + Tailwind + shadcn; `next-themes`, `next-intl`, fonts (Inter+Cairo); base config.
2. **Design tokens** — `globals.css` CSS vars (colors, semantic light/dark, radius, shadow, typography), Tailwind theme extension; finalize color ramp + gradient stops from Figma.
3. **i18n + RTL shell** — `[locale]` routing, middleware, `dir`/`lang`, messages skeleton, locale + theme switchers.
4. **Layout** — Navbar (glass, responsive drawer, toggles) + Footer + Container.
5. **UI primitives** — shadcn button/input/textarea/select/card/dialog styled to tokens; brand variants.
6. **Shared sections & cards** — Hero, section heading, feature grid, checklist, stats, CTA banner, article/feature/service/video/testimonial cards, pagination, filters, carousel.
7. **Pages (parity pass, page-by-page)** — order: HOME → ABOUT → SERVICES → TRAINING → BLOG → All Articles → Article → MEDIA → Career → CONTACT. Each built with real extracted copy (en+ar), verified in all 4 quadrants.
8. **Forms** — Contact, Enrollment, Career (react-hook-form + zod), validation messages localized.
9. **Assets** — export images/icons from Figma to `public/`.
10. **QA** — pixel parity vs Figma per quadrant, responsive sweep, a11y (focus, contrast, reduced-motion), Lighthouse/SEO (metadata, OG, sitemap, semantic HTML).

### Open items to confirm during build (flagged, not assumed)
- Exact gradient stops per usage; per-component radii/padding (read from frame metadata at build time).
- Whether blog/articles/media are static content or need a CMS/data layer (currently treating as static + typed content files).
- Source of article/media imagery (export from Figma vs placeholders).
