import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/landing/section-label";

export function AudienceSection() {
  return (
    <section id="for-you" className="section-band max-w-full py-16 sm:py-20">
      <Container size="narrow">
        <SectionLabel className="mb-10">Is this for you</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-10 sm:gap-16">
          <div>
            <h3 className="font-mono text-xs tracking-widest uppercase text-verified mb-4">
              This is for you if
            </h3>
            <ul className="space-y-3 text-muted leading-relaxed">
              {[
                "You ship multiple times a week and a green checkmark doesn't fully reassure you anymore.",
                "You've started letting AI agents make meaningful changes and you're figuring out what context, evidence, and review they actually need.",
                "You want to understand the engineering systems emerging around agents, not another list of AI tools.",
                "You're interested in making software improve its own checks and workflows from what happens in production.",
              ].map((text) => (
                <li key={text} className="flex gap-3">
                  <Plus className="w-4 h-4 text-verified shrink-0 mt-1" />
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
                "You're looking for a plug-and-play tool. This is about the engineering system around the tools.",
                "You want a generic AI-agent tutorial covering prompts, models, or frameworks.",
                "You need a finished manual right now. I'm still learning and writing this as the field moves.",
              ].map((text) => (
                <li key={text} className="flex gap-3">
                  <Minus className="w-4 h-4 text-flag shrink-0 mt-1" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
