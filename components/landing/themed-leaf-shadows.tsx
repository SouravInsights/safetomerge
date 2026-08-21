"use client";

import * as React from "react";
import { LeafShadows, type LeafShadowsProps } from "@/components/landing/leaf-shadows";
import { useDarkMode } from "@/lib/use-dark-mode";
import { useFx } from "@/lib/use-fx";

/* Wires the current color scheme into the canvas opacity (the multiply
   blend needs more weight on dark surfaces) and the FX preference into
   the canvas's enabled state — the canvas stays mounted when off so its
   viewport measurement from page load is never recaptured at a bad
   moment. */
export function ThemedLeafShadows(props: Omit<LeafShadowsProps, "isDark" | "enabled">) {
  const isDark = useDarkMode();
  const fxOn = useFx();
  return <LeafShadows {...props} isDark={isDark} enabled={fxOn} />;
}
