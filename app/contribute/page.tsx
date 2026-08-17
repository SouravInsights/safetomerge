"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { submitContribution } from "@/app/actions/contribute";
import { Logo } from "@/components/logo";
import posthog from "posthog-js";

/* ── Form State Types ── */

type FormData = {
  // Step 1: Context
  email: string;
  role: string;
  teamSize: string;
  domain: string;
  aiShare: string;

  // Step 2: Shipping & Confidence
  prFlow: string;
  confidenceSignals: string[];
  confidenceOther: string;
  extraScrutiny: string;
  toolsUsed: string[];

  // Step 3: Failure & Testing Loops
  lastIncident: string;
  incidentFeedback: string;
  mostTrustedTest: string;
  leastTrustedTest: string;

  // Step 4: Autonomy & Integration
  agentBoundaries: string;
  toolIntegrationWish: string;
  unsolvedProblem: string;
  links: string[];
  credit: string;
  followUp: string;
};

const initialFormState: FormData = {
  email: "",
  role: "",
  teamSize: "",
  domain: "",
  aiShare: "",

  prFlow: "",
  confidenceSignals: [],
  confidenceOther: "",
  extraScrutiny: "",
  toolsUsed: [],

  lastIncident: "",
  incidentFeedback: "",
  mostTrustedTest: "",
  leastTrustedTest: "",

  agentBoundaries: "",
  toolIntegrationWish: "",
  unsolvedProblem: "",
  links: [""],
  credit: "",
  followUp: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CONFIDENCE_OPTIONS = [
  "CI and automated test suite results",
  "A human engineer reading the code diff",
  "AI-generated review summary or analysis",
  "Diff size and blast radius evaluation",
  "Preview or staging environment testing",
  "Production metrics and error monitoring post-deploy",
  "Type-checking and static analysis",
  "Git history and file ownership",
];

const TOOL_OPTIONS = [
  "GitHub / GitLab",
  "Linear / Jira",
  "Cursor / Windsurf / Copilot",
  "GitHub Actions / CircleCI",
  "Sentry / Bugsnag",
  "PostHog / Datadog / Honeycomb",
  "Playwright / Cypress",
  "Vercel / Railway / AWS",
];

function toggleArrayValue(list: string[], item: string) {
  return list.includes(item)
    ? list.filter((val) => val !== item)
    : [...list, item];
}

const STEPS = [
  { id: 1, title: "Your team", label: "Your team" },
  { id: 2, title: "How you ship", label: "How you ship" },
  { id: 3, title: "When code breaks", label: "When code breaks" },
  { id: 4, title: "Agent boundaries", label: "Agent boundaries" },
];

export default function ContributePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateLink(index: number, value: string) {
    const nextLinks = [...form.links];
    nextLinks[index] = value;
    updateField("links", nextLinks);
  }

  function addLinkField() {
    updateField("links", [...form.links, ""]);
  }

  function removeLinkField(index: number) {
    updateField(
      "links",
      form.links.filter((_, idx) => idx !== index)
    );
  }

  function validateStep(step: number): boolean {
    setError(null);
    if (step === 1) {
      if (!EMAIL_REGEX.test(form.email.trim())) {
        setError("Please provide a valid email address so we can follow up.");
        return false;
      }
    }
    return true;
  }

  function handleNextStep(e?: React.MouseEvent) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (validateStep(currentStep)) {
      const nextStep = Math.min(currentStep + 1, STEPS.length);
      posthog.capture("contribution_step_advanced", {
        from_step: currentStep,
        from_step_title: STEPS[currentStep - 1].title,
        to_step: nextStep,
        to_step_title: STEPS[nextStep - 1].title,
        total_steps: STEPS.length,
      });
      setCurrentStep(nextStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handlePrevStep(e?: React.MouseEvent) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (currentStep < STEPS.length) {
      return;
    }
    if (!validateStep(1)) {
      setCurrentStep(1);
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await submitContribution(form, "v1");

      if (res.success) {
        setSubmitted(true);
        posthog.capture("contribution_submitted", {
          role: form.role,
          team_size: form.teamSize,
          ai_share: form.aiShare,
          credit_preference: form.credit,
          open_to_follow_up: form.followUp,
          confidence_signal_count: form.confidenceSignals.length,
          tools_used_count: form.toolsUsed.length,
        });
      } else {
        setError(res.error || "Failed to save response. Please try again.");
      }
    } catch {
      setError("Something went wrong submitting your response. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Success Screen ── */
  if (submitted) {
    return (
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 py-20 sm:py-32">
          <p className="font-mono text-xs tracking-widest uppercase text-verified mb-4 sm:mb-6">
            Response Received
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold leading-tight mb-6">
            Thank you. Your insight will directly shape the handbook.
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl mb-10">
            If you opted for a follow-up, I will reach out directly by email.
            No automated lists or spam, just a conversation between engineers.
          </p>
          <a
            href="/"
            className="font-mono text-sm text-muted hover:text-ink underline underline-offset-4 decoration-rule inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </a>
        </section>
      </main>
    );
  }

  const progressPercent = Math.round((currentStep / STEPS.length) * 100);

  return (
    <main className="flex-1 min-h-screen flex flex-col">
      {/* ── Header ── */}
      <header className="max-w-3xl mx-auto px-6 pt-12 sm:pt-24 pb-6 w-full">
        <div className="flex items-center gap-3.5 mb-4 sm:mb-6">
          <Logo />
          <span className="text-muted/40 font-mono text-xs select-none pl-0.5">/</span>
          <span className="font-mono text-xs tracking-widest uppercase text-ink font-semibold">
            Contribute
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-semibold leading-[1.1] tracking-tight mb-4 sm:mb-6">
          How does your team actually ship code?
        </h1>
        <p className="text-base sm:text-xl text-muted leading-relaxed max-w-xl mb-6">
          I&apos;m writing the <mark className="mark">Safe to Merge</mark> handbook by studying how engineering teams actually test, review, and merge code. Tell me what your team does to trust a change before it ships.
        </p>

        {/* ── Mobile & Desktop Sleek Progress Tracker ── */}
        <div className="py-5 border-t border-b border-rule my-6 sm:my-8 space-y-3">
          <div className="flex items-center justify-between font-mono text-xs tracking-widest uppercase">
            <span className="text-verified font-medium">
              Step {currentStep} of {STEPS.length} &middot; {STEPS[currentStep - 1].title}
            </span>
            <span className="text-muted font-normal">{progressPercent}%</span>
          </div>

          {/* Progress bar track */}
          <div className="h-1.5 w-full bg-rule relative overflow-hidden">
            <div
              className="h-full bg-ink transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Desktop Step Nav */}
          <div className="hidden sm:flex items-center justify-between pt-2">
            {STEPS.map((s) => {
              const isActive = currentStep === s.id;
              const isCompleted = currentStep > s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    if (s.id < currentStep || validateStep(currentStep)) {
                      setCurrentStep(s.id);
                    }
                  }}
                  className={`font-mono text-[11px] uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "text-ink font-semibold underline underline-offset-4 decoration-ink"
                      : isCompleted
                      ? "text-verified hover:text-ink"
                      : "text-muted/60 hover:text-muted"
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 text-verified" /> : null}
                  {s.id}. {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ── Form Container ── */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto px-6 flex-1 flex flex-col justify-between w-full"
      >
        <div className="space-y-6 sm:space-y-8">
          {/* ════════════════════════════════════════════════
              STEP 1: Context & Team Profile
          ════════════════════════════════════════════════ */}
          {currentStep === 1 && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in-50 duration-200">
              <div className="border-b border-rule pb-3">
                <p className="font-mono text-xs tracking-widest uppercase text-verified">
                  Step 1 of 4
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold mt-1">
                  Tell us a bit about your team setup
                </h2>
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  Your Email <span className="text-flag">*</span>
                </Label>
                <Input
                  type="email"
                  autoComplete="email"
                  className="h-12 px-4 text-base bg-paper border-rule focus:border-ink rounded-none"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@company.dev"
                />
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  So we can reach out if your experience sparks a chapter. Never
                  shared or added to marketing lists.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  What is your role?
                </Label>
                <Select
                  value={form.role}
                  onValueChange={(v) => updateField("role", v ?? "")}
                >
                  <SelectTrigger className="w-full h-12 px-4 text-base bg-paper border-rule focus:border-ink rounded-none">
                    <SelectValue placeholder="Select your primary role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ic">IC Software Engineer</SelectItem>
                    <SelectItem value="lead">Tech Lead / Staff / Principal</SelectItem>
                    <SelectItem value="em">Engineering Manager / Director</SelectItem>
                    <SelectItem value="founder">CTO / Founder</SelectItem>
                    <SelectItem value="platform">DevOps / Platform / SRE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  How many engineers regularly ship code on your team?
                </Label>
                <Select
                  value={form.teamSize}
                  onValueChange={(v) => updateField("teamSize", v ?? "")}
                >
                  <SelectTrigger className="w-full h-12 px-4 text-base bg-paper border-rule focus:border-ink rounded-none">
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Solo developer</SelectItem>
                    <SelectItem value="2-5">2 to 5 engineers</SelectItem>
                    <SelectItem value="6-15">6 to 15 engineers</SelectItem>
                    <SelectItem value="16-50">16 to 50 engineers</SelectItem>
                    <SelectItem value="50+">50+ engineers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  What does your team build?
                </Label>
                <Input
                  className="h-12 px-4 text-base bg-paper border-rule focus:border-ink rounded-none"
                  value={form.domain}
                  onChange={(e) => updateField("domain", e.target.value)}
                  placeholder="e.g. B2B SaaS, developer tools, fintech, e-commerce, mobile app"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  Roughly what share of your PRs are authored or drafted by AI/agents?
                </Label>
                <Select
                  value={form.aiShare}
                  onValueChange={(v) => updateField("aiShare", v ?? "")}
                >
                  <SelectTrigger className="w-full h-12 px-4 text-base bg-paper border-rule focus:border-ink rounded-none">
                    <SelectValue placeholder="Select ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="almost-none">Almost none yet</SelectItem>
                    <SelectItem value="10-30">Around 10 to 30%</SelectItem>
                    <SelectItem value="30-60">Around 30 to 60%</SelectItem>
                    <SelectItem value="60+">More than 60%</SelectItem>
                    <SelectItem value="unsure">Not sure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════
              STEP 2: Shipping & Confidence
          ════════════════════════════════════════════════ */}
          {currentStep === 2 && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in-50 duration-200">
              <div className="border-b border-rule pb-3">
                <p className="font-mono text-xs tracking-widest uppercase text-verified">
                  Step 2 of 4
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold mt-1">
                  How code moves from PR to production
                </h2>
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  Walk us through what happens when someone opens a PR on your team.
                </Label>
                <Textarea
                  className="min-h-[140px] px-4 py-3 text-base bg-paper border-rule focus:border-ink rounded-none resize-y"
                  value={form.prFlow}
                  onChange={(e) => updateField("prFlow", e.target.value)}
                  placeholder='e.g. "An agent opens a PR from a Linear ticket. CI runs unit tests and static checks. Anything touching billing gets human review; small fixes auto-merge once CI passes."'
                />
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  What usually gives you real confidence that a PR is safe to merge?
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {CONFIDENCE_OPTIONS.map((option) => {
                    const isChecked = form.confidenceSignals.includes(option);
                    return (
                      <label
                        key={option}
                        className={`flex items-start gap-3 p-3.5 border transition-colors cursor-pointer select-none ${
                          isChecked
                            ? "border-ink bg-ink/5 text-ink font-medium"
                            : "border-rule bg-paper hover:border-muted text-ink/90"
                        }`}
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() =>
                            updateField(
                              "confidenceSignals",
                              toggleArrayValue(form.confidenceSignals, option)
                            )
                          }
                          className="mt-0.5 shrink-0"
                        />
                        <span className="text-sm sm:text-base leading-snug">
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <Input
                  className="h-12 px-4 text-base bg-paper border-rule focus:border-ink rounded-none mt-3"
                  value={form.confidenceOther}
                  onChange={(e) => updateField("confidenceOther", e.target.value)}
                  placeholder="Other confidence signals?"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  Are there specific categories of changes that always get extra human scrutiny?
                </Label>
                <Textarea
                  className="min-h-[120px] px-4 py-3 text-base bg-paper border-rule focus:border-ink rounded-none resize-y"
                  value={form.extraScrutiny}
                  onChange={(e) => updateField("extraScrutiny", e.target.value)}
                  placeholder='e.g. "Auth, payments, DB migrations, or public API contract changes never get auto-approved."'
                />
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  Which tools are actively part of your verification loop?
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {TOOL_OPTIONS.map((tool) => {
                    const isChecked = form.toolsUsed.includes(tool);
                    return (
                      <label
                        key={tool}
                        className={`flex items-center gap-3 p-3.5 border transition-colors cursor-pointer select-none ${
                          isChecked
                            ? "border-ink bg-ink/5 text-ink font-medium"
                            : "border-rule bg-paper hover:border-muted text-ink/90"
                        }`}
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() =>
                            updateField(
                              "toolsUsed",
                              toggleArrayValue(form.toolsUsed, tool)
                            )
                          }
                          className="shrink-0"
                        />
                        <span className="text-sm sm:text-base">{tool}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════
              STEP 3: Incidents & Testing Feedback Loops
          ════════════════════════════════════════════════ */}
          {currentStep === 3 && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in-50 duration-200">
              <div className="border-b border-rule pb-3">
                <p className="font-mono text-xs tracking-widest uppercase text-verified">
                  Step 3 of 4
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold mt-1">
                  When things go wrong in production
                </h2>
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  Think about the last bug or incident that made it to production. What happened, and how was it found?
                </Label>
                <Textarea
                  className="min-h-[140px] px-4 py-3 text-base bg-paper border-rule focus:border-ink rounded-none resize-y"
                  value={form.lastIncident}
                  onChange={(e) => updateField("lastIncident", e.target.value)}
                  placeholder="Describe what broke, how you discovered it, and what the root cause was."
                />
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  Once that incident was fixed, did anything change in your workflow to prevent it from recurring?
                </Label>
                <Textarea
                  className="min-h-[120px] px-4 py-3 text-base bg-paper border-rule focus:border-ink rounded-none resize-y"
                  value={form.incidentFeedback}
                  onChange={(e) => updateField("incidentFeedback", e.target.value)}
                  placeholder="Did it turn into a new test, a linter rule, an alert, an agent instruction, or an update to AGENTS.md?"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  Which part of your testing setup do you trust the most?
                </Label>
                <Textarea
                  className="min-h-[100px] px-4 py-3 text-base bg-paper border-rule focus:border-ink rounded-none resize-y"
                  value={form.mostTrustedTest}
                  onChange={(e) => updateField("mostTrustedTest", e.target.value)}
                  placeholder="e.g. Playwright end-to-end user flows, strict TypeScript compiler, unit tests for core domain logic"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  Which part do you trust the least or find the most noisy?
                </Label>
                <Textarea
                  className="min-h-[100px] px-4 py-3 text-base bg-paper border-rule focus:border-ink rounded-none resize-y"
                  value={form.leastTrustedTest}
                  onChange={(e) => updateField("leastTrustedTest", e.target.value)}
                  placeholder="e.g. Flaky integration tests, AI code review bots generating false positives, outdated snapshots"
                />
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════
              STEP 4: Autonomy Boundaries, Integration & Credit
          ════════════════════════════════════════════════ */}
          {currentStep === 4 && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in-50 duration-200">
              <div className="border-b border-rule pb-3">
                <p className="font-mono text-xs tracking-widest uppercase text-verified">
                  Step 4 of 4
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold mt-1">
                  Agent boundaries and custom tooling
                </h2>
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  What do you still require an AI agent to ask a human before doing?
                </Label>
                <Textarea
                  className="min-h-[120px] px-4 py-3 text-base bg-paper border-rule focus:border-ink rounded-none resize-y"
                  value={form.agentBoundaries}
                  onChange={(e) => updateField("agentBoundaries", e.target.value)}
                  placeholder="e.g. Merging to main, touching database schemas, deploying to production, spending API credits"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  Is there something you wish your engineering tools (CI, GitHub, Sentry, Cursor, etc.) knew about each other, but currently don't?
                </Label>
                <Textarea
                  className="min-h-[120px] px-4 py-3 text-base bg-paper border-rule focus:border-ink rounded-none resize-y"
                  value={form.toolIntegrationWish}
                  onChange={(e) => updateField("toolIntegrationWish", e.target.value)}
                  placeholder="e.g. I wish Sentry errors automatically generated Playwright test specs for Cursor to fix."
                />
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  What part of this overall workflow still feels fragile or unsolved for your team?
                </Label>
                <Textarea
                  className="min-h-[120px] px-4 py-3 text-base bg-paper border-rule focus:border-ink rounded-none resize-y"
                  value={form.unsolvedProblem}
                  onChange={(e) => updateField("unsolvedProblem", e.target.value)}
                  placeholder="What is the hardest problem your team faces as AI authors more code?"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  Links to writeups, repos, agent skills, or architecture docs you are open to sharing
                </Label>
                <div className="space-y-2 pt-1">
                  {form.links.map((link, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Input
                        className="h-12 px-4 text-base bg-paper border-rule focus:border-ink rounded-none flex-1"
                        value={link}
                        onChange={(e) => updateLink(idx, e.target.value)}
                        placeholder="https://github.com/..."
                      />
                      {form.links.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLinkField(idx)}
                          className="px-3 py-2 text-muted hover:text-flag font-mono text-sm shrink-0"
                          aria-label="Remove link"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addLinkField}
                  className="font-mono text-xs text-muted hover:text-ink mt-2 underline underline-offset-4 decoration-rule transition-colors"
                >
                  + Add another link
                </button>
              </div>

              <div className="space-y-2 pt-4 border-t border-rule">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  How may we attribute or use your submission in the handbook?
                </Label>
                <Select
                  value={form.credit}
                  onValueChange={(v) => updateField("credit", v ?? "")}
                >
                  <SelectTrigger className="w-full h-12 px-4 text-base bg-paper border-rule focus:border-ink rounded-none">
                    <SelectValue placeholder="Select attribution preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="named">Quote me by name and company</SelectItem>
                    <SelectItem value="anon">Use my response anonymously</SelectItem>
                    <SelectItem value="private">Keep strictly private for research only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase tracking-widest text-muted block">
                  Are you open to a brief async follow-up conversation if needed?
                </Label>
                <Select
                  value={form.followUp}
                  onValueChange={(v) => updateField("followUp", v ?? "")}
                >
                  <SelectTrigger className="w-full h-12 px-4 text-base bg-paper border-rule focus:border-ink rounded-none">
                    <SelectValue placeholder="Select follow-up preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, happy to chat by email</SelectItem>
                    <SelectItem value="maybe">Maybe, depending on the topic</SelectItem>
                    <SelectItem value="no">No thanks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* ── Error Banner ── */}
          {error && (
            <p className="text-sm text-flag font-mono mt-4">{error}</p>
          )}
        </div>

        {/* ── Mobile-Friendly Sticky Action Bar ── */}
        <div className="sticky bottom-0 left-0 right-0 bg-paper/95 backdrop-blur-md border-t border-rule py-4 mt-8 z-30 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevStep}
              className="h-12 px-5 font-mono text-xs uppercase tracking-widest border border-rule bg-paper hover:bg-black/5 rounded-none flex items-center"
            >
              <ArrowLeft className="size-3.5 mr-2 stroke-[1.75]" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < STEPS.length ? (
            <Button
              type="button"
              onClick={handleNextStep}
              className="h-12 px-7 font-mono text-xs uppercase tracking-widest bg-ink text-paper hover:bg-verified transition-colors rounded-none ml-auto flex items-center gap-2"
            >
              Next Step
              <ArrowRight className="size-3.5 stroke-[1.75]" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={submitting}
              className="h-12 px-8 font-mono text-xs uppercase tracking-widest bg-ink text-paper hover:bg-verified transition-colors rounded-none ml-auto disabled:opacity-50 flex items-center gap-2"
            >
              {submitting ? "Submitting..." : "Submit Response"}
              <Check className="size-3.5 stroke-[2.5]" />
            </Button>
          )}
        </div>
      </form>
    </main>
  );
}
