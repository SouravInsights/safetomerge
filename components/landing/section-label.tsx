import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function SectionLabel({ className, children, ...props }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "font-mono text-xs tracking-widest uppercase text-muted mb-6",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
