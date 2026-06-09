import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * NAPCO Aqua horizontal logo — exact export from Figma ("Napco - horizontal logo 2").
 * The asset is the white wordmark; on light backgrounds we darken it via filter.
 */
export function Logo({
  className,
  variant = "light",
}: {
  className?: string;
  /** "light" = white logo (dark backgrounds) · "dark" = darkened (light backgrounds) */
  variant?: "light" | "dark";
}) {
  return (
    <Image
      src="/images/napco-logo.png"
      alt="NAPCO Aqua"
      width={160}
      height={36}
      priority
      className={cn(
        "h-9 w-auto transition-[filter] duration-[var(--motion-base)] ease-[var(--ease-out-soft)]",
        variant === "dark" && "brightness-0",
        className,
      )}
    />
  );
}
