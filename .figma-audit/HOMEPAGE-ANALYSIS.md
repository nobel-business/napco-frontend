# Homepage — Deep Analysis & Fix Plan (no code changed)

Sources: 7 ordered screenshots (authoritative), current code (`src/app/[locale]/page.tsx`), Figma design-context, `.figma-audit/` docs, project assets.

## Target section order (from screenshots, top→bottom)
1. Navbar (over hero)
2. **Hero** (dark + decorative pattern)
3. Persistent: **"Join our community"** pill + **floating action button**
4. Trusted Partner
5. NAPCO Aqua Services
6. Our Vision in Action
7. NAPCO Aqua Solutions
8. **NAPCO Aqua Values** ← not in code
9. **Deep Expertise Across Middle Eastern Markets** ← not in code
10. Why Choose NAPCO Aqua
11. NAPCO Aqua Partners
12. CTA banner
13. Footer

Current code order: Hero → Trusted → Services → Vision → Solutions → Why Choose → Partners → CTA → Footer. **Missing: #8 Values, #9 Deep Expertise, #3 persistent elements.**

---

# PHASE 1 — SECTION ANALYSIS & COMPARISON

### 2. HERO  — 🔴 wrong background
- **Screenshots:** DARK navy/teal background with a **decorative pattern** — concentric "sonar/ripple" circles, scattered **orange dots**, faint radar arcs in the corners. Orange title, white subtitle, orange + outline buttons, **orange underline bar** beneath buttons.
- **Current:** flat **silver-gray gradient**, no decoration, slide-dot instead of the orange bar.
- **Issues:** background color + the entire decorative ripple/dot/radar graphic missing; hero should be dark in both themes.

### 3. PERSISTENT ELEMENTS — 🔴 missing
- **"Join our community"** orange pill (WhatsApp icon), floating at the **left edge** just below the hero (Figma `Frame 1321315838 / Variant2`).
- **Floating action button** — orange **circular** button on the **right edge** (scroll-to-top / quick action), persistent.
- **Current:** neither exists.

### 4. TRUSTED PARTNER — 🟢 matches (recent pass)
- Card (faint-blue bg), 440px image left, 28px title, 20px body, "30+" white stat box. ✔ Matches screenshots.

### 5. NAPCO AQUA SERVICES — 🟢 matches
- 28px title, 5 bordered list rows w/ orange tiles + 24px labels, 466px image right + caption, centered "View Services". ✔

### 6. OUR VISION IN ACTION — 🟢 matches
- Card, square portrait left, 28px title, 20px body, navy "Read More". ✔

### 7. NAPCO AQUA SOLUTIONS — 🟢 matches
- Bordered cards w/ 64px tiles, 24px titles, 18px body, image right + caption. ✔

### 8. NAPCO AQUA VALUES — 🔴 ENTIRE SECTION MISSING
- **Screenshots:** heading "NAPCO AQUA VALUES"; left = **image** (turquoise water/cages) + caption ("The values that shape our business and guide every decision we make, from planning to execution and long-term partnerships."); right = **3 value cards** with orange tiles:
  - **Sustainability First** — "We design and operate every project in a way that protects water resources, reduces waste, and enhances energy efficiency."
  - **Long-Term Partnerships** — "Our relationship with clients starts from the idea stage and does not end at handover; it extends to operations, technical support."
  - **Reliability & Responsibility** — "Full commitment to our partners and investors with clear deliverables, transparent timelines, and well-planned execution."
- **Current:** does not exist.

### 9. DEEP EXPERTISE ACROSS MIDDLE EASTERN MARKETS — 🔴 ENTIRE SECTION MISSING
- **Screenshots:** centered heading; a row of **6 countries**, each a **navy monochrome landmark icon** + label: **Saudi Arabia, Egypt, Oman, Iraq, Bahrain, UAE**.
- **Current:** does not exist.

### 10. WHY CHOOSE NAPCO AQUA — 🟢 matches
- 6 bordered cards, 64px tiles, 24px titles, 18px body. ✔

### 11. NAPCO AQUA PARTNERS — 🟠 partial
- **Screenshots:** partner logos shown in **full color** (MAKKA + others), single centered row.
- **Current:** logos rendered with **grayscale filter + opacity** (hover to color). Also need to confirm the exact logo set/order matches.
- **Issue:** remove grayscale (Figma shows color); verify logos.

### 12. CTA BANNER — 🟢 matches
- Blurred bg + dark-overlay card, text left (28px title, 20px body, navy-gradient button), 316px square image right. ✔

### 13. FOOTER — 🟠 minor content mismatches
- **Screenshots:** address **"Dhahran-Thuqbah Road - Al Khobar - Kingdom of Saudi Arabia"**, phone **+966 50 706 2900**, Quick Links **Home/Services/About Us** ✔(done), Get Started **Contact Us (orange)** + **Book a Consultation (outline)** + 4 socials, bottom **"© 2025 …"** + **"Powered by GAIT"**.
- **Current:** address "Dhahran Techno Valley…", phone +966 54 125 2773, copyright year **2026**.
- **Issues:** footer address, phone, and year differ.

### Cross-cutting
- **Typography:** section titles 28, card titles 24 (medium), body 18/20 — now correct after last pass.
- **Light/Dark:** sections are theme-aware; **hero must stay dark in both** (currently gray in light). Values/Deep-Expertise need dark-mode treatment when added.
- **RTL:** existing sections mirror correctly; new sections (Values, Deep Expertise) must mirror too; the persistent pill/FAB must flip sides in RTL.

---

# PHASE 2 — ASSET RECOVERY

| Asset | For | Status | Action |
|---|---|---|---|
| Hero decorative pattern (concentric circles + orange dots + radar arcs) | Hero bg | ❌ missing | **Export from Figma** (hero decoration nodes) or recreate as SVG |
| "Join our community" pill (WhatsApp icon) | persistent | ⚙️ buildable | WhatsApp icon available (MingCute `whatsapp`); build pill |
| Floating action button graphic | persistent | ⚙️ buildable | build (arrow-up / chat icon) |
| **Values** section image (turquoise cages) | Values | ❓ likely in pool | confirm exact Figma image; export if not |
| **6 country landmark icons** (KSA, Egypt, Oman, Iraq, Bahrain, UAE — navy monochrome) | Deep Expertise | ❌ missing | **Export 6 SVGs from Figma** |
| Partner logos (color) | Partners | ⚠️ present but grayscaled | have `partners/*` (14); remove grayscale, verify set/colors |
| Logo, Contact map, Vision 2030, hero photos | other | ✅ already recovered | — |

**Already available:** all section content images (trusted, services, vision, solutions, cta), MingCute icons, partner logos, logo.
**Missing (need Figma export):** hero decoration, 6 country icons; possibly the Values image.
**Reused-incorrectly:** none new (handled previously).

---

# PHASE 3 — FIX PLAN (grouped by priority)

### 🔴 CRITICAL (block Figma match)
1. **Add "NAPCO Aqua Values" section** — image + caption (left) + 3 value cards (right). Assets: Values image (confirm/export), MingCute icons (leaf/handshake/shield). Impact: high (whole section).
2. **Add "Deep Expertise Across Middle Eastern Markets" section** — 6 country landmark icons + labels. Assets: export 6 SVGs from Figma. Impact: high (whole section).
3. **Hero background** — replace gray gradient with dark navy + decorative ripple/dot/radar pattern (dark in both themes). Assets: hero decoration (export/recreate). Impact: high (first thing users see).

### 🟠 MAJOR
4. **"Join our community" pill** (left, WhatsApp) + **floating action button** (right) — persistent, RTL-aware. Buildable.
5. **Partners** — remove grayscale filter (show color), verify logo set/order.
6. **Footer content** — address → "Dhahran-Thuqbah Road - Al Khobar…", phone → +966 50 706 2900, year → 2025.

### 🟢 MINOR / POLISH
7. Hero **orange underline bar** under buttons (currently a dot).
8. Verify new sections in **dark mode** + **RTL** after adding.
9. Section vertical spacing rhythm vs screenshots (fine-tune).

### Sections already matching (no action): Trusted, Services, Vision, Solutions, Why Choose, CTA.

---

## RESOLVED (user direction, 2026-06-07)
1. **Hero background = the VIDEO** `interaction-reference.mp4` (aerial fish-cages, 1104×832, 9s). The "concentric circles + orange dots" in the hero screenshot are the **circular cages from above, darkened by a navy overlay** — not a static pattern. → Hero uses `<video autoplay loop muted playsInline>` (copied to `public/videos/hero-aqua.mp4`) + navy gradient overlay + content. Corner radar-arc/dot decorations = MINOR (CSS/export later).
2. **Values image & country icons & any other missing art** → export the exact assets directly from Figma ("search in the images").

## FINAL EXECUTION ORDER
1. Copy video → `public/videos/hero-aqua.mp4`; export from Figma: 6 country landmark SVGs, Values image (+ optional hero corner decorations).
2. **Hero** → video bg + navy overlay + orange underline bar (Critical).
3. **NAPCO Aqua Values** section (Critical) — add content keys + section (image+caption left, 3 cards right).
4. **Deep Expertise** section (Critical) — add content + 6 country icons row, placed before Why-Choose.
5. **Persistent**: Join-our-community pill (left) + floating action button (right), RTL-aware (Major).
6. **Partners** color (remove grayscale) + **Footer** address/phone/year (Major).
7. Verify all 4 quadrants (EN/AR × light/dark) + RTL flip of pill/FAB.

*Plan finalized. No code changed yet — ready to implement on your go.*
