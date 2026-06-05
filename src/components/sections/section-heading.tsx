import { cn } from "@/lib/utils";

/** Centered section title with the orange underline accent (Figma pattern). */
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
      <h2 className="text-headline-medium font-semibold uppercase text-foreground">
        {title}
      </h2>
      <span className="h-1 w-14 rounded-full bg-brand" />
      {subtitle && (
        <p className="max-w-2xl text-body-medium text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
