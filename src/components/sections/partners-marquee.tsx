import Image from "next/image";

/**
 * Infinite, seamless logo carousel.
 * The track renders the logo set twice and animates -50% (one full set),
 * so the loop is gapless. Pauses on hover · fades at the edges · RTL-aware
 * (reverses via `.marquee-track` in globals) · halts under reduced-motion.
 *
 * dir="ltr" on the wrapper forces left-aligned LTR geometry in both locales, so the
 * width:max-content track is never placed out of view by an RTL parent (logos have no
 * inherent order). The RTL reverse-scroll still applies via [dir="rtl"] .marquee-track.
 */
export function PartnersMarquee({ logos }: { logos: string[] }) {
  const loop = [...logos, ...logos];
  return (
    <div
      dir="ltr"
      className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      <div className="marquee-track flex w-max items-center gap-14 [animation:marquee_45s_linear_infinite] motion-reduce:[animation:none]">
        {loop.map((src, i) => (
          <div
            key={i}
            aria-hidden={i >= logos.length}
            className="group/logo flex h-24 w-60 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-white via-aqua-50 to-aqua-100 px-8 py-5 shadow-card ring-1 ring-aqua-400/25 transition-[transform,box-shadow] duration-[var(--motion-slow)] ease-[var(--ease-spring)] hover:shadow-[0_0_40px_-2px_rgba(31,159,194,0.65)] hover:ring-aqua-400/70 motion-safe:hover:scale-[1.14]"
          >
            <div className="relative h-full w-full transition-transform duration-[var(--motion-base)] ease-[var(--ease-spring)] motion-safe:group-hover/logo:[animation:fx-logo-pulse_0.9s_ease-in-out_infinite]">
              <Image src={src} alt="" fill sizes="224px" className="object-contain" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
