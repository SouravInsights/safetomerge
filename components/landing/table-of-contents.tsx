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
    title: "Part I: Why Tooling Alone Isn't Enough",
    chapters: [
      {
        n: "01",
        title: "Why Green CI Isn't Evidence of Safety",
        blurb: "Passing tests prove the tests still pass, not that the product still works.",
      },
      {
        n: "02",
        title: "The Loop, and Where Your Team Is Weakest",
        blurb: "Using Observe, Understand, Change, Verify, Ship, Learn to find where your own process breaks down.",
      },
      {
        n: "03",
        title: "You Don't Have Enough Attention to Review Everything",
        blurb: "Focus your team's limited review time on the changes that need it most.",
      },
      {
        n: "04",
        title: "What Actually Changes When Agents Write the Code",
        blurb: "The review load, what a human reviewer is checking for, and what the team's job becomes.",
      },
    ],
  },
  {
    title: "Part II: What Counts as Evidence",
    chapters: [
      {
        n: "05",
        title: "What CI Proves (and Doesn't)",
        blurb: "Test-impact analysis, and handling the tests you no longer trust.",
      },
      {
        n: "06",
        title: "What Production Already Knows",
        blurb: "Mining the observability you already have for what's already gone wrong.",
      },
      {
        n: "07",
        title: "What a Browser Can Verify Right Now",
        blurb: "For the flows nothing else already covers.",
      },
      {
        n: "08",
        title: "What the Diff Itself Signals",
        blurb: "Blast radius, historical norms, and the categories that never get waved through.",
      },
      {
        n: "09",
        title: "Who Should Look at This",
        blurb: "Ownership and reviewer-routing from history: cheap, and usually skipped.",
      },
      {
        n: "10",
        title: "Before Anyone Decides, Someone Has to Read This",
        blurb: "How five sources of evidence become one document. It doesn't give a verdict. It gives a picture.",
      },
    ],
  },
  {
    title: "Part III: Getting Agents Ready to Touch Real Code",
    chapters: [
      {
        n: "11",
        title: "Before You Give an Agent Write Access",
        blurb: "The conventions, docs, and permission boundaries that make the difference between an agent that helps and one that makes a mess.",
      },
      {
        n: "12",
        title: "The Agent Harness",
        blurb: "Context, memory, sandboxing, and the scaffolding that lets an agent self-correct.",
      },
      {
        n: "13",
        title: "Safe Autonomy",
        blurb: "What an agent may do alone, what needs approval, what never gets automated.",
      },
    ],
  },
  {
    title: "Part IV: Shipping and Learning From What Happens",
    chapters: [
      {
        n: "14",
        title: "Where to Draw the Line Between Agents and Humans",
        blurb: "How teams are actually deciding this, with real examples of where they've landed.",
      },
      {
        n: "15",
        title: "Why a Script Isn't Enough",
        blurb: "Review processes that survive a crash, a timeout, or an agent that gets halfway through and stops.",
      },
      {
        n: "16",
        title: "Human-in-the-Loop That Doesn't Get Ignored",
        blurb: "The alert-fatigue trap: flag too much and people stop reading it.",
      },
      {
        n: "17",
        title: "Did the Change Actually Work?",
        blurb: "How to close the loop: feeding what actually happened back into what gets checked next time.",
      },
    ],
  },
  {
    title: "Part V: Evaluation & Adoption",
    chapters: [
      {
        n: "18",
        title: "Measuring Whether Any of This Is Working",
        blurb: "Backtesting, false-positive rates, time-to-detection. The section most guides like this skip.",
      },
      {
        n: "19",
        title: "How to Start, Week by Week",
        blurb: "Start with what you already have, before building anything new.",
      },
      {
        n: "20",
        title: "Playbooks",
        blurb: 'For common situations, including: "we just gave an AI agent write access to our repo."',
      },
    ],
  },
  {
    title: "Part VI: Case Studies & Research Shelf",
    chapters: [
      {
        n: "21",
        title: "How PostHog Does It",
        blurb: "A close read of one team working this out in public. What transfers to a smaller or differently-shaped team, and what's specific to being them.",
      },
      {
        n: "22",
        title: "Further Reading",
        blurb: "Everything worth reading beyond this handbook, kept current.",
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
          Twenty-two chapters across six parts, written a few at a time, in
          public. Here&apos;s the whole map, including the parts that don&apos;t
          exist yet.
        </p>

        <div className="flex overflow-x-auto whitespace-nowrap gap-2 mb-10 pb-2 scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap">
          {HANDBOOK_PARTS.map((part, index) => {
            const [roman] = part.title.split(":");
            return (
              <a
                key={part.title}
                href={`#${partSlug(index)}`}
                className="font-mono text-xs tracking-widest uppercase border border-rule text-muted hover:text-ink hover:border-ink transition-colors px-3 py-1.5 rounded-none"
              >
                {roman}
                <span className="text-muted/70 normal-case tracking-normal ml-1">
                  &middot; {part.chapters.length}
                </span>
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
                    <span className="font-mono text-sm text-muted w-6 shrink-0 text-right">
                      {chapter.n}
                    </span>
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
