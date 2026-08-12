import * as React from "react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/landing/section-label";
import { NotifyForm } from "@/app/components/notify-form";
import { Logo } from "@/components/logo";

export function NewsletterSection() {
  return (
    <Container size="narrow" className="py-16 sm:py-20" id="notify">
      <footer className="w-full">
        <SectionLabel>Stay in the loop</SectionLabel>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Get the next chapter when it&apos;s ready
        </h2>
        <p className="text-muted leading-relaxed max-w-md mb-8">
          I&apos;ll just send you an email when the next chapter is ready.
          Nothing else.
        </p>
        <div className="mb-16">
          <NotifyForm
            id="notify-footer"
            formClassName="flex flex-col sm:flex-row gap-3 max-w-md"
            inputClassName="flex-1"
          />
        </div>

        <div className="border-t border-rule pt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <Logo />
            <span className="text-muted/30 font-light">&bull;</span>
            <a
              href="/contribute"
              className="font-mono text-xs uppercase tracking-wider text-muted hover:text-ink underline underline-offset-4 decoration-rule transition-colors"
            >
              Contribute
            </a>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted font-mono flex-wrap">
            <span>
              By{" "}
              <a
                href="https://souravinsights.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-verified underline underline-offset-4 decoration-rule transition-colors font-medium"
              >
                Sourav
              </a>
            </span>
            <span className="text-muted/30">&middot;</span>
            <span>&copy; 2026</span>
          </div>
        </div>
      </footer>
    </Container>
  );
}
