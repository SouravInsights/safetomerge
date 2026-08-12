import * as React from "react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/landing/section-label";

export const LOOP_STAGES = [
  {
    label: "OBSERVE",
    desc: "Know what is actually happening: errors, usage, traces, replays, deployments, and failures.",
  },
  {
    label: "UNDERSTAND",
    desc: "Know what the change is supposed to do, what it touches, and what context the agent needs before it acts.",
  },
  {
    label: "CHANGE",
    desc: "Let humans or agents make the change with the right tools, constraints, context, and durable execution.",
  },
  {
    label: "VERIFY",
    desc: "Gather evidence that the intended behavior still holds. A green test suite is only one piece of that evidence.",
  },
  {
    label: "SHIP",
    desc: "Move changes through safe boundaries with approvals, progressive delivery, rollback, and clear ownership.",
  },
  {
    label: "LEARN",
    desc: "Turn production outcomes, failures, and human decisions into better context, evaluations, checks, and workflows.",
  },
];

export function HandbookLoop() {
  return (
    <section id="loop" className="section-band max-w-full py-16 sm:py-20">
      <Container size="narrow">
        <SectionLabel>How it&apos;s organized</SectionLabel>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          The whole book maps to six stages.
        </h2>
        <p className="text-lg text-muted leading-relaxed max-w-xl mb-10">
          The loop is simple. The hard part is building each stage well enough that
          the next one can rely on it.
        </p>

        <ol className="grid sm:grid-cols-2 gap-x-12 gap-y-10 mt-6">
          {LOOP_STAGES.map((stage, index) => (
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
              Then back to Observe. The point is to make the next cycle better.
            </p>
          </li>
        </ol>
      </Container>
    </section>
  );
}
