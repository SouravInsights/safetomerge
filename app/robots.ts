import type { MetadataRoute } from "next";

/**
 * Robots.txt Generator (https://www.safetomerge.com/robots.txt)
 * 
 * Tells search engine web crawlers (like Googlebot) which pages they are allowed to visit and index,
 * and which private pages (like your admin dashboard or draft editor) they must ignore.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.safetomerge.com";

  return {
    rules: [
      {
        userAgent: "*",
        // Allow public pages to be searched and indexed
        allow: ["/", "/handbook", "/handbook/", "/contribute"],
        // Block private internal tools from search results
        disallow: ["/admin", "/admin/", "/write", "/write/", "/preview", "/preview/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/handbook", "/handbook/", "/contribute"],
        disallow: ["/admin", "/admin/", "/write", "/write/", "/preview", "/preview/", "/api/"],
      },
    ],
    // Points crawlers directly to your sitemap file
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
