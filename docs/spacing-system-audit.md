# NAPCO Aqua — Spacing System Audit & Normalization Plan

### Enterprise spacing architecture · v1.0 (2026) · **AUDIT ONLY — nothing implemented**

> Scope is **spacing only**: margins, padding, gaps, section rhythm, container spacing.
> **No** changes to color, type, components, animation, shadows, borders, visual style, or
> content. The design language stays identical — this only removes spacing *drift* so equivalent
> contexts use one value. Base unit = **4px** (Tailwind default); 1 unit = 4px throughout.

---

## 0. Executive summary

The site is already **80% consistent** — it has a single `Container` (1200px max-width, one
responsive gutter), a dominant section rhythm (`py-20 lg:py-28`), and it correctly builds layout
from `gap`/`space-y` rather than margins (margins are nearly absent — a good sign). The work is
**curation, not reconstruction**: collapse a handful of near-duplicate values into one semantic
scale and kill 2 truly arbitrary values. Net visual change is small (±4–8px on specific elements);
the goal is *cohesion*, not a redesign.

**The drift, in one line each:**
1. **Gaps** — the widest drift: card grids mix `gap-6`/`gap-8`; two-col layouts mix `gap-10`/`gap-12`; icon→text mixes `gap-2/3/4/5`.
2. **Card/panel padding** — large panels mix `md:p-8`/`md:p-10`; forms mix `p-10`/`p-12`; one arbitrary `p-3.5`.
3. **Vertical stacks (`space-y`)** — section-content wrappers mix `space-y-10`/`space-y-12`; card content mixes `space-y-3`/`space-y-4`.
4. **Content measures (`max-w`)** — narrow columns mix `max-w-3xl`/`max-w-4xl`; one arbitrary `max-w-[800px]`.
5. **Section rhythm** — fundamentally fine (2 intentional tiers), just not tokenized.

---

## 1. Current values — full inventory (audited from source)

### 1a. Section vertical rhythm (`<section>` py/pt/pb)
| Value | px (mobile → lg) | Where | Count |
|---|---|---|---|
| `py-20 lg:py-28` | 80 → 112 | **standard section** (all pages) | ~30 ✅ dominant |
| `py-12 lg:py-16` | 48 → 64 | "light band": career features, career ambassador, blog stats | 3 |
| `pb-12 lg:pb-16` / `pb-20 lg:pb-28` | bottom-only | section closers (career, article share; about vision2030, contact map) | 4 |
| hero `pt-32 pb-14` (+ home `lg:pb-20`) | 128 / 56 | hero blocks | 3 |
| `py-40` | 160 | not-found (full-screen center) | 1 |

→ **Verdict:** coherent. Two intentional tiers (standard + light band) plus bottom-only closers
to avoid doubling at page ends. Only issue: **not named/tokenized**, so the tiers aren't obvious.

### 1b. Container & gutters
| Token | Value | Status |
|---|---|---|
| `--container-content` | **1200px** | ✅ single source (`Container`) |
| gutter | `px-5 sm:px-8 lg:px-10` (20 / 32 / 40) | ✅ single source, every page |

→ **Verdict:** already enterprise-grade. **No changes needed** — every page's left/right edge
already aligns because one `Container` owns it. (Only exception: `contact-map` uses a raw
`max-w-[800px]` inside the container — image constraint, see 1e.)

### 1c. Padding — internal (cards / panels / forms)
| Pattern | px | Role | Notes |
|---|---|---|---|
| `p-6` | 24 | **standard card** | dominant ✅ |
| `p-5` | 20 | compact card | article-card, blog-featured, about-standards row, career ambassador, about stat tile |
| `p-6 md:p-10` | 24 → 40 | **large panel** | intro panels, home two-col panels, about leadership/team ✅ dominant |
| `p-6 md:p-8` | 24 → 32 | large panel (variant) | contact info, testimonial, blog-featured — **drift vs md:p-10** |
| `p-8 md:p-10` | 32 → 40 | training dual-CTA cards | |
| forms: `p-12` vs `p-10` | 48 / 40 | form success state | career/training `p-12`, contact `p-10` — **drift** |
| forms body: `md:p-10` vs `md:p-8` | | form container | career/training `md:p-10`, contact `md:p-8` — **drift** |
| `p-3.5` | 14 | service-block list row | ⚠️ **arbitrary half-step** |
| `p-4` | 16 | small tiles (contact expert stat) | |

### 1d. Gaps — grids & flex (the biggest drift)
| Value | px | Role(s) it's used for | Drift? |
|---|---|---|---|
| `gap-2` | 8 | meta rows, button-internal, chips | ok (tight) |
| `gap-3` | 12 | icon→text (stat-tile, video meta), footer links | mixed with gap-4 |
| `gap-4` | 16 | icon→text (cards), hero CTAs, form fields, section-heading | ok (base) |
| `gap-5` | 20 | career "gain" icon→text, footer socials, contact form | ⚠️ odd-step, mixes with gap-4/6 |
| `gap-6` | 24 | **card grids (3-col)**, card content | dominant ✅ |
| `gap-8` | 32 | feature-column grids (about team, career features), contact two-col | **drift vs gap-6 for column grids** |
| `gap-10` | 40 | **two-col image+text**, home sections | dominant ✅ |
| `gap-12` | 48 | about-standards two-col | ⚠️ **drift vs gap-10** |
| `gap-14` | 56 | partners marquee | special (keep) |

→ **Key drift:** (a) 4-col feature-column grids split `gap-6` (about intro) vs `gap-8` (about team,
career); (b) two-col layouts split `gap-10` vs `gap-12`; (c) icon→text spacing uses 2/3/4/5 with no rule.

### 1e. Content measures (`max-w`) — nested inside the 1200 container
| Value | px | Role | Notes |
|---|---|---|---|
| `max-w-2xl` | 672 | hero heading block, SectionHeading | ✅ consistent |
| `max-w-xl` | 576 | hero subtitle | ✅ |
| `max-w-3xl` | 768 | form **sections** (training, career) | vs 4xl below — **drift** |
| `max-w-4xl` | 896 | article **body** + share | vs 3xl above — **drift** |
| `max-w-md` | 448 | inner form field column | ✅ consistent |
| `max-w-[800px]` | 800 | contact map image | ⚠️ **arbitrary literal** |

### 1f. Vertical stacks (`space-y`)
| Value | px | Role | Drift? |
|---|---|---|---|
| `space-y-12` | 48 | **section-content wrapper** (heading + grid) | dominant ✅ |
| `space-y-10` | 40 | section-content wrapper (blog, articles-browser, home CTA inner, form sections) | ⚠️ **drift vs 12** |
| `space-y-16 lg:space-y-20` | 64→80 | service-block lists | special (wide rhythm) |
| `space-y-5` / `space-y-6` | 20 / 24 | intro/text blocks | mixed |
| `space-y-4` | 16 | **card content** | dominant ✅ |
| `space-y-3` | 12 | eyebrow+title, article impl card | mixes with 4 |
| `space-y-2` / `space-y-1` | 8 / 4 | label+value, tight | ok |

### 1g. Margins
Near-absent and correct: only `mt-10` (hero stat strip), `mt-2` (minor), `mb-6` (one form field),
`mt-0.5` (icon optical nudge). → **No margin system needed; keep using gap/space-y.** The one
inconsistency: `mb-6` on a contact-form field should be the form's `space-y` rhythm (see 4).

---

## 2. Proposed unified spacing scale

### 2a. The primitive scale (curated subset of the 4px grid)
Keep the 4px base. **Endorse these steps; avoid the rest** (no `5`/`3.5`/`14`, no raw px literals):

| Token (unit) | px | Primary use |
|---|---|---|
| `1` | 4 | hairline (icon nudge, tightest label gap) |
| `2` | 8 | tight inline (meta rows, button internals) |
| `3` | 12 | compact icon→text, dense lists |
| `4` | 16 | **base gap** (icon→text in cards, form fields, button groups) |
| `6` | 24 | **card padding**, card-grid gap, card content stack |
| `8` | 32 | feature-column gap, two-col forms, large-panel mobile→ (md step) |
| `10` | 40 | **two-col layout gap**, large-panel `md:` padding |
| `12` | 48 | **section-content `space-y`**, light-section `lg:` |
| `16` | 64 | wide block rhythm (service blocks), light-section variant |
| `20` | 80 | **section `py` (mobile)** |
| `28` | 112 | **section `py` (lg)** |

Dropped/folded: **`5`(20px)→`4` or `6`**, **`3.5`(14px)→`4`**, **`max-w-[800px]`→token**,
**`gap-12`→`gap-10`** in layouts (48px stays only as a `space-y`/section value, not a column gap).

### 2b. Semantic roles (the rules that prevent future drift)
| Role | Value | Replaces |
|---|---|---|
| **Section — standard** | `py-20 lg:py-28` | (keep) |
| **Section — light band** | `py-12 lg:py-16` | (keep, now named) |
| **Section — closer (bottom only)** | `pb-20 lg:pb-28` | (keep) |
| **Container** | `max-w-[--container-content]` + `px-5 sm:px-8 lg:px-10` | (keep) |
| **Card padding** | `p-6` | `p-5` compact cards → `p-6` |
| **Large panel padding** | `p-6 md:p-10` | `md:p-8` variants → `md:p-10` |
| **Form padding** | body `p-6 md:p-10`; success `p-10` | `p-12`/`md:p-8` → unify |
| **List-row padding** | `p-4` | `p-3.5` → `p-4` |
| **Card-grid gap** | `gap-6` | (keep) |
| **Feature-column gap** | `gap-8` | `gap-6` column grids → `gap-8` |
| **Two-col layout gap** | `gap-10` | `gap-12` → `gap-10` |
| **Icon→text gap** | `gap-4` (compact `gap-3`) | `gap-5` → `gap-4` |
| **Section-content stack** | `space-y-12` | `space-y-10` wrappers → `space-y-12` |
| **Card-content stack** | `space-y-4` | `space-y-3` content → `space-y-4` |
| **Text-block stack** | `space-y-5` | (keep; or fold to `space-y-6`) |
| **Narrow reading column** | `max-w-3xl` (forms) · `max-w-4xl` (article body) | document both as intentional tiers |

### 2c. Reasoning
- **8-point bias on the 4px grid.** Keeping multiples of 8 for the medium/large steps (16/24/32/40/48/64) and 4 only for fine detail is the enterprise standard (Material, Carbon, Polaris) — it makes rhythm predictable and removes the "is this 20 or 24?" guesswork that `gap-5`/`p-5`/`p-3.5` create.
- **Semantic, not numeric.** Designers/devs pick a *role* ("card padding", "two-col gap"), not a number. That's what stops drift returning.
- **Two section tiers only.** A standard band (`20/28`) and a light band (`12/16`) cover every page; closers are bottom-only to avoid double space at page ends. More tiers would dilute the rhythm.
- **Container already perfect** — one 1200px wrapper + one gutter means left/right edges align across every page by construction. We don't touch it.
- **Minimal visual delta.** Every change is ±4–8px on specific elements; nothing moves more than one scale step, so the look is preserved while the *system* tightens.

---

## 3. Exactly what would change (and where)

> ~24 edits across ~10 files. Each is a one-token change. Grouped by category:

**A. Gaps (8 edits)**
- about intro-features grid `gap-6` → `gap-8` (match team/career feature columns). *(+8px between 4 columns)*
- about-standards two-col `gap-12` → `gap-10`. *(−8px, one layout)*
- career "gain" cards icon→text `gap-5` → `gap-4`. *(−4px ×2 cards)*
- footer socials `gap-5` → `gap-4`; contact-form row `gap-5` → `gap-6` (align to field rhythm) — *review per case.*
- (Audit note: `gap-3` icon→text in stat-tile/video-meta stays — those are genuinely compact.)

**B. Padding (7 edits)**
- service-block list row `p-3.5` → `p-4`. *(+2px, kills the only arbitrary half-step)*
- contact info card `md:p-8` → `md:p-10`; testimonial `md:p-8` → `md:p-10`. *(+8px at md+ on 2 panels)*
- blog-featured card `p-5 … md:p-6` → `p-6 … md:p-8` (promote to large-panel tier). 
- forms: career/training success `p-12` → `p-10`; bodies already `md:p-10` ✓; contact form body `md:p-8` → `md:p-10`, success `p-10` ✓. *(unify forms on p-10)*
- compact cards `p-5` → `p-6` **(decision needed — see §5):** article-card, about-standards row. *(+4px)*

**C. Vertical stacks (5 edits)**
- blog section-content `space-y-10` → `space-y-12`; articles-browser `space-y-10` → `space-y-12`. *(+8px once each)*
- home CTA inner & form sections `space-y-10` → `space-y-12` *(review — may be intentional).* 
- article-impl card content `space-y-3` → `space-y-4`. *(+4px)*
- contact-form field `mb-6` → move into the form's `space-y` rhythm (remove the one-off margin).

**D. Content measures (1–2 edits)**
- contact map `max-w-[800px]` → keep as an image cap **or** add `--container-narrow: 800px` token. *(no visual change)*
- Document `max-w-3xl` (forms) vs `max-w-4xl` (article body) as two intentional reading-width tiers (no change), **or** unify both to `max-w-3xl` for a tighter, more consistent reading column *(−128px on article body — §5 decision)*.

**E. Section rhythm (0 visual edits)**
- No value changes. Optional: introduce `.section` / `.section--light` utility (or `@apply`) so the
  two tiers are named — purely organizational, identical output.

---

## 4. Visual impact estimate

| Change set | Visual delta | Risk |
|---|---|---|
| Gaps (A) | ±4–8px on ~5 grids/cards; tightens column rhythm | **Very low** |
| Padding (B) | +8px interior on 2–3 panels at md+; forms −8px success | **Low** (more breathing room, consistent) |
| Stacks (C) | +4–8px between a few content blocks | **Very low** |
| Measures (D) | none (token rename) unless article body unified (−128px width) | **Low / opt-in** |
| Section rhythm (E) | **zero** (organizational only) | **None** |

**Overall:** imperceptible per-element, cumulatively the site reads more deliberate and even — no
section cramped, none oddly distant, all grids on one rhythm. **No layout breaks expected**;
everything stays within one scale step. Build-verifiable (39/39) + a 4-variant visual diff on the
touched pages (about, blog, contact, career, training, articles, service-block) confirms parity.

---

## 5. Decisions — LOCKED

1. **Compact cards `p-5` → `p-6`:** ✅ **Unify all content cards to `p-6`.** `p-5` is retired for
   content cards (article-card, blog-featured, about-standards row, career ambassador, about stat tile → `p-6`).
2. **`gap-5` (20px):** ✅ **Eliminated.** Fold to `gap-4` (icon→text / social rows) or `gap-6`
   (field rhythm) per context. No off-grid 20px step remains.
3. **Reading widths:** ✅ **Keep both as named tiers** — `max-w-3xl` for forms, `max-w-4xl` for the
   long-form article body. No width change; documented as intentional.
4. **Section tiers:** ✅ **Formalize as utilities** — add `.section` / `.section--light` (and a
   `.section-close` bottom-only variant). Zero visual change; named rhythm, drift-proof.

---

## 6. Implementation sequence (on approval)

1. **Gaps** (A) — highest-drift, lowest-risk; one pass across grids/cards.
2. **Padding** (B) — panels + forms + kill `p-3.5`.
3. **Stacks** (C) — section-content & card-content rhythm.
4. **Measures + section tiers** (D, E) — token/organizational, no/low visual change.

Each step: `tsc` + build (expect 39/39) + a quick 4-variant visual check on touched pages, committed
separately so any single change is trivially reviewable/revertible. **No color, type, component,
animation, shadow, border, or content changes at any step.**

*Awaiting your answers to §5 (and overall go) before writing any code.*
