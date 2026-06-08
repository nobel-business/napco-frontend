import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { PartnersMarquee } from "@/components/sections/partners-marquee";

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
  const values = t.raw("values.items") as Feature[];
  const markets = t.raw("markets.countries") as { name: string; icon: string }[];
  const whyChoose = t.raw("whyChoose.items") as Feature[];
  const partners = [
    ...Array.from({ length: 13 }, (_, i) => `/images/partners/partner-${i + 1}.png`),
    "/images/partners/renile.png",
  ];

  return (
    <>
      {/* HERO — aerial fish-cages video background + navy overlay */}
      <section className="relative isolate flex min-h-[680px] items-center overflow-hidden bg-primary-900">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero.png"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        >
          <source src="/videos/hero-aqua.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-900/55 via-primary-900/70 to-primary-900/90" />
        <Container className="relative z-10 flex max-w-[1000px] flex-col items-center gap-10 py-32 text-center text-white">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-headline-large font-semibold uppercase text-brand">
              {t("hero.title")}
            </h1>
            <p className="text-label-large text-white">{t("hero.subtitle")}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button asChild size="lg">
              <Link href="/services">{t("hero.primaryCta")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gray-400 text-white hover:bg-white hover:text-navy"
            >
              <Link href="/contact">{t("hero.secondaryCta")}</Link>
            </Button>
          </div>
          {/* orange accent bar */}
          <span className="mt-2 inline-block h-1.5 w-12 rounded-full bg-brand" />
        </Container>
      </section>

      {/* TRUSTED PARTNER */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="flex flex-col gap-10 rounded-xl bg-surface-tint p-6 shadow-card md:flex-row md:items-stretch md:p-10 dark:bg-surface">
            <div className="relative aspect-[4/3] shrink-0 overflow-hidden rounded-xl md:aspect-auto md:w-[440px]">
              <Image src="/images/trusted.png" alt={t("trusted.title")} fill className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-10">
              <div className="space-y-6">
                <h2 className="text-headline-small font-semibold uppercase text-foreground">
                  {t("trusted.title")}
                </h2>
                <p className="text-body-large text-muted-foreground">{t("trusted.body")}</p>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg bg-surface px-6 py-4 text-center dark:bg-white/5">
                <span className="text-label-large font-medium text-brand">
                  {t("trusted.statValue")}
                </span>
                <span className="text-body-medium text-muted-foreground">
                  {t("trusted.statLabel")}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <section className="bg-muted/40 py-20 lg:py-28">
        <Container className="flex flex-col items-center gap-10">
          <SectionHeading title={t("services.title")} />
          <div className="grid w-full items-end gap-10 lg:grid-cols-[1fr_466px]">
            <ul className="flex flex-col gap-6">
              {services.map((item) => (
                <li
                  key={item.label}
                  className="hover-lift flex h-24 items-center gap-6 rounded-lg border border-tint bg-surface p-6 shadow-sm"
                >
                  <IconTile name={item.icon} />
                  <span className="text-label-large font-medium text-foreground">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-6 self-stretch pt-10">
              <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-xl">
                <Image src="/images/home-services.png" alt={t("services.title")} fill className="object-cover" />
              </div>
              <p className="text-body-large text-muted-foreground">{t("services.caption")}</p>
            </div>
          </div>
          <Button asChild size="lg">
            <Link href="/services">{t("services.cta")}</Link>
          </Button>
        </Container>
      </section>

      {/* VISION */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="flex flex-col gap-10 rounded-xl bg-surface-tint p-6 shadow-card md:flex-row md:items-stretch md:p-10 dark:bg-surface">
            <div className="relative aspect-square shrink-0 overflow-hidden rounded-xl md:aspect-auto md:w-[360px]">
              <Image src="/images/leadership.png" alt="" fill className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-10">
              <div className="space-y-6">
                <h2 className="text-headline-small font-semibold uppercase text-foreground">
                  {t("vision.title")}
                </h2>
                <p className="text-body-large text-muted-foreground">{t("vision.body")}</p>
              </div>
              <Button asChild size="lg" variant="navy" className="self-start">
                <Link href="/about">{t("vision.cta")}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SOLUTIONS */}
      <section className="bg-muted/40 py-20 lg:py-28">
        <Container className="flex flex-col items-center gap-10">
          <SectionHeading title={t("solutions.title")} />
          <div className="grid w-full items-stretch gap-10 lg:grid-cols-[1fr_466px]">
            <ul className="flex flex-col gap-6">
              {solutions.map((item) => (
                <li
                  key={item.title}
                  className="hover-lift flex gap-6 rounded-xl border border-tint bg-surface p-6 shadow-sm"
                >
                  <IconTile name={item.icon} size="lg" />
                  <div className="space-y-4">
                    <h3 className="text-label-large font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-body-medium text-muted-foreground">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-6 self-stretch pt-10">
              <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-xl">
                <Image src="/images/solutions.png" alt={t("solutions.title")} fill className="object-cover" />
              </div>
              <p className="text-body-large text-muted-foreground">{t("solutions.caption")}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* VALUES */}
      <section className="py-20 lg:py-28">
        <Container className="flex flex-col items-center gap-10">
          <SectionHeading title={t("values.title")} />
          <div className="grid w-full items-stretch gap-10 lg:grid-cols-[466px_1fr]">
            <div className="flex flex-col gap-6 self-stretch pt-10">
              <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-xl">
                <Image src={t("values.image")} alt={t("values.title")} fill className="object-cover" />
              </div>
              <p className="text-body-large text-muted-foreground">{t("values.caption")}</p>
            </div>
            <ul className="flex flex-col gap-6">
              {values.map((item) => (
                <li
                  key={item.title}
                  className="hover-lift flex gap-6 rounded-xl border border-tint bg-surface p-6 shadow-sm"
                >
                  <IconTile name={item.icon} size="lg" />
                  <div className="space-y-4">
                    <h3 className="text-label-large font-medium text-foreground">{item.title}</h3>
                    <p className="text-body-medium text-muted-foreground">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* DEEP EXPERTISE — Middle Eastern markets */}
      <section className="bg-muted/40 py-20 lg:py-28">
        <Container className="flex flex-col items-center gap-10">
          <SectionHeading title={t("markets.title")} />
          <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {markets.map((c) => (
              <div
                key={c.name}
                className="flex h-[162px] flex-col items-center justify-center gap-4 rounded-xl bg-surface-tint p-6 shadow-card dark:bg-surface"
              >
                <div className="relative h-[62px] w-20">
                  <Image src={c.icon} alt={c.name} fill className="object-contain dark:brightness-0 dark:invert" />
                </div>
                <span className="text-label-medium font-medium text-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 lg:py-28">
        <Container className="flex flex-col items-center gap-10">
          <SectionHeading title={t("whyChoose.title")} />
          <div className="grid w-full gap-6 md:grid-cols-2">
            {whyChoose.map((item) => (
              <article
                key={item.title}
                className="hover-lift flex gap-6 rounded-xl border border-tint bg-surface p-6"
              >
                <IconTile name={item.icon} size="lg" />
                <div className="space-y-4">
                  <h3 className="text-label-large font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-body-medium text-muted-foreground">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* PARTNERS — infinite logo carousel (contained card: white in light, elevated in dark) */}
      <section className="bg-muted/40 py-20 lg:py-24">
        <Container>
          <div className="space-y-10 rounded-2xl border border-border bg-surface px-6 py-10 shadow-card md:px-10">
            <SectionHeading title={t("partners.title")} />
            <PartnersMarquee logos={partners} />
          </div>
        </Container>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="relative isolate overflow-hidden rounded-xl">
            <Image src="/images/home-cta.png" alt="" fill className="scale-110 object-cover blur-md" />
            <div className="absolute inset-0 bg-gradient-to-b from-navy/45 to-navy/75" />
            <div className="relative flex flex-col items-center gap-10 p-6 text-white md:flex-row md:p-10">
              <div className="flex flex-1 flex-col gap-10">
                <div className="space-y-6">
                  <h2 className="text-headline-small font-semibold uppercase">
                    {t("cta.title")}
                  </h2>
                  <p className="text-body-large">{t("cta.body")}</p>
                </div>
                <Button asChild size="lg" variant="navy" className="self-start">
                  <Link href="/contact">{t("cta.button")}</Link>
                </Button>
              </div>
              <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl md:w-[316px]">
                <Image src="/images/home-cta.png" alt="" fill className="object-cover" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
