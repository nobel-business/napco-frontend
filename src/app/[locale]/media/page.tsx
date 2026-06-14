import { getTranslations, setRequestLocale } from "next-intl/server";
import { MediaImage } from "@/components/ui/media-image";
import { Maximize2 } from "lucide-react";

import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { VideoCard, type VideoItem } from "@/components/cards/video-card";

// Figma "Outstanding Examples of Our Work" repeats one shot (Rectangle 1) across all 6 tiles.
const galleryImages = Array.from({ length: 6 }, () => "/images/media-gallery.png");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("media") };
}

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("media");

  const videos = t.raw("videos.items") as VideoItem[];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} image="/images/hero-media.png" />

      {/* GALLERY */}
      <section className="section">
        <Container data-reveal-stagger className="space-y-10">
          <SectionHeading title={t("gallery.title")} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className="group hover-lift relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card"
              >
                <MediaImage
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[var(--motion-image)] group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all duration-[var(--motion-slow)] group-hover:bg-navy/45 group-hover:opacity-100">
                  <span className="flex h-12 w-12 scale-90 items-center justify-center rounded-full bg-white/90 text-brand transition-transform duration-[var(--motion-base)] group-hover:scale-100">
                    <Maximize2 className="h-5 w-5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* VIDEOS */}
      <section className="bg-muted/40 section">
        <Container data-reveal-stagger className="space-y-10">
          <SectionHeading title={t("videos.title")} />
          <div className="grid gap-6 md:grid-cols-2">
            {videos.map((v, i) => (
              <VideoCard key={i} video={v} durationLabel={t("videos.durationLabel")} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
