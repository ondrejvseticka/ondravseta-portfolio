import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border border-indigo-400/30 bg-indigo-500/90 px-8 py-3 text-white shadow-glow-dark hover:border-indigo-400/50 hover:bg-indigo-500 hover:shadow-glow-lg",
        outline:
          "border border-zinc-300 bg-white px-8 py-3 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50 dark:border-white/20 dark:bg-transparent dark:text-white/90 dark:hover:border-white/40 dark:hover:bg-white/5",
        heroOutline:
          "border border-white/25 bg-white/5 px-8 py-3 text-white/90 backdrop-blur-sm hover:border-white/45 hover:bg-white/10",
        skyPrimary:
          "border border-white/20 bg-white px-8 py-3 text-[#3876ba] shadow-lg shadow-black/10 hover:bg-white/95",
        skyOutline:
          "border border-white/60 bg-transparent px-8 py-3 text-white hover:bg-white/10",
        ghost:
          "px-4 py-2 text-zinc-600 hover:text-zinc-900 dark:text-white/70 dark:hover:text-white",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
