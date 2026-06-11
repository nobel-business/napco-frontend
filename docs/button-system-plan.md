# NAPCO Aqua — Global Button System Redesign · Plan

### Status: **PLAN ONLY — no code until approved.** Reference: orange-gradient pill + icon chip.

---

## 1. Full button inventory (current)

### A. The `Button` component (cva) — `rounded-lg` (10px), shadow, `transition-all`
| Variant | Style | Used |
|---|---|---|
| `primary` | solid `bg-brand` orange, hover darker | 10× (default) |
| `secondary` | solid `bg-accent-card` (#0008A3) | 1× |
| `outline` | brand border, fill on hover | 6× |
| `ghost` | transparent, hover `bg-muted` | **0× (defined, unused)** |
| `navy` | `bg-gradient-navy` | 4× |
| Sizes | `sm` h-36 · `md` h-44 · `lg` h-48 · `icon` 40² | lg 12×, sm 2×, icon 0× |

### B. Button-like elements NOT using `Button` (10 files, hand-rolled)
| Element | Where | Shape / style |
|---|---|---|
| Theme + Language switches (`switchButtonClass`) | navbar | `bg-gradient-navy` **40² rounded-lg** icon |
| Mobile menu toggle | navbar | **rounded-full** 40² ghost |
| Filter chips | articles browser | `rounded-lg px-5 py-2.5` text (active = `bg-brand`) |
| "More" chip | articles browser | `rounded-lg` text + chevron |
| Pagination prev/next + page numbers | articles browser | bare chevrons + `rounded-lg` number tabs (active `bg-brand`) |
| Carousel arrows | blog featured, testimonials | **rounded-full** 44² border + surface |
| Video play button | media | **rounded-full** 64² white |
| Floating "Join community" | floating-actions | **rounded-full pill** `bg-gradient-tile-orange` + icon ← *closest to the reference* |
| Back-to-top | floating-actions | **rounded-full** 48² `bg-brand` |
| Article share buttons | article detail | **rounded-xl** `gradient secondary-300→500` + icon |
| Skip-intro | sonar intro | rounded-full ghost pill |

---

## 2. Current inconsistencies
1. **Three+ shapes:** `rounded-lg` (Button, chips, pagination, switches), `rounded-full` (arrows, play, floating, menu), `rounded-xl` (share). No single family.
2. **Two overlapping blue variants:** `secondary` (solid #0008A3) vs `navy` (gradient) — same job, different look; `secondary` used once, `navy` 4×.
3. **Dead variants:** `ghost` and `icon` defined but never used; meanwhile real ghost/icon buttons are hand-rolled elsewhere.
4. **~10 bespoke button elements** bypass the component → inconsistent padding, radius, hover, focus, and **no shared focus ring** on several.
5. **Mixed gradients** for the same intent: floating uses `gradient-tile-orange`, share uses `secondary-300→500`, switches use `gradient-navy`.
6. **Flat solids** (primary/secondary) vs the premium **gradient** the reference calls for.

---

## 3. Proposed system — 5 variants, one pill family

All buttons share: **pill (`rounded-full`)**, `inline-flex items-center justify-center gap-2`, medium weight, one focus ring, one transition, `[&_svg]:shrink-0`, disabled handling.

| Variant | Role | Light | Dark |
|---|---|---|---|
| **Primary** | Main conversion CTA | **orange gradient** (`--gradient-btn-orange`), white text, soft shadow | same gradient (vivid on deep ocean) + lighter shadow |
| **Secondary** | Less-important but prominent | **marine gradient** (`--gradient-btn-marine`), white text | same |
| **Outline** | Supporting | transparent, **marine border + text**, fills marine on hover | marine border + aqua-200 text |
| **Ghost** | Minimal (chips, "view all", skip) | transparent, foreground text, hover `bg-muted` | same (theme tokens) |
| **Icon** | Circular icon-only (switches, arrows, play, back-to-top, menu) | circle, variant-tinted (ghost/marine/orange as fit) | same |

Plus one **Navbar CTA** preset = Primary at `sm` (the "Contact us" button) — high-conversion orange pill that pops on the transparent/glass navbar.

> **Hierarchy (not "everything orange"):** exactly **one Primary per view** (the main action). Secondary = marine for the alternative action. Outline/Ghost = supporting. Icon = utilities. Color + fill weight encode importance.

> **Icon-chip (reference):** the white-circle leading icon is an **opt-in** prop (`iconChip`) for social/community CTAs (the floating "Join community", share) — *not* forced on every primary, so standard CTAs stay clean.

---

## 4. Variant specifications
- **Primary** `bg-[--gradient-btn-orange] text-white shadow-[soft] hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[lifted] active:translate-y-0 active:scale-[0.97]`
- **Secondary** `bg-[--gradient-btn-marine] text-white` + same hover/press.
- **Outline** `border border-aqua-500 text-aqua-600 dark:text-aqua-200 hover:bg-aqua-500 hover:text-white` (no shadow until hover).
- **Ghost** `text-foreground hover:bg-muted` (no shadow, no border).
- **Icon** circle; defaults to ghost fill, accepts `tone="marine|orange|surface"` (e.g. switches = marine, arrows/menu = surface/ghost, play = white, back-to-top = orange).

New gradient tokens (added to `globals.css`, reusing the palette):
- `--gradient-btn-orange`: `linear-gradient(180deg, #ff9a4d 0%, #ee6a1f 100%)` (warm, reference-like).
- `--gradient-btn-marine`: `linear-gradient(180deg, #1f9fc2 0%, #0a6080 100%)`.

---

## 5. Size specifications (pill)
| Size | Height | Padding-x | Icon btn | Text | Use |
|---|---|---|---|---|---|
| `sm` | 40px (h-10) | 20px (px-5) | 40² | label-small | navbar, chips, compact |
| `md` | 48px (h-12) | 28px (px-7) | 48² | label-small | **default** |
| `lg` | 56px (h-14) | 36px (px-9) | 56² | label-small (semibold option) | hero CTAs |
| `icon-lg` | — | — | 64² | — | media play button |

(Up slightly from today's 36/44/48 for a chunkier, touch-friendly premium feel. Gap icon↔text = 8px all sizes.)

---

## 6. Color specifications
- **Primary** orange gradient `#ff9a4d→#ee6a1f`, text white. (Brand orange `--brand #ff782c` stays the anchor hue.)
- **Secondary** marine gradient `#1f9fc2→#0a6080`, text white.
- **Outline** border/text `--aqua-500/600` (light) / `aqua-200` (dark); hover fill marine.
- **Ghost** text `--foreground`; hover `--muted`.
- **Focus ring** `--ring` (orange) at 2px + 2px offset, visible on light & dark (offset uses `--background`).
- All gradients chosen to read on **both** themes (vivid on deep-ocean dark; not washed out).

---

## 7. Hover / active / focus
- **Hover:** `-translate-y-0.5` lift + `brightness(1.05)` + shadow grows (`--shadow-card`→`--shadow-card-hover` equiv). Outline/Ghost: fill/bg appears (no lift jump). 150–200ms, `--ease-out-soft`.
- **Active (press):** `scale(0.97)` + return translate to 0, faster (`--motion-fast`) → tactile "click".
- **Focus-visible:** the shared `--ring` ring (keyboard only); identical across every button; tested light + dark.
- All respect `prefers-reduced-motion` (no lift/scale; color/shadow only) via the existing global block.

---

## 8. Page-by-page impact
- **Component swap (automatic):** every `<Button>` usage (21) re-skins to pill + gradient — home hero (primary+outline), footer (primary+outline), training/career/contact form submits, dual-CTA, ambassador, blog "view all", card CTAs. `navy`(4) + `secondary`(1) → **Secondary** (marine). No JSX changes for these beyond removing redundant per-button classes.
- **Navbar:** "Contact us" → Navbar-CTA (orange `sm` pill); theme + language → **Icon** circles (marine tone); mobile menu → Icon (ghost).
- **Articles browser:** filter chips → Ghost pills (active = Primary-ish solid); "More" → Ghost; pagination arrows → Icon, page numbers → small Ghost/solid pills.
- **Carousels (blog, testimonials):** arrows → Icon (surface) circles.
- **Media:** play → Icon-lg (white) circle.
- **Floating:** "Join community" → Primary pill + iconChip (≈ unchanged, now canonical); back-to-top → Icon (orange) circle.
- **Article detail:** share buttons → Secondary (or Primary) pills + iconChip.
- **Sonar intro:** skip → Ghost pill.
- Non-buttons (number badges, icon tiles, stat tiles) are **out of scope** (not interactive).

---

## 9. Migration strategy
1. **Rewrite `Button` cva** → pill + 5 variants + new sizes + hover/press/focus + add `iconChip` + `tone` (icon) props. Keep `primary/secondary/outline/ghost` names; map `navy`→`secondary`; add `icon`.
2. **Add the 2 gradient tokens** to `globals.css`.
3. **Migrate the ~10 hand-rolled elements** to `<Button variant=… size=… />` (or an `IconButton` thin wrapper), deleting their bespoke classes — one file at a time.
4. **Consolidate** `switchButtonClass` → `<Button variant="icon" tone="marine">`.
5. **Verify per file:** `tsc` + build + visual spot-check (light/dark, EN/AR). Commit in logical groups (component first, then migrations).
6. Keep the existing **icon-motion** (`fx-icon-swap`, glide, press-settle) working on the new buttons.

---

## 10. Visual risks
- **Pill everywhere is the biggest shift** — `rounded-lg`→`rounded-full` changes the whole UI feel. Pills inside `rounded-2xl/3xl` cards read fine (common SaaS), but it's a deliberate identity evolution — confirm desired.
- **Taller buttons** (md 44→48) slightly affect dense rows (navbar, form button rows, dual-CTA) — will verify no overflow.
- **Gradient on tiny chips** looks heavy → chips use Ghost/solid, *not* gradient (kept light).
- **Two filled pills in one hero** (orange + marine) can compete → hero keeps Primary + **Outline** (one dominant CTA); marine-secondary used on light sections.
- **Dark-mode gradients** must stay vivid (not glow too hot on deep ocean) — tuned + checked.
- **RTL:** `gap`/logical padding already RTL-safe; verify icon side.
- **Focus ring** on gradient pills must stay visible — 2px offset ring handles it.
- Local **font outage** blocks my live preview — verification will lean on the build + your review on deploy.

---

### Decisions needed before build
1. **Pill everywhere** (incl. all icon buttons → circles) — confirm full migration?
2. **Navbar "Contact us"** = Primary **orange** pill (max conversion) *or* a quieter marine/outline pill (less shouty on the glass navbar)?
3. **Sizes** — adopt the chunkier 40/48/56 scale, or keep today's 36/44/48?
4. **Secondary fill vs hero** — on photo heroes keep Primary + **Outline** (recommended), or Primary + filled **Secondary**?
