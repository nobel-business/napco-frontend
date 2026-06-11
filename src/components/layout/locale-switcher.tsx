"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { TranslateIcon } from "@/components/ui/translate-icon";

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
    <Button
      type="button"
      variant="secondary"
      size="icon-sm"
      onClick={switchLocale}
      disabled={isPending}
      aria-label={`Switch language to ${next === "ar" ? "Arabic" : "English"}`}
      title={next === "ar" ? "العربية" : "English"}
      className={cn("fx-ctrl", className)}
    >
      <TranslateIcon className="h-5 w-5" />
    </Button>
  );
}
