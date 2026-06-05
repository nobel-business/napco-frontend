import { cn } from "@/lib/utils";

/** Centered content wrapper — max-width 1200px with responsive gutters. */
export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container-content)] px-5 sm:px-8 lg:px-10",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
