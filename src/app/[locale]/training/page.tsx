import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "@/components/ui/mingcute-icons";

import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Icon, IconTile } from "@/components/ui/icon";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceBlock } from "@/components/sections/service-block";
import { TrainingForm } from "@/components/forms/training-form";

type Track = { icon: string; title: string; desc: string; tag: string };
type Group = { title: string; image: string; caption?: string; items: string[] };
type Step = { title: string; desc: string };
type Card = { icon: string; variant: "blue" | "orange"; title: string; desc: string; bullets: string[] };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("training") };
}

export default async function TrainingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("training");

  const tracks = t.raw("tracks.items") as Track[];
  const groups = t.raw("programs.groups") as Group[];
  const steps = t.raw("steps.items") as Step[];
  const cards = t.raw("dualCta.cards") as Card[];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/images/hero-training.png"
        cta={{ label: t("hero.cta"), href: "#enroll" }}
      />

      {/* INTRO */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-10 rounded-2xl bg-surface-tint p-6 shadow-card md:p-10 lg:grid-cols-[1.5fr_1fr] dark:bg-surface">
            <div className="space-y-5">
              <h2 className="text-headline-small font-semibold uppercase text-foreground">
                {t("intro.title")}
              </h2>
              <p className="text-body-medium text-muted-foreground">{t("intro.body1")}</p>
              <p className="text-body-medium text-muted-foreground">{t("intro.body2")}</p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image src="/images/train-intro.png" alt={t("intro.title")} fill className="object-cover" />
            </div>
          </div>
        </Container>
      </section>

      {/* TRACKS */}
      <section className="py-20 lg:py-28">
        <Container className="space-y-12">
          <SectionHeading title={t("tracks.title")} />
          <div className="grid gap-6 lg:grid-cols-3">
            {tracks.map((track) => (
              <article
                key={track.title}
                className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-card"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-stat-blue text-white">
                  <Icon name={track.icon} fill className="h-6 w-6" />
                </span>
                <h3 className="text-title-medium font-semibold text-foreground">{track.title}</h3>
                <p className="text-body-small text-muted-foreground">{track.desc}</p>
                <div className="flex items-start gap-2 pt-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-body-small font-medium text-muted-foreground">{track.tag}</span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* PROGRAMS IN DETAIL */}
      <section className="py-20 lg:py-28">
        <Container className="space-y-12 lg:space-y-16">
          <SectionHeading title={t("programs.title")} />
          <div className="space-y-16 lg:space-y-20">
            {groups.map((group, i) => (
              <ServiceBlock key={group.title} data={group} reverse={i % 2 === 1} />
            ))}
          </div>
        </Container>
      </section>

      {/* STEPS */}
      <section className="py-20 lg:py-28">
        <Container className="space-y-12">
          <SectionHeading title={t("steps.title")} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <article
                key={step.title}
                className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-card"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-stat-blue text-title-medium font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-title-small font-semibold text-foreground">{step.title}</h3>
                <p className="text-body-small text-muted-foreground">{step.desc}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* DUAL CTA */}
      <section className="py-20 lg:py-24">
        <Container className="space-y-12">
          <SectionHeading title={t("dualCta.title")} />
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((card) => (
              <article
                key={card.title}
                className={cn(
                  "space-y-4 rounded-3xl p-8 text-white shadow-card md:p-10",
                  card.variant === "blue" ? "bg-gradient-navy" : "bg-gradient-card-orange",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-title-large font-semibold">{card.title}</h3>
                    <p className="text-body-medium text-white/85">{card.desc}</p>
                  </div>
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Icon name={card.icon} fill className="h-6 w-6" />
                  </span>
                </div>
                <ul className="space-y-2 pt-2">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-body-small text-white/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ENROLLMENT FORM */}
      <section id="enroll" className="bg-muted/40 py-20 lg:py-28 scroll-mt-24">
        <Container className="max-w-3xl space-y-10">
          <SectionHeading title={t("form.title")} />
          <TrainingForm />
        </Container>
      </section>
    </>
  );
}
