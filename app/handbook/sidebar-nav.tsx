"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ChapterItem {
  slug: string;
  title: string;
}

export function SidebarNav({ chapters }: { chapters: ChapterItem[] }) {
  const pathname = usePathname();

  return (
    <ul className="space-y-1.5">
      {chapters.map((chapter) => {
        const href = `/handbook/${chapter.slug}`;
        const isActive = pathname === href;

        return (
          <li key={chapter.slug}>
            <Link
              href={href}
              className={`block px-3 py-2 text-sm transition-colors rounded-none ${
                isActive
                  ? "bg-black/5 dark:bg-white/5 font-semibold text-verified"
                  : "text-muted hover:text-ink hover:bg-black/[0.02] dark:hover:bg-white/5"
              }`}
            >
              {chapter.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
