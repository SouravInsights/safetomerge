import * as React from "react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/landing/section-label";

export interface Chapter {
  n: string;
  title: string;
  blurb: string;
}

export interface Part {
  title: string;
  chapters: Chapter[];
}

export const HANDBOOK_PARTS: Part[] = [
  {
    title: "Part I: The New Engineering System",
    chapters: [
      { n: "01", title: "When Software Becomes Cheap to Change", blurb: "How agentic development changes the economics of shipping, and why verification is no longer the only bottleneck." },
      { n: "02", title: "The Engineering Loop", blurb: "Observe, Understand, Change, Verify, Ship, Learn — and how the stages reinforce each other." },
      { n: "03", title: "What Does 'Correct' Actually Mean?", blurb: "Intent, specifications, acceptance criteria, behavioral contracts, invariants, and the signals that let a machine reason about correctness." },
      { n: "04", title: "The Cost of Moving Fast", blurb: "Review fatigue, AI-generated entropy, architectural drift, stale knowledge, and the maintenance work a high-velocity codebase creates." },
    ],
  },
  {
    title: "Part II: Give the System the Right Context",
    chapters: [
      { n: "05", title: "Make the Codebase Legible to Agents", blurb: "Repository knowledge, architecture, domain context, history, ownership, and progressive disclosure." },
      { n: "06", title: "Understand the Blast Radius", blurb: "How to connect diffs with dependencies, user journeys, ownership, historical patterns, and production behavior before changing anything." },
      { n: "07", title: "Make Production Legible", blurb: "Errors, logs, traces, analytics, session replay, feature flags, deployments, and the production signals agents can actually use." },
      { n: "08", title: "The Agent Harness", blurb: "Tools, skills, memory, permissions, sandboxes, state, checkpoints, retries, and the scaffolding around the model." },
    ],
  },
  {
    title: "Part III: Change With Guardrails",
    chapters: [
      { n: "09", title: "Before You Give an Agent Write Access", blurb: "Repository conventions, contracts, test environments, secrets, permissions, and the boundaries that make agent work safe." },
      { n: "10", title: "Long-Running Agents", blurb: "Durable execution, resumability, partial failures, checkpoints, artifacts, handoffs, and what changes when an agent works for hours." },
      { n: "11", title: "What Counts as Evidence?", blurb: "Why a green check is only one signal, and how tests, browser runs, traces, replays, static checks, and human judgment combine into evidence." },
      { n: "12", title: "Verify the Change, Not the Whole World", blurb: "Risk-based verification, test-impact analysis, targeted browser checks, historical regressions, and evidence proportional to blast radius." },
    ],
  },
  {
    title: "Part IV: Trust, Autonomy & Shipping",
    chapters: [
      { n: "13", title: "Who Should Decide?", blurb: "What agents can decide alone, what needs approval, and how teams can increase autonomy without removing accountability." },
      { n: "14", title: "Independent Verification", blurb: "How to keep the agent from becoming its own oracle, including external checks, evidence quality, and failure-aware review." },
      { n: "15", title: "Human Review Without the Noise", blurb: "Review routing, ownership, alert fatigue, AI review quality, and preserving human attention for decisions that need it." },
      { n: "16", title: "Ship Safely", blurb: "Preview environments, CI/CD, progressive delivery, rollback, auditability, and safe boundaries between merge and production." },
    ],
  },
  {
    title: "Part V: Learn, Evaluate, Improve",
    chapters: [
      { n: "17", title: "Production Is Part of the Test Suite", blurb: "Turning incidents, user behavior, replays, and escaped defects into regression knowledge and future verification." },
      { n: "18", title: "Build the Evaluation Loop", blurb: "Offline evals, production-derived evals, traces, golden cases, human judgments, false positives, and evaluating the evaluator." },
      { n: "19", title: "Keep the System From Decaying", blurb: "Continuous cleanup of tests, docs, abstractions, architecture, agent skills, and other sources of software entropy." },
      { n: "20", title: "Measure Whether It Actually Works", blurb: "Escaped defects, detection time, regression catch rate, evidence quality, intervention rate, cost, and safe engineering velocity." },
    ],
  },
  {
    title: "Part VI: Build It With What You Already Have",
    chapters: [
      { n: "21", title: "Connecting the Stack", blurb: "Practical setups for GitHub, CI, preview environments, Playwright, Sentry, PostHog, Slack, agent tools, and the feedback loops between them." },
      { n: "22", title: "Case Studies & Research Shelf", blurb: "Close reads of teams building these systems, concrete workflows and artifacts, plus a deliberately curated list of high-signal research and engineering writing." },
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
          Twenty-two chapters across six parts. The map will change as I learn
          from teams doing this in production, but the underlying problem stays the same:
          making software safer to change as agents become more capable.
        </p>

        <div className="flex overflow-x-auto whitespace-nowrap gap-2 mb-10 pb-2 scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap">
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
              <h3 className="sticky top-0 bg-paper/95 backdrop-blur-md py-2.5 -mx-6 px-6 sm:mx-0 sm:px-0 font-mono text-xs tracking-widest uppercase text-ink mb-5 z-10 border-b border-rule/50">
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
