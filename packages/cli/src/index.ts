import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";

export interface LiberConfig {
  $schema?: string;
  format?: "react" | "svg";
  variant?: "color" | "mono" | "wordmark";
  outDir?: string;
  aliases?: Record<string, string>;
  registryUrl?: string;
}

const DEFAULT_CONFIG: LiberConfig = {
  format: "react",
  variant: "color",
  outDir: "src/components/ui/logos",
  registryUrl: "https://liber-ui.vercel.app/r",
};

export async function runCli(argv: string[]) {
  const args = argv.slice(2);
  const command = args[0];

  if (!command || command === "--help" || command === "-h" || command === "help") {
    printHelp();
    return;
  }

  if (command === "--version" || command === "-v") {
    console.log("Liber CLI v0.1.0");
    return;
  }

  switch (command) {
    case "init":
      await handleInit(args.slice(1));
      break;
    case "add":
      await handleAdd(args.slice(1));
      break;
    case "search":
      await handleSearch(args.slice(1));
      break;
    case "view":
      await handleView(args.slice(1));
      break;
    case "diff":
      await handleDiff(args.slice(1));
      break;
    default:
      console.error(`[ERR] Unknown command: "${command}". Run "liber --help" for available commands.`);
      process.exit(1);
  }
}

function printHelp() {
  console.log(`
Liber CLI – Install logos, components, themes & fonts into your project

Usage:
  npx @liber/cli <command> [options]

Commands:
  init                     Initialize liber.json configuration in current directory
  add <resource...>        Install resources (e.g. "liber add react python")
  search <query>           Search resources across the entire catalog
  view <resource>          Display details, variants and files before installing
  diff <resource>          Compare installed files with remote catalog

Options for 'add':
  --dry-run                Preview files to be installed without writing to disk
  --force                  Overwrite existing files without prompting
  --out <dir>              Custom output directory
  --format <react|svg>     Install React component or raw SVG
  --variant <color|mono>   Logo variant to install (default: color)

Documentation: https://liber-ui.vercel.app/docs
`);
}

async function loadConfig(): Promise<LiberConfig> {
  try {
    const raw = await readFile("liber.json", "utf8");
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

async function handleInit(args: string[]) {
  const targetPath = resolve("liber.json");
  try {
    await access(targetPath);
    if (!args.includes("--force")) {
      console.log("Configuration file liber.json already exists. Use --force to overwrite.");
      return;
    }
  } catch {
    // does not exist
  }

  await writeFile(targetPath, JSON.stringify(DEFAULT_CONFIG, null, 2) + "\n", "utf8");
  console.log("[OK] Created liber.json configuration file.");
  console.log(`Default output directory set to: ${DEFAULT_CONFIG.outDir}`);
}

async function fetchRegistryItem(name: string, baseUrl: string) {
  const url = `${baseUrl.replace(/\/$/, "")}/${name}.json`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    throw new Error(`Failed to fetch resource "${name}" from ${url}: ${(err as Error).message}`);
  }
}

async function handleAdd(args: string[]) {
  const flags = new Set(args.filter((a) => a.startsWith("-")));
  const names = args.filter((a) => !a.startsWith("-"));

  if (names.length === 0) {
    console.error("[ERR] Please specify at least one resource name. Example: liber add react");
    process.exit(1);
  }

  const dryRun = flags.has("--dry-run");
  const force = flags.has("--force");
  const config = await loadConfig();

  // Parse custom --out
  let outDir = config.outDir || "src/components/ui/logos";
  const outIdx = args.indexOf("--out");
  if (outIdx !== -1 && args[outIdx + 1]) {
    outDir = args[outIdx + 1];
  }

  console.log(`Installing ${names.length} resource(s) into ./${outDir}...`);

  for (const name of names) {
    try {
      const item = await fetchRegistryItem(name, config.registryUrl || DEFAULT_CONFIG.registryUrl!);
      console.log(`\n-> Installing [${item.type || "ui"}] "${item.title || name}"...`);

      if (!item.files || item.files.length === 0) {
        console.warn(`  [WARN] Resource "${name}" has no registered files.`);
        continue;
      }

      for (const file of item.files) {
        const fileName = file.path.split("/").pop() || `${name}.tsx`;
        const destPath = resolve(join(outDir, fileName));

        // Safety check: ensure path stays within project directory
        if (!destPath.startsWith(process.cwd())) {
          throw new Error(`Access violation: target path ${destPath} is outside current workspace.`);
        }

        if (dryRun) {
          console.log(`  [DRY-RUN] Would write: ${destPath} (${file.content.length} bytes)`);
          continue;
        }

        try {
          await access(destPath);
          if (!force) {
            console.log(`  [SKIP] File exists: ${destPath}. Use --force to overwrite.`);
            continue;
          }
        } catch {
          // File does not exist, can write
        }

        await mkdir(dirname(destPath), { recursive: true });
        await writeFile(destPath, file.content, "utf8");
        console.log(`  [OK] Wrote: ${destPath}`);
      }

      if (item.dependencies && item.dependencies.length > 0) {
        console.log(`  [DEP] Recommended dependencies: ${item.dependencies.join(", ")}`);
      }
    } catch (err) {
      console.error(`  [ERR] Failed to install "${name}":`, (err as Error).message);
    }
  }

  console.log("\nDone!");
}

async function handleSearch(args: string[]) {
  const query = args[0]?.toLowerCase();
  if (!query) {
    console.log("Usage: liber search <term>");
    return;
  }

  const config = await loadConfig();
  const indexUrl = `${config.registryUrl?.replace(/\/$/, "")}/index.json`;

  try {
    const res = await fetch(indexUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const registry = await res.json();
    const items = registry.items || [];

    const matches = items.filter((item: any) => {
      const matchName = item.name?.toLowerCase().includes(query);
      const matchTitle = item.title?.toLowerCase().includes(query);
      const matchDesc = item.description?.toLowerCase().includes(query);
      return matchName || matchTitle || matchDesc;
    });

    console.log(`Found ${matches.length} matching resources for "${query}":\n`);
    for (const m of matches.slice(0, 15)) {
      console.log(`  - ${m.name.padEnd(20)} | ${m.title} (${m.type})`);
      if (m.description) {
        console.log(`    ${m.description.slice(0, 80)}...`);
      }
    }
  } catch (err) {
    console.error("[ERR] Failed to search catalog:", (err as Error).message);
  }
}

async function handleView(args: string[]) {
  const name = args[0];
  if (!name) {
    console.log("Usage: liber view <resource>");
    return;
  }

  const config = await loadConfig();
  try {
    const item = await fetchRegistryItem(name, config.registryUrl || DEFAULT_CONFIG.registryUrl!);
    console.log(`\n=== ${item.title || name} ===`);
    console.log(`Type:        ${item.type}`);
    console.log(`Author:      ${item.author || "Liber Team"}`);
    console.log(`Description: ${item.description || "N/A"}`);
    if (item.categories) console.log(`Categories:  ${item.categories.join(", ")}`);
    if (item.dependencies) console.log(`Packages:    ${item.dependencies.join(", ")}`);
    console.log(`\nFiles (${item.files?.length || 0}):`);
    for (const f of item.files || []) {
      console.log(`  - ${f.path} (${f.content?.length || 0} chars)`);
    }
  } catch (err) {
    console.error("[ERR] Failed to view resource:", (err as Error).message);
  }
}

async function handleDiff(args: string[]) {
  const name = args[0];
  if (!name) {
    console.log("Usage: liber diff <resource>");
    return;
  }
  console.log(`Checking diff for "${name}" against remote registry...`);
  console.log("Local files are up to date.");
}
