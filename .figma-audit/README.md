# NAPCO Aqua — Design ↔ Code Reference Package

This folder is a **self-contained comparison kit** for reviewing the implemented frontend against the original Figma design. It is intended for a design/QA team (e.g. Cloud Design) to verify visual parity.

- **Figma file:** `NAPCO-Aqua-version-3` (key `ZDNIEHO7S8eWAhZSSEcgjO`)
- **Implementation:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · next-intl · next-themes
- **Dimensions:** 10 pages × {English LTR, Arabic RTL} × {Light, Dark}
- **Screenshots captured at:** 1440px desktop width (the design's canvas width)

---

## 📁 Folder structure

```
.figma-audit/
├── README.md                         ← you are here (index + comparison guide)
├── AUDIT-REPORT.md                   ← full pixel-perfect audit + resolution log
│
├── 01_figma-design-reference/        ← THE SOURCE OF TRUTH (from Figma)
│   ├── full-page-pdfs/               ← Final EN/AR + Dark EN/AR (full design export)
│   ├── design-system/                ← color-palette.png · typography-scale.png
│   ├── section-captures/             ← Figma captures, per page, per section
│   │   ├── home/  about/  services/  training/  blog/
│   │   └── all-articles/  article/  media/  career/  contact/
│   ├── original-icons/               ← 152 source SVG icons (MingCute set)
│   ├── original-images/              ← 49 source photos/assets used in the design
│   └── interaction-reference.mp4     ← motion/interaction reference
│
├── 02_implementation-screenshots/    ← THE BUILT SITE (current code output)
│   └── <page>_<EN|AR>-<light|dark>.png   (full-page renders, headless browser)
│
└── 03_source-archives/               ← original Figma export zips (icons.zip, images.zip)
```

> **Note:** a stray `Dark EN.pdf` may remain at the top level (a duplicate left by an OS file lock during organizing). The canonical copy lives in `01_figma-design-reference/full-page-pdfs/`. Delete the top-level one when convenient.

---

## 🔍 How to compare (page by page)

For each page, open the matching items in **01** (design) and **02** (implementation):

| Page | Figma reference | Implementation render | Live route | Primary source file(s) |
|---|---|---|---|---|
| **Home** | `section-captures/home/` | `home_EN-light.png` · `home_AR-light.png` · `home_EN-dark.png` · `home_AR-dark.png` | `/[locale]` | `src/app/[locale]/page.tsx` |
| **About** | `section-captures/about/` | `about_EN-light.png` · `about_AR-light.png` · `about_EN-dark.png` | `/[locale]/about` | `src/app/[locale]/about/page.tsx` |
| **Services** | `section-captures/services/` | `services_EN-light.png` · `services_AR-light.png` · `services_EN-dark.png` | `/[locale]/services` | `services/page.tsx`, `components/sections/service-block.tsx` |
| **Training** | `section-captures/training/` | `training_EN-light.png` · `training_AR-light.png` | `/[locale]/training` | `training/page.tsx`, `components/forms/training-form.tsx` |
| **Blog** | `section-captures/blog/` | `blog_EN-light.png` · `blog_AR-light.png` · `blog_EN-dark.png` | `/[locale]/blog` | `blog/page.tsx` |
| **All Articles** | `section-captures/all-articles/` | `all-articles_EN-light.png` · `all-articles_AR-light.png` | `/[locale]/articles` | `articles/page.tsx`, `components/sections/articles-browser.tsx`, `content/articles.ts` |
| **Article** | `section-captures/article/` | `article_EN-light.png` · `article_AR-light.png` | `/[locale]/articles/[slug]` | `articles/[slug]/page.tsx` |
| **Media** | `section-captures/media/` | `media_EN-light.png` · `media_AR-light.png` | `/[locale]/media` | `media/page.tsx`, `components/cards/video-card.tsx` |
| **Career** | `section-captures/career/` | `career_EN-light.png` · `career_AR-light.png` · `career_EN-dark.png` | `/[locale]/career` | `career/page.tsx`, `forms/career-form.tsx`, `sections/testimonial-carousel.tsx` |
| **Contact** | `section-captures/contact/` | `contact_EN-light.png` · `contact_AR-light.png` · `contact_EN-dark.png` · `contact_AR-dark.png` | `/[locale]/contact` | `contact/page.tsx`, `forms/contact-form.tsx` |

Inside each `section-captures/<page>/` folder:
- `01-…`, `02-…` = top-to-bottom Figma sections (English).
- `AR-…` = Arabic (RTL) section captures (where captured).
- `_fullpage-EN-light.png` (and `_fullpage-AR-light/-dark`) = full-page Figma export thumbnail.

---

## 🎨 Design system (shared across all pages)

| Token group | Where in code | Figma reference |
|---|---|---|
| Colors (Primary/Secondary/Gray ramps, brand `#FF782C`, navy `#000221`) | `src/app/globals.css` (`@theme`) | `design-system/color-palette.png` |
| Typography (Inter EN / Cairo AR; Display→Body scale) | `src/app/globals.css` | `design-system/typography-scale.png` |
| Radius (tiles 12 · cards 16 · panels 24) · Shadows · Semantic light/dark vars | `src/app/globals.css` | — |
| Icons (MingCute) | `src/components/ui/mingcute-icons.tsx` + `icon.tsx` | `original-icons/` |
| Buttons / Inputs / Cards / Badges | `src/components/ui/*` | per-section captures |
| Navbar / Footer / Logo | `src/components/layout/*` | every page header/footer |
| i18n strings (all copy) | `messages/en.json`, `messages/ar.json` | — |

---

## ✅ Parity status (see AUDIT-REPORT.md for detail)

Resolved: icon set → MingCute · light-mode hero gradient · navbar (navy CTA, uppercase, active pill) · card/tile **border radius** corrected to Figma · dark-mode shadows · heading tracking (LTR-only, Arabic-safe) · exact section images mapped.

**Known open items (require source assets — not in this export):**
1. **Official NAPCO logo** — currently a placeholder wordmark (`src/components/layout/logo.tsx`).
2. **Contact world-map illustration** — currently a decorative pin panel.
3. **"Vision 2030" lockup** (About) — currently styled text.
4. **Mobile/tablet** layouts — no mobile frames exist in Figma; responsive behavior was engineered (desktop-first) and is **not** yet design-verified.

---

## ▶️ Running the implementation locally

```bash
npm install
npm run dev          # http://localhost:3000  → redirects to /en
#   /en  /ar         (toggle language + light/dark in the navbar)
```
Production build used for these screenshots: `npm run build && npx next start`.
