import { cn } from "@/lib/utils";

/**
 * NAPCO Aqua wordmark.
 * NOTE: stylized stand-in mark (fish/wave) + wordmark matching the Figma navbar/footer.
 * Replace the <svg> path with the exact exported brand asset when available.
 */
export function Logo({
  className,
  variant = "light",
}: {
  className?: string;
  /** "light" = white mark (for dark backgrounds), "dark" = navy mark */
  variant?: "light" | "dark";
}) {
  const color = variant === "light" ? "#FFFFFF" : "#000221";
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width="34"
        height="22"
        viewBox="0 0 34 22"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 13c6-9 16-12 30-11-5 3-7 6-9 9 4-1 7-1 9 0-6 4-13 6-20 5-4-1-7-2-10-3z"
          fill={color}
        />
        <circle cx="24" cy="8" r="1.4" fill="#FF782C" />
      </svg>
      <span
        className="text-title-medium font-bold tracking-tight"
        style={{ color }}
      >
        NAPCO
      </span>
    </span>
  );
}
