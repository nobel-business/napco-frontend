# NAPCO Aqua — Icon Motion System

### Premium Aquatech Enterprise · Motion Language for Icons · v1.0 (2026)

> **Status:** Motion-language specification. **Nothing is implemented.** This defines how
> every icon behaves, so we apply *purposeful, category-specific* motion — never one generic
> animation everywhere. Built on the existing motion tokens in `globals.css`
> (`--motion-fast/base/slow/image/reveal`, `--ease-out-soft`, `--ease-out-quint`).

---

## 1. Philosophy — "Light and life, just under the surface"

Icons behave like small objects in water: they **rise toward the surface**, **catch light**,
and **send a single ripple** when touched — calm, weighted, never springy. Motion is a
*reward for intent* (hover/press/focus) or a *one-time confirmation* (reveal/success), never
ambient loops competing for attention.

**Three rules that govern everything:**
1. **Purpose over decoration** — every animation answers "what just happened / what can I do?"
2. **One event, one response** — no repeating/looping icon motion (the Home hero water-drift is the *only* ambient loop on the site).
3. **Weighted, not bouncy** — water has mass: ease-out settles, it never overshoots/springs.

---

## 2. The water-motion primitive library

All category motions are composed from these 7 primitives (CSS `transform`/`opacity`/`filter` only — GPU-safe):

| Primitive | Motion | Meaning | Default |
|---|---|---|---|
| **Surface-rise** | `translateY(-2px)` | rising to the surface | 220ms ease-out-soft |
| **Depth-near** | `scale(1.04)` + slight `brightness(1.06)` | moving closer through water | 220ms ease-out-soft |
| **Micro-tilt** | `rotate(≤2.5deg)` | buoyant drift | 300ms ease-out-soft |
| **Sheen** | a soft light highlight sweeps once across the tile | light on water | 500ms ease-out-quint |
| **Ripple** | one soft ring expands + fades from the icon | a drop touching water | 500ms ease-out-quint, **once** |
| **Glide** | `translateX(±2–3px)` in the reading direction (RTL-aware) | current/flow | 200ms ease-out-soft |
| **Settle (press)** | `scale(0.95)` then release | pressing into water | 150ms ease-out-soft |

**Tokens** (reuse; one addition proposed): `--motion-fast 150` (press/glide) · `--motion-base 220`
(hover) · `--motion-slow 300` (tilt/morph) · `--motion-reveal 600` (in-view) · **propose
`--motion-ripple: 500ms`** for ripple/sheen/draw. Easing: `--ease-out-soft` for interaction,
`--ease-out-quint` for reveal/ripple. **No spring/back easing anywhere.**

---

## 3. Categories & motion specs

Nine categories, each with a *distinct* motion. (8 required dimensions per category.)

### A. Feature / Service icons — the IconTile (the leaf in your shots) ★ centerpiece
*Where:* Home services/solutions/values/why · About intro/standards/team · Services systems · Training tracks · Career gain.
- **Behavior:** on parent-card hover, the tile does **Depth-near (scale 1.04)** + a single **Sheen** sweep across the gradient, and the glyph does **Surface-rise (-1.5px)** + brightens. A whisper of **Micro-tilt (≤2°)** — *not* the 45° diamond flip from the reference (rejected: too cartoon/spin).
- **Trigger:** `group-hover` of the card (coordinated with the card's existing `hover-lift`).
- **Duration:** scale/rise 220ms · sheen 500ms.
- **Easing:** ease-out-soft (transform), ease-out-quint (sheen).
- **Hover:** as above — tile surfaces, light passes, glyph lifts.
- **Focus:** if the card is a link, `:focus-visible` → same tile response + aqua focus ring on the **card** (not the tile).
- **Mobile:** no hover; on first scroll-in, a one-time 220ms settle as the section reveals. No looping.
- **Reduced-motion:** no transform/sheen; optional 1-step brightness only. Glyph static.

```
rest         hover (220–500ms)
┌────┐        ┌────┐  · tile lifts toward you (scale 1.04)
│ 🌿 │   →    │ 🌿̭│  · faint light sweeps  ╱  across the gradient
└────┘        └────┘  · glyph drifts up 1.5px, brightens
              (≤2° tilt — barely perceptible, NOT a flip)
```

### B. Statistics icons — StatTile (Blog stats; hero stat strip)
*Where:* Blog stat tiles · Home hero stat strip (numbers).
- **Behavior:** on scroll-into-view, the tile **Surface-rises + fades in** with its number; one soft **Ripple** emits from the glyph (a "measured drop"). Numbers may **count-up** (optional, 600ms). Stats are proof → composed, *no* hover transform.
- **Trigger:** in-view, **once** (hook the existing `ScrollReveal` observer).
- **Duration:** reveal 600ms · ripple 500ms · count-up 600ms.
- **Easing:** ease-out-quint.
- **Hover:** none / faint glyph brighten only (stats stay calm; tiles are flat per the card rule).
- **Focus:** n/a (not interactive).
- **Mobile:** reveal + ripple play once on scroll; no hover.
- **Reduced-motion:** appear instantly — no ripple, no count-up (show final number).

### C. Navigation & control icons
*Where:* navbar theme toggle (Sun/Moon), language (TranslateIcon), mobile Menu↔X, carousel & pagination chevrons, back-to-top arrow.
- **Behavior:**
  - **Theme toggle:** cross-fade Sun↔Moon with a gentle **30° arc + fade** (not a full spin).
  - **Language:** soft **cross-fade** through (no cartoon flip).
  - **Menu↔X:** quick morph/cross-rotate, 220ms.
  - **Chevrons / arrows:** **Glide** in pointing direction on hover (RTL-aware ±2–3px); **Settle** on press; back-to-top arrow glides up 2px.
- **Trigger:** hover / press / state-change.
- **Duration:** 150–220ms (300ms for the theme arc).
- **Easing:** ease-out-soft.
- **Hover:** directional glide + color → aqua (on dark) / brand (on light).
- **Focus:** visible aqua focus ring (links already global; buttons get the ring).
- **Mobile:** tap = Settle + state change; no hover glide. Menu morph intact.
- **Reduced-motion:** instant icon swap (theme/menu/lang); no glide; keep the color change.

### D. CTA / button icons
*Where:* trailing arrows in text/ghost buttons ("Read more →"), Training dual-CTA chip, number badges (Services "why", Training steps, Article implementation).
- **Behavior:** button arrow **Glides forward** (RTL-aware) on hover; the CTA-chip icon does **Depth-near** on card hover. **Number badges** do a **staggered Surface-rise** on scroll-in ("steps surfacing"), no hover motion.
- **Trigger:** button hover (arrows) · card hover (chip) · in-view stagger (badges).
- **Duration:** glide 200ms · stagger 400–600ms (≈80ms apart).
- **Easing:** ease-out-soft (glide) · ease-out-quint (stagger).
- **Hover:** arrow glides ~3px in read direction; press inherits the button's `scale-0.98`.
- **Focus:** the button's focus ring (icon doesn't animate on focus alone).
- **Mobile:** no hover glide; press settle; badges still stagger-reveal once.
- **Reduced-motion:** no glide/stagger; icons static, buttons keep their state colors.

### E. Social icons
*Where:* footer (Facebook/LinkedIn/Twitter/Instagram, plain) · About CEO navy chips · Article share gradient buttons · floating WhatsApp.
- **Behavior:** **Soft elevation + glow** — on hover the glyph brightens to brand/aqua, scales `1.08`, and (for chips/share buttons) the chip does **Surface-rise (-2px)**. WhatsApp float keeps its gentle `scale(1.05)`. No spin.
- **Trigger:** hover / focus.
- **Duration:** 150–200ms.
- **Easing:** ease-out-soft.
- **Hover:** glyph scale 1.08 + color shift; chip rise where applicable.
- **Focus:** aqua focus ring; same color shift.
- **Mobile:** tap = brief Settle; no hover. Floating WhatsApp static (visible, not looping).
- **Reduced-motion:** color shift only — no scale/glow/rise.

### F. Form icons
*Where:* CV **Upload**, success **CheckCircle2**, **Select** chevron, Contact info-row tiles (Mail/Phone/Clock).
- **Behavior:**
  - **Upload:** on hover/drag-over, arrow **Surface-rises (-2px) + glow**; dashed border → aqua.
  - **Success check:** on submit, a one-time **Ripple-draw** — glyph scales `0.85→1` with a soft glow ring (single confirming drop), 400–500ms. Satisfying, not bouncy.
  - **Select chevron:** rotates **180°** gently on open/focus (220ms).
  - **Contact info tiles:** treated like feature tiles but calmer (faint brighten on hover; they sit in a static info card).
- **Trigger:** focus / drag / submit / open.
- **Duration:** 150ms (hover) · 220ms (chevron) · 400–500ms (success).
- **Easing:** ease-out-soft · ease-out-quint (success).
- **Hover/Focus:** input focus → field border to aqua/brand + adjacent icon brighten.
- **Mobile:** tap states; select chevron rotates on open; success ripple plays once.
- **Reduced-motion:** success check appears instantly (no draw/ripple); chevron toggles instantly; no rise.

```
success state (one-time, ~450ms)
( ) →  (✓)   glyph scales 0.85→1, a soft ring ripples out once and fades
```

### G. Media icons
*Where:* video **Play** button, gallery **Maximize2** (hover overlay), duration **Clock**.
- **Behavior:**
  - **Play:** on card hover, **Depth-near (scale 1.1)** + one soft **Ripple** ring ("press to dive in"); **Settle (0.95)** on press.
  - **Maximize2:** appears with the overlay — add **scale-in 0.9→1 + Surface-rise (2px)** as the overlay fades in.
  - **Duration Clock:** static (meta).
- **Trigger:** parent hover (play, maximize) · none (clock).
- **Duration:** 220–300ms · ripple 500ms once.
- **Easing:** ease-out-soft.
- **Hover:** play scales + ripple; maximize scales-in.
- **Focus:** play button focus ring + scale.
- **Mobile:** play button always visible (no hover-only); tap = Settle; gallery maximize accessible on tap.
- **Reduced-motion:** overlay/icons appear instantly; no scale/ripple.

### H. Inline / list / meta icons
*Where:* checklist **Check** marks · article meta (Calendar/User/Eye) · expert-tip **Lightbulb** · bullets.
- **Behavior:** **mostly static.** Exceptions, one-time on reveal: **checklists** do a **staggered fade+rise** (items "confirming" in sequence); **Lightbulb** does a single soft **glow pulse** (once, never looping). Meta icons stay static.
- **Trigger:** in-view once (checklists, lightbulb); none (meta).
- **Duration:** 300–500ms staggered (≈70ms apart).
- **Easing:** ease-out-quint.
- **Hover/Focus:** none on their own; if inside a link card they ride the card's hover.
- **Mobile:** one-time reveal; no hover.
- **Reduced-motion:** appear instantly, no stagger/glow.

### I. Decorative / brand icons
*Where:* Markets country marks, the orange accent bars, partner logos.
- **Behavior:** **no per-icon animation.** They only ride their section's reveal (opacity+rise). Animating decorative marks would be exactly the "excessive/repetitive" we're avoiding.
- **Trigger / Duration / Easing:** section reveal only (600ms ease-out-quint).
- **Hover / Focus:** none (informational; tiles are flat per the card rule).
- **Mobile:** reveal once.
- **Reduced-motion:** instant.

---

## 4. Cross-cutting rules

- **Coordination, not collision:** when an icon sits inside a card that already `hover-lift`s, the icon's motion is *layered and subordinate* (the card lifts; the icon adds the sheen/depth) — one combined gesture, not two competing ones.
- **RTL:** all **Glide**/directional motion mirrors with `dir` (use logical direction; chevrons already `rtl-flip`).
- **One ambient loop only:** the Home hero water-drift. No other icon loops, ever.
- **Performance:** transform/opacity/filter only; `will-change` applied transiently; ripples are pseudo-elements (no extra DOM where avoidable); reveal-driven motions reuse the existing `ScrollReveal` IntersectionObserver (fire once, then unobserve).
- **Reduced-motion (global):** `prefers-reduced-motion: reduce` disables all transforms, sheens, ripples, glides, count-ups, and staggers — leaving **color/opacity state changes only** so every icon still gives usable feedback. (Backed by the existing global reduced-motion block.)
- **Touch:** hover-only motions never gate functionality; all icons remain usable and visible without hover.

## 5. Avoid-list (hard constraints)
❌ Spinning / full rotation (incl. the 45° diamond flip in the reference) · ❌ bounce / spring / overshoot easing · ❌ cartoon morphs · ❌ looping/repeating idle animation (except the single Home hero drift) · ❌ animating decorative/meta icons · ❌ motion on stat/market tiles beyond reveal · ❌ more than one icon "event" per interaction.

## 6. Summary matrix

| Category | Signature motion | Trigger | Loops? |
|---|---|---|---|
| A. Feature/Service (IconTile) | depth-near + sheen + glyph rise | card hover | no |
| B. Statistics | rise + single ripple (+count-up) | in-view once | no |
| C. Navigation/controls | arc/cross-fade swap · directional glide | hover/press/state | no |
| D. CTA/button | arrow glide · staggered badge rise | hover · in-view | no |
| E. Social | glow + scale 1.08 (+chip rise) | hover/focus | no |
| F. Form | upload rise · success ripple-draw · chevron 180° | focus/submit/open | no |
| G. Media | play depth+ripple · maximize scale-in | hover/press | no |
| H. Inline/list/meta | staggered checklist · single lightbulb pulse | in-view once | no |
| I. Decorative | section reveal only | in-view once | no |

---

*Review target: confirm the primitive library + the per-category signatures (especially the
Feature IconTile direction vs. the reference diamond-flip). On approval, implementation is
CSS-first with a few reveal-driven hooks on the existing ScrollReveal observer.*
