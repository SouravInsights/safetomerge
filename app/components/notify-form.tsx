"use client";

import { useState } from "react";

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
  const [status, setStatus] = useState<"idle" | "invalid" | "done">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("invalid");
      return;
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p className="font-mono text-sm text-verified border border-verified px-4 py-3 max-w-md">
        You&apos;re on the list. One email per chapter, when a chapter&apos;s ready.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={formClassName}>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        autoComplete="email"
        placeholder="you@yourteam.dev"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          if (status === "invalid") setStatus("idle");
        }}
        aria-invalid={status === "invalid"}
        aria-describedby={status === "invalid" ? `${id}-error` : undefined}
        className={`font-mono text-sm bg-transparent outline-none px-4 py-3 placeholder:text-muted/70 ${
          status === "invalid"
            ? "border-flag focus:border-flag"
            : "border-rule focus:border-ink"
        } border ${inputClassName ?? ""}`}
      />
      <button
        type="submit"
        className="font-mono text-sm uppercase tracking-wide bg-ink text-paper px-5 py-3 hover:bg-verified transition-colors whitespace-nowrap"
      >
        Notify me
      </button>
      {status === "invalid" && (
        <p id={`${id}-error`} className="w-full font-mono text-xs text-flag">
          That doesn&apos;t look like a valid email address.
        </p>
      )}
    </form>
  );
}
