# /contribute — Engineering Research Form Spec

## Purpose

Collect concrete, first-hand accounts of how software teams ship code when AI agents author a significant share of it. The responses directly inform the *Safe to Merge* handbook — every chapter should be grounded in what teams actually do, not what we think they should do.

This is **not** a survey about opinions on AI. It's a structured interview, async, that asks people to describe their actual workflows.

---

## Design principles

1. **~5 minutes to complete.** Respect the respondent's time. Fewer questions, each one doing real work.
2. **Concrete over speculative.** "Tell us about the last time…" > "Do you think…"
3. **Non-leading.** Don't embed our thesis in the questions. We're learning, not confirming.
4. **Skip-friendly.** Every question except email is optional. People should never feel blocked by a question that touches confidential information.
5. **Research contribution, not corporate survey.** The page should feel like you're helping a fellow engineer write something useful, not filling out a lead-gen form.

---

## Page structure

The page follows the same layout rhythm as the landing page:
- `max-w-3xl mx-auto px-6`
- Same fonts (Spectral serif body, IBM Plex Mono for labels/UI)
- Same color tokens (paper, ink, muted, verified, flag, rule, mark)
- Same section label pattern: `font-mono text-xs tracking-widest uppercase text-muted`

### Sections on the page

1. **Header** — title, short explanation of what this is and why it matters
2. **The form** — grouped into thematic sections with clear visual breaks
3. **Footer** — same footer as landing page

---

## Information architecture

The form is organized into **5 sections**, progressing from context → workflow → learning loops → tooling → open-ended.

### Section 1: About you & your team

> *Context so we can read the rest of the answers with the right frame.*

---

#### Q1: Your email
- **Insight:** Contact for follow-up, and to deduplicate submissions.
- **Why useful:** Lets us reach out if we want to feature their workflow (with permission).
- **Required:** Yes (the only required field).
- **Input type:** Email input.

#### Q2: Your role
- **Insight:** Whether the respondent is an IC, lead, founder, or something else. Shapes how we interpret their answers.
- **Why useful:** A founder describing their team's workflow and an IC describing their own daily experience are both valuable but read differently.
- **Required:** Optional.
- **Input type:** Single-select with write-in.
- **Options:** `IC Engineer` · `Tech Lead / Staff` · `Engineering Manager` · `Founder / CTO` · `DevOps / Platform` · `Other`

#### Q3: Team size (engineers shipping code)
- **Insight:** Scale changes everything. A 3-person startup and a 200-person org have fundamentally different review problems.
- **Why useful:** Helps us contextualize practices. "We review every PR" means something different at 4 people vs 40.
- **Required:** Optional.
- **Input type:** Single-select.
- **Options:** `Just me` · `2–5` · `6–15` · `16–50` · `50+`

#### Q4: What does your team build?
- **Insight:** Domain context. A fintech company's merge standards are different from a dev tools startup.
- **Why useful:** Lets us group case studies by domain and risk profile.
- **Required:** Optional.
- **Input type:** Short free text (one line).
- **Placeholder:** `e.g. B2B SaaS, developer tools, fintech, e-commerce…`

---

### Section 2: How you ship today

> *What actually happens between "someone has an idea" and "it's in production."*

---

#### Q5: What share of your code changes are authored or drafted by AI/agents?
- **Insight:** Where they sit on the adoption curve. A team at 10% has different problems than one at 70%.
- **Why useful:** Directly maps to the handbook's premise — the practices change as the ratio shifts.
- **Required:** Optional.
- **Input type:** Single-select.
- **Options:** `Almost none yet` · `Roughly 10–30%` · `Roughly 30–60%` · `More than 60%` · `Not sure`

#### Q6: Walk us through a typical PR. Who or what creates it, who reviews it, and what has to pass before it merges?
- **Insight:** The actual end-to-end flow. This is the core data point.
- **Why useful:** Every chapter of the handbook maps to a stage in this flow. Hearing it described in the respondent's own words reveals what they emphasize and what they skip over.
- **Required:** Optional.
- **Input type:** Multi-line free text.
- **Placeholder:** `e.g. "An agent opens the PR from a Linear ticket. CI runs tests + type-check. A human reviews anything touching payments or auth. Everything else gets auto-merged if CI is green."`

#### Q7: What evidence do you look at before deciding a change is safe to merge?
- **Insight:** What actually gives them confidence. Not what tools they have — what they *look at*.
- **Why useful:** Maps directly to Part II of the handbook ("What Counts as Evidence"). Helps us understand which signals teams actually trust vs. which they ignore.
- **Required:** Optional.
- **Input type:** Multi-select with write-in.
- **Options:** `CI / test results` · `Manual code review` · `AI-generated review summary` · `Diff size / blast radius` · `Production metrics after deploy` · `Preview / staging environment` · `Type-checking / static analysis` · `Git history / ownership signals`

#### Q8: Are there categories of changes that always get extra scrutiny, regardless of who wrote them?
- **Insight:** What the team considers high-risk. This reveals their actual risk model, not just what they say matters.
- **Why useful:** Informs Chapter 8 (What the Diff Itself Signals) and Chapter 13 (Safe Autonomy).
- **Required:** Optional.
- **Input type:** Multi-line free text.
- **Placeholder:** `e.g. "Anything touching billing, auth, database migrations, or public API contracts always gets a human review."`

---

### Section 3: When things break

> *The feedback loop. How failures feed back into the process.*

---

#### Q9: Tell us about the last time a change broke something in production. What happened, and what changed in your process afterward?
- **Insight:** A single concrete story is worth more than ten abstract answers. This is the most important question on the form.
- **Why useful:** Real incidents reveal the gaps that theory misses. These stories become the backbone of the handbook's case studies.
- **Required:** Optional.
- **Input type:** Multi-line free text.
- **Placeholder:** `Describe what happened, how you found out, and whether it changed how you review or test.`

#### Q10: Do production incidents feed back into your tests, tooling, or review process in any structured way?
- **Insight:** Whether the team has a learning loop or whether incidents are one-off firefights.
- **Why useful:** Directly informs Chapter 17 (Did the Change Actually Work?) and the LEARN stage of the loop.
- **Required:** Optional.
- **Input type:** Multi-line free text.
- **Placeholder:** `e.g. "We write a regression test for every P0. We don't have a formal process yet — it's ad hoc."`

---

### Section 4: Tooling & internal systems

> *What you've built, integrated, or wish existed.*

---

#### Q11: What's in your stack?
- **Insight:** Tool landscape. Not to recommend tools, but to understand what integration surface teams are working with.
- **Why useful:** Helps us write practical advice that references real tools, not abstract categories.
- **Required:** Optional.
- **Input type:** Multi-select with write-in.
- **Options:** `GitHub` · `GitLab` · `Linear / Jira` · `Cursor / Windsurf / Copilot` · `CI (GitHub Actions, CircleCI, etc.)` · `Sentry / error tracking` · `PostHog / analytics` · `Playwright / Cypress / browser testing` · `Vercel / Netlify / Railway` · `Custom deployment pipeline`

#### Q12: Have you built any internal tooling, agent workflows, or custom integrations specifically to handle the volume or risk of AI-authored code?
- **Insight:** What teams are inventing internally that doesn't exist as a product yet.
- **Why useful:** This is the most original data the form can produce. If three teams independently build the same kind of harness, that's a signal.
- **Required:** Optional.
- **Input type:** Multi-line free text.
- **Placeholder:** `e.g. "We built a GitHub Action that blocks merge on any PR touching >5 files unless a specific team member approves. We have a custom prompt that feeds PR diff + test output to an LLM for a structured review."`

---

### Section 5: What's still unsolved

> *The honest part.*

---

#### Q13: What part of your current workflow still feels fragile, manual, or unsolved?
- **Insight:** Where the frontier is. What people are still struggling with despite having a working process.
- **Why useful:** These are the problems the handbook should address. If everyone says "flaky tests," that's a chapter.
- **Required:** Optional.
- **Input type:** Multi-line free text.
- **Placeholder:** `e.g. "We still can't tell whether a green CI run actually means the feature works. Review fatigue is real — people approve without reading."`

#### Q14: Links, writeups, repos, or anything else you think is useful
- **Insight:** Primary sources. Blog posts, architecture docs, agent configs, GitHub repos.
- **Why useful:** These become the handbook's bibliography and case study material.
- **Required:** Optional.
- **Input type:** Multi-line free text.
- **Placeholder:** `Public blog posts, internal docs you're comfortable sharing, GitHub repos, agent skill files, architecture diagrams…`

#### Q15: Open to a short async follow-up?
- **Insight:** Whether we can go deeper.
- **Why useful:** The best case studies come from a conversation, not a form.
- **Required:** Optional.
- **Input type:** Single-select.
- **Options:** `Sure, reach out by email` · `Maybe, depends on the topic` · `No thanks`

---

## Submission behavior

- **Backend:** A new Server Action (`app/actions/contribute.ts`) that sends the form data via Resend as an email to a configured address (e.g., `CONTRIBUTE_EMAIL_TO` env var). This keeps it simple — no database, no admin panel. Each submission arrives as a nicely formatted email.
- **Validation:** Only email is required. Client-side validation on the email field (same pattern as NotifyForm). All other fields accept empty.
- **Success state:** A simple confirmation message replacing the form, same pattern as the NotifyForm "done" state but adapted for this context.
- **Error handling:** Same pattern as NotifyForm — inline error below the form.

## Implementation notes

- **Route:** `app/contribute/page.tsx`
- **Form component:** `app/components/contribute-form.tsx` (client component)
- **Server action:** `app/actions/contribute.ts`
- **No new dependencies.** Resend is already installed. No form libraries — keep it native HTML form elements styled with the existing design tokens.
- **No Typeform vibes.** This is one continuous page with visible sections, not a step-by-step wizard. The respondent should be able to scroll the whole form, see how long it is, and jump around.
- **Link from landing page.** Add a nav link or mention in the About section so people can find it.

---

## Question count summary

| Section | Questions | Required |
|---|---|---|
| About you & your team | 4 | 1 (email) |
| How you ship today | 4 | 0 |
| When things break | 2 | 0 |
| Tooling & internal systems | 2 | 0 |
| What's still unsolved | 3 | 0 |
| **Total** | **15** | **1** |

Estimated completion time: **4–6 minutes** for someone who writes short answers, longer for someone who wants to tell a story (which we encourage).
