import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "@/components/ui/mingcute-icons";

import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon";
import { SectionHeading } from "@/components/sections/section-heading";

type ListItem = { icon: string; label: string };
type Feature = { icon: string; title: string; desc: string };

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const services = t.raw("services.items") as ListItem[];
  const solutions = t.raw("solutions.items") as Feature[];
  const whyChoose = t.raw("whyChoose.items") as Feature[];
  const partners = [
    ...Array.from({ length: 13 }, (_, i) => `/images/partners/partner-${i + 1}.png`),
    "/images/partners/renile.png",
  ];

  return (
    <>
      {/* HERO — light: silver-gray gradient (Figma) · dark: navy */}
      <section className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-gradient-to-b from-[#9aa0ac] to-[#565c69] dark:from-primary-900 dark:to-primary-800">
        <Container className="relative z-10 flex flex-col items-center gap-6 py-32 text-center text-white">
          <h1 className="max-w-4xl text-display-medium font-bold uppercase text-brand">
            {t("hero.title")}
          </h1>
          <p className="max-w-2xl text-body-large text-white/85">
            {t("hero.subtitle")}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/services">{t("hero.primaryCta")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white hover:text-navy"
            >
              <Link href="/contact">{t("hero.secondaryCta")}</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* TRUSTED PARTNER */}
      <section className="py-20 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
            <Image src="/images/trusted.png" alt={t("trusted.title")} fill className="object-cover" />
          </div>
          <div className="space-y-5">
            <h2 className="text-headline-large font-semibold uppercase text-foreground">
              {t("trusted.title")}
            </h2>
            <p className="text-body-medium text-muted-foreground">{t("trusted.body")}</p>
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-display-small font-bold text-brand">
                {t("trusted.statValue")}
              </span>
              <span className="text-body-medium text-muted-foreground">
                {t("trusted.statLabel")}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <section className="bg-muted/40 py-20 lg:py-28">
        <Container className="space-y-12">
          <SectionHeading title={t("services.title")} />
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ul className="divide-y divide-border">
              {services.map((item) => (
                <li key={item.label} className="flex items-center gap-4 py-4">
                  <IconTile name={item.icon} />
                  <span className="text-title-small font-semibold text-foreground">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
            <div className="space-y-5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-card">
                <Image src="/images/services.png" alt={t("services.title")} fill className="object-cover" />
              </div>
              <p className="text-body-small text-muted-foreground">{t("services.caption")}</p>
              <Button asChild>
                <Link href="/services">{t("services.cta")}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* VISION */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-10 rounded-3xl bg-gradient-to-br from-primary-50 to-surface p-6 shadow-card md:grid-cols-[320px_1fr] md:p-10 dark:from-surface dark:to-muted">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src="/images/leadership.png" alt="" fill className="object-cover" />
            </div>
            <div className="space-y-5">
              <h2 className="text-headline-medium font-semibold uppercase text-foreground">
                {t("vision.title")}
              </h2>
              <p className="text-body-medium text-muted-foreground">{t("vision.body")}</p>
              <Button asChild variant="secondary">
                <Link href="/about">{t("vision.cta")}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SOLUTIONS */}
      <section className="bg-muted/40 py-20 lg:py-28">
        <Container className="space-y-12">
          <SectionHeading title={t("solutions.title")} />
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_420px]">
            <ul className="space-y-6">
              {solutions.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <IconTile name={item.icon} />
                  <div className="space-y-1.5">
                    <h3 className="text-title-small font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-body-small text-muted-foreground">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-card">
                <Image src="/images/solutions.png" alt={t("solutions.title")} fill className="object-cover" />
              </div>
              <p className="text-body-small text-muted-foreground">{t("solutions.caption")}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 lg:py-28">
        <Container className="space-y-12">
          <SectionHeading title={t("whyChoose.title")} />
          <div className="grid gap-6 md:grid-cols-2">
            {whyChoose.map((item) => (
              <article
                key={item.title}
                className="flex gap-5 rounded-2xl border border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <IconTile name={item.icon} />
                <div className="space-y-2">
                  <h3 className="text-title-large font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-body-small text-muted-foreground">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* PARTNERS */}
      <section className="bg-muted/40 py-16">
        <Container className="space-y-10">
          <SectionHeading title={t("partners.title")} />
          <div className="grid grid-cols-3 items-center justify-items-center gap-8 sm:grid-cols-4 lg:grid-cols-7">
            {partners.map((src) => (
              <div key={src} className="relative h-16 w-full opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0">
                <Image src={src} alt="" fill className="object-contain" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="relative isolate overflow-hidden rounded-3xl px-8 py-14 text-white md:px-14">
            <Image src="/images/home-cta.png" alt="" fill className="-z-10 object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 to-navy/70" />
            <div className="max-w-2xl space-y-5">
              <h2 className="text-headline-large font-semibold uppercase">
                {t("cta.title")}
              </h2>
              <p className="text-body-medium text-white/80">{t("cta.body")}</p>
              <Button asChild size="lg">
                <Link href="/contact" className="gap-2">
                  {t("cta.button")}
                  <ArrowRight className="h-5 w-5 rtl-flip" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
