import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /* Folio-style numeral shown before the label, like a numbered section
     in a printed handbook. */
  index?: string;
}

export function SectionLabel({ className, index, children, ...props }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "font-mono text-xs tracking-widest uppercase text-muted mb-6 flex items-baseline",
        className
      )}
      {...props}
    >
      {index ? (
        <span className="text-verified font-medium mr-2.5">{index}</span>
      ) : null}
      {" "}
      <span>{children}</span>
    </p>
  );
}
