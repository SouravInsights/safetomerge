"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdminToolbarProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedDomain: string;
  onDomainChange: (dom: string) => void;
  domains: string[];
  totalCount: number;
}

export function AdminToolbar({
  search,
  onSearchChange,
  selectedDomain,
  onDomainChange,
  domains,
  totalCount,
}: AdminToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-rule/60">
      <Input
        type="search"
        placeholder="Filter by keyword, domain, or email..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-md bg-paper border-rule focus:border-ink rounded-none text-base sm:text-sm h-10"
      />

      {domains.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
          <Button
            variant={selectedDomain === "ALL" ? "default" : "outline"}
            size="xs"
            onClick={() => onDomainChange("ALL")}
          >
            All ({totalCount})
          </Button>
          {domains.map((dom) => (
            <Button
              key={dom}
              variant={selectedDomain === dom ? "default" : "outline"}
              size="xs"
              onClick={() => onDomainChange(dom)}
            >
              {dom}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
