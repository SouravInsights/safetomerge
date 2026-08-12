import * as React from "react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/landing/section-label";

export function WhySection() {
  return (
    <Container size="narrow" className="py-16 sm:py-20" id="why">
      <section>
        <SectionLabel>Why this exists</SectionLabel>
        <div className="space-y-5 text-lg leading-relaxed max-w-2xl">
          <p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.google.com/s2/favicons?domain=posthog.com&sz=64"
              alt="PostHog"
              className="w-4 h-4 rounded-[3px] opacity-90 inline-block align-[-2px] mr-1.5"
            />
            <span className="font-medium text-ink">PostHog</span>{" "}
            <a
              href="https://posthog.com/blog/10k-prs-a-month"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-rule hover:text-verified transition-colors text-ink font-normal"
            >
              went from 1,441 PRs in January to 4,725 in June
            </a>
            . Over that same stretch, the percentage of PRs created by AI agents grew from around 20%
            to over 70%. More teams are heading the same direction. The question
            that comes with it is the same one:{" "}
            <mark className="mark">how do you keep software reliable
            when you can&apos;t personally review every change?</mark>
          </p>
          <p>
            The teams figuring this out are not reviewing code faster. They are
            rethinking the whole pipeline: how production is observed,
            how a change gets understood before it&apos;s merged, how evidence
            gets assembled, and how outcomes feed back into the next decision.
            Humans are moving to the things that seem to need judgment most:
            <mark className="mark">what&apos;s actually worth building,
            what&apos;s actually safe, and whether any of it actually worked.</mark>
          </p>
          <p>
            Most teams already have the raw materials: GitHub, some CI, maybe
            Sentry or PostHog, maybe Playwright. What they don&apos;t have is a
            shared practice for turning those tools into justified confidence as
            agents author a growing share of the code.
          </p>
          <p className="text-ink text-xl leading-relaxed border-l-2 border-mark pl-5 -ml-5">
            I&apos;m writing this by studying the teams who are working it out:
            reading their public writing, tracking what they&apos;re shipping,
            and trying to talk to the engineers directly. What evidence actually
            proves a change is safe. How to assemble it from tools a team
            likely already runs. Where a human still has to be the one who
            decides.
          </p>
        </div>
      </section>
    </Container>
  );
}
