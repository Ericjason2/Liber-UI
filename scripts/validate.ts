import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { validateAll } from "./lib/validate-resource.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contentRoot = join(__dirname, "../content");

console.log("Liber validation: checking content/ resources...");
const report = await validateAll(contentRoot);

console.log(`\nChecked ${report.totalChecked} resources:`);
for (const [kind, count] of Object.entries(report.byKind)) {
  if (count > 0) console.log(`  - ${kind}: ${count}`);
}

if (report.issues.length === 0) {
  console.log("\n[PASS] All resources are valid and compliant.");
  process.exit(0);
} else {
  console.error(`\n[FAIL] Found ${report.issues.length} validation issue(s):\n`);
  for (const issue of report.issues) {
    console.error(`  x [${issue.kind}] ${issue.slug} (${issue.path}): ${issue.message}`);
  }
  process.exit(1);
}
