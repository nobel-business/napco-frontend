import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} image="/images/hero-media.png" />

      {/* GALLERY */}
      <section className="py-20 lg:py-24">
        <Container className="space-y-12">
          <SectionHeading title={t("gallery.title")} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all duration-300 group-hover:bg-navy/45 group-hover:opacity-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand">
                    <Maximize2 className="h-5 w-5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* VIDEOS */}
      <section className="bg-muted/40 py-20 lg:py-28">
        <Container className="space-y-12">
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
