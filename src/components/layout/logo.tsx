import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * NAPCO Aqua horizontal logo. The Figma asset is one white lockup; we split it into the fish
 * mark + the wordmark so the fish can twitch/swim on hover (see .logo-fish in globals.css).
 * `variant="dark"` darkens the white art for light backgrounds. Combined the two slices
 * reconstruct the original 160×36 lockup exactly.
 */
export function Logo({
  className,
  variant = "light",
}: {
  className?: string;
  /** "light" = white art (dark backgrounds) · "dark" = darkened (light backgrounds) */
  variant?: "light" | "dark";
}) {
  const piece = cn(
    "h-10 w-auto transition-[filter] duration-[var(--motion-base)] ease-[var(--ease-out-soft)]",
    variant === "dark" && "brightness-0",
  );
  return (
    <span className={cn("logo-mark inline-flex h-10 items-center", className)} aria-label="NAPCO Aqua">
      <Image src="/images/napco-fish.png" alt="" width={117} height={54} priority className={cn("logo-fish", piece)} />
      <Image src="/images/napco-wordmark.png" alt="NAPCO Aqua" width={123} height={54} priority className={piece} />
    </span>
  );
}
