import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone, Facebook, Linkedin, Twitter, Instagram, Youtube } from "@/components/ui/mingcute-icons";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { footerQuickLinks, siteContact } from "@/config/site";
import { Logo } from "./logo";

const socials = [
  { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61566331919225", label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/napcoaqua", label: "Instagram" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/npaqua/", label: "LinkedIn" },
  { Icon: Twitter, href: "https://x.com/NAPCOAQUA", label: "X (Twitter)" },
  { Icon: Youtube, href: "https://www.youtube.com/@napcoaqua", label: "YouTube" },
];

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-footer text-footer-foreground">
      <Container className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        {/* Brand + contact */}
        <div className="space-y-5">
          <Logo variant="light" />
          <ul className="space-y-3 text-body-small text-white/70">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <span>{t("footer.address")}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-brand" />
              <a href={`mailto:${siteContact.email}`} className="hover:text-white">
                {siteContact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-brand" />
              <a href={`tel:${siteContact.footerPhone}`} dir="ltr" className="hover:text-white">
                {siteContact.footerPhone}
              </a>
            </li>
          </ul>
        </div>

        {/* Quick links */}
        <div className="space-y-5">
          <h3 className="text-title-small font-semibold">
            {t("footer.quickLinks")}
          </h3>
          <ul className="space-y-3 text-body-small text-white/70">
            {footerQuickLinks.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="hover:text-white">
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Get started */}
        <div className="space-y-5">
          <h3 className="text-title-small font-semibold">
            {t("footer.getStarted")}
          </h3>
          <div className="flex flex-col items-start gap-3 sm:flex-row lg:flex-col">
            <Button asChild>
              <Link href="/contact">{t("nav.contact")}</Link>
            </Button>
            <Button asChild variant="outline" className="border-aqua-400 text-aqua-200">
              <Link href="/training">{t("footer.bookConsultation")}</Link>
            </Button>
          </div>
          <div className="flex items-center gap-4 pt-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="fx-social text-white/80 transition-colors hover:text-brand"
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-body-small text-white/60 sm:flex-row">
          <p>{t("footer.copyright")}</p>
          <p>
            {t("footer.poweredBy")}{" "}
            <span className="font-bold text-white">NOBEL BUSINESS</span>
          </p>
        </Container>
      </div>
    </footer>
  );
}
