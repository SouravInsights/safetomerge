export const QUESTION_LABELS: Record<string, string> = {
  // Step 1: Team & Context
  email: "Contact Email",
  role: "Primary Role",
  teamSize: "Engineering Team Size",
  domain: "What does your team build?",
  aiShare: "Share of PRs authored or drafted by AI/agents",

  // Step 2: Shipping & Confidence
  prFlow: "Walk us through what happens when someone opens a PR on your team.",
  confidenceSignals: "What usually gives you real confidence that a PR is safe to merge?",
  confidenceOther: "Other confidence signals",
  extraScrutiny: "Specific categories of changes that always get extra human scrutiny",
  toolsUsed: "Tools actively part of your verification loop",

  // Step 3: Incidents & Testing
  lastIncident: "Think about the last bug or incident that made it to production. What happened, and how was it found?",
  incidentFeedback: "Once that incident was fixed, did anything change in your workflow to prevent it from recurring?",
  mostTrustedTest: "Which part of your testing setup do you trust the most?",
  leastTrustedTest: "Which part do you trust the least or find the most noisy?",

  // Step 4: Agent Boundaries & Tooling
  agentBoundaries: "What do you still require an AI agent to ask a human before doing?",
  toolIntegrationWish: "Is there something you wish your engineering tools knew about each other, but currently don't?",
  unsolvedProblem: "What part of this overall workflow still feels fragile or unsolved for your team?",
  links: "Links to writeups, repos, agent skills, or architecture docs",
  credit: "How should we credit you in the handbook?",
  followUp: "Open for a 15-minute follow-up conversation?",
};

export const SPREADSHEET_COLUMNS = [
  { key: "email", label: "Email", width: "min-w-[200px]" },
  { key: "role", label: "Role", width: "min-w-[110px]" },
  { key: "teamSize", label: "Team Size", width: "min-w-[100px]" },
  { key: "domain", label: "Product / Domain", width: "min-w-[150px]" },
  { key: "aiShare", label: "AI PR Share", width: "min-w-[120px]" },
  { key: "prFlow", label: "PR Review Workflow", width: "min-w-[280px]" },
  { key: "confidenceSignals", label: "Confidence Signals", width: "min-w-[240px]" },
  { key: "extraScrutiny", label: "Extra Human Scrutiny", width: "min-w-[240px]" },
  { key: "toolsUsed", label: "Verification Tools", width: "min-w-[200px]" },
  { key: "lastIncident", label: "Last Production Incident", width: "min-w-[280px]" },
  { key: "incidentFeedback", label: "Workflow Fixes After Incident", width: "min-w-[240px]" },
  { key: "mostTrustedTest", label: "Most Trusted Test", width: "min-w-[200px]" },
  { key: "leastTrustedTest", label: "Least Trusted Test", width: "min-w-[200px]" },
  { key: "agentBoundaries", label: "Agent Boundaries", width: "min-w-[260px]" },
  { key: "toolIntegrationWish", label: "Tooling Wishlist", width: "min-w-[240px]" },
  { key: "unsolvedProblem", label: "Fragile / Unsolved Workflow", width: "min-w-[260px]" },
  { key: "links", label: "Shared Links & Repos", width: "min-w-[180px]" },
  { key: "followUp", label: "Follow-Up Call?", width: "min-w-[120px]" },
];

export const STEP_SECTIONS = [
  {
    title: "Step 1: Team & Context",
    keys: ["email", "role", "teamSize", "domain", "aiShare"],
  },
  {
    title: "Step 2: How You Ship & Verification",
    keys: ["prFlow", "confidenceSignals", "confidenceOther", "extraScrutiny", "toolsUsed"],
  },
  {
    title: "Step 3: Incidents & Testing Feedback",
    keys: ["lastIncident", "incidentFeedback", "mostTrustedTest", "leastTrustedTest"],
  },
  {
    title: "Step 4: Agent Boundaries & Tools",
    keys: ["agentBoundaries", "toolIntegrationWish", "unsolvedProblem", "links", "credit", "followUp"],
  },
];
