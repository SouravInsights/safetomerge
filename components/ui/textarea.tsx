import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full min-h-[120px] border border-rule bg-paper px-4 py-3 font-serif text-base text-ink transition-colors outline-none placeholder:text-muted/60 focus:border-ink focus-visible:border-ink disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
