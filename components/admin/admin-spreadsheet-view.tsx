"use client";

import { Eye } from "lucide-react";
import { Contribution, FormAnswers } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SPREADSHEET_COLUMNS } from "./admin-config";
import { asString } from "./admin-utils";

interface AdminSpreadsheetViewProps {
  data: Contribution[];
  totalCount: number;
  onInspectItem: (id: string) => void;
}

export function AdminSpreadsheetView({
  data,
  totalCount,
  onInspectItem,
}: AdminSpreadsheetViewProps) {
  return (
    <div className="border border-rule overflow-x-auto bg-paper max-h-[calc(100vh-220px)] overflow-y-auto">
      <table className="w-full text-left border-collapse text-xs font-mono">
        <thead className="sticky top-0 z-10 bg-white shadow-xs">
          <tr className="border-b border-rule text-muted uppercase tracking-wider">
            <th className="p-3 border-r border-rule w-12 text-center bg-white">#</th>
            <th className="p-3 border-r border-rule w-24 text-center bg-white">Inspect</th>
            <th className="p-3 border-r border-rule min-w-[110px] bg-white">Date</th>
            {SPREADSHEET_COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`p-3 border-r border-rule ${col.width} bg-white`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-rule/60">
          {data.map((item, idx) => {
            const ans: FormAnswers = item.answers || {};
            const dateStr = new Date(item.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <tr key={item.id} className="hover:bg-white/90 dark:hover:bg-white/10 transition-colors group">
                <td className="p-3 border-r border-rule text-center text-muted font-bold">
                  {totalCount - idx}
                </td>
                <td className="p-3 border-r border-rule text-center">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => onInspectItem(item.id)}
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </Button>
                </td>
                <td className="p-3 border-r border-rule text-muted whitespace-nowrap">{dateStr}</td>

                {SPREADSHEET_COLUMNS.map((col) => {
                  const rawVal = ans[col.key] ?? (col.key === "email" ? item.contactEmail : "");
                  const displayVal = Array.isArray(rawVal)
                    ? rawVal.filter(Boolean).join(", ")
                    : asString(rawVal);

                  return (
                    <td
                      key={col.key}
                      className="p-3 border-r border-rule text-ink max-w-[320px] truncate font-sans text-xs"
                      title={displayVal || "—"}
                    >
                      {displayVal ? (
                        col.key === "email" ? (
                          <span className="font-mono font-bold text-ink">{displayVal}</span>
                        ) : col.key === "aiShare" ? (
                          <Badge variant="verified">{displayVal}</Badge>
                        ) : (
                          displayVal
                        )
                      ) : (
                        <span className="text-muted/40 font-mono">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
