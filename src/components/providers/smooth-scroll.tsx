"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

import { setLenis } from "@/lib/smooth-scroll-instance";

/**
 * Lenis smooth scrolling — responsive (lerp-based, no heavy inertia), wheel/trackpad
 * only (native momentum on touch for full control + perf), disabled under reduced-motion.
 * Lenis drives the real document scroll, so window.scrollY and `scroll` events keep
 * working (navbar scroll state, etc.).
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.135, // tighter catch-up to the pointer — responsive, not floaty/laggy
      smoothWheel: true,
      syncTouch: false, // native momentum on touch devices
      wheelMultiplier: 1.35, // more travel per wheel notch — scrolling feels faster
    });
    lenisRef.current = lenis;
    setLenis(lenis);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Same-page anchor links (#enroll, #apply, …) must scroll through Lenis, not native
    // scroll-behavior, or the two fight and the jump is instant/janky. Offset clears the
    // fixed navbar (matches the targets' scroll-mt).
    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor || !anchor.getAttribute("href")) return;
      let url: URL;
      try {
        url = new URL(anchor.href, location.href);
      } catch {
        return;
      }
      // Only same-page hash links (the localized href may be "/en/training#enroll").
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      if (url.hash.length < 2) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -96 });
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Reset to top instantly on route change (Lenis intercepts native scroll restoration).
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
