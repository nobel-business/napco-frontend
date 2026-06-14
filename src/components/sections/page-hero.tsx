import type { ReactNode } from "react";
import { MediaImage } from "@/components/ui/media-image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Inner-page hero — Premium Aquatech family.
 * Deep-water image under a water-depth overlay, CENTERED composition, aqua eyebrow (a thematic
 * blue phrase per page), white display title (balanced wrap — single line where it fits), single
 * orange accent bar. (Home has its own taller, lower-left hero.)
 */
export function PageHero({
  title,
  subtitle,
  image,
  eyebrow,
  cta,
  className,
  wide = false,
  subtitleWide = false,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  image?: string;
  eyebrow?: string;
  cta?: { label: string; href: string };
  className?: string;
  /** Widen the text column (max-w-6xl) — lets a long title break onto two lines. */
  wide?: boolean;
  /** Also widen the subtitle to max-w-6xl (otherwise it stays max-w-4xl). */
  subtitleWide?: boolean;
}) {
  const colW = wide ? "max-w-6xl" : "max-w-4xl";
  const subW = subtitleWide ? "max-w-6xl" : "max-w-4xl";
  return (
    <section
      className={cn(
        "relative isolate flex min-h-[520px] items-center overflow-hidden lg:min-h-[640px]",
        className,
      )}
    >
      {image ? (
        <>
          <MediaImage src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="bg-hero-depth absolute inset-0" />
        </>
      ) : (
        <div className="bg-gradient-depth absolute inset-0" />
      )}
      <Container className="relative z-10 w-full py-28 text-white">
        <div className={cn("mx-auto flex flex-col items-center space-y-5 text-center", colW)}>
          {eyebrow && (
            <p className="text-label-small font-medium uppercase tracking-[0.18em] text-aqua-200">
              {eyebrow}
            </p>
          )}
          <h1 className="text-balance text-display-small font-bold uppercase md:text-headline-large">
            {title}
          </h1>
          {subtitle && <p className={cn("text-body-medium text-white/85", subW)}>{subtitle}</p>}
          {/* orange accent bar */}
          <span className="block h-1.5 w-16 rounded-full bg-brand" />
          {cta && (
            <div className="pt-1">
              <Button asChild size="lg">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
