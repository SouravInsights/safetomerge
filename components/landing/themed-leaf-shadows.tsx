"use client";

import * as React from "react";
import { LeafShadows, type LeafShadowsProps } from "@/components/landing/leaf-shadows";
import { useDarkMode } from "@/lib/use-dark-mode";

/* Wires the current color scheme into the canvas opacity: the multiply
   blend needs more weight to register on dark surfaces. */
export function ThemedLeafShadows(props: Omit<LeafShadowsProps, "isDark">) {
  const isDark = useDarkMode();
  return <LeafShadows {...props} isDark={isDark} />;
}
