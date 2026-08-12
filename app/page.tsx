import { HeroSection } from "@/components/landing/hero-section";
import { WhySection } from "@/components/landing/why-section";
import { HandbookLoop } from "@/components/landing/handbook-loop";
import { TableOfContents } from "@/components/landing/table-of-contents";
import { AudienceSection } from "@/components/landing/audience-section";
import { ContributionBanner } from "@/components/landing/contribution-banner";
import { AuthorSection } from "@/components/landing/author-section";
import { NewsletterSection } from "@/components/landing/newsletter-section";
import { SectionDivider } from "@/components/landing/section-divider";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <SectionDivider />
      <WhySection />
      <SectionDivider />
      <HandbookLoop />
      <TableOfContents />
      <SectionDivider />
      <AudienceSection />
      <ContributionBanner />
      <AuthorSection />
      <SectionDivider />
      <NewsletterSection />
    </main>
  );
}
