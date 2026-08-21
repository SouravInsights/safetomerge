"use client";

import * as React from "react";
import { LeafShadows, type LeafShadowsProps } from "@/components/landing/leaf-shadows";
import { useDarkMode } from "@/lib/use-dark-mode";
import { useFx } from "@/lib/use-fx";

/* Wires the current color scheme into the canvas opacity (the multiply
   blend needs more weight on dark surfaces) and unmounts the effect
   entirely when the user has turned FX off. */
export function ThemedLeafShadows(props: Omit<LeafShadowsProps, "isDark">) {
  const isDark = useDarkMode();
  const fxOn = useFx();
  if (!fxOn) return null;
  return <LeafShadows {...props} isDark={isDark} />;
}
