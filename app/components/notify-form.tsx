"use client";

import { useState } from "react";
import { subscribeEmail } from "../actions/notify";
import posthog from "posthog-js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NotifyForm({
  id,
  formClassName,
  inputClassName,
}: {
  id: string;
  formClassName?: string;
  inputClassName?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "invalid" | "loading" | "error" | "done">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("invalid");
      return;
    }
    
    setStatus("loading");
    const result = await subscribeEmail(email.trim());
    
    if (result.success) {
      setStatus("done");
      posthog.capture("newsletter_subscribed", {
        form_id: id,
      });
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Failed to submit.");
    }
  }

  if (status === "done") {
    return (
      <div className="inline-flex items-center gap-2.5 px-4 py-3 border border-verified text-verified bg-verified/5 shadow-[3px_3px_0_0_color-mix(in_srgb,var(--verified)_30%,transparent)] w-full sm:w-auto h-[46px]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className="font-mono text-sm whitespace-nowrap">You&apos;re on the list.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`${formClassName ?? ""} relative`}>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        autoComplete="email"
        placeholder="you@yourteam.dev"
        value={email}
        disabled={status === "loading"}
        onChange={(event) => {
          setEmail(event.target.value);
          if (status === "invalid" || status === "error") setStatus("idle");
        }}
        aria-invalid={status === "invalid" || status === "error"}
        aria-describedby={status === "invalid" || status === "error" ? `${id}-error` : undefined}
        className={`font-mono text-base sm:text-sm bg-field shadow-[inset_1px_1px_0_0_var(--plate-soft)] outline-none px-4 py-3 h-12 sm:h-[46px] placeholder:text-muted/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
          status === "invalid" || status === "error"
            ? "border-flag focus:border-flag"
            : "border-rule focus:border-ink"
        } border ${inputClassName ?? ""}`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="font-mono text-xs sm:text-sm uppercase tracking-wide font-semibold inline-flex items-center justify-center border-2 border-edge bg-paper text-ink px-5 py-3 shadow-[3px_3px_0_0_var(--plate)] hover:border-verified hover:text-verified hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:border-verified active:text-verified active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed h-[45px] sm:h-[43px] shrink-0"
      >
        Notify me
      </button>

      {(status === "invalid" || status === "error") && (
        <p id={`${id}-error`} className="absolute -bottom-6 left-0 font-mono text-[11px] text-flag whitespace-nowrap">
          {status === "invalid" ? "Invalid email." : errorMessage}
        </p>
      )}
    </form>
  );
}
