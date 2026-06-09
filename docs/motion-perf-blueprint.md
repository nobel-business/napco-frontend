# NAPCO Aqua — Motion & Perceived-Performance Blueprint

### Premium Aquatech Enterprise · "Effortless, fluid, premium" · v1.0 (2026)

> **Status: STRATEGY ONLY — nothing implemented.** This audits the *current* motion &
> perceived-performance stack (grounded in the real code), names the root causes, and
> proposes a prioritized optimization plan. Goal: *the smoothest, most fluid, most premium
> experience possible without sacrificing performance, accessibility, or professionalism.*

**North star:** the site should feel like **one continuous product** (Linear/Stripe/Vercel),
not a set of pages that load. Every motion belongs to one language; nothing pops, stutters, or
hangs; content feels **already waiting** for the user.

---

## 0. What's already good (keep it)

The foundation is genuinely strong — this is tuning, not a rebuild.

- **Lenis** drives the real document scroll (`lerp: 0.1`, `syncTouch: false`) — responsive, not floaty; native momentum on touch. `smooth-scroll.tsx`.
- **Native View Transitions** with capture-phase link interception + a persistent `site-header` shared name, reduced-motion + no-API fallbacks. `view-transitions.tsx`, `globals.css:353`.
- **Hover-intent prefetch** on top of Next's in-viewport prefetch — covers off-screen links. `view-transitions.tsx:90`.
- **LCP-safe ScrollReveal** — above-fold sections never hidden; below-fold reveal once then unobserve. `scroll-reveal.tsx`.
- **A real motion-token system** (`--motion-fast/base/slow/image/reveal`, `--ease-out-soft/quint`) and the new icon-motion layer (Categories A/C/E/G) — already coherent and reduced-motion-guarded.
- **Route template** animates only on client navigations, never first paint (LCP-safe). `template.tsx`.
- AVIF/WebP enabled (`next.config.mjs`), build is clean (39/39).

The "mechanical / heavy / abrupt" feeling is **not** from a missing system — it's from a
handful of specific, fixable leaks. Below, each is a self-contained recommendation.

---

## CRITICAL — these cause the "heavy / janky / slow" feeling today

### C1. Global universal transition on every element (`body *`)
- **Current problem:** every element on every page carries `transition: background-color, border-color, color 0.2s` (`globals.css:255-261`). Any hover, focus, theme, or state change anywhere pays a transition; the style engine attaches transitions to *thousands* of nodes. This is the classic source of micro-stutter and a subtly "laggy/heavy" feel on color changes, and it fights with intentional component-level transitions.
- **Root cause:** a convenience rule meant for theme-switching color crossfade, scoped far too wide (universal selector).
- **Proposed solution:** remove the universal rule. Apply color transitions **only** where intended (links, buttons, inputs already have their own). For theme switching, do a **single deliberate crossfade** via `View Transitions` (see C2) or a short, scoped `.theme-fade` class on `:root`, not on `*`.
- **Technical approach:** delete the `body, body *` block; add `transition-colors` (Tailwind) to the specific interactive utilities that need it (most already have it). Verify hover/theme still read smoothly.
- **Performance impact:** **large win** — removes per-node transition bookkeeping; fewer style recalcs during scroll/hover; less main-thread work → smoother everything.
- **Accessibility:** unchanged (reduced-motion already zeroes durations globally at `globals.css:263`).
- **Priority:** **Critical.**

### C2. Theme switch is an instant hard swap
- **Current problem:** `disableTransitionOnChange` is on (`layout.tsx:86`) — correct, since C1's universal transition would otherwise smear colors badly — but the result is theme toggle = an **abrupt** light↔dark flip across the whole page. Premium products crossfade.
- **Root cause:** C1 forces an all-or-nothing choice; with the universal transition removed, a controlled crossfade becomes possible.
- **Proposed solution:** wrap `setTheme()` in `document.startViewTransition()` so the browser snapshots and cross-dissolves the entire theme change in ~220–300ms. One clean dissolve, no per-element smear.
- **Technical approach:** in `theme-toggle.tsx`, `if (document.startViewTransition && !reducedMotion) document.startViewTransition(() => setTheme(next)); else setTheme(next);`. Add a `::view-transition-old/new(root)` rule (already exists) — optionally a dedicated longer duration for theme.
- **Performance impact:** negligible (one snapshot, GPU-composited).
- **Accessibility:** guard on reduced-motion → instant swap. Keep `disableTransitionOnChange`.
- **Priority:** **Critical** (pairs with C1; together they fix the single most-felt interaction).

### C3. Images served at up to ~6× needed size (missing `sizes`)
- **Current problem:** nearly every `<Image fill>` has **no `sizes`** prop — hero (`page-hero.tsx:36`), article hero (`articles/[slug]:58`), all card thumbnails (blog, services `ServiceBlock`, about, media, video-card), team/intro images. Without `sizes`, Next assumes `100vw` and serves a ~1920px source into a 288–400px slot. This is the **biggest perceived-performance leak**: slow image paint, wasted bandwidth, late LCP, "pop-in."
- **Root cause:** `fill` images need an explicit `sizes` to pick a sensible candidate from the srcset; it was omitted.
- **Proposed solution:** add accurate `sizes` to every `fill`/responsive image, matching its real layout (e.g. cards `"(min-width:1024px) 360px, (min-width:640px) 50vw, 100vw"`; hero `"100vw"`; sidebar images their column width).
- **Technical approach:** audit each `<Image>`; add `sizes`. Optionally centralize common ones as constants. Re-build and confirm smaller transferred sizes in the network panel.
- **Performance impact:** **very large** — typically 50–80% smaller image bytes on card grids; faster LCP and far less pop-in.
- **Accessibility:** none.
- **Priority:** **Critical.**

### C4. No blur-up / placeholder — images pop in on a white (or dark) box
- **Current problem:** no `placeholder="blur"` anywhere. With string `src` from `/public`, Next can't auto-generate a blur, so every image hard-cuts from empty → loaded. On card grids and heroes this reads as "loading," the opposite of "already waiting."
- **Root cause:** images use runtime string paths, not static imports (which would give automatic blur).
- **Proposed solution:** progressive **blur-up**. Two options: (a) convert key images to **static imports** (hero, above-fold cards) → Next generates `blurDataURL` automatically; or (b) generate tiny base64 LQIPs at build time for `/public` images and pass `placeholder="blur" blurDataURL={...}`.
- **Technical approach:** start with heroes + first-screen card images (highest impact). A small build script (e.g. `plaiceholder`/`sharp`) can emit a `blur-map.json` keyed by path; a thin `<AquaImage>` wrapper injects `sizes` (C3) + blur from the map. This also becomes the single image component going forward.
- **Performance impact:** neutral-to-positive on bytes; **large** perceived-speed win (no empty boxes).
- **Accessibility:** none (decorative blur).
- **Priority:** **Critical** (heroes + first viewport) / High (below-fold).

### C5. Hero `<video>` competes with LCP and isn't connection-aware
- **Current problem:** the homepage hero is an autoplay `loop muted` `<video>` (`page.tsx:39`) with a poster, but **no `preload` control** and no save-data/connection gating. The browser may begin fetching the MP4 immediately, competing with the LCP hero text/poster and the first card images on slow links. `will-change: transform` on `.hero-drift` is also permanent (memory pressure).
- **Root cause:** video tuned for looks, not for loading priority.
- **Proposed solution:** set `preload="none"` (or `"metadata"`) and start playback on first idle / when in view; keep the poster as the instant LCP image. Respect `prefers-reduced-motion` (already pauses drift) and optionally `navigator.connection.saveData`/`effectiveType` to skip the video on 2G/data-saver (poster only). Drop `will-change` to a transient or remove (the 22s transform is cheap).
- **Technical approach:** small client effect: `requestIdleCallback` → set `video.src`/`.play()`; IntersectionObserver to pause when off-screen. Poster stays as the painted frame.
- **Performance impact:** **large** on first load / slow networks; smoother LCP.
- **Accessibility:** poster + reduced-motion already covered; add data-saver respect.
- **Priority:** **Critical** (homepage LCP).

---

## HIGH IMPACT — fluidity, continuity, and "never a hard jump"

### H1. In-page anchor scrolling bypasses Lenis (`#enroll`, `#apply`)
- **Current problem:** CTA buttons jump to `#enroll` (training) / `#apply` (career). `view-transitions.tsx:61` intentionally lets same-path hash navigation "fall through to the browser/smooth-scroll" — but **Lenis is not wired to hash clicks**, and Lenis sets `scroll-behavior:auto` (`globals.css:340`), so the anchor jump is either **instant (no smoothing)** or fights Lenis's RAF. Result: a hard jump in the middle of an otherwise smooth experience.
- **Root cause:** anchor navigation never routed through `lenis.scrollTo(target)`.
- **Proposed solution:** intercept same-page hash links and call `lenis.scrollTo(targetEl, { offset: -<navbar height>, duration })`. Honor `scroll-mt-24` via offset.
- **Technical approach:** expose the Lenis instance (context or a module singleton) and add a delegated hash-click handler; reduced-motion → `scrollIntoView({behavior:'auto'})`.
- **Performance impact:** negligible; large *felt* continuity win.
- **Accessibility:** preserve focus target (`:target`/programmatic focus) so keyboard users land correctly.
- **Priority:** **High.**

### H2. No route-loading feedback → up to 700ms of frozen page on a cold/un-prefetched link
- **Current problem:** the View Transition holds the old page's snapshot until the new route commits, with a **700ms failsafe** (`view-transitions.tsx:72`). Prefetch makes most navigations instant, but a cold/slow route (or the data-heavy `/articles`, 36.9 kB) can leave a **frozen, unresponsive snapshot** that reads as a hang — the opposite of "responsive."
- **Root cause:** no Suspense/`loading.tsx`, no top-progress affordance; the transition has nothing to show while waiting.
- **Proposed solution:** (a) add a **subtle top progress bar / shimmer** that appears only if a navigation exceeds ~150ms (so fast nav shows nothing); (b) add `loading.tsx` skeletons for the heavier routes (articles list, article detail) so streamed content has an instant placeholder.
- **Technical approach:** a tiny nav-pending indicator driven by the same click handler (start) + pathname effect (stop); App-Router `loading.tsx` with skeleton cards reusing the real card shells.
- **Performance impact:** neutral; **large** perceived-responsiveness win on the worst case.
- **Accessibility:** `aria-busy`/polite live region for the progress; skeletons are `aria-hidden`.
- **Priority:** **High.**

### H3. ScrollReveal is uniform and slightly "templated"
- **Current problem:** every `main section` reveals with the identical `opacity + translateY(22px)` over 600ms (`scroll-reveal.tsx`, `globals.css:418`). It's coherent (good) but reads as "section… section… section" — no sense of content *composing*. Also `.reveal-init` keeps `will-change: opacity, transform` **forever** (never cleared post-reveal) → lingering memory/compositing.
- **Root cause:** one-size reveal; will-change not released after the one-time animation.
- **Proposed solution:** (a) add an opt-in **child stagger** for grids (cards rise ~60–80ms apart) so a section *assembles* rather than slides as a slab — this is the same hook the deferred Cat H/B/D reveal motions need, so it doubles as that pass; (b) **remove `will-change`** on the `reveal-in` end state (after transition). Keep the distance small (16–22px) and fast.
- **Technical approach:** extend the observer to add `reveal-in` to the section and stagger `[data-reveal-child]` via `transition-delay: calc(var(--i) * 70ms)`; clear `will-change` on `transitionend`.
- **Performance impact:** positive (drops persistent will-change); negligible cost for stagger.
- **Accessibility:** reduced-motion already disables reveals entirely.
- **Priority:** **High** (also unlocks the deferred reveal-motion categories).

### H4. No shared-element transitions (cards/heroes don't "carry over")
- **Current problem:** View Transitions name only `root` + `site-header` (`globals.css:353`). Navigating an article card → article page is a **global cross-dissolve**; the card's image doesn't morph into the hero. That's the difference between "page loaded" and "I moved *into* this item."
- **Root cause:** no per-element `view-transition-name` on the shared image/title.
- **Proposed solution:** assign a **shared `view-transition-name`** (e.g. `article-hero-<slug>`) to the card thumbnail and the destination hero image so the browser animates the morph. Apply selectively (article cards → article hero; optionally service/feature tiles where a detail view exists).
- **Technical approach:** set the name on the source element just-in-time on click (to avoid duplicate-name conflicts when many cards are on screen) and statically on the destination. Cap to the clicked element.
- **Performance impact:** GPU-composited; negligible.
- **Accessibility:** reduced-motion → falls back to the existing dissolve.
- **Priority:** **High** (single biggest "continuous product" upgrade) — but sequence **after** C1/C2 so the VT layer is clean.

### H5. Navbar scroll-state + logo swap can "pop"
- **Current problem:** crossing `scrollY > 24` flips the header from transparent/white-text to solid/blur + swaps the **logo image** (`navbar.tsx:46`, `Logo variant`). The color crossfade is fine, but the logo is a different file → a possible flash/pop, and the threshold is a hard binary at 24px.
- **Root cause:** binary state + image swap rather than a continuous treatment.
- **Proposed solution:** preload both logo variants (or use one SVG that recolors via `currentColor`); add a small hysteresis/transition so the swap cross-fades. Consider a slightly higher threshold (e.g. 32–48px) to avoid flicker on tiny scrolls.
- **Technical approach:** stack both logos and crossfade opacity on `scrolled`, or switch Logo to an inline SVG tinted by `text-*`. 
- **Performance impact:** negligible.
- **Accessibility:** none.
- **Priority:** **High** (it's on every page, every scroll).

### H6. Per-locale font loading + swap-induced CLS
- **Current problem:** both `Inter` and `Cairo` (with `arabic`+`latin`) load on **every** page regardless of locale (`layout.tsx:17-27`), and both use `display: "swap"` → a FOUT and a small reflow when the web font arrives. EN visitors download Cairo's Arabic glyphs they never see.
- **Root cause:** fonts declared globally, not per-locale; `swap` chosen over `optional`.
- **Proposed solution:** (a) load Cairo's `arabic` subset only for `ar` (or split: Inter for `en`, Cairo for `ar`); (b) consider `display: "optional"` (no swap reflow; uses fallback if the font isn't ready in ~100ms) or rely on next/font's automatic `size-adjust` fallback metrics (already reduces CLS) and tune the fallback stack. Measure CLS before/after.
- **Technical approach:** conditionally apply the font `variable` class by locale; keep `--font-arabic` only where needed.
- **Performance impact:** fewer font bytes for EN; lower CLS.
- **Accessibility:** ensure fallback remains legible; don't hide text (no FOIT beyond `optional`'s 100ms block).
- **Priority:** **High.**

---

## NICE TO HAVE — final 5% polish

### N1. Predictive prefetch on the primary CTA path
Warm `/contact`, `/services` (the main funnel) on idle after first paint, beyond hover/viewport, so the funnel is always instant. `requestIdleCallback` + `router.prefetch`. **Nice to have.**

### N2. Momentum continuity into route changes
Today route change resets scroll to top *instantly* (`smooth-scroll.tsx:49`). For "moving through one product," consider a very short scroll-settle or letting the View Transition mask the reset (it largely does). Low risk, small gain. **Nice to have.**

### N3. Pause the partners marquee when off-screen / on hover
The infinite `marquee` keyframe (`globals.css:318`) runs continuously (transform-based, cheap, but always compositing). Pause via IntersectionObserver when out of view and on hover for control. **Nice to have.**

### N4. Button/CTA press micro-feedback consistency
`active:scale-[0.98]` exists on the navy button; audit that **all** buttons/links share one press-settle (the Cat-C "Settle" primitive) so every tap feels identical. **Nice to have.**

### N5. Count-up on hero/blog statistics (Category B)
The hero stat strip and blog stats are static. A one-time, in-view **count-up** (reduced-motion → final value) adds "alive" proof. Belongs with the deferred reveal pass (H3 hook). **Nice to have.**

### N6. Release `will-change` globally & add `content-visibility`
Beyond H3, audit lingering `will-change` (`.hero-drift`, `.reveal-init`). Consider `content-visibility: auto` on long below-fold sections to cut rendering cost on first paint. Measure. **Nice to have.**

---

## Cross-cutting principles (apply to every change)

- **One motion language:** all durations/easings come from the existing tokens — `--motion-fast` (press/glide), `--motion-base` (hover/transition), `--motion-slow` (tilt/theme), `--motion-reveal` (in-view). No new ad-hoc timings.
- **Weighted, never bouncy:** `ease-out-soft`/`ease-out-quint` only. No spring/overshoot (consistent with the icon-motion avoid-list).
- **GPU-only:** transform/opacity/filter; never animate layout properties.
- **Reduced-motion is first-class:** every item degrades to instant/color-only; the global `prefers-reduced-motion` block (`globals.css:263`) is the backstop.
- **Measure, don't guess:** capture Lighthouse + a WebPageTest/Network trace **before** and **after** each Critical item (LCP, CLS, INP, transferred image bytes).

---

## Implementation priority (recommended sequence)

| Order | Item | Class | Why first |
|---|---|---|---|
| 1 | **C1** remove universal transition | Critical | Unblocks C2; biggest main-thread/jank win |
| 2 | **C2** theme crossfade via VT | Critical | Most-felt interaction; depends on C1 |
| 3 | **C3** add `sizes` to all images | Critical | Largest perceived-perf/bytes win, low risk |
| 4 | **C4** blur-up (heroes + first screen) | Critical | Kills pop-in; pairs with C3 in one image wrapper |
| 5 | **C5** hero video preload/connection-aware | Critical | Homepage LCP |
| 6 | **H6** per-locale fonts + display tuning | High | CLS + bytes; isolated |
| 7 | **H1** Lenis anchor scrolling | High | Removes a hard jump |
| 8 | **H2** route-loading feedback + skeletons | High | Fixes worst-case "hang" |
| 9 | **H3** reveal stagger + drop will-change | High | Unlocks deferred Cat H/B/D reveal motions |
| 10 | **H5** navbar logo crossfade | High | Every page, every scroll |
| 11 | **H4** shared-element transitions | High | Biggest "continuous product" upgrade; needs clean VT layer (after C1/C2) |
| 12 | **N1–N6** | Nice to have | Final polish, measure-driven |

**Suggested grouping into shippable phases:**
- **Phase A (perceived speed):** C3 + C4 + C5 + H6 — image/video/font loading. Mostly invisible-risk, huge felt speed.
- **Phase B (interaction smoothness):** C1 + C2 + H1 + H5 + N4 — the "heavy/abrupt" fixes.
- **Phase C (continuity):** H2 + H3 + H4 + N5 — the "one continuous product" layer (+ the deferred reveal-motion categories fold in here).
- **Phase D (polish):** N1–N3, N6 — measure-driven.

Each phase is independently shippable and independently verifiable (build + Lighthouse + 4-variant visual). Recommend doing them in order, A→D, with a measurement checkpoint between.

---

*Awaiting approval of scope/sequence before implementing. On approval, I'll start with one phase
at a time (default: Phase A), report metrics before/after, and hold between phases.*
