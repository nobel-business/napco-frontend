"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";
import { MessageCircle } from "@/components/ui/mingcute-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getLenis } from "@/lib/smooth-scroll-instance";

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
      <Button asChild variant="primary" className="fixed bottom-6 start-6 z-40 shadow-lg">
        <a href="https://wa.me/966541252773" target="_blank" rel="noopener noreferrer" aria-label={t("joinCommunity")}>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
            <MessageCircle className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">{t("joinCommunity")}</span>
        </a>
      </Button>

      <Button
        type="button"
        variant="primary"
        size="icon"
        onClick={() => {
          const lenis = getLenis();
          if (lenis) lenis.scrollTo(0);
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        aria-label={t("backToTop")}
        className={cn(
          "fx-totop fixed bottom-6 end-6 z-40 transition-opacity duration-[var(--motion-slow)]",
          showTop ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </>
  );
}
