import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-mono text-[11px] tracking-widest uppercase font-extrabold text-ink border-2 border-ink px-2.5 py-1 bg-paper shadow-[2px_2px_0px_0px_#1e2530] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:border-verified hover:text-verified active:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:border-verified active:text-verified transition-all inline-block select-none touch-manipulation cursor-pointer",
        className
      )}
    >
      SAFETOMERGE
    </Link>
  );
}
