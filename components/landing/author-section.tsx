import * as React from "react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/landing/section-label";

export const STUDIED_TEAMS = [
  { name: "PostHog", domain: "posthog.com", href: "https://posthog.com/blog/10k-prs-a-month" },
  { name: "CodeRabbit", domain: "coderabbit.ai", href: "https://www.coderabbit.ai/blog/agentic-sdlc-workflow" },
  { name: "OpenAI", domain: "openai.com", href: "https://openai.com/index/harness-engineering/" },
  { name: "Cursor", domain: "cursor.com", href: "https://cursor.com/blog/security-agents" },
  { name: "Ramp", domain: "ramp.com", href: "https://builders.ramp.com/post/why-we-built-our-background-agent" },
  { name: "Sourcegraph", domain: "sourcegraph.com", href: "https://sourcegraph.com/blog/agentic-coding" },
  { name: "Replit", domain: "replit.com", href: "https://replit.com/blog/inside-replits-snapshot-engine" },
  { name: "Modal", domain: "modal.com", href: "https://modal.com/blog/how-ramp-built-a-full-context-background-coding-agent-on-modal" },
  { name: "Prisma", domain: "prisma.io", href: "https://www.prisma.io/blog/series/agentic-engineering" },
  { name: "Incident.io", domain: "incident.io", href: "https://incident.io/blog/introducing-ai-sre" },
  { name: "Ashby", domain: "ashbyhq.com", href: "https://www.ashbyhq.com/blog/engineering/ai-ashby-engineering-and-the-future" },
  { name: "Greptile", domain: "greptile.com", href: "https://www.greptile.com/blog/ai-code-review" },
  { name: "Browserbase", domain: "browserbase.com", href: "https://www.browserbase.com/blog/internal-agents" },
  { name: "Augment", domain: "augmentcode.com", href: "https://www.augmentcode.com/blog/how-we-built-high-quality-ai-code-review-agent" },
  { name: "Polar", domain: "polar.sh", href: "https://polar.sh/blog/orbit-llm-safe-design-system" },
  { name: "Dagger", domain: "dagger.io", href: "https://dagger.io/blog/automate-your-ci-fixes-self-healing-pipelines-with-ai-agents/" },
  { name: "Vellum", domain: "vellum.ai", href: "https://www.vellum.ai/webinar/coding-agents-doubling-engineering-velocity" },
  { name: "Basis", domain: "getbasis.ai", href: "https://www.getbasis.ai/blogs/how-we-made-our-monorepo-ergonomic-for-agents" },
];

export function AuthorSection() {
  return (
    <Container size="narrow" className="py-16 sm:py-20" id="about">
      <section>
        <SectionLabel>Who&apos;s putting this together</SectionLabel>

        <div className="flex items-center gap-4 sm:gap-5 border-b border-rule pb-6 mb-8">
          <img
            src="/avatar.jpeg"
            alt="Sourav"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-rule object-cover shrink-0"
          />
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-ink">Sourav</h3>
            <p className="font-mono text-xs text-muted mt-1">Product Engineer</p>
          </div>
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Hi, I&apos;m{" "}
            <a
              href="https://souravinsights.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-rule hover:text-ink transition-colors"
            >
              Sourav
            </a>
            , a product engineer. I&apos;ve spent the last few
            years building for small teams (Paragraph, Pimlico, Gallery,
            RabbitHole) and working on my own things.
          </p>

          <p>
            Right now, I&apos;m building{" "}
            <a
              href="https://www.beenthere.page/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-rule hover:text-ink"
            >
              BeenThere
            </a>
            , a minimal travel platform. To move faster as a solo developer, I started relying on agents to write code. I quickly learned that generating code is the easy part. Building the scaffolding, strict API contracts, and review pipelines to actually merge that code without breaking production is where it gets hard.
          </p>

          <p>
            I&apos;m putting this handbook together because I needed it. <mark className="mark">I&apos;m just writing down what actually works.</mark> Instead of guessing, I&apos;m reading the internal engineering deep-dives from the teams already doing this in production and the latest <a href="https://arxiv.org/abs/2607.03316" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-rule hover:text-ink">academic research</a> on agentic workflows. I want to know how they sandbox agents, how they handle review fatigue, and what they actually trust to merge.
          </p>

          <div className="py-2">
            <p className="font-mono text-[10px] tracking-widest uppercase text-muted mb-3">
              Teams I&apos;m studying:
            </p>
            <div className="flex flex-wrap gap-2">
              {STUDIED_TEAMS.map((co) => (
                <a
                  key={co.name}
                  href={co.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-rule rounded-none text-sm text-ink bg-white/50 shadow-sm transition-colors hover:border-ink hover:bg-paper"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${co.domain}&sz=64`}
                    alt={co.name}
                    className="w-3.5 h-3.5 rounded-[3px] grayscale opacity-80"
                  />
                  {co.name}
                </a>
              ))}
            </div>
          </div>

          <p className="text-muted pt-2 leading-relaxed">
            These insights come from real engineering teams shipping in production. My role is to test these patterns hands-on, see what actually works, and organize it so you don&apos;t have to figure it out from scratch. If your team is figuring this out in production,{" "}
            <a
              href="/contribute"
              className="text-ink font-medium underline underline-offset-4 decoration-rule hover:text-verified transition-colors"
            >
              share how your team ships
            </a>
            .
          </p>
        </div>
      </section>
    </Container>
  );
}
