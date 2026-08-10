'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const contentDir = path.join(process.cwd(), 'content/handbook');

export async function saveChapter(slug: string, content: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  await fs.writeFile(filePath, content, 'utf8');
  revalidatePath(`/handbook/${slug}`);
  revalidatePath('/handbook');
  revalidatePath('/write');
  revalidatePath(`/write/${slug}`);
  return { success: true };
}

export async function createChapter(title: string) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const filePath = path.join(contentDir, `${slug}.mdx`);
  
  // Check if file already exists
  try {
    await fs.access(filePath);
    return { success: false, error: 'Chapter already exists with this slug.' };
  } catch {
    // File doesn't exist, we can proceed
  }

  const initialContent = `---
title: "${title}"
sidebar_position: 99
---

# ${title}

Start writing here...
`;

  await fs.writeFile(filePath, initialContent, 'utf8');
  revalidatePath('/handbook');
  revalidatePath('/write');
  return { success: true, slug };
}
