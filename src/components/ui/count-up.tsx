"use client";

import { useEffect, useRef, useState } from "react";

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const toArabicDigits = (s: string) => s.replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]);
const toAsciiDigits = (s: string) =>
  s.replace(/[٠-٩]/g, (d) => String(AR_DIGITS.indexOf(d)));

/**
 * Counts a statistic up to its value the first time it scrolls into view (once), then settles
 * on the exact original string. Parses a leading number with optional prefix/suffix
 * ("500+", "98%", "15", "+30", "٢٥٠+", "١٥+ ألف"). Works with both ASCII and Arabic-Indic
 * numerals (٠-٩) — the animated value is rendered in the same digit set as the source, so the
 * /ar stats count up just like /en. Renders the value unchanged when:
 *   - it has no digits, or
 *   - the user prefers reduced motion.
 * SSR renders the final value (no-JS / SEO safe); animation only runs after hydration.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // First run of digits (ASCII or Arabic-Indic) with optional grouping (, ٬) / decimal (. ٫) marks.
    const match = value.match(/^(\D*?)([0-9٠-٩][0-9٠-٩,.٬٫]*)(.*)$/);
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, numStr, suffix] = match;
    const isArabic = /[٠-٩]/.test(numStr);
    // Normalize to a parseable ASCII number (strip thousands separators, unify decimal mark).
    const ascii = toAsciiDigits(numStr).replace(/[,٬]/g, "").replace(/٫/g, ".");
    const target = parseFloat(ascii);
    if (!Number.isFinite(target)) return;
    const decimals = (ascii.split(".")[1] ?? "").length;
    const render = (n: number) => {
      const body = n.toFixed(decimals);
      return prefix + (isArabic ? toArabicDigits(body) : body) + suffix;
    };

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
            setDisplay(value); // exact original string (keeps any grouping/formatting)
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
