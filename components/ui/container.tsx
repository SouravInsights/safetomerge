import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto px-4 sm:px-6 w-full", {
  variants: {
    size: {
      narrow: "max-w-3xl",
      wide: "max-w-6xl",
      full: "max-w-7xl",
    },
  },
  defaultVariants: {
    size: "wide",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

function Container({ className, size, ...props }: ContainerProps) {
  return (
    <div className={cn(containerVariants({ size }), className)} {...props} />
  );
}

export { Container, containerVariants };
