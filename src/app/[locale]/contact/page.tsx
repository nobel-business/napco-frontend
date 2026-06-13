import { getTranslations, setRequestLocale } from "next-intl/server";
import { MediaImage } from "@/components/ui/media-image";
import { Mail, Phone, Clock } from "@/components/ui/mingcute-icons";

import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { siteContact } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("contact") };
}

function InfoRow({
  icon: Icon,
  color,
  title,
  note,
  value,
  href,
  valueClass,
}: {
  icon: typeof Mail;
  color: "orange" | "blue";
  title: string;
  note: string;
  value: string;
  href?: string;
  valueClass: string;
}) {
  return (
    <div className="group flex gap-4">
      <span
        className={cn(
          "fx-icon-tile inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-sm",
          color === "orange"
            ? "bg-gradient-to-br from-secondary-300 to-secondary-500"
            : "bg-gradient-to-br from-primary-400 to-primary-600",
        )}
      >
        <Icon className="h-6 w-6" />
      </span>
      <div className="space-y-0.5">
        <h3 className="text-title-small font-semibold text-foreground">{title}</h3>
        <p className="text-body-small text-muted-foreground">{note}</p>
        {href ? (
          <a href={href} dir="ltr" className={cn("text-body-small font-medium", valueClass)}>
            {value}
          </a>
        ) : (
          <p className={cn("text-body-small font-medium", valueClass)}>{value}</p>
        )}
      </div>
    </div>
  );
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/images/hero-contact.png"
      />

      {/* FORM + INFO */}
      <section className="section">
        <Container className="space-y-10">
          <SectionHeading title={t("mainTitle")} />
          <div className="grid gap-8 lg:grid-cols-2">
            <ContactForm />

            <div className="space-y-6">
              <h2 className="text-headline-small font-semibold uppercase text-foreground">
                {t("info.heading")}
              </h2>
              <div className="fx-glow-text space-y-6 rounded-3xl border border-border bg-surface p-6 shadow-card md:p-8">
                <InfoRow
                  icon={Mail}
                  color="orange"
                  title={t("info.emailTitle")}
                  note={t("info.emailNote")}
                  value={siteContact.email}
                  href={`mailto:${siteContact.email}`}
                  valueClass="text-brand"
                />
                <InfoRow
                  icon={Phone}
                  color="blue"
                  title={t("info.phoneTitle")}
                  note={t("info.phoneNote")}
                  value={siteContact.phone}
                  href={`tel:${siteContact.phone}`}
                  valueClass="text-aqua-600 dark:text-aqua-400"
                />
                <InfoRow
                  icon={Clock}
                  color="orange"
                  title={t("info.hoursTitle")}
                  note={t("info.hoursValue")}
                  value=""
                  valueClass="hidden"
                />
              </div>

              {/* Expert support */}
              <div className="bg-gradient-navy fx-glow-teal fx-orbit space-y-4 rounded-3xl p-6 text-white shadow-card md:p-8">
                <h3 className="text-title-large font-semibold">{t("info.expertTitle")}</h3>
                <p className="text-body-small text-white/80">{t("info.expertBody")}</p>
                <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/10 p-4 text-center">
                  <span className="text-headline-medium font-bold">{t("info.expertStatValue")}</span>
                  <span className="text-body-small text-white/80">{t("info.expertStatLabel")}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* MAP — illustrated world map (Figma "image 9") */}
      <section className="pb-12 lg:pb-16">
        <Container className="flex justify-center">
          <div className="relative aspect-[800/520] w-full max-w-[800px] transition-[transform,filter] duration-[var(--motion-slow)] ease-[var(--ease-spring)] hover:[filter:drop-shadow(0_0_36px_rgba(31,159,194,0.6))] motion-safe:hover:scale-[1.02]">
            <MediaImage
              src="/images/contact-map.png"
              alt={t("map.label")}
              fill
              sizes="(min-width: 800px) 800px, 100vw"
              className="object-contain"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
