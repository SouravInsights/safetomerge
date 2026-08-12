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
            . Over that same stretch, the percentage of PRs created by AI agents grew
            from around 20% to over 70%. The interesting question is no longer just
            how to make agents write code. It is{" "}
            <mark className="mark">how to build an engineering system that can keep up with that pace.</mark>
          </p>

          <p>
            The teams figuring this out are changing the whole pipeline: how
            production is observed, how intent and context reach an agent, how a
            change is understood before it is merged, how evidence is gathered, and
            how outcomes feed back into the next decision. Humans move toward the
            things that still need judgment: <mark className="mark">what's actually worth building, what is safe enough to ship, how to keep systems reliable.</mark>
          </p>

          <p>
            Most teams already have the raw tools: GitHub, CI, observability,
            browser tests, deployment platforms, and agent tooling. The harder problem
            is connecting them into a system that stays useful as the software,
            models, and workflows change.
          </p>

          <p>
            There is another problem. Faster development can also mean faster accumulation of mess: stale tests, duplicated abstractions, outdated documentation, weak conventions, and architectural drift. The more we ship, the more important this maintenance becomes.
          </p>

          <p className="text-ink text-xl leading-relaxed border-l-2 border-mark pl-5 -ml-5">
            I am writing this by studying teams who are figuring this out: reading their
            engineering work, following what they are shipping, talking to engineers
            directly, and testing the patterns myself. The goal is to understand what actually works, what doesn't, and why.
          </p>
        </div>
      </section>
    </Container>
  );
}
