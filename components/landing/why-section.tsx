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
            <mark className="mark">how to build an engineering system that can absorb that velocity.</mark>
          </p>

          <p>
            The teams figuring this out are changing the whole pipeline: how
            production is observed, how intent and context reach an agent, how a
            change&apos;s blast radius is understood, how evidence gets assembled,
            and how outcomes feed back into the next decision. Humans move toward
            the things that still need judgment:{" "}
            <mark className="mark">what to build, what evidence is enough, and where autonomy should stop.</mark>
          </p>

          <p>
            Most teams already have the raw materials: GitHub, CI, observability,
            browser tests, deployment platforms, agent tooling. The harder problem
            is connecting them into a system that stays trustworthy as the software,
            agents, and workflows change.
          </p>

          <p>
            And there is another problem: agents can make software easier to change
            while also making it easier to accumulate entropy. Stale tests, duplicated
            abstractions, outdated documentation, weak conventions, and architectural
            drift all become things the system has to continuously detect and clean up.
          </p>

          <p className="text-ink text-xl leading-relaxed border-l-2 border-mark pl-5 -ml-5">
            I&apos;m writing this by studying the teams who are working it out:
            reading their public engineering work, following what they are shipping,
            talking to engineers directly, and testing the patterns myself. The goal
            is to understand what actually survives contact with production.
          </p>
        </div>
      </section>
    </Container>
  );
}
