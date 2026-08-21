import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-none font-mono text-xs uppercase tracking-wider transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 active:translate-x-[1px] active:translate-y-[1px] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default:
          "bg-ink text-paper border border-ink hover:bg-verified hover:border-verified hover:text-paper font-semibold shadow-xs",
        outline:
          "border border-rule bg-paper text-ink hover:border-ink hover:text-ink hover:bg-white dark:hover:bg-white/10",
        verified:
          "bg-verified/10 text-verified border border-verified/30 hover:bg-verified hover:border-verified hover:text-paper font-semibold",
        ghost:
          "text-muted hover:text-ink hover:bg-black/5 dark:hover:bg-white/10 border border-transparent",
        link:
          "text-ink underline underline-offset-4 decoration-rule hover:text-verified hover:decoration-verified p-0 h-auto active:translate-x-0 active:translate-y-0",
      },
      size: {
        default: "h-9 px-4 gap-2",
        xs: "h-6 px-2 gap-1 text-[11px]",
        sm: "h-8 px-3 gap-1.5 text-xs",
        lg: "h-11 px-5 gap-2 text-sm font-semibold",
        icon: "size-9 p-0",
        "icon-sm": "size-8 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof ButtonPrimitive> & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
