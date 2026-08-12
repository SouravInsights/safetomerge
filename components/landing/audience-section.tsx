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
                'You\'ve started letting an AI agent open PRs and you\'re not totally sure what "safe" means now.',
                "You want a mental model for the problem, more than another list of product launches to skim.",
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
                "You're hoping for a plug-and-play tool. This is more about rethinking your process.",
                "You want to learn how to build AI agents. This is about keeping your software reliable when code is written at inference speed.",
                "You need a finished manual right now. I'm still learning and writing this as I go.",
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
