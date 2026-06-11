import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { ArticlesBrowser } from "@/components/sections/articles-browser";
import { getArticles, getCategories } from "@/content/articles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles" });
  return { title: t("hero.title") };
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("articles");

  const articles = getArticles(locale);
  const categories = getCategories(locale);

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} image="/images/hero-articles.png" />
      <section className="section">
        <Container>
          <ArticlesBrowser articles={articles} categories={categories} moreLabel={t("more")} />
        </Container>
      </section>
    </>
  );
}
