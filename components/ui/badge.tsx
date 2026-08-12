import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-none border font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors px-2 py-0.5 select-none",
  {
    variants: {
      variant: {
        default: "border-rule bg-rule/40 text-ink",
        verified: "border-verified/30 bg-verified/10 text-verified",
        outline: "border-rule bg-paper text-muted",
        dark: "border-ink bg-ink text-paper",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
