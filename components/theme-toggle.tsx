"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable, theme just won't persist */
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 border-2 border-edge text-ink shadow-[2px_2px_0_0_var(--plate)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:border-verified hover:text-verified active:shadow-none active:translate-x-[2px] active:translate-y-[2px] touch-manipulation"
    >
      <Sun className="w-4 h-4 hidden dark:block" />
      <Moon className="w-4 h-4 dark:hidden" />
    </Button>
  );
}
