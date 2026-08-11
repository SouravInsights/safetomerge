import { Contribution, FormAnswers } from "@/lib/db/schema";
import { QUESTION_LABELS } from "./admin-config";

export function asString(val: unknown): string {
  if (typeof val === "string") return val;
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  return "";
}

export function getQuestionTitle(key: string): string {
  if (QUESTION_LABELS[key]) return QUESTION_LABELS[key];
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

export function exportToCSV(data: Contribution[]) {
  if (data.length === 0) return;

  const headers = [
    "Submission ID",
    "Submitted Date",
    "Email",
    "Role",
    "Team Size",
    "Domain",
    "AI Code Share",
    "PR Review Flow",
    "Confidence Signals",
    "Confidence Other",
    "Extra Scrutiny",
    "Tools Used",
    "Last Incident",
    "Incident Feedback",
    "Most Trusted Test",
    "Least Trusted Test",
    "Agent Boundaries",
    "Tool Integration Wish",
    "Unsolved Problem",
    "Links",
    "Credit",
    "Follow Up",
  ];

  const rows = data.map((item) => {
    const ans: FormAnswers = item.answers || {};
    const getVal = (k: string) => {
      const val = ans[k];
      if (Array.isArray(val)) return `"${val.join("; ").replace(/"/g, '""')}"`;
      const str = asString(val || (k === "email" ? item.contactEmail : ""));
      return `"${str.replace(/"/g, '""')}"`;
    };

    return [
      item.id,
      new Date(item.createdAt).toISOString(),
      getVal("email"),
      getVal("role"),
      getVal("teamSize"),
      getVal("domain"),
      getVal("aiShare"),
      getVal("prFlow"),
      getVal("confidenceSignals"),
      getVal("confidenceOther"),
      getVal("extraScrutiny"),
      getVal("toolsUsed"),
      getVal("lastIncident"),
      getVal("incidentFeedback"),
      getVal("mostTrustedTest"),
      getVal("leastTrustedTest"),
      getVal("agentBoundaries"),
      getVal("toolIntegrationWish"),
      getVal("unsolvedProblem"),
      getVal("links"),
      getVal("credit"),
      getVal("followUp"),
    ].join(",");
  });

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `safetomerge-contributions-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
