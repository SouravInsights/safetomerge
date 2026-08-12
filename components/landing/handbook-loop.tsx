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
    desc: "Give the change the context it needs: intent, architecture, history, ownership, and blast radius.",
  },
  {
    label: "CHANGE",
    desc: "Let humans or agents make the change with the right tools, constraints, and durable execution.",
  },
  {
    label: "VERIFY",
    desc: "Assemble independent evidence that the intended behavior still holds, not just that a test suite is green.",
  },
  {
    label: "SHIP",
    desc: "Move changes through safe boundaries with progressive autonomy, approvals, rollback, and auditability.",
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
          The loop stays simple. The handbook goes deeper into what each stage
          needs when agents become a bigger part of how software gets built.
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
              Then back to Observe. The system should get better as it runs.
            </p>
          </li>
        </ol>
      </Container>
    </section>
  );
}
