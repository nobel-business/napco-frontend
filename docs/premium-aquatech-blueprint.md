# NAPCO Aqua — Premium Aquatech Enterprise

### Master Visual Direction & Design Blueprint · v1.0 (2026)

> **Status:** Creative direction document. Nothing here is implemented yet. This is the
> reference that governs all future UI refinement. It deliberately builds on the existing
> token system (navy/orange, Inter/Cairo, the radius/shadow/motion tokens in `globals.css`)
> so the direction is an **evolution**, not a rebuild.

---

## 0. The composition

| Layer | Weight | Role | Where it lives |
|---|---|---|---|
| **Maritime / Aquatech Blue** | 60% | The *identity* — water is the brand | Imagery, depth backgrounds, gradients, hero atmosphere, the cyan/marine palette |
| **Premium Enterprise SaaS** | 25% | The *system* — structure, hierarchy, restraint | Grid, type scale, navigation, cards, CTAs, motion discipline |
| **Gulf Premium** | 15% | The *strategy* — national-scale ambition & trust | Home/About/Vision-2030/investor moments only: bilingual gravitas, sand+bronze accents, cinematic pacing |

**One sentence:** *Deep water, engineered with precision, presented at national scale.*

The visitor must understand "aquaculture + serious infrastructure + premium" before reading a
word. We achieve identity through **water (atmosphere + imagery)**, credibility through
**enterprise structure**, and ambition through **selective Gulf gravitas** — never through
decoration.

---

## 1. Visual Philosophy

**Core philosophy — "Calm depth, engineered."**
Water is calm on the surface and immense underneath. The site mirrors that: serene, spacious,
confident surfaces; technical depth and precision the moment you look closer. Confidence is
shown by what we *remove*, not what we add.

**Brand personality:** Authoritative · Technical · Sustainable · Regional · Quietly premium.
(Never: playful, flashy, decorative, generic.)

**Emotional goals:** reassurance for capital, respect for engineering, optimism for food
security, pride in regional leadership.

**Perception timeline:**
- **First 5 seconds:** "This is a serious aquaculture/marine-infrastructure company — premium, real water, real scale." (Carried by the hero: deep-water imagery + one confident bilingual statement + a single orange action.)
- **First 30 seconds:** "They are organized and credible — I can see services, proof, and numbers, and it feels fast and modern." (Carried by enterprise structure: clear hierarchy, stat strips, calm cards, effortless nav.)
- **First 3 minutes:** "This is an investment-grade partner aligned with Vision 2030 — engineering depth, sustainable model, 30-year track record." (Carried by depth: methodology, RAS/IoT proof, case evidence, the Gulf/Vision-2030 narrative.)

---

## 2. Color System

We move from a 2-color brand (navy + orange) to a disciplined **3-role system**: **Navy =
structure/trust**, **Marine cyan = identity/water**, **Orange = the single action accent**.
Plus a restrained Gulf neutral/bronze used only in the 15% moments.

### 2.1 Primary — Engineered Navy (structure, trust, text)
Keep the current royal-navy ramp; it is the backbone.

| Token | Hex | Use |
|---|---|---|
| `navy-900` | `#000221` | Footer, deepest text, deep overlays (existing `--color-navy`) |
| `navy-800` | `#000341` | Headings on light, deep surfaces |
| `navy-700` | `#000562` | Gradient end-stops |
| `navy-600` | `#000682` | — |
| `navy-500` | `#0008A3` | Primary brand navy (existing `--color-primary-500` / `accent-card`) |
| `navy-300` | `#666BC8` | Muted brand, dark-mode text accents |
| `navy-100` | `#CCCEED` | Dark-mode body text, faint fills |

**Rule:** Navy carries text, structure, and "trust" surfaces (footer, deep CTAs, headings).
It is the *most-used* color but never decorative.

### 2.2 Marine / Aquatech — NEW identity layer (the 60%)
A cyan→teal "water" ramp that bridges royal navy to actual water. This is the new soul.

| Token | Hex | Use |
|---|---|---|
| `aqua-50` | `#E8F6FA` | Faint water tint sections, light surfaces |
| `aqua-100` | `#C7EAF3` | Light fills, hover tints |
| `aqua-200` | `#93D6E7` | Decorative water highlights |
| `aqua-300` | `#54BBD6` | Light-on-water accents, chart lines |
| `aqua-400` | `#1F9FC2` | **Marine accent** — "water light", links-on-dark, data viz, depth highlights |
| `aqua-500` | `#0E7F9F` | Marine mid, icon-tile blue evolution |
| `aqua-600` | `#0A6080` | Deep marine |
| `aqua-700` | `#084A63` | Depth surfaces |
| `aqua-800` | `#073A50` | Deep panels |
| `aqua-900` | `#06293A` | Abyss / hero-gradient base |

**Rule:** Marine is **atmospheric** — it lives in imagery, depth gradients, hero/overlay
moments, data-viz, and dark-mode surfaces. Use it for *identity*, not for buttons.

### 2.3 Accent — Buoy Orange (the single action color)
Keep `#ff782c`. Enterprise discipline: **orange means "act."** Nothing decorative is orange.

| Token | Hex | Use |
|---|---|---|
| `orange-400` | `#FF782C` | Primary CTA, active nav pill, key stat, the one highlight per view (existing `--color-brand`) |
| `orange-500` | `#CC6023` | Hover/pressed (existing `--color-brand-hover`) |
| `orange-300` | `#FF9356` | Gentle accents, gradient light-stop |

**Rule:** One orange element per viewport is the target; two is the maximum. Orange is the
"buoy" — it marks the one thing you should do next.

### 2.4 Gulf layer — Sand & Bronze (the 15%, strategic only)
Used **only** on Home hero, About, Vision-2030, and investor sections.

| Token | Hex | Use |
|---|---|---|
| `sand-50` | `#F4F0E8` | Warm neutral section background (About/Vision only) |
| `sand-100` | `#E9E1D2` | Subtle warm panels |
| `bronze-500` | `#C9A86A` | Hairline rules, stat underlines, "Vision 2030" kicker — thin & rare |

**Rule:** Bronze is a *line weight*, never a fill. If a section looks "luxurious," remove bronze
until it looks "credible."

### 2.5 Surfaces & neutrals
| Token | Light | Dark | Use |
|---|---|---|---|
| `background` | `#FFFFFF` | `#08161E` (deep-ocean base) | Page canvas |
| `surface` | `#FFFFFF` | `#0E2532` (deep-water panel) | Cards, panels |
| `surface-tint` | `rgba(15,127,158,0.03)` | `#0E2532` | Faint water-tint cards (evolve current navy-tint toward marine) |
| `muted` | `#F3F7F9` (cool foam) | `#0B1E29` | Alternating section bands |
| `border` | `#E1E7EA` (cool hairline) | `#1C3A48` | 1px structure |
| `foreground` | `#000221` | `#FFFFFF` | Text |
| `muted-foreground` | `#4A5B66` (cool gray) | `#9FB6C4` | Secondary text |

> **Evolution note:** today's neutrals are warm-gray (`#f5f5f5`, `#525252`) and dark is navy-gray
> (`#161c2b`). Shift neutrals **slightly cool** and dark **toward deep-ocean teal-navy** so even
> the gray feels like water. This is a ~5-point hue shift, not a recolor.

### 2.6 Accessibility
- Body text on light: navy-900 on white = ~17:1. Secondary `#4A5B66` ≥ 7:1.
- On dark deep-ocean (`#08161E`): white body, `aqua-300` for links (≥ 4.5:1), never aqua-600 text on dark.
- Orange is **never** body text; only on white/navy fills or as a large accent. Orange-on-white text fails AA — forbidden.
- Bronze never carries text — decorative line only.
- Every interactive state has a non-color cue (underline/ring/elevation) for color-blind users.

---

## 3. Gradient System

Gradients must read as **water depth or light on water** — directional and meaningful — never
as decoration. Replaces the ad-hoc gradients with 4 sanctioned tokens.

### 3.1 Allowed gradients
| Token | Definition | Where |
|---|---|---|
| `gradient-depth` | `linear-gradient(180deg, #021B33 0%, #06293A 60%, #073A50 100%)` | Hero photo overlays, deep section backgrounds — "looking into water" |
| `gradient-navy` (CTA) | `linear-gradient(-62deg, #0008A3 0%, #000562 100%)` | Navy buttons/chips (keep existing token) |
| `gradient-marine` | `linear-gradient(135deg, #0E7F9F 0%, #06293A 100%)` | Blue icon tiles, data panels, dark feature cards |
| `gradient-surface-light` | `linear-gradient(180deg, rgba(15,127,158,0.04), transparent)` | Very subtle top-light on light cards/sections (barely visible) |

**Hero overlay rule:** photography always sits under `gradient-depth` at **40–70% opacity** so
white text holds AA. Bottom is darker than top (text legibility).

### 3.2 Forbidden
- ❌ Orange gradients on large surfaces (orange is flat/solid only; gradient-orange is retired).
- ❌ Multi-hue / rainbow / vivid gradients.
- ❌ Glassmorphism blur stacks (one restrained frosted nav is the only exception).
- ❌ Gradients on small UI (inputs, badges, list rows).
- ❌ More than one gradient surface visible per viewport.

---

## 4. Typography System

Keep **Inter (Latin)** + **Cairo (Arabic)** — they are clean, modern, and already wired. The
upgrade is *discipline and bilingual parity*, not a new typeface. (Optional future: a single
higher-contrast display face for hero-only moments; not required.)

### 4.1 Principles
- **Arabic is equal, not secondary.** Cairo headings get the same scale, weight intent, and
  spacing budget as Inter. Never letter-space Arabic (breaks joins) — tracking rules are LTR-only.
- Trust comes from **hierarchy + restraint**: few sizes, big jumps, generous leading.

### 4.2 Scale (maps to existing tokens)
| Role | Token | Size / weight / LH | Notes |
|---|---|---|---|
| Display (Gulf hero) | `display-large` | 56 / 700 / 1.05 | Home + About hero only; uppercase optional |
| Display | `display-medium` | 48 / 700 / 1.1 | Big statements |
| Page hero H1 | `headline-large` | 36 / 600 / 1.15 | Inner-page heroes, orange or white |
| Section title H2 | `headline-small` | 28 / 600 / 1.3 | Uppercase, tracking -0.02em (LTR) |
| Card / feature title H3 | `title-medium` | 20 / 600 / 1.4 | **The single card-title size** |
| List-item label | `label-large` | 24 / 500 / 1.4 | Home service/solution rows (own tier) |
| Body (intro) | `body-large` | 20 / 400 / 1.6 | Lede paragraphs |
| Body | `body-medium` | 18 / 400 / 1.6 | Default |
| Body small / meta | `body-small` | 16 / 400 / 1.6 | Captions, meta, lists |
| Eyebrow / kicker | `label-small` | 16 / 500 / 1.4, uppercase, tracking +0.08em | "VISION 2030", section kickers |
| Statistic value | `display-small`–`headline-large` | 28–36 / 700 / 1.1 | Tabular numerals; the only place numbers go big |

### 4.3 How type signals trust
- **One H2 style everywhere** (uppercase, navy, tracked) = a recognizable rhythm = "designed by one team."
- **Big, calm stats** with tabular figures = "we measure outcomes."
- **Eyebrows** give every section a confident label = editorial authority.
- Max reading width 65–72ch for prose (articles), wider for marketing rows.

---

## 5. Image Direction

Imagery is **60% of the identity** — treat it as the hero of the brand, not filler.

**Subjects, in priority:** ① aerial/drone of cages & coastal farms on deep water · ② underwater /
water-surface texture · ③ RAS/indoor facilities & engineering · ④ people (operators, Saudi
teams, leadership) · ⑤ harvest/product. Always *real*, never stocky-generic.

**Color grade — "Deep Aqua":**
- Push toward **deep teal-navy** shadows, keep **clean cyan** mid-water, retain natural light highlights.
- Slightly desaturate non-water elements; let water and the orange buoys/markers carry color.
- Consistent cool grade across the whole library so every photo feels from one shoot.

**Cropping:**
- Heroes: wide cinematic (≈ 21:9 desktop, 4:5 mobile), horizon/water-line in the lower third.
- Cards: 16:10 (content) / 4:3 (gallery) / 16:9 (video) — one ratio per card type, never mixed in a grid.
- Always leave a calm "negative water" zone for text.

**Overlay treatment:**
- Hero: `gradient-depth` 40–70%, darker at the text edge; never a flat 50% gray.
- Cards: no overlay unless text sits on image (then a bottom navy scrim only).

**Contrast:** photography is rich and deep, never washed/pastel. If an image looks like generic
SaaS stock, it's wrong — it must look like *this* company's water.

---

## 6. Hero System

One family, page-specific intensity. All heroes share: deep-water image + `gradient-depth`
overlay + left-aligned (RTL: right-aligned) content + one bilingual statement + a single orange
accent bar + clear CTA hierarchy.

| Property | Rule |
|---|---|
| Height | Home: 88–92vh (cinematic). Inner pages: 56–64vh (560–760px). Never below 480px. |
| Layout | Content in lower-left third; eyebrow → H1 → one-line subtitle → CTAs → 24px orange accent bar |
| Image | Deep-aqua graded water; subject in the upper/right negative space |
| Overlay | `gradient-depth` 40–70%, heavier toward content |
| CTA | One primary (navy or orange) + one ghost-on-image; never 3+ |
| Stats | Optional thin stat strip pinned to hero base on Home/About (3 numbers max, tabular) |

**Family differentiation:**
- **Home** — full cinematic, Gulf-premium: display-large bilingual statement, depth video/photo, stat strip, slow ambient motion.
- **About** — tall, narrative, sand/bronze kicker ("VISION 2030"), leadership/national tone.
- **Services / Training** — mid-height, image hints at the discipline (RAS hall / facility), confident H1, single CTA.
- **Blog / Articles** — mid-height, calm water, editorial kicker; lets content lead.
- **Media** — mid-height, the strongest single hero image (gallery promise).
- **Career** — mid-height, people-on-water/team, warm, "join the mission."
- **Contact** — shorter (≈48vh), calm water, "Get in touch" — utility over drama.

---

## 7. Card Design Language

**One card system.** Surfaces are "panels surfacing from the water" — calm, single-elevation, never heavy.

| Property | Rule |
|---|---|
| Radius | **Content cards `16px` (2xl)** · large panels/forms `24px` (3xl) · icon tiles/controls `10px` (lg). No other radii. |
| Border | 1px `border` hairline on all resting cards (structure > shadow) |
| Background | `surface` (white / deep-water `#0E2532`); faint sections use `surface-tint` |
| Shadow (rest) | `shadow-card` = `0 4px 16px rgba(15,127,158,0.12)` — soft, low, single layer (evolve from purple toward marine) |
| Shadow (hover) | `shadow-card-hover` = `0 12px 28px rgba(8,40,60,0.18)` |
| Hover | translateY(-4px) + shadow-card→hover, 220ms `ease-out-soft`, pointer devices only |
| Elevation hierarchy | **0** flat info tiles → **1** content cards (shadow-card) → **2** featured/CTA cards (shadow-card-hover, gradient surface) → **3** modals/menus |

**Card types (all from the one system):**
- **Service / feature card:** icon tile (top-left) + title (`title-medium`) + desc; border + shadow-card.
- **Blog / article / video card:** image-top (one ratio) + kicker/badge + `title-medium` + meta; image zooms 1.05 on hover (500ms).
- **Stat card:** borderless, centered, gradient icon tile + big tabular number + label. Elevation 0.
- **CTA card:** `gradient-depth` or `gradient-marine` surface, white text, 24px radius, one orange button. Elevation 2.
- **Data/proof card:** marine-tinted, tabular metrics, optional mini chart — for Services/Solutions ROI proof.

**Never:** mixed radii in one grid, double borders, drop-shadow stacks, glass cards.

---

## 8. Navigation System

Premium = effortless and quiet.

- **Navbar:** fixed; transparent over hero (white text), transitions at 24px scroll to a frosted
  surface (`background`/80 + `backdrop-blur-xl` + 1px bottom border), 300ms. Logo swaps light↔dark.
- **Active state:** the current page is a filled **orange pill** (the single orange in the bar).
- **Hover:** link → `aqua-400` (marine) on dark hero / `navy-500` on light bar, 150ms color only; a 2px underline grows from start (LTR/RTL aware).
- **Focus:** visible `aqua-400` ring, 2px, offset.
- **Dropdowns (future, if added):** surface panel, 8px radius, shadow-card, 150ms fade+4px rise; never more than one level.
- **Mobile:** full-width sheet, `panel-in` fade-down, large tap targets, language + theme inline; closes on route change.
- **Language switcher:** navy gradient square chip with the translate glyph; instant locale swap (keeps next-intl router).
- **Theme switcher:** matching square chip, sun/moon; respects system on first load, remembers choice.

The bar should feel like it's "floating on the surface" — light, frosted, unobtrusive.

---

## 9. CTA System

Strict hierarchy — the user always knows the one next action.

| Tier | Style | Use |
|---|---|---|
| **Primary** | Solid `orange-400`, white text, 8px radius, `shadow-sm`, hover darken→`orange-500` + scale-0.98 active | The single key action (hero, section end) |
| **Navy** | `gradient-navy`, white text | Trust/secondary primary (Contact in nav, investor CTAs) |
| **Secondary** | Outline (1px `border`/brand), transparent, hover fill | Alongside a primary |
| **Ghost** | Text + arrow, no chrome, hover `aqua-400` | Inline/tertiary ("Read more →") |
| **Ghost-on-image** | White outline, hover white fill / navy text | On hero photography |

**Rules:** one Primary per section; never two oranges competing; shape is consistently 8px (pill
only for the floating action). Motion: 150ms, scale-0.98 press, no bounce. CTA cards (section-end)
use a `gradient-depth` panel with one Primary button — the "conversion surface."

---

## 10. Motion System

**"Buoyant precision"** — water-inspired ease, enterprise speed. Already scaffolded in tokens.

| Layer | Rule |
|---|---|
| Easing | `ease-out-soft` `cubic-bezier(.22,1,.36,1)` default; `ease-out-quint` for reveals |
| Durations | hover/press 150ms · UI/menus/routes 220ms · overlays 300ms · image zoom 500ms · scroll reveal 600ms |
| Smooth scroll | Lenis, `lerp 0.1` (responsive, not floaty), native touch, off under reduced-motion |
| Page transitions | View Transitions API cross-dissolve (220ms), navbar held continuous; prefetch on hover; first load not animated |
| Reveals | Sections opacity 0→1 + 22px rise, once, 600ms; above-the-fold shows instantly (LCP-safe) |
| Hover | Cards lift 4px; images zoom 1.05; links color-shift — all ≤220ms |
| Buttons | scale-0.98 press, 150ms |
| Ambient (Home hero only) | Very slow water/parallax drift, ≤8s loop, pauses on reduced-motion |

**Discipline:** motion clarifies, never entertains. Every animation is opacity/transform only
(GPU), respects `prefers-reduced-motion`, and is invisible-but-felt. No scroll-jacking, no
attention-seeking choreography.

---

## 11. Dark Mode Strategy

Dark mode is **"Deep Ocean / Control Room,"** not an inversion. It's arguably the *truest*
expression of the brand (you're underwater).

| Token | Value | Note |
|---|---|---|
| `background` | `#08161E` | Abyssal teal-navy, not gray |
| `surface` | `#0E2532` | Deep-water panel |
| `surface-2` | `#123040` | Elevated panel |
| `border` | `#1C3A48` | Cool hairline |
| `foreground` | `#FFFFFF` | — |
| `muted-foreground` | `#9FB6C4` | Cool secondary |
| Accent (links/data) | `aqua-300/400` | "Bioluminescent" highlights |
| Action | `orange-400` | Stays the one warm signal |
| Shadow | `0 4px 16px rgba(0,0,0,0.45)` | Neutral depth (bluish light-shadow reads wrong on dark) |

**Rules:** elevation via *lighter teal-navy surfaces* + subtle borders, not heavy shadows.
Gradients become `gradient-depth`/`gradient-marine` natively. Orange and aqua are the only warm/cool
"lights" in the dark — used sparingly so they glow. Country/market icons invert to white. Imagery
keeps the same deep-aqua grade (already at home in the dark).

---

## 12. Page-by-Page Application

For each page: what evolves, what stays, how the 60/25/15 lands, and its narrative job.

### Home — *"National-scale, on water."* (Gulf-premium peak)
- **Evolve:** cinematic 90vh depth hero with bilingual display statement + 3-stat strip; sections gain water-tint bands and the deep-aqua image grade; CTA banner → `gradient-depth` conversion surface; one orange per viewport.
- **Stays:** section order (hero → trusted → services → vision → solutions → values → markets → why → partners → CTA), grid, components.
- **Narrative:** establish scale, water identity, and Vision-2030 ambition in 5 seconds.

### About — *"Trusted national partner."* (Gulf-premium)
- **Evolve:** tall narrative hero with sand/bronze "VISION 2030" kicker; Vision/Mission as `gradient-depth`/marine cards; CEO and 30-year stats given editorial gravitas; subtle sand section background.
- **Stays:** structure, CEO block, standards, team, 2030 banner.
- **Narrative:** legacy + leadership + national alignment = trust.

### Services — *"Engineering depth."* (SaaS + marine)
- **Evolve:** service blocks gain spec/proof treatment (marine data cards, RAS/facility imagery, ROI/yield metrics); icon tiles → marine/orange system; one unified card.
- **Stays:** block structure, checklists, systems grid.
- **Narrative:** capability + evidence for the operator and de-risking for the investor.

### Training — *"Capacity building."* (SaaS)
- **Evolve:** track/program cards on the unified system; consistent rhythm; enrollment form as a `surface` panel; marine accents.
- **Stays:** tracks, programs (ServiceBlock), steps, dual-CTA, form.
- **Narrative:** we build the human capability behind the systems.

### Blog — *"Regional authority."* (Editorial within SaaS)
- **Evolve:** editorial kickers, calm water hero, stat band in marine; featured card refined; card titles unified.
- **Stays:** featured carousel, stats, systems grid.
- **Narrative:** thought leadership → SEO + credibility.

### Articles / Article — *"Knowledge."* (Editorial)
- **Evolve:** 65–72ch reading width, refined type rhythm, generic article-hero kept calm; share/related on the unified card system.
- **Stays:** filter/grid/pagination, article template, related.
- **Narrative:** depth of expertise, comfortably read.

### Media — *"Proof you can see."* (Marine peak)
- **Evolve:** strongest hero image; 3×2 gallery and 2×2 video cards on the unified system with the deep-aqua grade and refined hover.
- **Stays:** gallery + video structure.
- **Narrative:** show the real operations and scale.

### Career — *"Join the mission."* (SaaS + warmth)
- **Evolve:** people-on-water hero; testimonial, features, ambassador, gain cards unified; warm but premium.
- **Stays:** testimonial, features, ambassador, gain, application form.
- **Narrative:** mission + opportunity + Vision-2030 purpose.

### Contact — *"Effortless first step."* (SaaS utility)
- **Evolve:** shorter calm hero; form + info card balanced; map panel refined; one Primary.
- **Stays:** form, info card, map.
- **Narrative:** low-friction conversion.

**Cross-page constants (never drift):** navbar/footer, the one card system, the type scale, the
section rhythm, the CTA hierarchy, the deep-aqua image grade, the motion language.

---

## 13. Design System Tokens (future structure)

Naming convention: `--{category}-{role|scale}`. Semantic tokens reference primitives; components
reference semantics only (never raw hex).

```
COLOR (primitives)
  --navy-{900..100}        royal navy ramp (structure/trust)
  --aqua-{900..50}         marine/water ramp (identity)        [NEW]
  --orange-{500,400,300}   action accent
  --sand-{100,50} --bronze-500   Gulf layer (strategic only)   [NEW]
  --gray-{cool ramp}       cool neutrals

COLOR (semantic — flips light/dark)
  --background --surface --surface-2 --surface-tint
  --foreground --muted --muted-foreground
  --border --input --ring(=orange-400)
  --footer-bg --hero-overlay
  --text-link(=aqua-400 dark / navy-500 light)

GRADIENT
  --gradient-depth          hero/section depth
  --gradient-navy           navy CTA/chip
  --gradient-marine         blue tiles / data / dark cards
  --gradient-surface-light  subtle top-light
  (retired: gradient-orange, gradient-card-orange, stat-* — folded into the 4 above)

RADIUS    --radius-sm 6 · -md 8 · -lg 10(tiles/controls) · -xl 12 · -2xl 16(cards) · -3xl 24(panels/forms)
SHADOW    --shadow-card · --shadow-card-hover · (dark overrides) — single-layer, marine-tinted
TYPOGRAPHY  --text-{display|headline|title|label|body}-{large|medium|small}  (size/weight/line-height)
            --font-sans(Inter) · --font-arabic(Cairo) · --tracking-tight(-0.02em, LTR only)
MOTION    --motion-{fast150 · base220 · slow300 · image500 · reveal600}
          --ease-out-soft · --ease-out-quint
SPACING   8pt base; section rhythm --space-section(py-20 lg:py-28) · --space-section-tight(py-12 lg:py-16)
          container --container-content(1200) · --container-prose(72ch)
ELEVATION --elevation-{0,1,2,3}  (flat → card → featured → overlay)
```

**Migration from today:** today's tokens (navy ramp, orange, radius/shadow/motion, the 6 gradient
tokens) already exist; this blueprint **adds** the `aqua-*`, `sand/bronze`, `gradient-depth`,
cooler neutrals, deep-ocean dark surfaces, and consolidates gradients 6→4. Mostly additive.

---

## 14. Final Creative Direction

### Executive summary
NAPCO Aqua becomes **"Premium Aquatech Enterprise"**: water-defined identity (60%), enterprise
discipline (25%), Gulf gravitas (15%). The site reads instantly as serious aquaculture
infrastructure, feels as organized and fast as a top SaaS product, and carries national-scale,
Vision-2030 ambition for investors and governments. It is an **evolution of the current build** —
same brand colors and components, elevated with a marine palette, deep-aqua imagery, depth
gradients, a deep-ocean dark mode, unified cards/type/motion, and selective Gulf moments.

### Design principles
1. **Water is the identity.** Imagery and depth carry the brand; chrome stays quiet.
2. **Confidence through restraint.** Remove to impress; one accent, one action, big calm space.
3. **Structure earns trust.** One card, one type scale, one rhythm — "designed by one team."
4. **Proof over claims.** Numbers, systems, and real facilities, presented cleanly.
5. **Bilingual parity.** Arabic is first-class in scale, weight, and care.
6. **Motion is felt, not seen.** Premium, fast, water-eased, accessible.
7. **Gulf gravitas, sparingly.** Ambition in the few moments that matter; never luxury-cosplay.

### Visual guardrails
- One **Primary/orange action** per viewport (two max).
- One **gradient surface** visible per viewport; gradients only as water-depth/light.
- One **card radius per grid**; cards 16px, panels 24px, tiles 10px.
- One **H2 style** site-wide; one **card-title size** (`title-medium`).
- Section rhythm: `py-20 lg:py-28` (tight `py-12 lg:py-16`) — no ad-hoc spacing.
- Imagery always deep-aqua graded; hero text always on a depth overlay at AA contrast.
- Dark mode = deep-ocean surfaces + borders, not shadows or inversion.

### Things we must NEVER do
- ❌ Orange gradients, orange body text, or >2 oranges in view.
- ❌ Glassmorphism stacks, heavy/multi-layer shadows, exaggerated depth.
- ❌ Generic stock imagery or pastel/washed water.
- ❌ Decorative motion, scroll-jacking, bouncy/oversized animation.
- ❌ Bronze/gold as fills, or any "luxury" ornament that undercuts engineering credibility.
- ❌ Mixed radii/shadows/type sizes for the same component across pages.
- ❌ Letter-spacing Arabic; treating Arabic as a secondary afterthought.
- ❌ Redesigning layouts/structure — this is identity *evolution*, not a rebuild.

### Things we should EMPHASIZE
- ✅ Deep-water + drone imagery, beautifully graded and given room.
- ✅ Big, calm, tabular **statistics** (capacity, yield, jobs, years, food-security impact).
- ✅ Engineering & monitoring **proof** (RAS/IoT/data) on Services/Solutions.
- ✅ The **Vision-2030 / national food-security** narrative in the Gulf moments.
- ✅ Effortless navigation, fast transitions, and a deep-ocean dark mode that feels native.
- ✅ One coherent system — so every page feels like the same world-class company.

> **North star:** *"A world-class aquaculture technology and infrastructure company trusted by
> investors, operators, and governments across the Gulf."* Every pixel either serves that
> sentence or is removed.

---

*End of blueprint. Implementation is intentionally out of scope for this document — it is the
reference that future UI refinements must conform to.*
