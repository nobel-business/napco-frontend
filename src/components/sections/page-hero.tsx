import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** Full-bleed page hero with navy gradient + optional background image. */
export function PageHero({
  title,
  subtitle,
  image,
  cta,
  className,
}: {
  title: string;
  subtitle?: string;
  image?: string;
  cta?: { label: string; href: string };
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate flex min-h-[600px] flex-col items-center justify-start overflow-hidden lg:min-h-[800px]",
        className,
      )}
    >
      {image ? (
        <>
          <Image src={image} alt="" fill priority className="object-cover" />
          {/* Figma photo-hero overlay: navy gradient rgba(0,1,16,.28→.7) */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy/40 to-navy/70" />
        </>
      ) : (
        /* Light: silver-gray gradient (matches Figma) · Dark: navy */
        <div className="absolute inset-0 bg-gradient-to-b from-[#9aa0ac] to-[#565c69] dark:from-primary-900 dark:via-primary-900/90 dark:to-primary-800" />
      )}
      <Container className="relative z-10 flex flex-col items-center gap-5 pt-40 text-center text-white lg:pt-52">
        <h1 className="max-w-4xl text-display-small font-bold uppercase text-brand md:text-headline-large">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-3xl text-body-medium text-white/80">{subtitle}</p>
        )}
        {cta && (
          <Button asChild size="lg" className="mt-2">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        )}
      </Container>
      {/* Figma: centered orange accent bar at hero base */}
      {image && (
        <span className="absolute bottom-10 left-1/2 z-10 h-1.5 w-24 -translate-x-1/2 rounded-full bg-brand" />
      )}
    </section>
  );
}
