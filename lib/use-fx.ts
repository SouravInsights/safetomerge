"use client";

import * as React from "react";

/* Tracks the FX preference: data-fx="off" on the root element disables the
   ambient effects layer. Set before paint by the inline script in the root
   layout, flipped by the FX toggle. */
export function useFx() {
  const [fxOn, setFxOn] = React.useState(true);

  React.useEffect(() => {
    const root = document.documentElement;
    const sync = () => setFxOn(root.getAttribute("data-fx") !== "off");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-fx"] });
    return () => observer.disconnect();
  }, []);

  return fxOn;
}
