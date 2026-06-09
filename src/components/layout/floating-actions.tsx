"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";
import { MessageCircle } from "@/components/ui/mingcute-icons";

import { cn } from "@/lib/utils";

/** Persistent floating CTAs: WhatsApp "join our community" (start) + back-to-top (end). */
export function FloatingActions() {
  const t = useTranslations("common");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#"
        aria-label={t("joinCommunity")}
        className="bg-gradient-tile-orange fixed bottom-6 start-6 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 text-label-small font-medium text-white shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">{t("joinCommunity")}</span>
      </a>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={t("backToTop")}
        className={cn(
          "fixed bottom-6 end-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-[opacity,transform] duration-[var(--motion-slow)] hover:-translate-y-0.5 hover:bg-[var(--color-brand-hover)]",
          showTop ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </>
  );
}
