import Image, { type ImageProps } from "next/image";
import { getBlur } from "@/lib/blur";

/**
 * next/image with automatic blur-up. Looks up a build-time LQIP by `src` and applies it as
 * the blur placeholder, so images fade in from a tiny preview instead of popping from empty.
 *
 * Server components only — it imports the blur map. For client-graph images (e.g. cards
 * rendered inside a "use client" component), pass `blurDataURL` from server-computed data.
 * Always pass an accurate `sizes` for `fill`/responsive images.
 */
export function MediaImage({ src, placeholder, blurDataURL, ...props }: ImageProps) {
  const dataUrl = blurDataURL ?? (typeof src === "string" ? getBlur(src) : undefined);
  return (
    <Image
      src={src}
      placeholder={placeholder ?? (dataUrl ? "blur" : "empty")}
      {...(dataUrl ? { blurDataURL: dataUrl } : {})}
      {...props}
    />
  );
}
