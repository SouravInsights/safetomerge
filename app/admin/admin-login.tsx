"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { loginAdmin } from "@/app/actions/admin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError("");

    const res = await loginAdmin(password);
    if (res.success) {
      window.location.reload();
    } else {
      setError(res.error || "Incorrect passcode.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-paper text-ink flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-rule bg-paper p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <a href="/" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-ink">
              Safe to Merge
            </a>
            <span className="text-muted/40">/</span>
            <span className="font-mono text-xs uppercase tracking-widest text-ink font-semibold">
              Admin Access
            </span>
          </div>
          <h1 className="text-2xl font-semibold leading-tight">Enter Admin Passcode</h1>
          <p className="text-sm text-muted leading-relaxed">
            This dashboard is private. Please enter your passcode to access research contributions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="admin-passcode" className="sr-only">
              Admin Passcode
            </label>
            <Input
              id="admin-passcode"
              type="password"
              placeholder="Enter passcode..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-paper border-rule focus:border-ink rounded-none text-base h-12"
              autoFocus
            />
            {error && <p className="font-mono text-xs text-flag">{error}</p>}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full font-mono text-xs uppercase tracking-widest bg-ink text-paper h-12 hover:bg-verified rounded-none"
          >
            {loading ? "Authenticating..." : "Unlock Dashboard"}
          </Button>
        </form>

        <div className="border-t border-rule pt-4 text-center">
          <a
            href="/"
            className="font-mono text-xs text-muted hover:text-ink underline underline-offset-4 decoration-rule inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
