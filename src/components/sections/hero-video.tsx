"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background video tuned for perceived performance:
 * - the `poster` paints instantly and carries the first frame (protects LCP);
 * - the MP4 is `preload="none"` and only fetched/played once the browser is idle AND the
 *   hero is in view — it never competes with the initial paint or first card images;
 * - skipped entirely (poster stays) under reduced-motion or data-saver / very slow networks;
 * - pauses when scrolled out of view.
 */
export function HeroVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) return;

    const idle: (cb: () => void) => void =
      typeof window.requestIdleCallback === "function"
        ? (cb) => window.requestIdleCallback(cb)
        : (cb) => window.setTimeout(cb, 200);

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      video.src = src;
      video.load();
      void video.play().catch(() => {});
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) idle(start);
          else if (started) video.pause();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  return (
    <video ref={ref} muted loop playsInline poster={poster} preload="none" className={className} />
  );
}
