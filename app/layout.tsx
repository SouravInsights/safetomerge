import type { Metadata } from "next";
import { IBM_Plex_Mono, Spectral } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Safe to Merge: Software is moving faster than you can review it",
  description:
    "At PostHog, agents open over 70% of all pull requests. The pipeline that worked when humans wrote every line doesn't hold at that volume. This handbook is about how teams are rebuilding it: what evidence actually proves a change is safe, how to assemble it from tools you already run, and where a human still has to be the one who decides.",
  openGraph: {
    title: "Safe to Merge: Software is moving faster than you can review it",
    description:
      "At PostHog, agents open over 70% of all pull requests. The pipeline that worked when humans wrote every line doesn't hold at that volume. This handbook is about how teams are rebuilding it: what evidence actually proves a change is safe, how to assemble it from tools you already run, and where a human still has to be the one who decides.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spectral.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
