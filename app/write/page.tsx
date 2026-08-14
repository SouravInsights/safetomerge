import type { Metadata } from 'next';
import Link from 'next/link';
import { getHandbookChapters } from '@/lib/handbook';
import { createChapter } from '@/app/actions/handbook';
import { redirect } from 'next/navigation';
import { FileEdit, Plus, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Handbook Editor',
  robots: {
    index: false,
    follow: false,
  },
};

export default function WriteDashboard() {
  const chapters = getHandbookChapters();

  async function handleCreate(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    if (!title) return;
    
    const result = await createChapter(title);
    if (result.success && result.slug) {
      redirect(`/write/${result.slug}`);
    }
  }

  return (
    <div className="min-h-screen bg-paper py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-end mb-12 border-b border-rule pb-6">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Handbook Editor</h1>
            <p className="text-muted">Select a chapter to edit or create a new one.</p>
          </div>
          <Link href="/handbook" className="flex items-center gap-2 text-sm text-ink hover:text-verified transition-colors">
            <BookOpen className="w-4 h-4" />
            View Live Handbook
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Chapter List */}
          <section>
            <h2 className="font-mono text-xs tracking-widest uppercase text-muted mb-6">
              Existing Chapters
            </h2>
            <div className="space-y-3">
              {chapters.map((chapter) => (
                <Link 
                  key={chapter.slug}
                  href={`/write/${chapter.slug}`}
                  className="group flex items-center justify-between p-4 bg-white/50 border border-rule hover:border-ink rounded-none transition-colors"
                >
                  <span className="font-medium text-ink">{chapter.title}</span>
                  <FileEdit className="w-4 h-4 text-muted group-hover:text-ink transition-colors" />
                </Link>
              ))}
              {chapters.length === 0 && (
                <p className="text-muted italic">No chapters exist yet.</p>
              )}
            </div>
          </section>

          {/* Create New */}
          <section>
            <h2 className="font-mono text-xs tracking-widest uppercase text-muted mb-6">
              New Chapter
            </h2>
            <form action={handleCreate} className="bg-white/50 border border-rule p-6 rounded-none">
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Chapter Title
              </label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                required
                placeholder="e.g. Setting up CI/CD"
                className="w-full px-4 py-2 bg-transparent border border-rule rounded-none focus:outline-none focus:border-ink mb-4 font-mono text-sm"
              />
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-ink text-paper py-2 px-4 rounded-none hover:bg-ink/90 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                Create Chapter
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
