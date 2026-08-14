import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getHandbookChapter, getHandbookChapters } from '@/lib/handbook';
import { mdxComponents } from '@/components/mdx';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  const chapters = getHandbookChapters();
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

/**
 * Dynamic Metadata Generator for each Handbook Chapter
 * 
 * When someone visits or shares a specific chapter like "/handbook/observe",
 * this function automatically gives Google and Twitter the chapter's unique title,
 * description, and canonical link instead of using the generic homepage title.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getHandbookChapter(slug);

  if (!chapter) {
    return {
      title: 'Chapter Not Found',
    };
  }

  const title = chapter.title;
  const description =
    chapter.description ||
    `Read ${chapter.title} in the Safe to Merge handbook for engineering teams shipping with AI agents.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/handbook/${slug}`, // Tells search engines this is the exact URL for this chapter
    },
    openGraph: {
      type: 'article',
      title: `${title} | Safe to Merge`,
      description,
      url: `https://www.safetomerge.com/handbook/${slug}`,
      siteName: 'Safe to Merge',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Safe to Merge`,
      description,
    },
  };
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

  const chapters = getHandbookChapters();
  const currentIndex = chapters.findIndex((c) => c.slug === slug);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex >= 0 && currentIndex < chapters.length - 1
      ? chapters[currentIndex + 1]
      : null;

  // Schema.org Structured Data: Helps Google understand this is a chapter/article in a handbook
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: chapter.title,
    description:
      chapter.description ||
      `Read ${chapter.title} in the Safe to Merge handbook for engineering teams shipping with AI agents.`,
    url: `https://www.safetomerge.com/handbook/${slug}`,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'Book',
      name: 'Safe to Merge',
      url: 'https://www.safetomerge.com/handbook',
    },
    author: {
      '@type': 'Person',
      name: 'Sourav Kumar Nanda',
      url: 'https://souravinsights.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Safe to Merge',
      url: 'https://www.safetomerge.com',
    },
  };

  // Breadcrumb schema: Shows the navigational trail in Google search results (Home > Handbook > Chapter Title)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.safetomerge.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Handbook',
        item: 'https://www.safetomerge.com/handbook',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: chapter.title,
        item: `https://www.safetomerge.com/handbook/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="max-w-none">
        <MDXRemote source={chapter.content} components={mdxComponents} />

        {/* Previous / Next Chapter Navigation */}
        <nav
          aria-label="Chapter navigation"
          className="mt-16 pt-8 border-t border-rule flex items-center justify-between gap-4"
        >
          {prevChapter ? (
            <Link
              href={`/handbook/${prevChapter.slug}`}
              className="group flex flex-col items-start p-3 -ml-3 hover:bg-black/5 transition-colors rounded-none"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-muted flex items-center gap-1.5">
                <ArrowLeft className="size-3 group-hover:-translate-x-0.5 transition-transform" />
                Previous Chapter
              </span>
              <span className="text-sm sm:text-base font-semibold text-ink group-hover:text-verified transition-colors mt-1">
                {prevChapter.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextChapter ? (
            <Link
              href={`/handbook/${nextChapter.slug}`}
              className="group flex flex-col items-end text-right p-3 -mr-3 hover:bg-black/5 transition-colors rounded-none ml-auto"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-muted flex items-center gap-1.5">
                Next Chapter
                <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="text-sm sm:text-base font-semibold text-ink group-hover:text-verified transition-colors mt-1">
                {nextChapter.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </>
  );
}
