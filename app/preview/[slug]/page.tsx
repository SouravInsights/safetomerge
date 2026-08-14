import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getHandbookChapter, getHandbookChapters } from '@/lib/handbook';
import { mdxComponents } from '@/components/mdx';

export const metadata: Metadata = {
  title: 'Preview Chapter',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PreviewChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getHandbookChapter(slug);

  if (!chapter) {
    notFound();
  }

  // This is a layout-free route specifically for the iframe live preview in the editor
  return (
    <div className="bg-paper min-h-screen p-8 md:p-12">
      <article className="max-w-none">
        <MDXRemote source={chapter.content} components={mdxComponents} />
      </article>
    </div>
  );
}
