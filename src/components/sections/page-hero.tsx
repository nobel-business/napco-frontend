import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Inner-page hero — Premium Aquatech family.
 * Deep-water image under a water-depth overlay, lower-left composition, optional cyan
 * eyebrow, white display title, single orange accent bar. (Home has its own taller hero.)
 */
export function PageHero({
  title,
  subtitle,
  image,
  eyebrow,
  cta,
  className,
}: {
  title: string;
  subtitle?: string;
  image?: string;
  eyebrow?: string;
  cta?: { label: string; href: string };
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate flex min-h-[520px] items-end overflow-hidden lg:min-h-[640px]",
        className,
      )}
    >
      {image ? (
        <>
          <Image src={image} alt="" fill priority className="object-cover" />
          <div className="bg-hero-depth absolute inset-0" />
        </>
      ) : (
        <div className="bg-gradient-depth absolute inset-0" />
      )}
      <Container className="relative z-10 w-full pb-14 pt-32 text-white lg:pb-16">
        <div className="max-w-2xl space-y-5">
          {eyebrow && (
            <p className="text-label-small font-medium uppercase tracking-[0.18em] text-aqua-200">
              {eyebrow}
            </p>
          )}
          <h1 className="text-display-small font-bold uppercase md:text-headline-large">
            {title}
          </h1>
          {subtitle && <p className="max-w-xl text-body-medium text-white/85">{subtitle}</p>}
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
