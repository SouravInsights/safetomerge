"use client";

import { ExternalLink } from "lucide-react";
import { FormAnswers } from "@/lib/db/schema";
import { STEP_SECTIONS } from "./admin-config";
import { asString, getQuestionTitle } from "./admin-utils";

interface AdminResponseInspectorProps {
  answers: FormAnswers;
}

export function AdminResponseInspector({ answers }: AdminResponseInspectorProps) {
  const handledKeys = new Set(STEP_SECTIONS.flatMap((s) => s.keys));
  const unhandledKeys = Object.keys(answers).filter((k) => !handledKeys.has(k));

  return (
    <div className="p-6 space-y-8 bg-white/30 border-t border-rule">
      {STEP_SECTIONS.map((section, sIdx) => {
        const hasAnswers = section.keys.some((key) => {
          const val = answers[key];
          return val && (!Array.isArray(val) || val.length > 0);
        });

        if (!hasAnswers) return null;

        return (
          <div key={sIdx} className="space-y-4">
            <div className="flex items-center gap-3 border-b border-rule pb-2">
              <h4 className="font-mono text-xs tracking-widest uppercase text-verified font-bold">
                {section.title}
              </h4>
              <span className="h-px flex-1 bg-rule/40" />
            </div>

            <div className="grid gap-4">
              {section.keys.map((key) => {
                const rawVal = answers[key];
                if (!rawVal || (Array.isArray(rawVal) && rawVal.length === 0)) return null;

                const title = getQuestionTitle(key);
                const displayVal = Array.isArray(rawVal)
                  ? rawVal.filter(Boolean).join(", ")
                  : asString(rawVal);

                if (!displayVal) return null;

                return (
                  <div
                    key={key}
                    className="p-4 border border-rule/70 bg-paper/80 space-y-1.5"
                  >
                    <span className="font-mono text-xs text-muted uppercase font-semibold tracking-wider block">
                      {title}
                    </span>
                    {key === "links" && Array.isArray(rawVal) ? (
                      <div className="space-y-1 pt-1">
                        {rawVal.map((linkUrl, lIdx) => (
                          <a
                            key={lIdx}
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-verified underline hover:text-ink inline-flex items-center gap-1.5 mr-3"
                          >
                            {linkUrl}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="font-sans text-sm sm:text-base text-ink leading-relaxed whitespace-pre-wrap font-normal">
                        {displayVal}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Additional / Custom Fields */}
      {unhandledKeys.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-rule">
          <h4 className="font-mono text-xs tracking-widest uppercase text-muted font-bold">
            Additional Submitted Fields
          </h4>
          <div className="grid gap-4">
            {unhandledKeys.map((key) => {
              const rawVal = answers[key];
              if (!rawVal) return null;
              const title = getQuestionTitle(key);
              const displayVal = Array.isArray(rawVal) ? rawVal.join(", ") : asString(rawVal);
              return (
                <div key={key} className="p-4 border border-rule/70 bg-paper/80 space-y-1.5">
                  <span className="font-mono text-xs text-muted uppercase font-semibold tracking-wider block">
                    {title}
                  </span>
                  <p className="font-sans text-sm text-ink leading-relaxed whitespace-pre-wrap">
                    {displayVal}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
