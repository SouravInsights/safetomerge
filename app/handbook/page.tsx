import { redirect } from 'next/navigation';
import { getHandbookChapters } from '@/lib/handbook';

export default function HandbookIndexPage() {
  const chapters = getHandbookChapters();
  
  if (chapters.length > 0) {
    redirect(`/handbook/${chapters[0].slug}`);
  }

  // Fallback if no chapters exist
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-2xl font-semibold mb-4 text-ink">The handbook is empty</h1>
      <p className="text-muted">Head over to the writer dashboard to create your first chapter.</p>
    </div>
  );
}
