import Link from 'next/link';
import { getHandbookChapters } from '@/lib/handbook';
import { ArrowLeft } from 'lucide-react';
import { SidebarNav } from './sidebar-nav';

export default function HandbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chapters = getHandbookChapters();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-paper">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 lg:w-72 shrink-0 border-r border-rule bg-paper md:h-screen md:sticky md:top-0 overflow-y-auto">
        <div className="p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-sm font-semibold hover:text-verified transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-muted group-hover:text-verified transition-colors" />
            Back to home
          </Link>

          <h2 className="font-mono text-xs tracking-widest uppercase text-muted mb-4">
            Chapters
          </h2>
          <nav aria-label="Handbook chapters">
            <SidebarNav chapters={chapters} />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl px-6 py-12 md:py-16 md:px-12 lg:px-24">
        {children}
      </main>
    </div>
  );
}
