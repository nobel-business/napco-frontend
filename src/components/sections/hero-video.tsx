"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background video. The video is the intended, always-on visual — the `poster`
 * exists only as the very first paint before the first frame decodes, never as a
 * lasting fallback. So it autoplays eagerly on every mount and keeps itself playing:
 * - re-asserts play() on mount, on back/forward-cache restore (`pageshow`), and when
 *   tabbed back to (`visibilitychange`) — these are the moments a revisit could otherwise
 *   leave the poster showing instead of the video;
 * - pauses only while fully scrolled out of view, and resumes on return (performance);
 * - reduced-motion / data-saver / 2g are the sole cases where the poster intentionally
 *   stays (no autoplay), for accessibility and bandwidth.
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

    const play = () => {
      // only when at least partly on screen — avoids fighting the scroll-out pause
      if (video.paused && video.getBoundingClientRect().bottom > 0) {
        void video.play().catch(() => {});
      }
    };

    play();
    const onPageShow = () => play();
    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
    };
    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) void video.play().catch(() => {});
          else video.pause();
        }
      },
      { threshold: 0 },
    );
    io.observe(video);

    return () => {
      io.disconnect();
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      preload="auto"
      className={className}
    />
  );
}
