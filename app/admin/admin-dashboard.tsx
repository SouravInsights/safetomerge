"use client";

import { useState } from "react";
import { Contribution, FormAnswers } from "@/lib/db/schema";
import { logoutAdmin } from "@/app/actions/admin";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminToolbar } from "@/components/admin/admin-toolbar";
import { AdminSpreadsheetView } from "@/components/admin/admin-spreadsheet-view";
import { AdminCardView } from "@/components/admin/admin-card-view";
import { asString } from "@/components/admin/admin-utils";

export { QUESTION_LABELS } from "@/components/admin/admin-config";

export function AdminDashboard({ initialData }: { initialData: Contribution[] }) {
  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = initialData.filter((item) => {
    const ans: FormAnswers = item.answers || {};
    const email = asString(item.contactEmail || ans.email);
    const domain = asString(ans.domain || ans.primaryDomain);
    const prFlow = asString(ans.prFlow);
    const boundaries = asString(ans.agentBoundaries);
    const incident = asString(ans.lastIncident);

    const query = search.toLowerCase();
    const matchesSearch =
      !search ||
      email.toLowerCase().includes(query) ||
      domain.toLowerCase().includes(query) ||
      prFlow.toLowerCase().includes(query) ||
      boundaries.toLowerCase().includes(query) ||
      incident.toLowerCase().includes(query);

    const matchesDomain = selectedDomain === "ALL" || domain === selectedDomain;

    return matchesSearch && matchesDomain;
  });

  const domains = Array.from(
    new Set(
      initialData
        .map((d) => asString(d.answers?.domain || d.answers?.primaryDomain))
        .filter((d): d is string => Boolean(d))
    )
  );

  async function handleLogout() {
    await logoutAdmin();
    window.location.reload();
  }

  function handleInspectItem(id: string) {
    setViewMode("cards");
    setExpandedId(id);
  }

  return (
    <div className="min-h-screen bg-paper text-ink font-sans">
      <AdminHeader
        totalCount={initialData.length}
        filteredData={filtered}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <AdminToolbar
          search={search}
          onSearchChange={setSearch}
          selectedDomain={selectedDomain}
          onDomainChange={setSelectedDomain}
          domains={domains}
          totalCount={initialData.length}
        />

        {filtered.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-rule bg-white/20">
            <p className="font-mono text-sm text-muted">
              No responses found matching your filter criteria.
            </p>
          </div>
        ) : viewMode === "table" ? (
          <AdminSpreadsheetView
            data={filtered}
            totalCount={filtered.length}
            onInspectItem={handleInspectItem}
          />
        ) : (
          <AdminCardView
            data={filtered}
            totalCount={filtered.length}
            expandedId={expandedId}
            onToggleExpand={(id) =>
              setExpandedId((prev) => (prev === id ? null : id))
            }
          />
        )}
      </main>
    </div>
  );
}
