import { notFound } from "next/navigation";
import { MediaImage } from "@/components/ui/media-image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Calendar, User, Eye, Check, Lightbulb } from "@/components/ui/mingcute-icons";

import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/section-heading";
import { ShareButtons } from "@/components/sections/share-buttons";
import { ArticleCard } from "@/components/cards/article-card";
import { getArticle, getArticles } from "@/content/articles";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getArticles(locale).map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticle(locale, slug);
  return { title: article?.title ?? "Article" };
}

type Impl = { title: string; desc: string };

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getArticle(locale, slug);
  if (!article) notFound();

  const t = await getTranslations("articleDetail");

  const benefits = t.raw("benefits") as string[];
  const implementation = t.raw("implementation") as Impl[];
  const related = getArticles(locale).filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      {/* HERO — generic article banner (Aquatech family) */}
      <section className="relative isolate flex min-h-[480px] items-center overflow-hidden lg:min-h-[560px]">
        <MediaImage
          src="/images/hero-article.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ viewTransitionName: "article-hero" }}
          className="object-cover"
        />
        <div className="bg-hero-depth absolute inset-0" />
        <Container className="relative z-10 w-full py-28 text-white">
          <div className="mx-auto flex max-w-4xl flex-col items-center space-y-5 text-center">
            <p className="text-label-small font-medium uppercase tracking-[0.18em] text-aqua-200">
              {t("heroEyebrow")}
            </p>
            <h1 className="text-balance text-display-small font-bold uppercase md:text-headline-large">
              {t("heroTitle")}
            </h1>
            <p className="max-w-4xl text-body-medium text-white/85">{t("heroSubtitle")}</p>
            <span className="block h-1.5 w-16 rounded-full bg-brand" />
          </div>
        </Container>
      </section>

      {/* BODY */}
      <section className="section">
        <Container>
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="flex items-center gap-2 text-body-small text-muted-foreground">
                <Calendar className="h-5 w-5 text-accent-card" /> {article.date}
              </span>
              <span className="flex items-center gap-2 text-body-small text-muted-foreground">
                <User className="h-5 w-5 text-accent-card" /> {t("author")}
              </span>
              <span className="flex items-center gap-2 text-body-small text-muted-foreground">
                <Eye className="h-5 w-5 text-accent-card" /> {t("reads")}
              </span>
              <Badge className="ms-auto">{article.category}</Badge>
            </div>

            <h2 className="text-headline-medium font-semibold uppercase text-foreground">
              {article.title}
            </h2>

            <p className="text-body-large text-muted-foreground">{t("intro")}</p>

            {/* Expert Tip */}
            <div className="flex gap-4 rounded-2xl border-s-4 border-accent-card bg-muted/60 p-6">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                <Lightbulb className="h-5 w-5" />
              </span>
              <div className="space-y-2">
                <h2 className="text-title-medium font-semibold uppercase text-foreground">
                  {t("expertTipTitle")}
                </h2>
                <p className="text-body-small text-muted-foreground">{t("expertTip")}</p>
              </div>
            </div>

            {/* Feature image */}
            <div className="relative aspect-[16/7] overflow-hidden rounded-2xl shadow-card">
              <MediaImage
                src="/images/article-feature.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
              />
            </div>

            {/* Key benefits */}
            <div className="space-y-4">
              <h2 className="text-headline-small font-semibold uppercase text-foreground">
                {t("benefitsTitle")}
              </h2>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-body-medium text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Implementation */}
            <div className="space-y-6">
              <h2 className="text-headline-small font-semibold uppercase text-foreground">
                {t("implementationTitle")}
              </h2>
              <p className="text-body-medium text-muted-foreground">{t("implementationIntro")}</p>
              <div className="grid gap-6 md:grid-cols-3">
                {implementation.map((item, i) => (
                  <article key={item.title} className="hover-lift fx-glow-teal fx-glow-text-teal space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-card">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-stat-blue text-title-medium font-bold text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-title-small font-semibold text-foreground">{item.title}</h3>
                    <p className="text-body-small text-muted-foreground">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SHARE */}
      <section className="pb-8 lg:pb-12">
        <Container>
          <div className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-border bg-surface p-10 text-center shadow-card">
            <h2 className="text-headline-small font-semibold uppercase text-foreground">
              {t("shareTitle")}
            </h2>
            <ShareButtons title={article.title} />
          </div>
        </Container>
      </section>

      {/* RELATED */}
      <section className="bg-muted/40 section">
        <Container className="space-y-10">
          <SectionHeading title={t("relatedTitle")} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
