import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon";
import { CountUp } from "@/components/ui/count-up";
import { MediaImage } from "@/components/ui/media-image";
import { SectionHeading } from "@/components/sections/section-heading";
import { HeroVideo } from "@/components/sections/hero-video";
import { IntroGate } from "@/components/providers/intro-gate";
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
  const heroStats = t.raw("hero.stats") as { value: string; label: string }[];
  const partners = [
    ...Array.from({ length: 13 }, (_, i) => `/images/partners/partner-${i + 1}.png`),
    "/images/partners/renile.png",
  ];

  return (
    <>
      {/* First-visit Sonar brand intro (client; once per session, reduced-motion-safe) */}
      <IntroGate />

      {/* HERO — aerial fish-cages video under a water-depth overlay; lower-left composition */}
      <section className="relative isolate flex max-h-[920px] min-h-[80vh] items-center overflow-hidden bg-aqua-900">
        <HeroVideo
          src="/videos/hero-aqua.mp4"
          poster="/images/hero.png"
          className="hero-drift absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="bg-hero-depth absolute inset-0 -z-10" />
        <Container className="relative z-10 w-full py-24 text-white">
          <div className="mx-auto flex max-w-5xl flex-col items-center space-y-6 text-center">
            <p className="text-label-small font-medium uppercase tracking-[0.18em] text-aqua-200">
              {t("hero.eyebrow")}
            </p>
            <h1 className="text-balance text-display-small font-bold uppercase md:text-display-large">
              {t("hero.title")}
            </h1>
            <p className="max-w-5xl text-label-large text-white/85">
              {t.rich("hero.subtitle", { br: () => <br className="hidden lg:block" /> })}
            </p>
            {/* orange accent bar */}
            <span className="block h-1.5 w-12 rounded-full bg-brand" />
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
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
          </div>
          {/* stat strip — calm, tabular proof */}
          <dl className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-x-12 gap-y-5 border-t border-white/15 pt-6 text-center">
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className="text-display-small font-bold tabular-nums">
                  <CountUp value={s.value} />
                </dt>
                <dd className="text-body-small text-white/70">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* TRUSTED PARTNER */}
      <section className="section">
        <Container>
          <div className="fx-glow-text-teal flex flex-col gap-10 rounded-3xl bg-surface-tint p-6 shadow-card md:flex-row md:items-stretch md:p-10 dark:bg-surface">
            <div className="relative aspect-[4/3] shrink-0 overflow-hidden rounded-2xl md:aspect-auto md:w-[440px]">
              <MediaImage
                src="/images/trusted.png"
                alt={t("trusted.title")}
                fill
                sizes="(min-width: 1024px) 466px, 100vw"
                className="object-cover"
              />
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
      <section className="bg-muted/40 section">
        <Container data-reveal-stagger className="flex flex-col items-center gap-10">
          <SectionHeading title={t("services.title")} />
          <div className="grid w-full items-end gap-10 lg:grid-cols-[1fr_466px]">
            <ul className="flex flex-col gap-6">
              {services.map((item) => (
                <li
                  key={item.label}
                  className="group hover-lift fx-glow-orange fx-glow-text-orange flex h-24 items-center gap-6 rounded-2xl border border-tint bg-surface p-6 shadow-card"
                >
                  <IconTile name={item.icon} className="fx-icon-tile" />
                  <span className="text-label-large font-medium text-foreground">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-6 self-stretch pt-10">
              <div className="fx-img-glow relative min-h-[300px] flex-1 overflow-hidden rounded-2xl">
                <MediaImage
                  src="/images/home-services.png"
                  alt={t("services.title")}
                  fill
                  sizes="(min-width: 1024px) 466px, 100vw"
                  className="object-cover"
                />
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
      <section className="section">
        <Container>
          <div className="fx-glow-text-teal fx-orbit flex flex-col gap-10 rounded-3xl bg-surface p-6 shadow-card md:flex-row md:items-stretch md:p-10">
            <div className="relative aspect-square shrink-0 overflow-hidden rounded-2xl md:aspect-auto md:w-[360px]">
              <MediaImage
                src="/images/leadership.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 466px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-10">
              <div className="space-y-6">
                <h2 className="text-headline-small font-semibold uppercase text-foreground">
                  {t("vision.title")}
                </h2>
                <p className="text-body-large text-muted-foreground">{t("vision.body")}</p>
              </div>
              <Button asChild size="lg" variant="secondary" className="self-start">
                <Link href="/about">{t("vision.cta")}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SOLUTIONS */}
      <section className="bg-muted/40 section">
        <Container data-reveal-stagger className="flex flex-col items-center gap-10">
          <SectionHeading title={t("solutions.title")} />
          <div className="grid w-full items-stretch gap-10 lg:grid-cols-[1fr_466px]">
            <ul className="flex flex-col gap-6">
              {solutions.map((item) => (
                <li
                  key={item.title}
                  className="group hover-lift fx-glow-orange fx-glow-text-orange flex gap-6 rounded-2xl border border-tint bg-surface p-6 shadow-card"
                >
                  <IconTile name={item.icon} size="lg" className="fx-icon-tile" />
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
              <div className="fx-img-glow relative min-h-[300px] flex-1 overflow-hidden rounded-2xl">
                <MediaImage
                  src="/images/solutions.png"
                  alt={t("solutions.title")}
                  fill
                  sizes="(min-width: 1024px) 466px, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-body-large text-muted-foreground">{t("solutions.caption")}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* VALUES */}
      <section className="section">
        <Container data-reveal-stagger className="flex flex-col items-center gap-10">
          <SectionHeading title={t("values.title")} />
          <div className="grid w-full items-stretch gap-10 lg:grid-cols-[466px_1fr]">
            <div className="flex flex-col gap-6 self-stretch pt-10">
              <div className="fx-img-glow relative min-h-[300px] flex-1 overflow-hidden rounded-2xl">
                <MediaImage
                  src={t("values.image")}
                  alt={t("values.title")}
                  fill
                  sizes="(min-width: 1024px) 466px, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-body-large text-muted-foreground">{t("values.caption")}</p>
            </div>
            <ul className="flex flex-col gap-6">
              {values.map((item) => (
                <li
                  key={item.title}
                  className="group hover-lift fx-glow-orange fx-glow-text-orange flex gap-6 rounded-2xl border border-tint bg-surface p-6 shadow-card"
                >
                  <IconTile name={item.icon} size="lg" className="fx-icon-tile" />
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
      <section className="bg-muted/40 section">
        <Container data-reveal-stagger className="flex flex-col items-center gap-10">
          <SectionHeading title={t("markets.title")} />
          <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {markets.map((c) => (
              <div
                key={c.name}
                className="group hover-lift flex h-[162px] flex-col items-center justify-center gap-4 rounded-2xl bg-surface-tint p-6 shadow-card dark:bg-surface"
              >
                <div className="relative h-[62px] w-20 transition-[transform,filter] duration-[var(--motion-base)] ease-[var(--ease-spring)] motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:scale-110 motion-safe:group-hover:[filter:drop-shadow(0_6px_14px_rgba(84,187,214,0.45))]">
                  <MediaImage
                    src={c.icon}
                    alt={c.name}
                    fill
                    sizes="80px"
                    placeholder="empty"
                    className="object-contain dark:brightness-0 dark:invert"
                  />
                </div>
                <span className="text-label-medium font-medium text-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WHY CHOOSE */}
      <section className="section">
        <Container data-reveal-stagger className="flex flex-col items-center gap-10">
          <SectionHeading title={t("whyChoose.title")} />
          <div className="grid w-full gap-6 md:grid-cols-2">
            {whyChoose.map((item) => (
              <article
                key={item.title}
                className="group hover-lift fx-glow-orange fx-glow-text-orange flex gap-6 rounded-2xl border border-tint bg-surface p-6 shadow-card"
              >
                <IconTile name={item.icon} size="lg" className="fx-icon-tile" />
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
      <section className="bg-muted/40 section">
        <Container>
          <div className="fx-glow-text-teal space-y-10 rounded-3xl border border-border bg-surface px-6 py-10 shadow-card md:px-10">
            <SectionHeading title={t("partners.title")} />
            <PartnersMarquee logos={partners} />
          </div>
        </Container>
      </section>

      {/* CTA BANNER */}
      <section className="section">
        <Container>
          <div className="relative isolate overflow-hidden rounded-3xl">
            <MediaImage src="/images/home-cta.png" alt="" fill sizes="100vw" className="scale-110 object-cover blur-md" />
            <div className="bg-hero-depth absolute inset-0" />
            <div className="relative flex flex-col items-center gap-10 p-6 text-white md:flex-row md:p-10">
              <div className="flex flex-1 flex-col gap-10">
                <div className="space-y-6">
                  <h2 className="text-headline-small font-semibold uppercase">
                    {t("cta.title")}
                  </h2>
                  <p className="text-body-large">{t("cta.body")}</p>
                </div>
                <Button asChild size="lg" variant="primary" className="self-start">
                  <Link href="/contact">{t("cta.button")}</Link>
                </Button>
              </div>
              <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl md:w-[316px]">
                <MediaImage
                  src="/images/home-cta.png"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 316px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
