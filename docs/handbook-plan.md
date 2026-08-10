# Handbook Plan: Ship Safely — Evidence Before Merge

**Working title:** Ship Safely (domain: `safetomerge.dev`)

**North star, one line:** how does a team increase the rate at which it changes software without increasing the rate at which it breaks? Not AI, not testing, not agents — **safe velocity**. Every chapter should trace back to this question.

---

## 0. What This Handbook Actually Is

Most teams adopting AI coding agents already have the tools — GitHub, some CI, maybe Sentry or PostHog, maybe Playwright — but no shared practice for turning them into justified confidence as agents author a growing share of the code. This handbook is that missing practice: what evidence actually proves a change is safe, how to assemble that evidence from tools a team likely already runs, and where a human still has to be the one who decides.

It is not vendor documentation, not an AI-agent tutorial, and not a disguised product manual. A reader should be able to implement the practice by hand, with whatever stack they already have, and never buy or build anything from us.

---

## 1. Editorial Principles

- **Practice over product.** Every chapter stands alone if the reader never adopts a tool of ours. The product, if it exists, is one reference implementation of the practice — never the reason the practice exists.
- **Vendor-literate, not vendor-locked.** Name real tools specifically and honestly, including their limits. But no chapter should only make sense for one company's stack — where a tool is named (Sentry, PostHog, Playwright, Temporal), name at least one real alternative alongside it, and write the underlying principle so it survives either choice.
- **Concrete over abstract.** Every chapter ends with something doable this week.
- **Show the reasoning, not just the rule.** State the "why," not just the prescription.
- **Honest about immaturity.** Where something is a bet rather than settled practice, say so.
- **One shape per chapter type**, so this reads as a system, not a pile of essays (see Section 2a).

---

## 2. The Loop: Observe → Understand → Change → Verify → Ship → Learn

This is the spine the whole handbook hangs off, and every Part below maps to a stage of it:

- **Observe** — what the running system actually does (production, users, incidents).
- **Understand** — what a proposed change touches and what it risks (diffs, dependency graphs, ownership).
- **Change** — how humans and agents actually make the change.
- **Verify** — what evidence gets assembled before anyone trusts the change.
- **Ship** — what happens at merge and deploy time.
- **Learn** — how outcomes feed back and make the next loop sharper.

A team that's weak at any one stage doesn't get a partial version of "safe velocity" — they get the failure mode specific to that gap (no Observe = flying blind; no Verify = shipping on hope; no Learn = repeating the same regression forever). Naming which stage is weakest is often the fastest way to know what to fix first, and several playbooks below are built exactly around that diagnosis.

---

## 2a. The Standard Chapter Shape

Every chapter in Parts II–IV follows the same template, so the handbook reads as a system rather than a collection of essays:

1. The problem
2. Why it matters more as AI authors more of the change
3. Mental model
4. What "good" looks like, concretely
5. Tool-agnostic architecture (the pattern, before any specific vendor)
6. Example setup (naming real tools, with at least one alternative)
7. Worked example, using the handbook's single running case
8. How to tell it's actually working
9. Common failure modes
10. What to build/automate next, once this is solid

---

## 3. Chapter Structure

### Part I — Why This Needs a Practice, Not Just Tools

1. **Why Green CI Isn't Evidence of Safety** — opens the book. Passing tests prove the tests still pass, not that the product still works.
2. **The Loop, and Where Your Team Is Actually Weak** — introduces Observe→Understand→Change→Verify→Ship→Learn as a diagnostic, not just a diagram.
3. **Trust Is a Budget, Not a Switch** — reframes "should we trust this change" as spending a fixed amount of human attention on the right slice of changes, not all of them equally.
4. **The Shape of an AI-Native Engineering Org** — what changes when agents author a meaningful share of PRs: volume, review load, what a human reviewer is actually checking for now.

### Part II — What Actually Counts as Evidence

5. **What CI Actually Proves (and Doesn't)** — test-impact analysis: did any test that ran actually exercise the changed path? Flaky-test handling.
6. **What Production Already Knows** — mining existing observability for incidents historically correlated with the code being touched, whatever tool that lives in.
7. **What a Browser Can Verify Right Now** — the gap-filler: scoped, black-box exploration against a preview URL, only for what nothing else already covers.
8. **What the Diff Itself Signals** — blast radius from a dependency graph, diff size against historical norms, risk categories (auth, payments, migrations) that should never be waved through regardless of everything else looking clean.
9. **Who Should Actually Look at This** — ownership and reviewer-routing from history, cheap and usually skipped.
10. **Assembling the Evidence Report** — how 5–9 become one artifact a human reads before deciding. A report, explicitly not a verdict.

### Part III — Getting Agents Ready to Touch Real Code

11. **Making a Codebase Agent-Ready** — conventions, docs, ownership signals, and permission boundaries that let an agent operate usefully and safely, without which every later chapter is harder.
12. **The Agent Harness** — context, tools, memory, sandboxing, checkpoints, durable retries: the scaffolding that lets an agent self-correct instead of repeating the same mistake.
13. **Safe Autonomy** — the actual decision framework for what an agent may do unsupervised, what needs approval, and what should never be automated no matter how good the track record gets.

### Part IV — Shipping and Actually Learning From What Happens

14. **Deciding What Gets Automated vs. What a Human Must Own** — a real boundary, with worked examples of where actual teams have drawn it.
15. **Durable, Agentic Verification Loops** — why this needs retries and long-running state, not a script; orchestration patterns without requiring one specific tool.
16. **Human-in-the-Loop That Doesn't Get Ignored** — where flagged evidence goes, how it's phrased, and the alert-fatigue trap: a system that flags too much trains people to stop reading it.
17. **Closing the Loop: Learning From Outcomes** — did a flagged risk become a real incident? Did an unflagged change break anyway? How that reshapes what gets checked next time, and how to keep it inspectable rather than an unaccountable black box.

### Part V — Evaluation

18. **Measuring Whether Any of This Is Actually Working** — backtesting against real past incidents, escaped-defect rate, false-positive rate, time-to-detection, cost per verification. The section most guides like this skip, and the one that proves the practice works rather than just sounds right.

### Part VI — Adoption

19. **A 30-Day Adoption Path** — week by week, starting with wiring existing CI results and existing observability into evidence before building anything new.
20. **Playbooks for Common Starting Points** — see Section 5.

### Part VII — Case Studies & Research Shelf

21. **Worked Case Study: PostHog's Self-Driving Practice** — a close, honest read of scouts, StampHog, Replay Vision, PostHog Code, and their public "how we ship" writing, as a real operating example at extreme scale — what transfers to a smaller or differently-shaped team, what's specific to being a data-platform vendor with your own product to dogfood on.
22. **Annotated Research Shelf** — see Section 6.

*(20 chapters, not 31 — trimmed on purpose. Several of the ChatGPT draft's chapters — GitHub setup, Playwright setup, Sentry setup, PostHog setup, "Connecting the Stack" — are folded into the integration guides in Section 4 instead of becoming standalone chapters, since they're reference material a reader looks up, not a narrative a reader reads through, and having them as chapters was creating repeat coverage of the same ground.)*

---

## 4. Integration / Setup Guides

Short, practical, tool-specific companions — reference material linked from the relevant chapter, not part of the narrative chapter sequence. Each one: what the tool gives you, the minimum viable connection, one real alternative, and a common misconfiguration to avoid.

- **GitHub** — webhook setup for PR events, reading diffs/metadata without requesting broad scopes, posting structured PR comments well.
- **Preview environments** — Vercel/Netlify/Render patterns, environment isolation, test data.
- **Browser verification** — Playwright as the reference choice; setup for preview-URL testing, keeping agent-generated tests git-native and reviewable rather than an opaque blob.
- **Observability** — Sentry and Datadog as reference choices, PostHog as the reference choice when a team already has product analytics/replay too; pulling historical incidents by code path; the common failure of noisy alerting rules that make correlation useless.
- **CI/CD** — reading structured results back out programmatically; AST-based selective test running basics.
- **Durable workflow orchestration** — Temporal as the reference choice; the minimum setup for a retry-safe loop; when a simpler queue is enough and this isn't needed yet.
- **Team notification** — Slack as the reference choice; PR comments vs. chat, and when each is the right surface.

---

## 5. Practical Playbooks

Each playbook: a named starting situation, what to instrument first, what to explicitly skip, a realistic timeline.

- **"We ship multiple times a day and have almost no tests."**
- **"We have a large test suite nobody fully trusts anymore."** Flaky-test triage and test-impact analysis before adding anything new.
- **"We just gave an AI coding agent write access to our repo."** The most urgent playbook — what evidence must exist before an agent-authored PR is eligible for fast-tracked review, and what should never be auto-anything.
- **"We have observability but it's disconnected from our review process."** Usually the highest-leverage, lowest-effort starting point.
- **"We want to reduce human review load without losing safety."** The StampHog-style playbook: finding the safe-to-automate slice from historical approval patterns, and keeping that boundary honest over time.
- **"We're writing our first agent skill for verification work."** A concrete worked example of turning a workflow into a well-scoped, maintainable skill.

---

## 6. Annotated Research Shelf

- **PostHog — "What is a Scout?", "What if your product built itself?", "10,000 PRs a month is easy," "PostHog Code and the self-driving product," Replay Vision docs, "How to safely test in production," "A beginner's guide to testing AI agents," "The golden rules of agent-first product engineering."** The most complete real-world example of this practice operating at scale today. Read as case studies, not templates — specific to being a data-platform company with a warehouse and its own product to dogfood on.
- **PostHog's public engineering handbook** (`posthog.com/handbook`) — worth studying as a structural example too: a living, versioned practice doc, which is close to the format this handbook itself wants to be.
- **Google's Test Automation Platform / test-impact-analysis research.** Grounding for the CI-evidence chapter.
- **Meta's Prospector / probabilistic test selection.** A contrasting approach to the same problem.
- **Site Reliability Engineering (Google's SRE book).** Foundational thinking on error budgets and trust-as-a-resource.
- **Mitchell Hashimoto's writing on harness engineering.** The conceptual root of "engineer a permanent fix into the environment rather than hoping the next prompt does better."
- **Anthropic's and OpenAI's agentic coding / eval-design writing.** Grounding for the harness and evaluation chapters.
- **Netflix's chaos engineering publications.** A different, complementary lineage of building justified confidence in a system you can't fully inspect.

Each entry gets a dated "last reviewed" line — this landscape moves fast, especially the PostHog material, which is being actively updated as they ship.

---

## 7. Website / Presentation Principles

- Docs-site shape, not blog shape — persistent nav by Part/Chapter, a reference people return to.
- Every chapter independently linkable and self-contained, with a one-line pointer back to relevant earlier chapters.
- Runnable, copy-pasteable snippets, never screenshots of config.
- A visible confidence marker per chapter — settled practice vs. emerging/contested bet.
- No login wall, no gated chapters.
- One single canonical running example (an app + one realistic PR) threaded through Parts II–IV, so the taxonomy and the playbooks visibly connect to the same concrete case.

---

## 8. What Gets Built First (MVP scope)

1. Chapter 1 (Why Green CI Isn't Evidence) — the hook, shortest path to something shareable.
2. Chapter 10 (Assembling the Evidence Report) — makes the abstract idea tangible fast.
3. One playbook — "We just gave an AI coding agent write access to our repo" — most urgent and most linkable right now.
4. Chapter 21 (PostHog case study) — the research is already done; borrowed credibility, fast to write.
5. Everything else, in the order listed above.

Four pieces is enough to test whether the practice resonates before committing to all 20 chapters.

---

## 9. How This Relates to the Product

The handbook works whether or not the product ships. If the product gets built, each feature should map to a specific chapter's practice — never the reverse. The moment a chapter only makes sense if the reader adopts the tool, it's stopped being a handbook.
