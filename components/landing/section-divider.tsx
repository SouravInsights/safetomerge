import * as React from "react";
import { Asterism } from "@/components/landing/asterism";

/* Section break in the style of a printed book: hairlines flanking a
   small asterism instead of a bare rule. */
export function SectionDivider() {
  return (
    <div className="max-w-3xl mx-auto px-6" aria-hidden="true">
      <div className="flex items-center gap-5 py-1 text-muted/40">
        <span className="h-px flex-1 bg-rule" />
        <Asterism className="shrink-0" />
        <span className="h-px flex-1 bg-rule" />
      </div>
    </div>
  );
}
