import * as React from "react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/landing/section-label";

export interface ChapterSource {
  label: string;
  href: string;
}

export interface Chapter {
  n: string;
  title: string;
  blurb: string;
  sources?: ChapterSource[];
}

export interface Part {
  title: string;
  chapters: Chapter[];
}

export const HANDBOOK_PARTS: Part[] = [
  {
    title: "Part I: The New Engineering System",
    chapters: [
      {
        n: "01",
        title: "When Writing Code Stops Being the Bottleneck",
        blurb: "How the engineering workflow changes when implementation becomes less of a bottleneck, what happens when humans can no longer review every change, and where human judgment becomes more important.",
        sources: [
          { label: "OpenAI: Harness Engineering", href: "https://openai.com/index/harness-engineering/" },
          { label: "PostHog: 10k PRs a month", href: "https://posthog.com/blog/10k-prs-a-month" },
        ],
      },
      {
        n: "02",
        title: "The Engineering Loop",
        blurb: "Observe, Understand, Change, Verify, Ship, Learn, and why the stages have to work as one system.",
        sources: [
          { label: "OpenAI: Harness Engineering", href: "https://openai.com/index/harness-engineering/" },
          { label: "Replit: Closing the loop", href: "https://replit.com/blog/evaluating-and-improving-agent-at-scale" },
        ],
      },
      {
        n: "03",
        title: "What Does Correct Actually Mean?",
        blurb: "Intent, specifications, acceptance criteria, user journeys, behavioral contracts, invariants, and definitions of done.",
        sources: [
          { label: "Replit: Closing the loop", href: "https://replit.com/blog/evaluating-and-improving-agent-at-scale" },
        ],
      },
      {
        n: "04",
        title: "The Cost of Moving Fast",
        blurb: "Review fatigue, AI-generated mess, architectural drift, stale tests and docs, duplicated abstractions, and the case for continuous maintenance.",
        sources: [
          { label: "OpenAI: Harness Engineering", href: "https://openai.com/index/harness-engineering/" },
        ],
      },
    ],
  },
  {
    title: "Part II: Give the System the Right Context",
    chapters: [
      {
        n: "05",
        title: "Make the Codebase Legible to Agents",
        blurb: "Repository knowledge, architecture, domain context, history, ownership, retrieval, skills, and keeping context fresh.",
        sources: [
          { label: "OpenAI: Harness Engineering", href: "https://openai.com/index/harness-engineering/" },
          { label: "Sourcegraph: Why coding agents fail in large codebases", href: "https://sourcegraph.com/blog/why-coding-agents-fail-large-codebases" },
        ],
      },
      {
        n: "06",
        title: "Understand the Blast Radius",
        blurb: "Connect a change to dependencies, user journeys, ownership, historical patterns, and production behavior before it is made.",
        sources: [
          { label: "Sourcegraph: Why coding agents fail in large codebases", href: "https://sourcegraph.com/blog/why-coding-agents-fail-large-codebases" },
          { label: "OpenAI: Harness Engineering", href: "https://openai.com/index/harness-engineering/" },
        ],
      },
      {
        n: "07",
        title: "Give Agents a View of Production",
        blurb: "Errors, logs, traces, analytics, session replay, feature flags, deployments, and the signals that help explain what users actually experience.",
        sources: [
          { label: "OpenAI: Harness Engineering", href: "https://openai.com/index/harness-engineering/" },
          { label: "PostHog: What is a Scout?", href: "https://posthog.com/blog/what-is-a-scout" },
          { label: "PostHog: Replay Vision", href: "https://posthog.com/replay-vision" },
        ],
      },
      {
        n: "08",
        title: "The Agent Harness",
        blurb: "Tools, skills, memory, permissions, sandboxes, state, checkpoints, retries, and the environment around the model.",
        sources: [
          { label: "OpenAI: Harness Engineering", href: "https://openai.com/index/harness-engineering/" },
          { label: "OpenAI: Unlocking the Codex harness", href: "https://openai.com/index/unlocking-the-codex-harness/" },
          { label: "AI Harness Engineering", href: "https://arxiv.org/abs/2605.13357" },
        ],
      },
    ],
  },
  {
    title: "Part III: Change With Guardrails",
    chapters: [
      {
        n: "09",
        title: "Before You Give an Agent Write Access",
        blurb: "Repository conventions, contracts, test environments, secrets, permissions, and the boundaries that make agent work safe.",
        sources: [
          { label: "Cursor: Governing agent autonomy with Auto-review", href: "https://cursor.com/blog/agent-autonomy-auto-review" },
          { label: "OpenAI: Harness Engineering", href: "https://openai.com/index/harness-engineering/" },
        ],
      },
      {
        n: "10",
        title: "Long-Running Agents",
        blurb: "Durable execution, resumability, partial failures, checkpoints, artifacts, handoffs, and what changes when work outlives a single session.",
        sources: [
          { label: "Cursor: Long-running Agents", href: "https://cursor.com/changelog/02-12-26" },
          { label: "Cursor: Scaling long-running autonomous coding", href: "https://cursor.com/blog/scaling-agents" },
        ],
      },
      {
        n: "11",
        title: "What Counts as Evidence?",
        blurb: "Why a green check is only one signal, and how tests, browser runs, traces, replays, static checks, and human judgment fit together.",
        sources: [
          { label: "Replit: Closing the loop", href: "https://replit.com/blog/evaluating-and-improving-agent-at-scale" },
          { label: "AI Harness Engineering", href: "https://arxiv.org/abs/2605.13357" },
        ],
      },
      {
        n: "12",
        title: "Verify What Changed",
        blurb: "Risk-based verification, test-impact analysis, targeted browser checks, historical regressions, and evidence proportional to the change.",
        sources: [
          { label: "PostHog: QA Frontend Skill", href: "https://github.com/PostHog/posthog/blob/master/.agents/skills/qa-frontend/SKILL.md" },
          { label: "Replit: Closing the loop", href: "https://replit.com/blog/evaluating-and-improving-agent-at-scale" },
        ],
      },
    ],
  },
  {
    title: "Part IV: Trust, Autonomy & Shipping",
    chapters: [
      {
        n: "13",
        title: "Who Should Decide?",
        blurb: "What agents can decide alone, what needs approval, and how teams increase autonomy without losing accountability.",
        sources: [
          { label: "Cursor: Governing agent autonomy with Auto-review", href: "https://cursor.com/blog/agent-autonomy-auto-review" },
          { label: "OpenAI: Harness Engineering", href: "https://openai.com/index/harness-engineering/" },
        ],
      },
      {
        n: "14",
        title: "Independent Verification",
        blurb: "How to keep an agent from becoming its own oracle, with external checks, evidence quality, and failure-aware review.",
        sources: [
          { label: "Replit: Closing the loop", href: "https://replit.com/blog/evaluating-and-improving-agent-at-scale" },
          { label: "AI Harness Engineering", href: "https://arxiv.org/abs/2605.13357" },
        ],
      },
      {
        n: "15",
        title: "Human Review Without the Noise",
        blurb: "Review routing, ownership, alert fatigue, AI review quality, and preserving human attention for decisions that need it.",
        sources: [
          { label: "Cursor: Governing agent autonomy with Auto-review", href: "https://cursor.com/blog/agent-autonomy-auto-review" },
          { label: "PostHog: 10k PRs a month", href: "https://posthog.com/blog/10k-prs-a-month" },
        ],
      },
      {
        n: "16",
        title: "Ship Safely",
        blurb: "Preview environments, CI/CD, progressive delivery, rollback, auditability, and the boundary between merge and production.",
        sources: [
          { label: "OpenAI: Harness Engineering", href: "https://openai.com/index/harness-engineering/" },
          { label: "Replit: Closing the loop", href: "https://replit.com/blog/evaluating-and-improving-agent-at-scale" },
        ],
      },
    ],
  },
  {
    title: "Part V: Learn, Evaluate, Improve",
    chapters: [
      {
        n: "17",
        title: "Turn Production Failures Into Learning",
        blurb: "Use incidents, user behavior, replays, and escaped defects to create regression knowledge and better future verification.",
        sources: [
          { label: "Factory: Incident Response", href: "https://factory.ai/news/incident-response" },
          { label: "PostHog: What if your product built itself?", href: "https://posthog.com/blog/what-if-your-product-built-itself" },
          { label: "PostHog: Replay Vision", href: "https://posthog.com/replay-vision" },
        ],
      },
      {
        n: "18",
        title: "Build the Evaluation Loop",
        blurb: "Offline evals, production-derived evals, traces, golden cases, human judgments, false positives, and evaluating the evaluator.",
        sources: [
          { label: "Replit: Closing the loop", href: "https://replit.com/blog/evaluating-and-improving-agent-at-scale" },
          { label: "Cursor: Continually improving the agent harness", href: "https://cursor.com/blog/continually-improving-agent-harness" },
        ],
      },
      {
        n: "19",
        title: "Keep the System From Decaying",
        blurb: "Continuously maintain tests, docs, abstractions, architecture, agent skills, and the rules that keep the system legible.",
        sources: [
          { label: "OpenAI: Harness Engineering", href: "https://openai.com/index/harness-engineering/" },
        ],
      },
      {
        n: "20",
        title: "Measure Whether It Actually Works",
        blurb: "Escaped defects, detection time, regression catch rate, evidence quality, intervention rate, cost, and safe engineering velocity.",
        sources: [
          { label: "Replit: Closing the loop", href: "https://replit.com/blog/evaluating-and-improving-agent-at-scale" },
          { label: "Cursor: Governing agent autonomy with Auto-review", href: "https://cursor.com/blog/agent-autonomy-auto-review" },
        ],
      },
    ],
  },
  {
    title: "Part VI: Put It Into Practice",
    chapters: [
      {
        n: "21",
        title: "Connect the Tools You Already Have",
        blurb: "Practical setups for GitHub, CI, preview environments, Playwright, Sentry, PostHog, Slack, agent tools, and the feedback loops between them.",
        sources: [
          { label: "OpenAI: Harness Engineering", href: "https://openai.com/index/harness-engineering/" },
          { label: "PostHog: What is a Scout?", href: "https://posthog.com/blog/what-is-a-scout" },
          { label: "Factory: Incident Response", href: "https://factory.ai/news/incident-response" },
        ],
      },
      {
        n: "22",
        title: "Case Studies, Playbooks & Research",
        blurb: "Close reads of teams doing this in production, practical workflows you can copy, and a small research shelf kept deliberately high signal.",
        sources: [
          { label: "OpenAI: Harness Engineering", href: "https://openai.com/index/harness-engineering/" },
          { label: "Cursor Research", href: "https://cursor.com/blog/topic/research" },
          { label: "Replit Engineering", href: "https://replit.com/blog" },
          { label: "Factory News", href: "https://factory.ai/news" },
          { label: "Sourcegraph Research", href: "https://sourcegraph.com/blog" },
        ],
      },
    ],
  },
];

function partSlug(index: number) {
  return `part-${index + 1}`;
}

export function TableOfContents() {
  return (
    <Container size="narrow" className="py-16 sm:py-20" id="contents">
      <section>
        <SectionLabel>What&apos;s inside</SectionLabel>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          The full table of contents
        </h2>
        <p className="text-lg text-muted leading-relaxed max-w-xl mb-8">
          Twenty-two chapters across six parts. The structure might evolve as I learn
          from teams doing this in production. Each chapter is grounded in practical work,
          research, or both.
        </p>

        <div className="flex overflow-x-auto whitespace-nowrap gap-2 mb-10 pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {HANDBOOK_PARTS.map((part, index) => {
            const [roman] = part.title.split(":");
            return (
              <a key={part.title} href={`#${partSlug(index)}`}
                className="font-mono text-xs tracking-widest uppercase border border-rule text-muted hover:text-ink hover:border-ink transition-colors px-3 py-1.5 rounded-none">
                {roman}<span className="text-muted/70 normal-case tracking-normal ml-1">&middot; {part.chapters.length}</span>
              </a>
            );
          })}
        </div>

        <div className="space-y-14">
          {HANDBOOK_PARTS.map((part, index) => (
            <div key={part.title} id={partSlug(index)} className="scroll-mt-8">
              <h3 className="sticky top-0 bg-paper/95 backdrop-blur-md py-2.5 -mx-4 px-4 sm:mx-0 sm:px-0 font-mono text-xs tracking-widest uppercase text-ink mb-5 z-10 border-b border-rule/50">
                {part.title}
              </h3>
              <ol className="space-y-5">
                {part.chapters.map((chapter) => (
                  <li key={chapter.n} className="flex gap-4">
                    <span className="font-mono text-sm text-muted w-6 shrink-0 text-right">{chapter.n}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-medium text-lg leading-snug">{chapter.title}</span>
                      </div>
                      <p className="text-muted text-[15px] leading-snug mt-1">{chapter.blurb}</p>
                      {chapter.sources?.length ? (
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 font-mono text-[11px] leading-snug text-muted/80">
                          <span className="uppercase tracking-wider">Sources</span>
                          {chapter.sources.map((source) => (
                            <a
                              key={source.href}
                              href={source.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline underline-offset-2 decoration-rule hover:text-ink transition-colors"
                            >
                              {source.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
