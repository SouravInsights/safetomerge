"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Download, LayoutGrid, Table as TableIcon } from "lucide-react";
import { Contribution } from "@/lib/db/schema";
import { exportToCSV } from "./admin-utils";

interface AdminHeaderProps {
  totalCount: number;
  filteredData: Contribution[];
  viewMode: "cards" | "table";
  onViewModeChange: (mode: "cards" | "table") => void;
  onLogout: () => void;
}

export function AdminHeader({
  totalCount,
  filteredData,
  viewMode,
  onViewModeChange,
  onLogout,
}: AdminHeaderProps) {
  return (
    <header className="border-b border-rule bg-paper sticky top-0 z-20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-muted/40 font-mono text-xs select-none">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-ink font-semibold">
            Research Responses
          </span>
          <span className="font-mono text-xs bg-ink text-paper px-2.5 py-0.5 ml-1 font-semibold">
            {totalCount} submissions
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* CSV Export Button */}
          <Button
            variant="outline"
            onClick={() => exportToCSV(filteredData)}
            className="font-mono text-xs uppercase tracking-wider h-8 rounded-none border-rule hover:border-ink flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-verified" />
            Export CSV
          </Button>

          {/* View Mode Switcher */}
          <div className="flex items-center border border-rule bg-white/60 p-0.5 font-mono text-xs">
            <button
              onClick={() => onViewModeChange("cards")}
              className={`px-2.5 py-1 flex items-center gap-1.5 transition-all ${
                viewMode === "cards"
                  ? "bg-ink text-paper font-medium"
                  : "text-muted hover:text-ink"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Cards View
            </button>
            <button
              onClick={() => onViewModeChange("table")}
              className={`px-2.5 py-1 flex items-center gap-1.5 transition-all ${
                viewMode === "table"
                  ? "bg-ink text-paper font-medium"
                  : "text-muted hover:text-ink"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              Spreadsheet
            </button>
          </div>

          <Button
            variant="outline"
            onClick={onLogout}
            className="font-mono text-xs uppercase tracking-wider h-8 rounded-none border-rule hover:border-ink"
          >
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
}
