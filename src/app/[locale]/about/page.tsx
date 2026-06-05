import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Linkedin, Mail, MessageCircle } from "@/components/ui/mingcute-icons";

import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon";
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
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      {/* INTRO — national partner */}
      <section className="py-20 lg:py-28">
        <Container className="space-y-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-5">
              <h2 className="text-headline-medium font-semibold uppercase text-foreground">
                {t("intro.title")}
              </h2>
              <span className="block h-1 w-14 rounded-full bg-brand" />
              <p className="text-body-medium text-muted-foreground">{t("intro.body")}</p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-card">
              <Image src="/images/about-intro.png" alt={t("intro.title")} fill className="object-cover" />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {introFeatures.map((f) => (
              <div key={f.title} className="flex flex-col items-start gap-3">
                <IconTile name={f.icon} />
                <h3 className="text-title-small font-semibold text-foreground">{f.title}</h3>
                <p className="text-body-small text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* VISION & MISSION */}
      <section className="bg-muted/40 py-20 lg:py-28">
        <Container className="space-y-12">
          <SectionHeading title={t("visionMission.title")} />
          <div className="grid gap-6 md:grid-cols-2">
            <article className="space-y-4 rounded-3xl bg-accent-card p-8 text-white shadow-card md:p-10">
              <h3 className="text-title-large font-semibold">{t("visionMission.visionLabel")}</h3>
              <p className="text-body-medium text-white/85">{t("visionMission.vision")}</p>
            </article>
            <article className="space-y-4 rounded-3xl bg-brand p-8 text-white shadow-card md:p-10">
              <h3 className="text-title-large font-semibold">{t("visionMission.missionLabel")}</h3>
              <p className="text-body-medium text-white/90">{t("visionMission.mission")}</p>
            </article>
          </div>
        </Container>
      </section>

      {/* CEO MESSAGE */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-10 rounded-3xl border border-border bg-surface p-6 shadow-card md:grid-cols-[360px_1fr] md:p-10">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src="/images/leadership.png" alt={t("ceo.name")} fill className="object-cover" />
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
              <div className="flex items-center gap-3 pt-1">
                {[Linkedin, MessageCircle, Mail].map((Ic, i) => (
                  <span
                    key={i}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-brand hover:text-white"
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
      <section className="bg-muted/40 py-20 lg:py-28">
        <Container className="space-y-12">
          <SectionHeading title={t("standards.title")} subtitle={t("standards.intro")} />
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_420px]">
            <ul className="space-y-4">
              {standards.map((item) => (
                <li
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-border bg-surface p-5 shadow-card"
                >
                  <IconTile name={item.icon} />
                  <div className="space-y-1.5">
                    <h3 className="text-title-small font-semibold text-foreground">{item.title}</h3>
                    <p className="text-body-small text-muted-foreground">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-card lg:sticky lg:top-28">
              <Image src="/images/solutions.png" alt={t("standards.title")} fill className="object-cover" />
            </div>
          </div>
        </Container>
      </section>

      {/* TEAM */}
      <section className="py-20 lg:py-28">
        <Container className="space-y-12">
          <SectionHeading title={t("team.title")} />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m) => (
              <div key={m.title} className="flex flex-col items-center gap-3 text-center">
                <IconTile name={m.icon} />
                <h3 className="text-title-small font-semibold text-foreground">{m.title}</h3>
                <p className="text-body-small text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid items-center gap-8 rounded-3xl border border-border bg-surface p-6 shadow-card md:grid-cols-[300px_1fr] md:p-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src="/images/about-team.png" alt="" fill className="object-cover" />
            </div>
            <div className="space-y-5">
              <h3 className="text-headline-small font-semibold text-foreground">
                {t("team.experienceTitle")}
              </h3>
              <p className="text-body-medium text-muted-foreground">{t("team.experienceBody")}</p>
              <div className="flex flex-wrap gap-10 pt-2">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-baseline gap-2">
                    <span className="text-display-small font-bold text-brand">{s.value}</span>
                    <span className="max-w-[140px] text-body-small text-muted-foreground">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* VISION 2030 BANNER */}
      <section className="pb-24">
        <Container>
          <div className="grid items-center gap-8 rounded-3xl border border-border bg-gradient-to-r from-primary-50 to-surface p-8 shadow-card md:grid-cols-[220px_1fr] md:p-12 dark:from-surface dark:to-muted">
            <div className="flex flex-col items-center justify-center gap-1 border-e-0 md:border-e md:border-border md:pe-8">
              <span className="text-display-small font-extrabold text-accent-card">
                {t("vision2030.badge")}
              </span>
              <span className="text-center text-body-small text-muted-foreground">
                {t("vision2030.country")}
              </span>
            </div>
            <div className="space-y-4">
              <h2 className="text-headline-small font-semibold uppercase text-foreground">
                {t("vision2030.title")}
              </h2>
              <p className="text-body-medium text-muted-foreground">{t("vision2030.body")}</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
