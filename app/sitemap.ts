import type { MetadataRoute } from "next";
import { getHandbookChapters } from "@/lib/handbook";

/**
 * Dynamic Sitemap Generator (https://www.safetomerge.com/sitemap.xml)
 * 
 * Search engines (Google, Bing) use sitemaps like a table of contents to discover
 * all pages on your site, when they were last modified, and how frequently to re-check them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.safetomerge.com";
  const now = new Date();

  // 1. Static Core Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0, // Highest priority: the homepage
    },
    {
      url: `${baseUrl}/handbook`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contribute`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 2. Dynamic Handbook Chapter Pages (automatically lists /handbook/introduction, /handbook/observe, etc.)
  const chapters = getHandbookChapters();
  const chapterRoutes: MetadataRoute.Sitemap = chapters.map((chapter) => ({
    url: `${baseUrl}/handbook/${chapter.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...chapterRoutes];
}
