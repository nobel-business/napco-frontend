"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Viewport reveal system (opacity + small upward motion), driven by one IntersectionObserver.
 * Reuses the `.reveal-init` / `.reveal-in` CSS in globals.css. Reveals run once (unobserved
 * after firing) and are LCP-safe & flash-free: anything at/above the fold is left visible and
 * never gets the hidden init state. Disabled entirely under prefers-reduced-motion.
 *
 * Three behaviours:
 *   • `main section` (default)      → block reveal, automatically (no markup needed).
 *   • `[data-reveal]`               → block reveal an explicit element (e.g. a heading).
 *   • `[data-reveal-stagger]`       → cascade the element's DIRECT CHILDREN (cards/list items),
 *                                     each with an incremental transition-delay.
 * A `main section` that contains any explicit `[data-reveal]` / `[data-reveal-stagger]` opts out
 * of the automatic block reveal, so the explicit marks fully control that section (no double-fade).
 */
const STEP = 70; // ms between staggered children (within the brief's 50–120ms)
const MAX_DELAY = 360; // cap so long grids finish promptly and never feel slow
const FOLD = 0.9; // top < 90% of viewport height → reveal instantly (protect LCP, avoid flash)

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const vh = window.innerHeight;
    const aboveFold = (el: Element) => el.getBoundingClientRect().top < vh * FOLD;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (el.dataset.revealStagger !== undefined) {
            const kids = Array.from(el.children) as HTMLElement[];
            kids.forEach((k, i) => {
              k.style.setProperty("--reveal-delay", `${Math.min(i * STEP, MAX_DELAY)}ms`);
              k.classList.add("reveal-in");
            });
          } else {
            el.classList.add("reveal-in");
          }
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );

    // 1) Explicit reveal targets (block + stagger). Below-fold ones get the hidden init
    //    state and are observed; above-fold ones stay visible (LCP-safe).
    const explicit = Array.from(
      document.querySelectorAll<HTMLElement>("main [data-reveal], main [data-reveal-stagger]"),
    );
    for (const el of explicit) {
      if (aboveFold(el)) continue;
      const stagger = el.dataset.revealStagger !== undefined;
      const targets = stagger ? (Array.from(el.children) as HTMLElement[]) : [el];
      for (const t of targets) t.classList.add("reveal-init");
      observer.observe(el);
    }

    // 2) Automatic section block reveal — skip sections controlled by explicit marks.
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"));
    for (const sec of sections) {
      if (sec.matches("[data-reveal], [data-reveal-stagger]")) continue;
      if (sec.querySelector("[data-reveal], [data-reveal-stagger]")) continue;
      if (aboveFold(sec)) continue;
      sec.classList.add("reveal-init");
      observer.observe(sec);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
