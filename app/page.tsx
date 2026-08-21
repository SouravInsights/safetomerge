import { HeroSection } from "@/components/landing/hero-section";
import { WhySection } from "@/components/landing/why-section";
import { HandbookLoop } from "@/components/landing/handbook-loop";
import { TableOfContents } from "@/components/landing/table-of-contents";
import { AudienceSection } from "@/components/landing/audience-section";
import { ContributionBanner } from "@/components/landing/contribution-banner";
import { AuthorSection } from "@/components/landing/author-section";
import { NewsletterSection } from "@/components/landing/newsletter-section";
import { SectionDivider } from "@/components/landing/section-divider";
import { ThemedLeafShadows } from "@/components/landing/themed-leaf-shadows";

export default function Home() {
  return (
    <main className="flex-1">
      <ThemedLeafShadows
        srcMp4="/assets/leaves-shadows.mp4"
        opacity={0.22}
        opacityDark={0.45}
        focusX={0}
        contrast={0.6}
        sway={0.5}
        rays={0.7}
        gust={0.2}
        vignette={0.35}
        motes={0.4}
      />
      <HeroSection />
      <SectionDivider />
      <WhySection />
      <HandbookLoop />
      <TableOfContents />
      <AudienceSection />
      <ContributionBanner />
      <AuthorSection />
      <SectionDivider />
      <NewsletterSection />
    </main>
  );
}
