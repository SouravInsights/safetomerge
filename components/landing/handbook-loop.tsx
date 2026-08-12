import * as React from "react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/landing/section-label";

export const LOOP_STAGES = [
  { label: "OBSERVE", desc: "Knowing what's actually happening in production." },
  { label: "UNDERSTAND", desc: "Mapping the blast radius of a specific change." },
  { label: "CHANGE", desc: "Authoring the code, whether by human or agent." },
  { label: "VERIFY", desc: "Gathering evidence that the change is safe." },
  { label: "SHIP", desc: "Moving the code to production reliably." },
  { label: "LEARN", desc: "Feeding outcomes back into the next cycle." },
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
          Most teams are fine at five of these and struggling with one. The
          handbook is built around each stage. If you know which one is weak
          in your own process, you know where to start.
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
              Then back to Observe, and the cycle repeats.
            </p>
          </li>
        </ol>
      </Container>
    </section>
  );
}
