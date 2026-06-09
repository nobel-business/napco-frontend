import type Lenis from "lenis";

// Shared handle to the live Lenis instance so non-provider code (back-to-top button,
// anchor links) can drive the same smooth scroll instead of fighting it with native
// window.scrollTo / scroll-behavior. Null when Lenis is inactive (reduced-motion / SSR).
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}
