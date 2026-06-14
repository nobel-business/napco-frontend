import { getTranslations, setRequestLocale } from "next-intl/server";
import { MediaImage } from "@/components/ui/media-image";
import { Linkedin, Mail, MessageCircle } from "@/components/ui/mingcute-icons";

import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Icon, IconTile } from "@/components/ui/icon";
import { CountUp } from "@/components/ui/count-up";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";

type Feature = { icon: string; title: string; desc: string };
type Stat = { value: string; label: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("about") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const introFeatures = t.raw("intro.features") as Feature[];
  const standards = t.raw("standards.items") as Feature[];
  const members = t.raw("team.members") as Feature[];
  const stats = t.raw("team.stats") as Stat[];
  const ceoParagraphs = t("ceo.body").split("\n\n");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/images/hero-about.png"
      />

      {/* INTRO — national partner */}
      <section className="section">
        <Container className="space-y-10">
          <div className="fx-glow-text-teal grid items-center gap-10 rounded-3xl bg-surface p-6 shadow-card md:p-10 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-5">
              <h2 className="text-headline-small font-semibold uppercase text-foreground">
                {t("intro.title")}
              </h2>
              {t("intro.body")
                .split("\n\n")
                .map((p, i) => (
                  <p key={i} className="text-body-medium text-muted-foreground">
                    {p}
                  </p>
                ))}
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <MediaImage
                src="/images/about-intro.png"
                alt={t("intro.title")}
                fill
                sizes="(min-width: 1024px) 460px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {introFeatures.map((f, i) => (
              <div key={f.title} className="group flex flex-col items-center gap-3 text-center">
                <IconTile name={f.icon} size="lg" color={i % 2 === 1 ? "blue" : "orange"} className="fx-icon-tile" />
                <h3 className="text-title-small font-semibold text-foreground">{f.title}</h3>
                <p className="text-body-small text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* VISION & MISSION */}
      <section className="section">
        <Container className="space-y-10">
          <SectionHeading title={t("visionMission.title")} />
          <div className="grid items-stretch gap-6 md:grid-cols-2">
            <article className="bg-gradient-navy hover-lift group fx-glow-teal fx-glow-text-teal flex flex-col gap-4 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4">
                <span className="fx-icon-tile inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <Icon name="flag" fill className="h-8 w-8" />
                </span>
                <h3 className="text-label-large font-medium">{t("visionMission.visionLabel")}</h3>
              </div>
              <p className="text-body-medium text-primary-100">{t("visionMission.vision")}</p>
            </article>
            <article className="bg-gradient-card-orange hover-lift group fx-glow-orange fx-glow-text-orange flex flex-col gap-4 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4">
                <span className="fx-icon-tile inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <Icon name="puzzle" fill className="h-8 w-8" />
                </span>
                <h3 className="text-label-large font-medium">{t("visionMission.missionLabel")}</h3>
              </div>
              <p className="text-body-medium text-secondary-50">{t("visionMission.mission")}</p>
            </article>
          </div>
        </Container>
      </section>

      {/* CEO MESSAGE */}
      <section className="section">
        <Container>
          <div className="fx-glow-text-teal fx-orbit grid items-center gap-10 rounded-3xl border border-border bg-surface p-6 shadow-card md:grid-cols-[360px_1fr] md:p-10">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <MediaImage
                src="/images/leadership.png"
                alt={t("ceo.name")}
                fill
                sizes="(min-width: 768px) 360px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <p className="text-headline-small font-semibold uppercase text-foreground">
                {t("ceo.eyebrow")}
              </p>
              <div>
                <p className="text-title-medium font-semibold text-brand">{t("ceo.name")}</p>
                <p className="text-body-small text-muted-foreground">{t("ceo.role")}</p>
              </div>
              {ceoParagraphs.map((p, i) => (
                <p key={i} className="text-body-medium text-muted-foreground">
                  {p}
                </p>
              ))}
              <div className="flex items-center justify-end gap-3 pt-1">
                {[Linkedin, MessageCircle, Mail].map((Ic, i) => (
                  <span
                    key={i}
                    className="fx-social fx-glow-teal bg-gradient-navy inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:-translate-y-0.5 hover:opacity-90"
                  >
                    <Ic className="h-5 w-5" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* WORK STANDARDS */}
      <section className="bg-muted/40 section">
        <Container className="space-y-10">
          <SectionHeading title={t("standards.title")} />
          <div className="grid items-stretch gap-10 lg:grid-cols-[1fr_420px]">
            <ul className="space-y-4">
              {standards.map((item) => (
                <li
                  key={item.title}
                  className="hover-lift group fx-glow-orange fx-glow-text-orange flex gap-4 rounded-2xl border border-border bg-surface p-6 shadow-card"
                >
                  <IconTile name={item.icon} className="fx-icon-tile" />
                  <div className="space-y-1.5">
                    <h3 className="text-title-small font-semibold text-foreground">{item.title}</h3>
                    <p className="text-body-small text-muted-foreground">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex h-full flex-col gap-4">
              <div className="fx-img-glow relative aspect-[3/4] overflow-hidden rounded-2xl shadow-card lg:aspect-auto lg:flex-1">
                <MediaImage
                  src="/images/about-standards.png"
                  alt={t("standards.title")}
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-body-small text-muted-foreground">{t("standards.intro")}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* TEAM */}
      <section className="section">
        <Container className="space-y-10">
          <SectionHeading title={t("team.title")} />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m, i) => (
              <div key={m.title} className="group flex flex-col items-center gap-3 text-center">
                <IconTile name={m.icon} size="lg" color={i % 2 === 1 ? "blue" : "orange"} className="fx-icon-tile" />
                <h3 className="text-title-small font-semibold text-foreground">{m.title}</h3>
                <p className="text-body-small text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="fx-glow-text-teal grid items-center gap-8 rounded-3xl bg-surface-tint p-6 shadow-card md:grid-cols-[300px_1fr] md:p-10 dark:bg-surface">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <MediaImage
                src="/images/about-team.png"
                alt=""
                fill
                sizes="(min-width: 768px) 300px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-5">
              <h3 className="text-headline-small font-semibold uppercase text-foreground">
                {t("team.experienceTitle")}
              </h3>
              <p className="text-body-medium text-muted-foreground">{t("team.experienceBody")}</p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface p-6 text-center dark:bg-white/5"
                  >
                    <CountUp
                      value={s.value}
                      className={`text-display-small font-bold ${i === 1 ? "text-aqua-600 dark:text-aqua-400" : "text-brand"}`}
                    />
                    <span className="text-body-small text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* VISION 2030 BANNER — full-bleed, faint desert backdrop, no card */}
      <section className="relative isolate overflow-hidden py-14 lg:py-20">
        {/* Maraya desert backdrop spanning the full section, fading into the page */}
        <MediaImage
          src="/images/vision-2030-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none -z-10 object-cover opacity-[0.14] dark:opacity-[0.2] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)] [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)]"
        />
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-[300px_1fr]">
            {/* Vision 2030 lockup — full logo, never cropped, light/dark variants;
                grows + glows turquoise on hover */}
            <div className="relative h-[180px] w-full transition-[transform,filter] duration-[var(--motion-base)] ease-[var(--ease-spring)] [filter:drop-shadow(0_0_16px_rgba(147,214,231,0.55))] hover:[filter:drop-shadow(0_0_30px_rgba(147,214,231,0.85))] motion-safe:hover:scale-[1.06] md:h-[280px]">
              <MediaImage
                src="/images/vision-2030.png"
                alt={t("vision2030.badge")}
                fill
                sizes="(min-width: 768px) 300px, 100vw"
                className="object-contain object-left rtl:object-right dark:hidden"
              />
              <MediaImage
                src="/images/vision-2030-dark.png"
                alt=""
                fill
                sizes="(min-width: 768px) 300px, 100vw"
                className="hidden object-contain object-left rtl:object-right dark:block"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-headline-small font-semibold uppercase text-foreground">
                {t("vision2030.title")}
              </h2>
              {t("vision2030.body")
                .split("\n\n")
                .map((p, i) => (
                  <p key={i} className="text-body-medium text-muted-foreground">
                    {p}
                  </p>
                ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
