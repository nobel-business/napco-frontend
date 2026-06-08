import { cn } from "@/lib/utils";

/** Category pill (Figma article tag). */
export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg bg-secondary-50 px-3 py-1 text-label-small font-medium text-brand dark:bg-secondary-400/15",
        className,
      )}
    >
      {children}
    </span>
  );
}
