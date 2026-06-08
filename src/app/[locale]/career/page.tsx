import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon, IconTile } from "@/components/ui/icon";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { TestimonialCarousel, type Testimonial } from "@/components/sections/testimonial-carousel";
import { CareerForm } from "@/components/forms/career-form";

type Feature = { icon: string; color: "orange" | "blue"; title: string; desc: string };
type Gain = { icon: string; title: string; desc: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("career") };
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("career");

  const testimonials = t.raw("testimonials.items") as Testimonial[];
  const features = t.raw("features") as Feature[];
  const gains = t.raw("gain.items") as Gain[];

  return (
    <>
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} image="/images/hero-career.png" />

      {/* TESTIMONIALS */}
      <section className="py-20 lg:py-28">
        <Container className="space-y-12">
          <SectionHeading title={t("testimonials.title")} />
          <TestimonialCarousel items={testimonials} />
        </Container>
      </section>

      {/* FEATURES */}
      <section className="pb-12 lg:pb-16">
        <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center gap-3 text-center">
              <span
                className={cn(
                  "inline-flex h-14 w-14 items-center justify-center rounded-xl text-white shadow-sm",
                  f.color === "orange"
                    ? "bg-gradient-to-br from-secondary-300 to-secondary-500"
                    : "bg-gradient-to-br from-primary-400 to-primary-600",
                )}
              >
                <Icon name={f.icon} className="h-7 w-7" />
              </span>
              <h3 className="text-title-small font-semibold text-foreground">{f.title}</h3>
              <p className="text-body-small text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* AMBASSADOR */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid items-center gap-8 rounded-3xl border border-border bg-surface p-5 shadow-card md:grid-cols-[280px_1fr] md:p-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src="/images/trusted.png" alt="" fill className="object-cover" />
            </div>
            <div className="space-y-4">
              <h2 className="text-headline-small font-semibold uppercase text-foreground">
                {t("ambassador.title")}
              </h2>
              <p className="text-body-medium text-muted-foreground">{t("ambassador.body")}</p>
              <Button asChild variant="secondary">
                <Link href="#apply">{t("ambassador.cta")}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* WHAT WILL YOU GAIN */}
      <section className="py-20 lg:py-28">
        <Container className="space-y-12">
          <SectionHeading title={t("gain.title")} />
          <div className="grid gap-6 md:grid-cols-2">
            {gains.map((g) => (
              <article
                key={g.title}
                className="flex gap-5 rounded-2xl border border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <IconTile name={g.icon} />
                <div className="space-y-2">
                  <h3 className="text-title-medium font-semibold text-foreground">{g.title}</h3>
                  <p className="text-body-small text-muted-foreground">{g.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="bg-muted/40 py-20 lg:py-28 scroll-mt-24">
        <Container className="max-w-3xl space-y-10">
          <SectionHeading title={t("form.title")} />
          <CareerForm />
        </Container>
      </section>
    </>
  );
}
