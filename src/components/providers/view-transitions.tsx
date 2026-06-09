"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

type VTDocument = Document & {
  startViewTransition?: (cb: () => Promise<void> | void) => { finished: Promise<void> };
};

/**
 * Premium route transitions via the native View Transitions API.
 *
 * Internal link clicks are intercepted in the capture phase and the navigation is wrapped
 * in `document.startViewTransition`, producing a smooth cross-dissolve between the old and
 * new page (the browser snapshots both states and animates them — no flashing, no harsh
 * replacement). The transition's promise resolves once the new route commits (detected via
 * a pathname effect), with a safety timeout so a snapshot can never hang the page.
 *
 * Works with the existing next-intl links (they render real <a href> with the localized
 * path). Browsers without View Transitions, and reduced-motion users, fall through to the
 * normal instant navigation (with the CSS opacity fallback in globals.css).
 */
export function ViewTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const finishRef = useRef<(() => void) | null>(null);

  // Resolve the pending transition once the new route has committed.
  useEffect(() => {
    if (finishRef.current) {
      finishRef.current();
      finishRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    const doc = document as VTDocument;
    if (typeof window === "undefined" || typeof doc.startViewTransition !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      if ((anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return;
      if (anchor.dataset.noTransition !== undefined) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, location.href);
      } catch {
        return;
      }
      if (url.origin !== location.origin) return;
      // Same page (incl. in-page hash) → let the browser/smooth-scroll handle it.
      if (url.pathname === location.pathname) return;

      e.preventDefault();
      // Stop Next's <Link> handler so the navigation runs once, inside the transition.
      e.stopImmediatePropagation();

      // Shared-element morph: if the clicked link contains a tagged element (e.g. an article
      // card image), give it the matching view-transition-name just before the snapshot so it
      // flies into the destination's element of the same name. Only the clicked card is tagged,
      // so the name stays unique; the element unmounts on navigation, so no cleanup needed.
      const shared = anchor.querySelector<HTMLElement>("[data-vt-name]");
      if (shared?.dataset.vtName) shared.style.viewTransitionName = shared.dataset.vtName;

      doc.startViewTransition!(
        () =>
          new Promise<void>((resolve) => {
            finishRef.current = resolve;
            // Failsafe: never leave the snapshot frozen if the route stalls. Kept short so a
            // slow/un-prefetched route un-freezes quickly rather than feeling like a hang.
            window.setTimeout(() => {
              if (finishRef.current) {
                finishRef.current();
                finishRef.current = null;
              }
            }, 400);
            router.push(url.pathname + url.search + url.hash);
          }),
      );
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // Prefetch on hover intent — warms the route cache right before a click so the new page
  // is ready instantly (complements Next's default in-viewport prefetch; covers links that
  // aren't on screen yet, e.g. footer/cards). Always on; cheap and dedup'd.
  useEffect(() => {
    const prefetched = new Set<string>();
    const onOver = (e: Event) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor || (anchor.target && anchor.target !== "_self")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      let url: URL;
      try {
        url = new URL(anchor.href, location.href);
      } catch {
        return;
      }
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      const path = url.pathname + url.search;
      if (prefetched.has(path)) return;
      prefetched.add(path);
      router.prefetch(path);
    };
    document.addEventListener("mouseover", onOver, { passive: true });
    return () => document.removeEventListener("mouseover", onOver);
  }, [router]);

  return null;
}
