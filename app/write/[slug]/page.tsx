import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getHandbookChapter } from '@/lib/handbook';
import fs from 'fs/promises';
import path from 'path';
import Editor from './editor';

export const metadata: Metadata = {
  title: 'Edit Chapter',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function WriteChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // We want to pass the RAW file content to the editor, not just the parsed content.
  // getHandbookChapter returns parsed frontmatter and content, but we want the raw string
  // so the user can edit the frontmatter directly.
  
  const contentDir = path.join(process.cwd(), 'content/handbook');
  const filePath = path.join(contentDir, `${slug}.mdx`);
  
  let rawContent = '';
  try {
    rawContent = await fs.readFile(filePath, 'utf8');
  } catch {
    notFound();
  }

  return (
    <main>
      <Editor slug={slug} initialContent={rawContent} />
    </main>
  );
}
