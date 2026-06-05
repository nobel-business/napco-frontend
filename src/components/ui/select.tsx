import * as React from "react";
import { ChevronDown } from "@/components/ui/mingcute-icons";
import { cn } from "@/lib/utils";

/** Styled native select (RTL-safe; chevron uses logical end position). */
export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-12 w-full appearance-none rounded-xl border border-input bg-surface ps-4 pe-11 text-body-small text-foreground shadow-sm outline-none transition-colors focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute end-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
});
Select.displayName = "Select";
