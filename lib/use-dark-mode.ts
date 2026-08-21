"use client";

import * as React from "react";

/* Tracks the .dark class on the root element. The class is the single
   source of truth: set before paint by the inline script in the root
   layout, flipped by the theme toggle. */
export function useDarkMode() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
