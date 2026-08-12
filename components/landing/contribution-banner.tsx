import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

export function ContributionBanner() {
  return (
    <section id="contribute" className="section-band max-w-full py-16 sm:py-20 border-y border-rule">
      <Container size="narrow">
        <div className="mb-6">
          <span className="inline-block font-mono text-xs tracking-widest uppercase text-verified bg-verified/10 px-2.5 py-1 border border-verified/20">
            Call for contributions
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight mb-4">
          How does your team ship code <mark className="mark">when agents write a lot of it</mark>?
        </h2>

        <p className="text-lg text-muted leading-relaxed max-w-xl mb-8">
          I&apos;m looking for concrete workflows, failures, internal tools, and
          lessons from teams figuring this out in production. No polished AI
          opinions needed. If something worked — or broke — I want to learn from it.
        </p>

        <div>
          <a
            href="/contribute"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest bg-ink text-paper px-6 py-3.5 hover:bg-verified transition-colors"
          >
            Share your team&apos;s workflow
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </Container>
    </section>
  );
}
