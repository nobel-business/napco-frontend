import { cn } from "@/lib/utils";

/**
 * NAPCO Aqua horizontal logo. The white art (fish + wordmark slices) is rendered as a CSS mask
 * filled with `currentColor`, so the lockup recolors cleanly via text color:
 *   - variant "light"  → white  (over the dark hero image, and on the dark footer)
 *   - variant "dark"   → on a solid surface: brand blue (#0008A3) in light mode, white in dark mode
 * The fish slice keeps its hover twitch (see .logo-fish in globals.css). Combined, the two slices
 * reconstruct the original lockup.
 */
const PIECES = [
  { src: "/images/napco-fish.png", ratio: "117 / 54", extra: "logo-fish" },
  { src: "/images/napco-wordmark.png", ratio: "123 / 54", extra: "" },
];

export function Logo({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "logo-mark inline-flex h-10 items-center",
        variant === "dark" ? "text-accent-card dark:text-white" : "text-white",
        className,
      )}
      aria-label="NAPCO Aqua"
    >
      {PIECES.map((p) => (
        <span
          key={p.src}
          className={cn("logo-piece", p.extra)}
          style={
            { "--logo-src": `url(${p.src})`, "--logo-aspect": p.ratio } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}
