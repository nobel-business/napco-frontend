import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Global button system — one pill family.
 * Variants: primary (orange gradient) · secondary (marine gradient) · outline (marine) · ghost.
 * Icon-only buttons = circular sizes (icon / icon-sm / icon-lg) composed with any variant.
 * Shared hover (lift + brightness + shadow), press (scale 0.97), and one focus ring; light + dark.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[transform,box-shadow,background-color,border-color,color,filter] duration-200 ease-[var(--ease-out-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-btn-orange text-white shadow-card hover:-translate-y-0.5 hover:shadow-card-hover hover:brightness-105",
        secondary:
          "bg-gradient-btn-marine text-white shadow-card hover:-translate-y-0.5 hover:shadow-card-hover hover:brightness-105",
        outline:
          "border border-aqua-500 text-aqua-600 hover:bg-aqua-500 hover:text-white dark:border-aqua-400 dark:text-aqua-200 dark:hover:bg-aqua-500 dark:hover:text-white",
        ghost: "text-foreground hover:bg-muted",
      },
      size: {
        sm: "h-10 px-5 text-label-small",
        md: "h-12 px-7 text-label-small",
        lg: "h-14 px-9 text-label-small",
        icon: "h-12 w-12 p-0",
        "icon-sm": "h-10 w-10 p-0",
        "icon-lg": "h-16 w-16 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
