import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, Phone, Clock, MapPin } from "@/components/ui/mingcute-icons";

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
    <div className="flex gap-4">
      <span
        className={cn(
          "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-sm",
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
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      {/* FORM + INFO */}
      <section className="py-20 lg:py-24">
        <Container className="space-y-12">
          <SectionHeading title={t("mainTitle")} />
          <div className="grid gap-8 lg:grid-cols-2">
            <ContactForm />

            <div className="space-y-6">
              <h2 className="text-headline-small font-semibold uppercase text-foreground">
                {t("info.heading")}
              </h2>
              <div className="space-y-6 rounded-3xl border border-border bg-surface p-6 shadow-card md:p-8">
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
                  valueClass="text-accent-card dark:text-primary-200"
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
              <div className="space-y-4 rounded-3xl bg-accent-card p-6 text-white shadow-card md:p-8">
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

      {/* MAP */}
      <section className="pb-24">
        <Container>
          <div className="relative isolate flex min-h-[360px] items-center justify-center overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-50 to-surface dark:from-surface dark:to-muted">
            {/* decorative pins */}
            <span className="absolute left-[22%] top-[35%] h-3 w-3 rounded-full bg-brand shadow-[0_0_0_6px_rgba(255,120,44,0.2)]" />
            <span className="absolute left-[58%] top-[55%] h-3 w-3 rounded-full bg-accent-card shadow-[0_0_0_6px_rgba(0,8,163,0.18)]" />
            <span className="absolute left-[72%] top-[30%] h-3 w-3 rounded-full bg-brand shadow-[0_0_0_6px_rgba(255,120,44,0.2)]" />
            <span className="absolute left-[40%] top-[68%] h-3 w-3 rounded-full bg-accent-card shadow-[0_0_0_6px_rgba(0,8,163,0.18)]" />
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg">
                <MapPin className="h-7 w-7" />
              </span>
              <p className="max-w-sm text-title-small font-semibold text-foreground">
                {t("map.label")}
              </p>
              <p className="text-body-small text-muted-foreground">{siteContact.address}</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
