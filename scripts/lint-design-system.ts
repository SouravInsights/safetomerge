import fs from "fs";
import path from "path";

const TARGET_DIRS = ["app", "components"];
const EXCLUDED_FILES = [
  path.normalize("components/ui/button.tsx"),
];

const VIOLATIONS = [
  {
    regex: /\b(bg|text|border|ring)-(gray|zinc|slate|neutral|stone)-\d+\b/g,
    message: "Arbitrary Tailwind color used. Always use semantic CSS tokens (bg-paper, text-ink, text-muted, border-rule).",
  },
  {
    regex: /\brounded-(sm|md|lg|xl|2xl|3xl)\b/g,
    message: "Non-zero border radius used on container. SafeToMerge design system strictly enforces 0 border radius (rounded-none) for containers, cards, buttons, badges, and modals.",
  },
];

function scanDirectory(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      scanDirectory(filePath, fileList);
    } else if (filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

let hasError = false;
let totalFilesScanned = 0;

for (const targetDir of TARGET_DIRS) {
  const fullPath = path.resolve(process.cwd(), targetDir);
  if (!fs.existsSync(fullPath)) continue;

  const files = scanDirectory(fullPath);
  totalFilesScanned += files.length;

  for (const file of files) {
    const relativePath = path.relative(process.cwd(), file);
    if (EXCLUDED_FILES.some((ex) => relativePath.endsWith(ex))) continue;

    const content = fs.readFileSync(file, "utf-8");
    const lines = content.split("\n");

    lines.forEach((line, index) => {
      for (const violation of VIOLATIONS) {
        const matches = line.match(violation.regex);
        if (matches) {
          console.error(
            `\x1b[31m[Design System Drift Violation]\x1b[0m ${relativePath}:${index + 1}`
          );
          console.error(`  Line: ${line.trim()}`);
          console.error(`  Error: ${violation.message}`);
          console.error(`  Matched: ${matches.join(", ")}\n`);
          hasError = true;
        }
      }
    });
  }
}

if (hasError) {
  console.error(`\x1b[31m❌ Design system linting failed across ${totalFilesScanned} files.\x1b[0m`);
  process.exit(1);
} else {
  console.log(`\x1b[32m✔ Design system linting passed clean across ${totalFilesScanned} files!\x1b[0m`);
  process.exit(0);
}
