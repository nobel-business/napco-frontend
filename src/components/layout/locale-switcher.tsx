"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Globe } from "@/components/ui/mingcute-icons";

import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const next: Locale = locale === "en" ? "ar" : "en";
  const label = locale === "en" ? "العربية" : "EN";

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
      aria-label={`Switch language to ${next}`}
      className={cn(
        "inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-label-small font-medium text-current transition-colors hover:bg-white/10",
        className,
      )}
    >
      <Globe className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
