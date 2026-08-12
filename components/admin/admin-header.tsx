"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-muted/40 font-mono text-xs select-none">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-ink font-semibold">
            Research Responses
          </span>
          <Badge variant="dark" className="ml-1">
            {totalCount} submissions
          </Badge>
        </div>

        <div className="flex items-center gap-2.5">
          {/* CSV Export Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportToCSV(filteredData)}
          >
            <Download className="w-3.5 h-3.5 text-verified" />
            Export CSV
          </Button>

          {/* View Mode Switcher */}
          <div className="flex items-center border border-rule bg-white/60 p-0.5 font-mono text-xs">
            <Button
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="xs"
              onClick={() => onViewModeChange("cards")}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Cards View
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="xs"
              onClick={() => onViewModeChange("table")}
            >
              <TableIcon className="w-3.5 h-3.5" />
              Spreadsheet
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={onLogout}>
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
}
