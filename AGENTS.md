<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SafeToMerge Agent Directives

## 1. Package Manager & CLI Commands
Always use **pnpm** (NEVER `npm` or `yarn`):
- Dev server: `pnpm dev`
- Build app: `pnpm build`
- Typecheck: `npx tsc --noEmit`
- Linter: `pnpm lint`
- Design System Linter: `pnpm lint:design`

## 2. Database & Migration Policies
- Database: Neon Postgres (`DATABASE_URL` in `.env.local`).
- **STRICT MIGRATION RULE:** Always run `npx drizzle-kit generate` and `npx drizzle-kit migrate`. **NEVER use `drizzle-kit push` or direct DB mutations.**
- DB client file (`lib/db/index.ts`) must always be guarded with `import "server-only";`.
- Schema uses `jsonb("answers").$type<FormAnswers>()` for form questions. Zero explicit `any` types allowed.

## 3. Agent-Safe Design System & Styling Rules
To prevent visual drift, every AI agent MUST follow these design primitives and color constraints strictly:

- **NO Arbitrary Tailwind Colors:**
  - NEVER use `bg-gray-*`, `bg-zinc-*`, `bg-slate-*`, `text-gray-*`, `border-slate-*`.
  - ALWAYS use semantic CSS tokens defined in `globals.css`:
    - `bg-paper` / `text-ink` / `text-muted` / `border-rule`
    - `bg-verified` / `text-verified` / `border-verified`
    - `mark` / `bg-mark`

- **NO Rounded Corners (Strict 0 Border Radius):**
  - Every container, button, card, badge, input, and modal MUST be `rounded-none`. NEVER write `rounded-md`, `rounded-lg`, or `rounded-full`.

- **ALWAYS Use Component Primitives:**
  - **Buttons:** ALWAYS use `<Button>` from `@/components/ui/button` (`variant="default" | "outline" | "verified" | "ghost" | "link"`). NEVER write raw `<button className="...">` with ad-hoc colors or inline hover states.
  - **Badges:** ALWAYS use `<Badge>` from `@/components/ui/badge` (`variant="default" | "verified" | "outline" | "dark"`).
  - **Cards:** ALWAYS use `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardContent>`, `<CardFooter>` from `@/components/ui/card`.
  - **Containers:** ALWAYS use `<Container size="narrow" | "wide" | "full">` from `@/components/ui/container`.
  - **Logo:** ALWAYS use `<Logo />` from `@/components/logo` for brand renderings.

## 4. Copy & Punctuation Constraints
- **NO Em Dashes:** Strictly NEVER use em dashes (`—`) anywhere in copy or code. Replace with commas or parentheses.
- **NO AI Slop Jargon:** Avoid pretentious phrases ("operating in", "synthesize what holds up under stress", "not isolated theory"). Use direct engineering phrasing ("shipping in production", "see what actually works, and organize it").
- **NO ASCII Text Icons:** Never write `&larr;`, `&rarr;`, `+`, `-`, or unicode arrows. ALWAYS use vector icons from `lucide-react` (`ArrowLeft`, `ArrowRight`, `Plus`, `Minus`, `ChevronDown`, `ChevronUp`).
