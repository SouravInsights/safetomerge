import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Chapter {
  slug: string;
  title: string;
  description?: string;
  sidebarPosition: number;
  content: string;
}

const contentDir = path.join(process.cwd(), 'content/handbook');

export function getHandbookChapters(): Omit<Chapter, 'content'>[] {
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);
  const chapters = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      const slug = file.replace(/\.mdx$/, '');

      // Generate a fallback description from content if not provided in frontmatter
      const cleanExcerpt = content
        .replace(/^#+.*$/gm, '')
        .replace(/[#*`>_\[\]]/g, '')
        .trim()
        .split('\n')[0]
        ?.slice(0, 160);

      return {
        slug,
        title: data.title || slug,
        description: data.description || cleanExcerpt || undefined,
        sidebarPosition: data.sidebar_position || 999,
      };
    });

  return chapters.sort((a, b) => a.sidebarPosition - b.sidebarPosition);
}

export function getHandbookChapter(slug: string): Chapter | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  const cleanExcerpt = content
    .replace(/^#+.*$/gm, '')
    .replace(/[#*`>_\[\]]/g, '')
    .trim()
    .split('\n')[0]
    ?.slice(0, 160);

  return {
    slug,
    title: data.title || slug,
    description: data.description || cleanExcerpt || undefined,
    sidebarPosition: data.sidebar_position || 999,
    content,
  };
}
