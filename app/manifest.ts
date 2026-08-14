import type { MetadataRoute } from "next";

/**
 * Web App Manifest Generator (https://www.safetomerge.com/manifest.webmanifest)
 * 
 * Tells mobile devices (iOS / Android) and desktop browsers how to treat the website
 * when saved or bookmarked. It specifies the app name, start screen, and branding colors.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Safe to Merge: Building Reliable Software in the Age of AI Agents",
    short_name: "Safe to Merge",
    description:
      "A practical handbook for building reliable software when AI agents write and ship more of the code. Learn how teams are rethinking software engineering, code review, testing, verification, observability, agent harnesses, and safe autonomy.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F5",
    theme_color: "#FAF9F5",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
