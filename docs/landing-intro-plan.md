# NAPCO Aqua — "Sonar" Landing Intro · Integration Plan

### Source: `project-files/napco-landing-page` · **PLAN — nothing built yet**

---

## 1. What it is

A **cinematic ~10-second brand intro** ("Sonar acquisition"), built in Cloud Design as a
standalone React-via-Babel artifact (`landing.html` + `scene.jsx` + `animations.jsx`):

1. **Deep-ocean atmosphere** — radial abyss gradient, volumetric light rays, drifting caustic
   blobs, vignette, rising marine-snow particles. (Ambient, wall-clock loops.)
2. **Sonar sweep** — concentric pings + a rotating glowing wedge + range graticule, centred on
   the fish, with a HUD reticle: *"Sonar · acquiring target" → "Target acquired."*
3. **The brand fish is "painted into being"** — a scan beam wipes the fish from a blueprint
   wireframe into a crisp white fill, then an eye-ping, a light sheen, and the **orange buoy**
   marker fire.
4. **Wordmark scan-wipes in** left→right (`napco-word.svg` + "AQUA").
5. **End caption** — orange accent bar + eyebrow *"Aquaculture · Engineering · Operations"* + an
   **"Enter" cue** (down-chevron). End-state stays alive (ambient sonar ping + lockup drift).

**It is already on-brand:** the palette is *exactly* the site's Aquatech tokens (`--abyss/-aqua-*`,
`--orange #ff782c`), and the fish/wordmark match our logo. The **"Enter" cue signals its intent: a
splash you pass *through* into the site.**

**Tech reality:** pure **React + SVG + CSS** — *no* three.js/canvas/WebGL, **no new dependencies**
(the landing's package.json == ours). The only bespoke part is a small timeline runtime
(`Stage`/`useTime`/`interpolate`/`animate`/`Easing`) we'll port to TS. It loads React+Babel from a
CDN in the artifact — that gets replaced by our normal Next build.

> Note: the folder also mirrors the *entire* current frontend (app/, components/, …). That's just a
> snapshot — we take **only** the landing artifacts (`scene.jsx`, `animations.jsx`, `napco-word.svg`)
> and ignore the duplicated app so we never overwrite live code.

---

## 2. Recommended integration — **first-visit intro overlay → "Enter" → Home**

A full-screen **`<SonarIntro>` overlay** that plays on the first visit of a session, then dissolves
(via the View Transitions layer we already have) to reveal the **existing** homepage underneath.

- **Once per session** (sessionStorage `napco-intro-seen`) — repeat navigation is never gated.
- **Always skippable** — click / scroll / Esc / Enter dismisses it at any time; the "Enter" cue is
  the explicit affordance at the end of the timeline.
- **Reduced-motion → bypassed entirely** (no intro; straight to the site).
- **The homepage is untouched** — its video hero + stat strip stay; the intro sits *in front* and
  removes itself. SSR still ships the homepage HTML (SEO/crawlers unaffected — the overlay is
  client-only).
- **LCP-safe** — the intro is lightweight (SVG+CSS, no big images); the homepage hydrates behind it;
  body scroll is locked only while the intro is up.

This matches the artifact's designed intent (the "Enter" gate), adds the "wow," and changes nothing
about the pages we've already built.

### Alternatives (your call — see §6)
- **B · Homepage hero replacement** — the sonar reveal *becomes* the home hero (plays, then settles
  to the lockup as the hero), site scrolls below. Most "integrated," but replaces the approved
  video hero + stat strip.
- **C · Dedicated `/welcome` (or `/intro`) route** — cleanest separation, but adds a route and an
  extra hop; weakest "part of the site" feel.

---

## 3. Technical port (Recommended path)

1. **Runtime → TS** (`lib/sonar-timeline.ts`): port `Easing`, `clamp`, `interpolate`, `animate`,
   and a `useTime()` hook driven by `requestAnimationFrame` (0 → 10s, then hold the end-state;
   ambient loops are CSS). Drop the dev scrubber/keyboard-scrub `Stage` controls — keep only a tiny
   `Stage` that fits the 1600×900 canvas to the viewport (letterboxed by the ocean bg) and exposes
   the clock via context.
2. **Scene → client component** (`components/sections/sonar-intro.tsx`, `"use client"`): port
   DeepOcean / Particles / Sonar / Reticle / Lockup / Caption to TS + JSX. Keep the SVG vector fish
   (the `PARTS` paths) and masks verbatim. Replace hardcoded hex with the site CSS vars where they
   already match (they do).
3. **CSS** → move the keyframes (`rayShift`, `drift1-3`, `rise`, `ambientPing`, `lockDrift`, `blink`,
   `enterBob`) into `globals.css` under a scoped prefix (e.g. `.sonar …`) so they don't leak.
   Reduced-motion already disables ambient loops in the source — preserve that.
4. **Assets** → copy `napco-word.svg` → `public/images/`. Fish = inline SVG (no raster). AQUA = text.
5. **Fonts** → Inter is already loaded. The HUD uses **JetBrains Mono** — add it via `next/font`
   (tiny subset, mono) *or* fall back to the system mono stack to avoid another fetch (recommend the
   `next/font` add for fidelity; it's small).
6. **Gate component** (`components/providers/intro-gate.tsx`, client): on mount, check
   reduced-motion + sessionStorage; if first visit, render `<SonarIntro onEnter={dismiss}/>` over the
   page, lock body scroll, manage focus, and wire skip (pointer/scroll/keydown). On dismiss → fade
   out (opacity/VT) + set the flag + unlock scroll. Mount it in `app/[locale]/page.tsx` (home only),
   not the global layout.
7. **Responsive** — the `Stage` scales the canvas to fit; verify the lockup + caption read on mobile
   (scale down, keep centred). Tap anywhere = enter on touch.

---

## 4. Consistency, performance & accessibility safeguards

- **Tokens, not hex** — reuse `--aqua/-abyss/-orange`, `--ease-out-*`, motion tokens; the intro
  becomes part of the same design system, not a one-off.
- **Motion language** — the ambient loops are wall-clock and *gated to the intro only* (consistent
  with our "one ambient loop" rule, scoped to this experience and dismissed quickly).
- **Reduced-motion** — full bypass (no intro). **Keyboard** — Enter/Esc/Space dismiss; focus moves
  into the page on dismiss. **Touch** — tap to enter; auto-revealed "Enter" cue.
- **Perf** — no new deps; SVG/CSS only; homepage SSR/hydration unaffected; first-visit-only;
  `prefers-reduced-data`/slow-network → could auto-skip (optional).
- **No layout/site changes** — pages, nav, content all stay; this is additive.

---

## 5. Effort, risk, verification

- **Effort:** moderate — porting two ~16–21 KB files to TS components + a small runtime + CSS +
  the gate. ~1 focused implementation pass.
- **Risk:** low–medium. Main care points: the SVG masks/clip timeline (port faithfully), the
  RAF clock + reduced-motion, and not regressing homepage LCP. All build-verifiable.
- **Verify:** `tsc` + `next build` (expect 39/39); play the intro in EN/AR + light/dark; confirm
  skip/Enter/reduced-motion paths; confirm homepage renders normally after dismiss and on repeat
  visits (no intro). Commit behind the gate so it's trivially revertible.

---

## 6. Decisions before building
1. **Placement:** A) first-visit intro overlay → Enter → Home *(recommended)*, B) replace the
   homepage hero, or C) dedicated `/welcome` route?
2. **Gating frequency:** once per **session** *(recommended)*, once **ever** (localStorage), or
   **every** visit to `/`?
3. **HUD mono font:** add **JetBrains Mono** via `next/font` *(recommended, faithful)* or use the
   system monospace fallback (zero extra fetch)?
4. **Auto-advance:** auto-dissolve a beat after the timeline ends, or **wait for the user** to click
   "Enter"/skip *(recommended — user controls entry)*?
