import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Team's Workflow",
  description:
    "How does your team actually ship code when agents write a lot of it? Share your workflows, testing loops, failures, and lessons from production to shape the Safe to Merge handbook.",
  alternates: {
    canonical: "/contribute",
  },
  openGraph: {
    type: "website",
    title: "Share Your Team's Workflow | Safe to Merge",
    description:
      "How does your team actually ship code when agents write a lot of it? Share your workflows, testing loops, failures, and lessons from production to shape the Safe to Merge handbook.",
    url: "https://www.safetomerge.com/contribute",
    siteName: "Safe to Merge",
  },
  twitter: {
    card: "summary_large_image",
    title: "Share Your Team's Workflow | Safe to Merge",
    description:
      "How does your team actually ship code when agents write a lot of it? Share your workflows, testing loops, failures, and lessons from production to shape the Safe to Merge handbook.",
  },
};

export default function ContributeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
