"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Tasteful scroll-triggered reveals (opacity + small upward motion), applied globally
 * to top-level page sections via IntersectionObserver — no markup/composition changes.
 *
 * LCP-safe & flash-free: sections at/above the fold are revealed instantly (never hidden),
 * so above-the-fold content paints immediately; only genuinely below-fold sections get the
 * initial hidden state and animate in once. Disabled entirely under reduced-motion.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section"),
    );
    if (!sections.length) return;

    const vh = window.innerHeight;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );

    for (const el of sections) {
      // At/near the current viewport → show immediately (protects LCP, avoids flash).
      if (el.getBoundingClientRect().top < vh * 0.9) {
        el.classList.add("reveal-in");
      } else {
        el.classList.add("reveal-init");
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
