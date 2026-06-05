import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

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
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      {/* INTRO */}
      <section className="py-20 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-headline-medium font-semibold uppercase text-foreground">
              {t("intro.title")}
            </h2>
            <span className="block h-1 w-14 rounded-full bg-brand" />
            <p className="text-body-medium text-muted-foreground">{t("intro.body1")}</p>
            <p className="text-body-medium text-muted-foreground">{t("intro.body2")}</p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-card">
            <Image src="/images/trusted.png" alt={t("intro.title")} fill className="object-cover" />
          </div>
        </Container>
      </section>

      {/* SERVICE BLOCKS */}
      <section className="bg-muted/40 py-20 lg:py-28">
        <Container className="space-y-16 lg:space-y-24">
          {blocks.map((block, i) => (
            <ServiceBlock key={block.title} data={block} reverse={i % 2 === 1} />
          ))}
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
                className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 text-title-medium font-bold text-white">
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
      <section className="bg-muted/40 py-20 lg:py-28">
        <Container className="space-y-12">
          <SectionHeading title={t("systems.title")} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {systems.map((item) => (
              <article
                key={item.title}
                className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center shadow-card transition-shadow hover:shadow-card-hover"
              >
                <IconTile name={item.icon} />
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
