"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";
import { TranslateIcon } from "@/components/ui/translate-icon";

/** Shared style for the navbar switch buttons (navy gradient rounded square). */
export const switchButtonClass =
  "fx-ctrl bg-gradient-navy inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const next: Locale = locale === "en" ? "ar" : "en";

  function switchLocale() {
    startTransition(() => {
      // @ts-expect-error -- params typing is route-dependent
      router.replace({ pathname, params }, { locale: next });
    });
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      disabled={isPending}
      aria-label={`Switch language to ${next === "ar" ? "Arabic" : "English"}`}
      title={next === "ar" ? "العربية" : "English"}
      className={cn(switchButtonClass, className)}
    >
      <TranslateIcon className="h-5 w-5" />
    </button>
  );
}
