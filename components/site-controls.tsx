"use client";

import * as React from "react";
import { Popover } from "@base-ui/react/popover";
import { Leaf, Moon, SlidersHorizontal, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/lib/use-dark-mode";
import { useFx } from "@/lib/use-fx";

const rowIcon = "w-3.5 h-3.5 shrink-0";

export function SiteControls() {
  const isDark = useDarkMode();
  const fxOn = useFx();

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    /* The browser bar color is derived from the token, not restated:
       re-read the root background after the scheme flips. */
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", getComputedStyle(root).backgroundColor);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable, theme just won't persist */
    }
  };

  const toggleFx = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-fx") === "off";
    if (next) {
      root.removeAttribute("data-fx");
    } else {
      root.setAttribute("data-fx", "off");
    }
    try {
      localStorage.setItem("fx", next ? "on" : "off");
    } catch {
      /* storage unavailable, preference just won't persist */
    }
  };

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
      <Popover.Root>
      <Popover.Trigger
        aria-label="Display settings"
        className="inline-flex items-center justify-center w-9 h-9 rounded-none select-none border-2 border-edge bg-paper text-ink shadow-[2px_2px_0_0_var(--plate)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:border-verified hover:text-verified data-[popup-open]:shadow-none data-[popup-open]:translate-x-[2px] data-[popup-open]:translate-y-[2px] transition-all touch-manipulation"
      >
        <SlidersHorizontal className="w-4 h-4" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="bottom" align="end" sideOffset={10} positionMethod="fixed" className="z-50">
          <Popover.Popup className="w-52 border-2 border-edge bg-paper p-1.5 shadow-[3px_3px_0_0_var(--plate)] outline-none rounded-none">
            <Button
              variant="ghost"
              onClick={toggleTheme}
              aria-pressed={isDark}
              className="w-full h-9 px-2.5 justify-between font-mono text-xs uppercase tracking-wider"
            >
              <span className="inline-flex items-center gap-2">
                {isDark ? <Sun className={rowIcon} /> : <Moon className={rowIcon} />}
                Theme
              </span>
              <span className="text-muted">{isDark ? "Dark" : "Light"}</span>
            </Button>
            <Button
              variant="ghost"
              onClick={toggleFx}
              aria-pressed={fxOn}
              className="w-full h-9 px-2.5 justify-between font-mono text-xs uppercase tracking-wider"
            >
              <span className="inline-flex items-center gap-2">
                <Leaf className={rowIcon} />
                Effects
              </span>
              <span className="text-muted">{fxOn ? "On" : "Off"}</span>
            </Button>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
