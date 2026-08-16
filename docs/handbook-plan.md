# Safe to Merge: Handbook Plan

**Domain:** `safetomerge.com`

**Handbook description:** A practical handbook for building reliable software when AI agents write and ship more of the code.

**GitHub description:** A practical handbook for building reliable software in the age of AI agents.

---

## 1. What Safe to Merge Is

Safe to Merge is a practical, research-led handbook about the engineering systems teams need as AI agents become capable of writing, modifying, reviewing, testing, and shipping software.

The subject is **not AI agents themselves**.

The subject is what has to exist around them so that software can keep moving quickly without becoming fragile, opaque, or impossible to trust.

The handbook studies how teams are figuring out:

- how to turn human intent into something agents can act on and verify
- how to give agents the right codebase, product, architectural, historical, and production context
- how to understand the impact and blast radius of a change before making it
- how to design the environment and harness around an agent
- how to give agents increasing autonomy without removing accountability
- how to gather evidence that a change actually works
- how to verify agents without allowing them to become their own oracle
- how to operate agents that run for long periods and recover from failure
- how production behavior feeds back into engineering
- how evaluation becomes a continuous feedback loop
- how teams prevent the software and the agent environment from decaying over time

It is a **handbook of emerging engineering practice**, not a product manual, vendor guide, or generic AI engineering tutorial.

A reader should be able to take the ideas, use the tools they already have, and improve their own engineering system without adopting anything from Safe to Merge.

---

## 2. The North Star

### How do we make software safer to change as the cost of changing it keeps falling?

AI agents are making implementation dramatically cheaper and faster.

That changes the engineering problem.

When producing a code change is no longer the main constraint, the important questions become:

- Did we understand what was actually intended?
- Did the agent have the context it needed?
- What could this change affect?
- What evidence tells us it works?
- Can we trust that evidence?
- What should the agent decide on its own?
- What still needs a human?
- What happens when something gets through anyway?
- Does the system learn from that failure?
- Does the engineering environment become better over time, or slowly accumulate entropy?

**Safe velocity** is the outcome.

The handbook is about the system that makes safe velocity possible.

---

## 3. The Core Model

The handbook uses one loop as its conceptual spine:

**Observe → Understand → Change → Verify → Ship → Learn**

### Observe

Understand what the running product is actually doing.

Production errors, traces, logs, analytics, session replay, incidents, deployments, user behavior, and other operational signals.

### Understand

Build enough context to understand the requested change and its consequences.

Intent, product requirements, repository knowledge, architecture, dependencies, ownership, history, production behavior, and blast radius.

### Change

Let humans and agents make the change.

This includes agent harnesses, tools, skills, permissions, environments, long-running execution, checkpoints, and recovery.

### Verify

Build trustworthy evidence that the change does what it should and does not break what it should not.

Tests are one form of evidence, not the definition of verification.

### Ship

Move the change into production with appropriate controls.

CI, previews, progressive delivery, rollbacks, auditability, and change-specific risk controls.

### Learn

Feed what actually happened back into the system.

Escaped bugs, incidents, user behavior, failed evaluations, agent mistakes, review feedback, and production evidence should improve future context, tests, skills, evaluations, and engineering rules.

The loop matters because none of these stages is sufficient on its own.

---

## 4. The Big Ideas We Want the Reader to Leave With

### 4.1 Intent becomes infrastructure

As agents get better at implementation, vague requirements become more expensive.

The system needs ways to express:

- product intent
- acceptance criteria
- behavioral contracts
- user journeys
- invariants
- definitions of done
- constraints

The question is not only "can the agent implement this?"

It is also:

> **What would let the system know that the implementation is correct?**

---

### 4.2 Context is part of the engineering system

An agent cannot safely change a large product from the task description and a handful of files.

Context can include:

- repository structure
- architecture
- domain knowledge
- product behavior
- historical decisions
- ownership
- dependencies
- current production behavior
- previous incidents
- relevant skills and tools

The handbook should teach teams how to make this context available, useful, discoverable, and maintainable.

---

### 4.3 The agent harness matters as much as the model

The model is only one component.

The surrounding environment determines what the agent can see, what it can do, how it is constrained, how it recovers, and how its work is evaluated.

Harness topics include:

- tools
- skills
- context
- permissions
- sandboxes
- state
- checkpoints
- retries
- durable execution
- feedback
- evaluation
- recovery

---

### 4.4 Cheap changes create a new maintenance problem

If agents make changes extremely cheap, they can also make bad abstractions extremely cheap to create.

The system therefore needs continuous maintenance:

- architectural drift detection
- stale tests
- stale documentation
- duplicated abstractions
- dead code
- agent skill drift
- dependency drift
- quality rules
- automated cleanup

The goal is not just to prevent breakage.

It is to keep the software understandable enough for the next agent and human to work on.

---

### 4.5 Evidence is more important than output

A test suite, review comment, successful build, or agent explanation is an output.

The deeper question is:

> **What does this evidence actually prove?**

Safe to Merge should teach teams to reason about evidence quality, independence, coverage, false confidence, and the relationship between a check and the behavior it is supposed to establish.

---

### 4.6 Autonomy should be earned

The goal is not maximum autonomy.

The goal is appropriate autonomy.

Agents should be given more freedom where the system has strong context, strong evidence, small blast radius, and reliable recovery.

Humans should remain involved where uncertainty, consequence, ambiguity, or accountability demands it.

---

### 4.7 Production is part of the test system

Production should not be the end of the engineering loop.

Real failures, user behavior, session replays, traces, incidents, and successful changes can become future engineering knowledge.

A mature system should increasingly learn from what actually happens.

---

### 4.8 Evaluation is a continuous system

Evaluation should not only answer "is this agent good?"

It should answer:

- Did this change to the harness improve anything?
- Did a new skill help?
- Did an agent regression appear?
- Did a new verification rule reduce escaped defects?
- Did the system become noisier?
- Did production behavior improve?

Evaluation becomes part of the development loop itself.

---

## 5. Handbook Structure

The chapters are organized around the engineering problems above, not around individual tools.

### Part I: The Shift

#### 1. When Writing Code Stops Being the Bottleneck
What changes when agents can produce software faster than humans can review and reason about it. Where the bottleneck moves next.

#### 2. What Does Correct Actually Mean?
Intent, specifications, acceptance criteria, behavioral contracts, invariants, user journeys, and machine-checkable definitions of done.

#### 3. The New Engineering Loop
Observe → Understand → Change → Verify → Ship → Learn as one connected system.

#### 4. When Software Becomes Cheap to Change
AI-generated entropy, architectural drift, stale knowledge, duplicated abstractions, and why continuous maintenance becomes a first-class engineering activity.

---

### Part II: Context & Understanding

#### 5. Make the Codebase Legible to Agents
Repository knowledge, architecture, domain knowledge, ownership, history, skills, retrieval, progressive disclosure, and keeping knowledge fresh.

#### 6. Give Agents the Right Context
How code, product intent, documentation, history, production signals, and task-specific information should come together without creating unusable context.

#### 7. Understand the Blast Radius
Dependencies, affected user journeys, ownership, historical changes, production behavior, and deciding what deserves deeper verification.

#### 8. Give Agents a View of Production
Errors, logs, traces, analytics, session replay, feature flags, deployments, and how operational evidence can become agent context.

---

### Part III: The Agent Environment

#### 9. The Agent Harness
Tools, skills, permissions, sandboxes, context, state, feedback, recovery, and the environment surrounding the model.

#### 10. Before You Give an Agent Write Access
Repository conventions, contracts, secrets, permissions, environments, isolation, and the minimum boundaries required for safe agent work.

#### 11. When an Agent Runs for Six Hours
Long-running work, durable execution, checkpoints, resumability, partial failures, artifacts, handoffs, and recovery.

---

### Part IV: Verification & Trust

#### 12. What Counts as Evidence?
Why green CI is not the same as confidence. Tests, browser runs, static checks, traces, replays, production evidence, and human judgment.

#### 13. Verify What Changed
Risk-based verification, targeted checks, test-impact analysis, historical regressions, change-specific evidence, and avoiding unnecessary verification.

#### 14. Don't Let the Agent Be Its Own Oracle
Independent verification, external signals, evaluator independence, evidence quality, reward hacking, and false confidence.

#### 15. Human Review Without the Noise
Review routing, ownership, AI review quality, false positives, alert fatigue, and preserving human attention for decisions that actually need it.

---

### Part V: Autonomy & Shipping

#### 16. Who Should Decide?
Designing human and agent boundaries. What can be automated, what needs approval, and how autonomy can increase as confidence increases.

#### 17. Ship Safely
Preview environments, CI/CD, progressive delivery, rollback, auditability, and the boundary between merge and production.

#### 18. Measure Safe Velocity
Escaped defects, detection time, regression catch rate, intervention rate, evidence quality, cost, and whether faster development is actually producing better outcomes.

---

### Part VI: Learning Systems

#### 19. Turn Production Failures Into Learning
Trace a real failure from detection through investigation, fix, verification, and the change that prevents the same failure from disappearing into history.

#### 20. Build the Evaluation Loop
Offline evaluations, production-derived evaluations, traces, golden cases, human judgments, false positives, online experiments, and evaluating the evaluator.

#### 21. Keep the System From Decaying
Maintaining tests, docs, architecture, context, skills, evaluation cases, and the rules that keep the system useful to future agents and humans.

---

### Part VII: Practice

#### 22. Connect the Tools You Already Have
Practical integration patterns for GitHub, CI, preview environments, Playwright, Sentry, PostHog, Slack, agent tools, and the feedback between them.

#### 23. Case Studies
Deep studies of teams that are actually operating these systems. Focus on concrete workflows, decisions, failures, and what transfers.

#### 24. Playbooks
Short practical starting points for teams at different stages of agent adoption.

#### 25. Research Shelf
A deliberately small collection of high-signal primary engineering work and empirical research.

---

## 6. Integration Guides

These are practical companions to the chapters, not a separate software tutorial.

Every integration guide should answer:

1. What does this tool contribute to the engineering loop?
2. What information should move into or out of it?
3. What is the minimum useful setup?
4. What permissions are actually required?
5. What should the team avoid connecting?
6. What common failure mode appears after integration?
7. What becomes possible once the systems are connected?
8. What is a reasonable alternative?

Initial areas:

- GitHub and pull requests
- CI/CD
- Preview environments
- Playwright and browser verification
- Sentry / Datadog / other observability
- PostHog and product analytics/replay
- Slack and team notifications
- Agent skills and repository instructions
- MCP and external tools
- Durable workflow orchestration where genuinely necessary

The guides should explain the **engineering pattern**, not reproduce vendor documentation.

---

## 7. Case Study Method

Case studies are a core part of the handbook.

We are looking for teams that are actually figuring this out, not companies that merely publish AI positioning.

For every case study, try to capture:

- What problem were they trying to solve?
- What did the workflow look like before?
- What changed?
- What tools did they connect?
- What context does the agent receive?
- What evidence does the system produce?
- Where does a human still intervene?
- What went wrong?
- What did they change after it went wrong?
- How do they know the new system is better?
- What would transfer to another team?
- What is specific to their company?

Primary sources should be preferred:

- engineering blog posts
- public agent skills
- GitHub repositories
- architecture documents
- technical talks
- product documentation
- direct conversations with engineers and founders

---

## 8. Research Standard

The research shelf should be intentionally small.

Do not collect papers because they contain "AI agents" in the title.

Prioritize work that gives us evidence or a useful primary account of how these systems actually operate.

### Companies and teams to study

- **OpenAI**: Harness Engineering, repository knowledge, agent-accessible observability, quality enforcement, entropy, feedback loops.
- **Cursor**: agent harness evolution, cloud agent lessons, long-running agents, autonomy, review, production feedback.
- **Replit**: evaluation at scale, production experiments, traces, continuous optimization.
- **Sourcegraph**: context and retrieval in large codebases.
- **Factory**: incident response, software factory, production investigation and memory.
- **PostHog**: Scout, self-driving product work, 10k PRs/month, Replay Vision, QA skills, agent-first product engineering.
- **CodeRabbit**: AI review at scale and the practical limits of automated review.
- Other emerging teams should be added when their primary work contains genuinely useful evidence.

### Academic areas worth mining

- empirical studies of agent-authored PRs
- AI code review outcomes
- software testing and test-impact analysis
- runtime verification
- automated program repair
- fault localization
- self-adaptive and self-healing systems
- agent observability and debugging
- evaluation of agent trajectories
- human and automated software review
- long-running agent reliability

### Evidence rule

Important claims should be supported by one or more of:

1. a concrete case study
2. a primary engineering source
3. empirical research
4. clearly labelled synthesis or opinion

Emerging ideas should be presented as emerging.

Every source should have:
- a direct link
- a short note explaining why it matters
- a date or publication period
- a last-reviewed date when appropriate

---

## 9. Human Research

The handbook should learn directly from engineers and founders who are working through these problems.

The research form and conversations should feel like a human-to-human engineering conversation, not a survey.

Good questions are concrete:

- "Walk me through what happens when someone opens a PR."
- "What usually gives you confidence that it is safe to merge?"
- "Tell me about the last bug that made it to production. What happened?"
- "How did you find out about it?"
- "Once it was fixed, did anything change because of it?"
- "When an agent makes a change, what makes you comfortable accepting it?"
- "What still creates the most noise for your engineers?"
- "Is there something you wish your tools knew about each other?"
- "What's something about this workflow you still haven't figured out?"
- "Tell me about the last time something went wrong. What happened from the moment you found it until you were confident it wouldn't happen again?"

The goal is to collect workflows and stories that can be turned into useful case studies.

---

## 10. Practical Playbooks

Playbooks should be short, concrete, and tied to a real starting situation.

Initial candidates:

- **We just gave an AI coding agent write access to our repo.**
- **We ship multiple times a day and have almost no tests.**
- **We have a large test suite nobody fully trusts anymore.**
- **We have observability, but it is disconnected from engineering changes.**
- **We want to reduce human review without losing safety.**
- **Our agents keep making the same mistakes.**
- **Our agents don't understand the codebase well enough.**
- **We have too much agent context and still get poor results.**
- **We want production failures to improve future verification.**
- **We want to run agents for much longer than a single coding session.**

Each playbook should say:

- where to start
- what to connect first
- what to measure
- what not to automate yet
- common failure modes
- what to do next

---

## 11. Website & Content Architecture

The handbook is a **docs site**, not a blog.

Requirements:

- every chapter gets its own crawlable URL
- chapters have descriptive titles and metadata
- each chapter is independently understandable
- related chapters link to one another
- source material is visible and linked
- practical examples are copyable
- emerging vs established practices are clearly marked
- no login wall or gated chapters
- the site should have `sitemap.ts` and `robots.ts`
- canonical URLs should be defined
- Open Graph images should exist for the handbook and important chapters
- structured data should be used where appropriate
- internal linking should create a useful knowledge graph
- search language should be natural, never keyword-stuffed

The landing page should communicate the thesis.

The individual chapters should become the durable search surface.

---

## 12. MVP

Do not build all 25 chapters before publishing.

The first version should establish the intellectual direction through a small number of unusually strong pieces:

1. **When Writing Code Stops Being the Bottleneck**
2. **What Does Correct Actually Mean?**
3. **Make the Codebase Legible to Agents**
4. **What Counts as Evidence?**
5. One concrete production failure case study
6. One deep case study of a team operating an agentic workflow
7. One practical integration guide

Then use conversations, research, and reader feedback to decide what comes next.

The MVP should prove that Safe to Merge can produce **useful engineering practice and original synthesis**, not just another AI content site.

---

## 13. What Safe to Merge Should Not Become

Do not turn it into:

- generic AI engineering 101
- prompt engineering
- LLM fundamentals
- model comparisons
- RAG tutorials
- vector database tutorials
- generic MCP documentation
- "best AI coding tools" lists
- generic multi-agent architecture
- a testing-tool comparison site
- a product disguised as a handbook
- a collection of speculative predictions

The handbook should sit one abstraction above the tools.

Tools will change.

The engineering problems around **intent, context, change impact, evidence, autonomy, observability, evaluation, recovery, and learning** are much more durable.

---

## 14. How It Relates to a Future Product

The handbook stands on its own.

If a product is eventually built, it should emerge from a repeatedly observed problem in the handbook's research and case studies.

The relationship is:

**Research → Practice → Repeated Problem → Product**

Never:

**Product idea → Write a chapter explaining why the product is necessary**

The handbook should remain useful even if no product is ever built.

---

## 15. Current Positioning

Safe to Merge is ultimately exploring a larger question:

> **If agents make software dramatically easier to change, what engineering system do we need to keep that software reliable?**

The answer is unlikely to be a better test generator alone.

It is a system that connects:

**Intent → Context → Change → Evidence → Decision → Production → Learning**

The handbook exists to study how the best teams are building that system today.
