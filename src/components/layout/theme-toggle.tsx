"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { switchButtonClass } from "./locale-switcher";

type VTDocument = Document & { startViewTransition?: (cb: () => void) => unknown };

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("common");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  // Cross-dissolve the whole page between light/dark via the View Transitions API. flushSync
  // forces the theme class onto <html> synchronously so the transition snapshots the NEW state.
  // No API / reduced-motion → plain instant swap.
  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    const doc = document as VTDocument;
    if (
      typeof doc.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      doc.startViewTransition(() => flushSync(() => setTheme(next)));
    } else {
      setTheme(next);
    }
  };

  return (
    <button
      type="button"
      aria-label={t("toggleTheme")}
      title={t("toggleTheme")}
      onClick={toggleTheme}
      className={cn(switchButtonClass, className)}
    >
      {mounted && isDark ? (
        <Sun key="sun" className="fx-icon-swap h-5 w-5" />
      ) : (
        <Moon key="moon" className="fx-icon-swap h-5 w-5" />
      )}
    </button>
  );
}
