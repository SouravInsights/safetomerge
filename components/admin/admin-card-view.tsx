"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Contribution, FormAnswers } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
                  {role && <Badge variant="default">{role}</Badge>}
                  {followUp === "yes" && (
                    <Badge variant="verified">Open to 15-min call</Badge>
                  )}
                </div>
                <p className="font-mono text-xs text-muted">
                  Submitted on {dateStr} &middot; Schema Version: {item.formVersion}
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs flex-wrap">
                {teamSize && (
                  <Badge variant="outline">
                    Team: <strong className="text-ink font-mono">{teamSize}</strong>
                  </Badge>
                )}
                {domain && (
                  <Badge variant="outline">
                    Domain: <strong className="text-ink font-mono">{domain}</strong>
                  </Badge>
                )}
                {aiShare && (
                  <Badge variant="verified">
                    AI Code: <strong className="font-mono">{aiShare}</strong>
                  </Badge>
                )}
                <Button
                  variant={isExpanded ? "outline" : "default"}
                  size="sm"
                  onClick={() => onToggleExpand(item.id)}
                  className="ml-2"
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
                </Button>
              </div>
            </div>

            {/* Summary Preview (When Collapsed) */}
            {!isExpanded && (
              <div className="p-5 grid sm:grid-cols-2 gap-6 text-sm">
                {prFlow ? (
                  <div>
                    <h4 className="font-mono text-xs tracking-widest uppercase text-muted mb-1.5 font-semibold">
                      PR Review Flow
                    </h4>
                    <p className="text-ink leading-relaxed font-sans line-clamp-3">{prFlow}</p>
                  </div>
                ) : null}

                {boundaries ? (
                  <div>
                    <h4 className="font-mono text-xs tracking-widest uppercase text-muted mb-1.5 font-semibold">
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
