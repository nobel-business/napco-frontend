import { getTranslations, setRequestLocale } from "next-intl/server";
import { MediaImage } from "@/components/ui/media-image";
import { Calendar, Check, ChevronLeft, ChevronRight } from "@/components/ui/mingcute-icons";

import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatTile } from "@/components/cards/stat-tile";

type Stat = { icon: string; color: "orange" | "blue"; value: string; label: string };
type SystemCard = {
  image: string;
  tag: string;
  icon: string;
  iconColor: "orange" | "blue";
  title: string;
  desc: string;
  checklist: string[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("blog") };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  const stats = t.raw("stats") as Stat[];
  const systems = t.raw("systems.items") as SystemCard[];

  return (
    <>
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} image="/images/hero-blog.png" />

      {/* FEATURED */}
      <section className="py-20 lg:py-28">
        <Container className="space-y-10">
          <SectionHeading title={t("featured.sectionTitle")} />
          <div className="flex items-center gap-4">
            <button
              aria-label={t("featured.viewAll")}
              className="fx-glide-start hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-sm transition hover:bg-muted active:scale-95 lg:inline-flex"
            >
              <ChevronLeft className="h-5 w-5 rtl-flip" />
            </button>

            <article className="flex flex-1 flex-col gap-6 rounded-3xl border border-border bg-surface p-5 shadow-card md:flex-row md:items-center md:p-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:w-72 md:shrink-0">
                <MediaImage
                  src="/images/blog-featured.png"
                  alt={t("featured.title")}
                  fill
                  sizes="(min-width: 768px) 288px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <Badge>{t("featured.tag")}</Badge>
                <h3 className="text-headline-small font-semibold text-foreground">
                  {t("featured.title")}
                </h3>
                <p className="text-body-medium text-muted-foreground">{t("featured.desc")}</p>
                <div className="flex items-center gap-2 text-body-small text-muted-foreground">
                  <Calendar className="h-4 w-4 text-brand" />
                  <span>{t("featured.date")}</span>
                </div>
              </div>
            </article>

            <button
              aria-label={t("featured.viewAll")}
              className="fx-glide-end hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-sm transition hover:bg-muted active:scale-95 lg:inline-flex"
            >
              <ChevronRight className="h-5 w-5 rtl-flip" />
            </button>
          </div>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/articles">{t("featured.viewAll")}</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* STATS */}
      <section className="py-12 lg:py-16">
        <Container className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <StatTile key={s.label} icon={s.icon} value={s.value} label={s.label} color={s.color} />
          ))}
        </Container>
      </section>

      {/* SYSTEMS GRID */}
      <section className="bg-muted/40 py-20 lg:py-28">
        <Container className="space-y-12">
          <SectionHeading title={t("systems.title")} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {systems.map((card) => (
              <article
                key={card.title}
                className="hover-lift group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <MediaImage
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span
                    className={cn(
                      "fx-icon-tile absolute bottom-3 start-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface shadow-md",
                      card.iconColor === "blue" ? "text-accent-card" : "text-brand",
                    )}
                  >
                    <Icon name={card.icon} fill className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-title-medium font-semibold text-foreground">{card.title}</h3>
                  <p className="text-body-small text-muted-foreground">{card.desc}</p>
                  <ul className="mt-2 space-y-2">
                    {card.checklist.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-body-small text-foreground">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                          <Check className="h-3 w-3" />
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
