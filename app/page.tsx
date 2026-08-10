import { NotifyForm } from "./components/notify-form";

const loopStages = [
  { label: "OBSERVE", desc: "Knowing what's actually happening in production." },
  { label: "UNDERSTAND", desc: "Mapping the blast radius of a specific change." },
  { label: "CHANGE", desc: "Authoring the code, whether by human or agent." },
  { label: "VERIFY", desc: "Gathering evidence that the change is safe." },
  { label: "SHIP", desc: "Moving the code to production reliably." },
  {
    label: "LEARN",
    desc: "Feeding outcomes back into the next cycle.",
  },
];

const parts = [
  {
    title: "Part I: Why Tooling Alone Isn't Enough",
    chapters: [
      {
        n: "01",
        title: "Why Green CI Isn't Evidence of Safety",
        blurb: "Passing tests prove the tests still pass, not that the product still works.",
        upNext: true,
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
        upNext: true,
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
        blurb: "Verification that survives a crash, a timeout, or an agent that gets halfway through and stops.",
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
        upNext: true,
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
        upNext: true,
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

export default function Home() {
  return (
    <main className="flex-1">
      <header className="max-w-3xl mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <p className="font-mono text-xs tracking-widest uppercase text-muted mb-6">
          A handbook for software teams
        </p>

        <h1 className="text-4xl sm:text-6xl font-semibold leading-[1.05] tracking-tight mb-6">
          Software is moving <em className="italic font-medium">faster</em>{" "}
          than you can review it.
        </h1>

        <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-xl mb-10">
          The pipeline that worked when humans wrote every line is starting to
          break down. This handbook is about how teams are figuring out what
          replaces it, and{" "}
          <mark className="mark">where a human still has to be the one who decides.</mark>
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-14">
          <NotifyForm
            id="notify-hero"
            formClassName="flex w-full sm:w-auto flex-wrap"
            inputClassName="w-full sm:w-64"
          />
          <a
            href="#contents"
            className="font-mono text-sm text-muted hover:text-ink underline underline-offset-4 decoration-rule"
          >
            See what&apos;s inside
          </a>
        </div>

        <nav
          aria-label="Page sections"
          className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs tracking-widest uppercase text-muted"
        >
          {[
            { href: "#why", label: "Why" },
            { href: "#loop", label: "The loop" },
            { href: "#contents", label: "Contents" },
            { href: "#for-you", label: "Is this for you" },
            { href: "#notify", label: "Get updates" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-ink transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="max-w-3xl mx-auto px-6">
        <hr className="border-rule" />
      </div>

      <section id="why" className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
        <p className="font-mono text-xs tracking-widest uppercase text-muted mb-6">
          Why this exists
        </p>
        <div className="space-y-5 text-lg leading-relaxed max-w-2xl">
          <p className="first-letter:font-serif first-letter:text-6xl first-letter:font-semibold first-letter:float-left first-letter:leading-[0.82] first-letter:mr-3 first-letter:mt-1">
            PostHog went from 1,441 PRs in January to 4,725 in June. Over that
            same stretch, the share opened by AI agents grew from around 20%
            to over 70%.
            <sup className="ml-0.5">
              <a
                href="#note-1"
                className="font-mono text-[11px] text-verified hover:text-ink no-underline"
              >
                [1]
              </a>
            </sup>{" "}
            More teams are heading the same direction. The question
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

          <p
            id="note-1"
            className="!text-sm font-mono text-muted pt-4 mt-8 border-t border-rule"
          >
            [1] PostHog,{" "}
            <a
              href="https://posthog.com/blog/10k-prs-a-month"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-rule hover:text-ink"
            >
              &ldquo;10,000 PRs a month is easy: How devex is evolving at
              PostHog&rdquo;
            </a>
            , Jul 2026.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <hr className="border-rule" />
      </div>

      <section id="loop" className="section-band max-w-full px-6 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-muted mb-6">
          How it&apos;s organized
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          The whole book maps to six stages.
        </h2>
        <p className="text-lg text-muted leading-relaxed max-w-xl mb-10">
          Most teams are fine at five of these and struggling with one. The
          handbook is built around each stage. If you know which one is weak
          in your own process, you know where to start.
        </p>

        <ol className="grid sm:grid-cols-2 gap-x-12 gap-y-10 mt-6">
          {loopStages.map((stage, index) => (
            <li key={stage.label} className="flex gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink bg-paper font-mono text-xs shrink-0 mt-0.5">
                {index + 1}
              </span>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-verified mb-1">
                  {stage.label}
                </p>
                <p className="text-sm text-muted leading-relaxed pr-2">{stage.desc}</p>
              </div>
            </li>
          ))}
          <li className="flex gap-4 sm:col-span-2 border-t border-rule pt-8 mt-2">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-muted bg-paper font-mono text-xs shrink-0 text-muted mt-0.5"
            >
              &#8635;
            </span>
            <p className="text-sm text-muted italic leading-relaxed pt-1.5">
              Then back to Observe, and the cycle repeats.
            </p>
          </li>
        </ol>
        </div>
      </section>

      <section id="contents" className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
        <p className="font-mono text-xs tracking-widest uppercase text-muted mb-6">
          What&apos;s inside
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          The full table of contents
        </h2>
        <p className="text-lg text-muted leading-relaxed max-w-xl mb-8">
          Twenty-two chapters across six parts, written a few at a time, in
          public. Here&apos;s the whole map, including the parts that don&apos;t
          exist yet.
        </p>

        <div className="flex flex-wrap gap-2 mb-14">
          {parts.map((part, index) => {
            const [roman, ...rest] = part.title.split(":");
            return (
              <a
                key={part.title}
                href={`#${partSlug(index)}`}
                className="font-mono text-xs tracking-widest uppercase border border-rule text-muted hover:text-ink hover:border-ink transition-colors px-3 py-1.5"
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
          {parts.map((part, index) => (
            <div key={part.title} id={partSlug(index)} className="scroll-mt-8">
              <h3 className="sticky top-0 bg-paper/95 backdrop-blur-sm py-2 -mx-6 px-6 sm:mx-0 sm:px-0 font-mono text-xs tracking-widest uppercase text-ink mb-5 z-10">
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
                        {chapter.upNext && (
                          <span className="font-mono text-[10px] tracking-widest uppercase border border-verified text-verified px-2 py-0.5">
                            Up next
                          </span>
                        )}
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

      <div className="max-w-3xl mx-auto px-6">
        <hr className="border-rule" />
      </div>

      <section id="for-you" className="section-band max-w-full px-6 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-muted mb-10">
          Is this for you
        </p>
        <div className="grid sm:grid-cols-2 gap-10 sm:gap-16">
          <div>
            <h3 className="font-mono text-xs tracking-widest uppercase text-verified mb-4">
              This is for you if
            </h3>
            <ul className="space-y-3 text-muted leading-relaxed">
              {[
                "You ship multiple times a week and a green checkmark doesn't fully reassure you anymore.",
                'You\'ve started letting an AI agent open PRs and you\'re not totally sure what "safe" means now.',
                "You want a mental model for the problem, more than another list of product launches to skim.",
              ].map((text) => (
                <li key={text} className="flex gap-3">
                  <span className="font-mono text-verified shrink-0" aria-hidden="true">
                    +
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs tracking-widest uppercase text-flag mb-4">
              Probably not if
            </h3>
            <ul className="space-y-3 text-muted leading-relaxed">
              {[
                "You're hoping for a plug-and-play tool. This is more about rethinking your process.",
                "You want to learn how to build AI agents. This is about keeping your software reliable when code is written at inference speed.",
                "You need a finished manual right now. I'm still learning and writing this as I go.",
              ].map((text) => (
                <li key={text} className="flex gap-3">
                  <span className="font-mono text-flag shrink-0" aria-hidden="true">
                    &minus;
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <hr className="border-rule" />
      </div>

      <footer id="notify" className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
        <p className="font-mono text-xs tracking-widest uppercase text-muted mb-6">
          Stay in the loop
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Get the next chapter when it&apos;s ready
        </h2>
        <p className="text-muted leading-relaxed max-w-md mb-8">
          I&apos;ll just send you an email when the next chapter is ready.
          Nothing else.
        </p>
        <div className="mb-16">
          <NotifyForm
            id="notify-footer"
            formClassName="flex flex-col sm:flex-row gap-3 max-w-md"
            inputClassName="flex-1"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted border-t border-rule pt-8">
          <div className="flex items-center gap-4">
            <span className="font-medium text-ink">Safe to Merge</span>
            <span className="text-muted/40">|</span>
            <span>
              A project by <a href="https://souravinsights.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink underline underline-offset-4 decoration-rule transition-colors">Sourav</a>
            </span>
          </div>
          <p className="font-mono text-xs">© 2026</p>
        </div>
      </footer>
    </main>
  );
}