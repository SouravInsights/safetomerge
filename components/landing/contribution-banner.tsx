import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Highlight } from "@/components/ui/highlight";

export function ContributionBanner() {
  return (
    <section id="contribute" className="section-band max-w-full py-16 sm:py-20 border-y border-rule">
      <Container size="narrow">
        <div className="mb-6 reveal">
          <span className="inline-block -rotate-[1.5deg] font-mono text-xs tracking-widest uppercase text-verified bg-verified/10 px-2.5 py-1 border border-verified/40 shadow-[2px_2px_0_0_color-mix(in_srgb,var(--verified)_30%,transparent)] transition-transform duration-200 hover:rotate-0">
            Call for contributions
          </span>
        </div>

        <h2 className="reveal reveal-d1 text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-balance mb-4">
          How does your team ship code{" "}
          <Highlight delay={150}>when agents write a lot of it</Highlight>?
        </h2>

        <p className="reveal reveal-d2 text-lg text-muted leading-relaxed max-w-xl mb-8">
          This handbook isn't built on theories or based on one person's opinions. It's informed by software teams figuring this out in production right now. So I'm looking for concrete workflows, failures, internal tools, and lessons from teams figuring this out in prod. If you've built something that works (or discovered where your workflow breaks), I want to learn from your experiences and feature it.
        </p>

        <div className="reveal reveal-d3">
          <a
            href="/contribute"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest border-2 border-edge bg-paper text-ink px-6 py-3.5 shadow-[3px_3px_0_0_var(--plate)] hover:border-verified hover:text-verified hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:border-verified active:text-verified active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150"
          >
            Share your team&apos;s workflow
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1" />
          </a>
        </div>
      </Container>
    </section>
  );
}
