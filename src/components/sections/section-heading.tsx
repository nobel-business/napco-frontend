import { cn } from "@/lib/utils";

/** Centered section title (Figma "Tittel": 28px semibold uppercase, no underline). */
export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
  ...rest
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "start";
} & Omit<React.ComponentProps<"div">, "title">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className,
      )}
      {...rest}
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
