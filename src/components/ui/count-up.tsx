"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a statistic up to its value the first time it scrolls into view (once), then settles
 * on the exact original string. Parses a leading number with optional prefix/suffix
 * ("500+", "98%", "15", "+30"). Renders the value unchanged when:
 *   - it has no ASCII digits (e.g. Arabic-Indic numerals on /ar), or
 *   - the user prefers reduced motion.
 * SSR renders the final value (no-JS / SEO safe); animation only runs after hydration.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ""));
    if (!Number.isFinite(target)) return;
    const decimals = (numStr.split(".")[1] ?? "").length;
    const render = (n: number) => prefix + n.toFixed(decimals) + suffix;

    // Show the start value immediately so it doesn't flash final -> 0 once in view.
    setDisplay(render(0));

    let raf = 0;
    const duration = 1100;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        let start = 0;
        const tick = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min(1, (ts - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic — weighted, no overshoot
          if (p < 1) {
            setDisplay(render(target * eased));
            raf = requestAnimationFrame(tick);
          } else {
            setDisplay(value); // exact original string (keeps any formatting)
          }
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
