import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/landing/section-label";
import { NotifyForm } from "@/app/components/notify-form";

export function HeroSection() {
  return (
    <Container size="narrow" className="pt-20 pb-16 sm:pt-28 sm:pb-20">
      <header>
        <SectionLabel>A handbook for software teams</SectionLabel>

        <h1 className="text-4xl sm:text-6xl font-semibold leading-[1.05] tracking-tight mb-6">
          Software is moving faster than you can review it.
        </h1>

        <p className="text-lg sm:text-xl text-muted leading-relaxed mb-10">
          Agents can write, test, review, and ship software at a pace that changes
          the old way of working. The harder problem is building the system around
          them: clear intent, useful context, good evidence, safe boundaries, and
          feedback from what actually happens in production.
          <mark className="mark"> This handbook is about how teams are figuring that out.</mark>
        </p>

        <div className="space-y-4">
          <NotifyForm
            id="notify-hero"
            formClassName="flex flex-col sm:flex-row gap-3 max-w-md"
            inputClassName="flex-1"
          />

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 font-mono text-xs text-muted pt-1">
            <a
              href="#contents"
              className="py-2.5 hover:text-ink underline underline-offset-4 decoration-rule transition-colors touch-manipulation"
            >
              See what&apos;s inside
            </a>
            <span className="text-muted/40 font-mono text-xs select-none px-0.5" aria-hidden="true">/</span>
            <a
              href="/contribute"
              className="group py-2.5 text-verified hover:text-ink font-medium underline underline-offset-4 decoration-verified/40 transition-colors inline-flex items-center gap-1.5 touch-manipulation"
            >
              Contribute
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </header>
    </Container>
  );
}
