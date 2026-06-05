import { cn } from "@/lib/utils";

/** Label + control wrapper with optional error message. */
export function Field({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={htmlFor} className="block text-label-small font-medium text-foreground">
        {label}
      </label>
      {children}
      {error && <p className="text-body-small text-red-500">{error}</p>}
    </div>
  );
}
