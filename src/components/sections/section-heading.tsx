import { cn } from "@/lib/utils";

/** Centered section title (Figma "Tittel": 28px semibold uppercase, no underline). */
export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      <h2 className="text-headline-small font-semibold uppercase text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-body-large text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
