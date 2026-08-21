import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Spectral } from "next/font/google";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://www.safetomerge.com";
const siteName = "Safe to Merge";

const description =
  "A practical handbook for building reliable software when AI agents write and ship more of the code. Learn how teams are rethinking software engineering, code review, testing, verification, observability, agent harnesses, and safe autonomy.";

// Viewport settings: tells mobile browsers the screen width and sets the top browser bar color to match the page background
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F5" },
    { media: "(prefers-color-scheme: dark)", color: "#121826" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  // Base URL used to turn relative links (like "/opengraph-image") into full absolute URLs (https://www.safetomerge.com/opengraph-image)
  metadataBase: new URL(siteUrl),

  // Title: default is for the home page; template lets sub-pages automatically append " | Safe to Merge"
  title: {
    default: `${siteName}: Building Reliable Software in the Age of AI Agents`,
    template: `%s | ${siteName}`,
  },

  description,

  applicationName: siteName,

  // Search keywords: helps search crawlers and AI search engines index the relevant topics
  keywords: [
    "Safe to Merge",
    "safetomerge",
    "agentic-engineering",
    "agentic-workflows",
    "ai",
    "ai-agent",
    "ai-agents",
    "ai-engineering",
    "ai-safety",
    "code-review",
    "observability",
    "software",
    "software-engineering",
    "software-reliability",
    "testing",
    "AI coding",
    "agent harnesses",
    "automated code verification",
    "AI PR review",
    "safe autonomy",
    "AI engineering handbook",
  ],

  authors: [
    {
      name: "Sourav Kumar Nanda",
      url: "https://souravinsights.com",
    },
  ],

  creator: "Sourav Kumar Nanda",
  publisher: siteName,

  // Canonical URL: tells search engines that this is the main, authoritative address of the homepage
  alternates: {
    canonical: "/",
  },

  // Crawler rules: tells Googlebot it is allowed to index the page and use high quality image previews
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // OpenGraph: controls how the link appears when shared on social platforms like Twitter/X, LinkedIn, Discord, and Slack
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName}: Building Reliable Software in the Age of AI Agents`,
    description,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteName}: Building Reliable Software in the Age of AI Agents`,
      },
    ],
  },

  // Twitter Card: ensures Twitter/X shows a large preview image and text card when someone tweets your link
  twitter: {
    card: "summary_large_image",
    title: `${siteName}: Building Reliable Software in the Age of AI Agents`,
    description,
    images: ["/opengraph-image"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  category: "technology",
};

// JSON-LD (Structured Data): Machine-readable data for search engines using real site URLs
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description,
  inLanguage: "en-US",
  author: {
    "@type": "Person",
    name: "Sourav Kumar Nanda",
    url: "https://souravinsights.com",
  },
  publisher: {
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
  },
};

// Applies the saved color scheme before first paint so there is no flash of
// the wrong theme. Falls back to the OS preference.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spectral.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Inject structured data into the HTML header so search engines find it immediately */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-clip">
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}