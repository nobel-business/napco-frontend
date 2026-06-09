import { getTranslations, setRequestLocale } from "next-intl/server";
import { MediaImage } from "@/components/ui/media-image";

import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceBlock, type ServiceBlockData } from "@/components/sections/service-block";

type Numbered = { title: string; desc: string };
type IconItem = { icon: string; title: string; desc: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("services") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const blocks = t.raw("blocks") as ServiceBlockData[];
  const why = t.raw("why.items") as Numbered[];
  const systems = t.raw("systems.items") as IconItem[];

  return (
    <>
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} image="/images/hero-services.png" />

      {/* INTRO */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-10 rounded-3xl bg-surface-tint p-6 shadow-card md:p-10 lg:grid-cols-[1.5fr_1fr] dark:bg-surface">
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="text-label-small font-medium uppercase tracking-[0.14em] text-accent-card dark:text-aqua-300">
                  {t("intro.eyebrow")}
                </p>
                <h2 className="text-headline-small font-semibold uppercase text-foreground">
                  {t("intro.title")}
                </h2>
              </div>
              <p className="text-body-medium text-muted-foreground">{t("intro.body1")}</p>
              <p className="text-body-medium text-muted-foreground">{t("intro.body2")}</p>
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
              <MediaImage
                src="/images/services-intro.png"
                alt={t("intro.title")}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICE BLOCKS */}
      <section className="py-20 lg:py-28">
        <Container className="space-y-12 lg:space-y-16">
          <SectionHeading title={t("blocksTitle")} />
          <div className="space-y-16 lg:space-y-20">
            {blocks.map((block, i) => (
              <ServiceBlock key={block.title} data={block} reverse={i % 2 === 1} />
            ))}
          </div>
        </Container>
      </section>

      {/* WHY — numbered grid */}
      <section className="py-20 lg:py-28">
        <Container className="space-y-12">
          <SectionHeading title={t("why.title")} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {why.map((item, i) => (
              <article
                key={item.title}
                className="hover-lift space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-card"
              >
                <span className="bg-gradient-stat-blue inline-flex h-12 w-12 items-center justify-center rounded-xl text-title-medium font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-title-medium font-semibold text-foreground">{item.title}</h3>
                <p className="text-body-small text-muted-foreground">{item.desc}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* SYSTEMS — icon grid */}
      <section className="py-20 lg:py-28">
        <Container className="space-y-12">
          <SectionHeading title={t("systems.title")} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {systems.map((item) => (
              <article
                key={item.title}
                className="hover-lift group flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center shadow-card"
              >
                <IconTile name={item.icon} className="fx-icon-tile" />
                <h3 className="text-title-medium font-semibold text-foreground">{item.title}</h3>
                <p className="text-body-small text-muted-foreground">{item.desc}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
