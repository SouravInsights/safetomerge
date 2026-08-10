import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getHandbookChapter, getHandbookChapters } from '@/lib/handbook';
import { mdxComponents } from '@/components/mdx';

export async function generateStaticParams() {
  const chapters = getHandbookChapters();
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export default async function HandbookChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getHandbookChapter(slug);

  if (!chapter) {
    notFound();
  }

  return (
    <article className="max-w-none">
      <MDXRemote source={chapter.content} components={mdxComponents} />
    </article>
  );
}
