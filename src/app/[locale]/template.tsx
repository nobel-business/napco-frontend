"use client";

import { useEffect, useRef } from "react";

// Route transition: template.tsx re-mounts on every navigation. We animate a subtle
// fade + small upward motion (~220ms, see globals.css .route-transition) ONLY on
// client-side navigations — the very first page load renders with no animation so it
// never hides above-the-fold content or delays LCP. Reduced-motion disables it in CSS.
// `children` stays server-rendered; this is just a thin client wrapper.
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const animate = useRef(hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return <div className={animate.current ? "route-transition" : undefined}>{children}</div>;
}
