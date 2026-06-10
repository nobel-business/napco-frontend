"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { INTRO_ENABLED } from "@/config/site";
import { SonarIntro } from "@/components/sections/sonar-intro";

const KEY = "napco-intro-seen";

/**
 * First-visit Sonar intro gate (home only). Plays the brand reveal over the page once per
 * session, then dissolves to the site. Skippable (click / scroll / Enter / Esc / Skip button);
 * fully bypassed under reduced-motion. A no-flash inline script in the layout paints the abyss
 * cover before hydration so the homepage never flickers behind it.
 */
export function IntroGate() {
  const t = useTranslations("common");
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Decide on mount (client only) — keep SSR output null so the homepage HTML is clean.
  useEffect(() => {
    if (!INTRO_ENABLED) {
      document.documentElement.classList.remove("intro-active");
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.remove("intro-active");
      return;
    }
    try {
      if (sessionStorage.getItem(KEY)) {
        document.documentElement.classList.remove("intro-active");
        return;
      }
    } catch {
      return;
    }
    setShow(true);
  }, []);

  const dismiss = useCallback(() => {
    setLeaving(true);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    document.documentElement.classList.remove("intro-active"); // unlock scroll + drop pre-paint cover
    window.setTimeout(() => setShow(false), 600); // matches the fade-out duration
  }, []);

  // Lock scroll while shown; Enter/Space/Esc dismiss.
  useEffect(() => {
    if (!show) return;
    document.documentElement.classList.add("intro-active");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, dismiss]);

  if (!show) return null;

  return (
    <div
      className={cn("sonar-overlay", leaving && "sonar-overlay--leaving")}
      role="dialog"
      aria-modal="true"
      aria-label="NAPCO Aqua"
      onClick={dismiss}
      onWheel={dismiss}
      onTouchMove={dismiss}
    >
      <SonarIntro />
      <button
        type="button"
        className="sonar-skip"
        onClick={(e) => {
          e.stopPropagation();
          dismiss();
        }}
      >
        {t("skipIntro")}
      </button>
    </div>
  );
}
