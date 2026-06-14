# NAPCO Aqua — Frontend

The marketing website for **NAPCO Aqua**, an aquaculture engineering and operations brand
(an operating brand of Nobel Business Group). It's a fully bilingual (English / Arabic, with
RTL), light/dark, "Premium Aquatech" experience built on the Next.js App Router.

- **Live:** auto-deployed from `main` via Vercel.
- **Locales:** English (`en`, default) and Arabic (`ar`, RTL).
- **Themes:** light (default) and dark.

---

## Tech stack

| Area | Choice |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router, React Server Components) |
| Language | TypeScript 5.7 (strict) on React 19 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) — CSS-first `@theme` tokens in `src/app/globals.css` |
| i18n | [next-intl](https://next-intl-docs.vercel.app) — `en` / `ar`, RTL-aware, `localePrefix: "always"` |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) — class strategy, light default |
| Forms | [react-hook-form](https://react-hook-form.com) + [Zod](https://zod.dev) validation |
| Motion | Native **View Transitions API** route transitions, [Lenis](https://github.com/darkroomengineering/lenis) smooth scroll, [Embla](https://www.embla-carousel.com) carousels |
| Icons | [lucide-react](https://lucide.dev) + a local MingCute set (`src/components/ui/mingcute-icons.tsx`) |
| Images | `next/image` with build-time LQIP blur placeholders (via [sharp](https://sharp.pixelplumbing.com)) |
| Fonts | `next/font` — Inter (Latin), Cairo (Arabic), JetBrains Mono |

No backend or environment variables are required — content lives in translation files and a
typed content module; form submissions are mocked client-side.

---

## Getting started

### Prerequisites

- **Node.js 20.x** (see `.nvmrc` / `engines` in `package.json`)
- npm

### Install & run

```bash
npm install
npm run dev          # http://localhost:3000  (redirects to /en)
```

### Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (`next build`) |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with `next lint` |
| `npm run blur` | Regenerate LQIP blur placeholders for `public/images` → `src/lib/blur-map.json` |

> **Type-check:** `npx tsc --noEmit` is the primary offline quality gate (this is what CI runs first).

---

## Project structure

```
src/
├─ app/
│  ├─ [locale]/              # locale-segmented routes (en | ar)
│  │  ├─ page.tsx            # Home
│  │  ├─ about/              # About us
│  │  ├─ services/           # Services
│  │  ├─ training/           # Training
│  │  ├─ blog/               # Blog landing
│  │  ├─ articles/           # Article index
│  │  │  └─ [slug]/          # Article detail
│  │  ├─ media/              # Media gallery
│  │  ├─ career/             # Careers
│  │  └─ contact/            # Contact
│  └─ globals.css            # Tailwind v4 @theme tokens + motion/hover-lighting system
├─ components/
│  ├─ ui/                    # Primitives: button, input, select, badge, icon, media-image, …
│  ├─ cards/                 # Card components (stat tiles, article cards, …)
│  ├─ forms/                 # career / training / contact forms (RHF + Zod)
│  ├─ layout/                # navbar, footer, logo, theme + locale switchers, floating actions
│  ├─ sections/              # Page sections: page-hero, hero-video, service-block, carousels, …
│  └─ providers/             # theme, smooth-scroll, view-transitions, scroll-reveal, intro-gate
├─ config/site.ts            # Nav, footer links, contact details
├─ content/articles.ts       # Typed bilingual article content
├─ i18n/                     # routing.ts, navigation.ts, request.ts (next-intl wiring)
├─ lib/                      # utils (cn), blur map, smooth-scroll instance, sonar timeline
└─ middleware.ts             # next-intl locale middleware

messages/                    # en.json, ar.json — all UI copy
public/                      # images, icons, videos
docs/                        # design/engineering blueprints (deployment, motion, spacing, …)
scripts/                     # generate-blur-map.mjs, extract-figma-images.mjs
```

Path alias: **`@/*` → `src/*`**.

---

## Internationalization (i18n)

- Locales are defined in `src/i18n/routing.ts` (`en`, `ar`; default `en`; `localePrefix: "always"`,
  so URLs are always prefixed, e.g. `/en/about`, `/ar/about`).
- Text direction is set per locale (`localeDirection`); Arabic renders **RTL** and layouts mirror
  automatically (logical properties + `rtl-flip` utilities).
- All copy lives in `messages/en.json` and `messages/ar.json`. Use the next-intl helpers:
  - Server components: `getTranslations(...)`
  - Client components: `useTranslations(...)`
  - Rich text (e.g. responsive `<br>`): `t.rich(key, { br: () => <br /> })`
- `src/middleware.ts` handles locale negotiation/redirects.

To add a string, add the same key to **both** `en.json` and `ar.json`.

---

## Theming

- `next-themes` with the `class` strategy; **light** is the default.
- Design tokens (colors, type scale, spacing, easing/motion durations) are declared CSS-first in
  the `@theme` block of `src/app/globals.css`. Prefer tokens over hard-coded values.
- Effects (hover lighting, icon motion, image glows, route transitions) are organized as `fx-*`
  utility classes in `globals.css`, all gated behind `@media (hover: hover)` and reset under
  `prefers-reduced-motion`.

---

## Images

- Use the `MediaImage` component (wraps `next/image`) for content images — it applies the
  build-time **blur-up placeholder** automatically by looking up `src/lib/blur-map.json`.
- After adding or replacing anything in `public/images`, run `npm run blur` to regenerate the map.
- Output formats are AVIF/WebP (`next.config.mjs`). Photos may use a `.png` filename while
  containing JPEG bytes — the optimizer reads by content, so this is intentional.

---

## Deployment & CI

- **Deploys** are handled by **Vercel's native Git integration** — no deploy YAML:
  - Push to `main` → builds and deploys to **Production**.
  - Open/update a PR → Vercel posts a **Preview** URL.
- **CI** (`.github/workflows/ci.yml`) runs on every push/PR to `main`: `npx tsc --noEmit` then
  `next build` on Linux (case-sensitive — catches import-casing bugs Windows hides). It does **not**
  deploy.
- See `docs/DEPLOYMENT.md` for the full deployment reference.

> ⚠️ `main` auto-deploys to production. Commit/push to `main` only when changes are ready to go live.

---

## Conventions

- TypeScript strict mode; keep `npx tsc --noEmit` clean.
- Match the surrounding code's style, naming, and comment density.
- Server Components by default; add `"use client"` only when interactivity/hooks require it.
- Keep marketing copy in `messages/*` (never hard-code user-facing strings in components).
- Additional design/engineering notes live in [`docs/`](./docs).
