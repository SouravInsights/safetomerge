"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Contribution, FormAnswers } from "@/lib/db/schema";
import { asString } from "./admin-utils";
import { AdminResponseInspector } from "./admin-response-inspector";

interface AdminCardViewProps {
  data: Contribution[];
  totalCount: number;
  expandedId: string | null;
  onToggleExpand: (id: string) => void;
}

export function AdminCardView({
  data,
  totalCount,
  expandedId,
  onToggleExpand,
}: AdminCardViewProps) {
  return (
    <div className="space-y-6">
      {data.map((item, idx) => {
        const isExpanded = expandedId === item.id;
        const ans: FormAnswers = item.answers || {};
        const email = asString(item.contactEmail || ans.email);
        const role = asString(ans.role);
        const teamSize = asString(ans.teamSize);
        const domain = asString(ans.domain || ans.primaryDomain);
        const aiShare = asString(ans.aiShare || ans.aiCodeShare);
        const followUp = asString(ans.followUp);
        const prFlow = asString(ans.prFlow);
        const boundaries = asString(ans.agentBoundaries);

        const dateStr = new Date(item.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <article
            key={item.id}
            className={`border transition-all bg-paper ${
              isExpanded ? "border-ink shadow-sm" : "border-rule hover:border-ink/60"
            }`}
          >
            {/* Card Header Banner */}
            <div className="p-5 border-b border-rule bg-white/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-xs text-muted font-bold">
                    #{totalCount - idx}
                  </span>
                  <span className="font-mono text-base font-bold text-ink">
                    {email || "Anonymous Contributor"}
                  </span>
                  {role && (
                    <span className="font-mono text-xs uppercase tracking-wider text-ink bg-rule/40 px-2 py-0.5 font-medium">
                      {role}
                    </span>
                  )}
                  {followUp === "yes" && (
                    <span className="font-mono text-[11px] uppercase tracking-wider text-verified bg-verified/10 px-2 py-0.5 border border-verified/20 font-semibold">
                      Open to 15-min call
                    </span>
                  )}
                </div>
                <p className="font-mono text-xs text-muted">
                  Submitted on {dateStr} &middot; Schema Version: {item.formVersion}
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs flex-wrap">
                {teamSize && (
                  <span className="border border-rule px-2.5 py-1 bg-paper">
                    Team: <strong className="text-ink">{teamSize}</strong>
                  </span>
                )}
                {domain && (
                  <span className="border border-rule px-2.5 py-1 bg-paper">
                    Domain: <strong className="text-ink">{domain}</strong>
                  </span>
                )}
                {aiShare && (
                  <span className="border border-verified/40 text-verified px-2.5 py-1 bg-verified/5">
                    AI Code: <strong>{aiShare}</strong>
                  </span>
                )}
                <button
                  onClick={() => onToggleExpand(item.id)}
                  className="font-mono text-xs uppercase tracking-wider px-3 py-1 border border-ink bg-ink text-paper hover:bg-verified hover:border-verified transition-colors ml-2 font-medium inline-flex items-center gap-1.5"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" />
                      Collapse
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5" />
                      View Answers
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Summary Preview (When Collapsed) */}
            {!isExpanded && (
              <div className="p-5 grid sm:grid-cols-2 gap-6 text-sm">
                {prFlow ? (
                  <div>
                    <h4 className="font-mono text-xs tracking-widest uppercase text-muted mb-1.5">
                      PR Review Flow
                    </h4>
                    <p className="text-ink leading-relaxed font-sans line-clamp-3">{prFlow}</p>
                  </div>
                ) : null}

                {boundaries ? (
                  <div>
                    <h4 className="font-mono text-xs tracking-widest uppercase text-muted mb-1.5">
                      Agent Boundaries
                    </h4>
                    <p className="text-ink leading-relaxed font-sans line-clamp-3">{boundaries}</p>
                  </div>
                ) : null}
              </div>
            )}

            {/* Full Detailed Questionnaire Inspector */}
            {isExpanded && <AdminResponseInspector answers={ans} />}
          </article>
        );
      })}
    </div>
  );
}
