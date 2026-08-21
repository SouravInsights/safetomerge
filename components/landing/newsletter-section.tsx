import * as React from "react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/landing/section-label";
import { NotifyForm } from "@/app/components/notify-form";
import { Logo } from "@/components/logo";
import { Asterism } from "@/components/landing/asterism";

export function NewsletterSection() {
  return (
    <Container size="narrow" className="py-16 sm:py-20" id="notify">
      <footer className="w-full">
        <SectionLabel index="06" className="reveal">Stay in the loop</SectionLabel>
        <h2 className="reveal reveal-d1 text-2xl sm:text-3xl font-semibold mb-4">
          Get the next chapter when it&apos;s ready
        </h2>
        <p className="reveal reveal-d2 text-muted leading-relaxed max-w-md mb-8">
          I&apos;ll send you an email when there&apos;s a new chapter, case study,
          or useful research note. Nothing else.
        </p>
        <div className="reveal reveal-d3 mb-14">
          <NotifyForm id="notify-footer" formClassName="flex flex-col sm:flex-row gap-3 max-w-md" inputClassName="flex-1" />
        </div>
        {/* End mark, like the ornament that closes a magazine article. */}
        <div className="mb-10 flex justify-center text-muted/40" aria-hidden="true">
          <Asterism />
        </div>
        <div className="border-t border-rule pt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 flex-wrap">
            <Logo />
            <a href="/contribute" className="font-mono text-xs uppercase tracking-wider text-muted hover:text-ink underline underline-offset-4 decoration-rule transition-colors">
              Contribute
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted font-mono flex-wrap">
            <span>By <a href="https://souravinsights.com" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-verified underline underline-offset-4 decoration-rule transition-colors font-medium">Sourav</a></span>
            <span>&copy; 2026</span>
          </div>
        </div>
      </footer>
    </Container>
  );
}
