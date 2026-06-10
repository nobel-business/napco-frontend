"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "@/components/ui/mingcute-icons";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { mainNav } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Warm every primary route up front so tab-to-tab navigation commits instantly.
  useEffect(() => {
    for (const item of mainNav) router.prefetch(item.href);
    router.prefetch("/contact");
  }, [router]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--motion-slow)]",
        scrolled
          ? "border-b border-border/60 text-foreground backdrop-blur-xl"
          : "bg-transparent text-white",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" aria-label="NAPCO Aqua home">
          <Logo variant={scrolled ? "dark" : "light"} className="shrink-0" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "whitespace-nowrap rounded-lg py-2 text-label-small font-medium uppercase transition-colors",
                isActive(item.href)
                  ? "bg-brand px-4 text-white"
                  : "hover:text-brand",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Actions — Contact Us (navy gradient) + matching language & theme switch buttons */}
        <div className="flex items-center gap-3">
          <Button asChild size="sm" variant="navy" className="hidden md:inline-flex">
            <Link href="/contact">{t("contact")}</Link>
          </Button>
          <LocaleSwitcher className="hidden sm:inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex" />

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? (
              <X key="x" className="fx-icon-swap h-6 w-6" />
            ) : (
              <Menu key="menu" className="fx-icon-swap h-6 w-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile panel */}
      {open && (
        <div className="mobile-panel border-t border-border/60 bg-[var(--background)]/95 text-foreground backdrop-blur-xl lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-title-small uppercase transition-colors hover:bg-muted",
                  isActive(item.href) && "text-brand",
                )}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <LocaleSwitcher className="hover:bg-muted" />
              <ThemeToggle />
              <Button asChild size="sm" variant="navy" className="flex-1">
                <Link href="/contact">{t("contact")}</Link>
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
