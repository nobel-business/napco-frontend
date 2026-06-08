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
      <div className="marquee-track flex w-max items-center gap-14 [animation:marquee_45s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]">
        {loop.map((src, i) => (
          <div
            key={i}
            aria-hidden={i >= logos.length}
            className="relative h-12 w-36 shrink-0 opacity-90 transition-opacity duration-[var(--motion-slow)] hover:opacity-100"
          >
            <Image src={src} alt="" fill sizes="144px" className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
