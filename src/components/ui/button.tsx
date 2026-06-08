import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-white hover:bg-[var(--color-brand-hover)] active:scale-[0.98]",
        secondary:
          "bg-accent-card text-white hover:opacity-90 active:scale-[0.98]",
        outline:
          "border border-brand bg-transparent text-brand shadow-none hover:bg-brand hover:text-white active:scale-[0.98]",
        ghost:
          "bg-transparent text-foreground shadow-none hover:bg-muted active:scale-[0.98]",
        navy: "bg-navy text-white hover:bg-primary-800 active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4 text-label-small",
        md: "h-11 px-6 text-label-small",
        lg: "h-12 px-10 text-label-small",
        icon: "h-10 w-10 p-0",
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
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
