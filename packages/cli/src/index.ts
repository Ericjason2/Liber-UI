import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, resolve, dirname, relative, isAbsolute } from "node:path";

export interface LiberConfig {
  $schema?: string;
  format?: "react" | "svg";
  variant?: "color" | "mono" | "wordmark";
  outDir?: string;
  aliases?: Record<string, string>;
  registryUrl?: string;
}

export interface RegistryFileEntry {
  path: string;
  content: string;
  type?: string;
}

export interface RegistryItemResponse {
  name?: string;
  type?: string;
  title?: string;
  description?: string;
  author?: string;
  categories?: string[];
  dependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFileEntry[];
  meta?: {
    kind?: string;
    [key: string]: unknown;
  };
}

const DEFAULT_CONFIG: LiberConfig = {
  format: "react",
  variant: "color",
  outDir: "src/components/ui/logos",
  registryUrl: "https://liber-ui-delta.vercel.app/r",
};

export async function runCli(argv: string[]) {
  const args = argv.slice(2);
  const command = args[0];

  if (!command || command === "--help" || command === "-h" || command === "help") {
    printHelp();
    return;
  }

  if (command === "--version" || command === "-v") {
    console.log("@liber-ui/cli v0.1.1");
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
Liber UI CLI – Install logos, components, animations, themes & fonts into your project

Usage:
  npx @liber-ui/cli <command> [options]

Commands:
  init                     Initialize liber.json configuration in current directory
  add <resource...>        Install resources (e.g. "liber add react python button")
  search <query>           Search resources across the entire catalog
  view <resource>          Display details, variants and files before installing
  diff <resource>          Compare installed files with remote catalog

Options for 'add':
  --dry-run                Preview files to be installed without writing to disk
  --force                  Overwrite existing files without prompting
  --out <dir>              Custom output directory
  --format <react|svg>     Install React component or raw SVG
  --variant <color|mono>   Logo variant to install (default: color)

Documentation: https://liber-ui-delta.vercel.app/docs
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

async function fetchRegistryItem(name: string, baseUrl: string): Promise<RegistryItemResponse> {
  const cleanBase = baseUrl.replace(/\/$/, "");
  const candidates = [name];
  if (name.startsWith("font-")) {
    candidates.push(name.replace(/^font-/, ""));
  } else if (name.startsWith("theme-")) {
    candidates.push(name.replace(/^theme-/, ""));
  } else {
    candidates.push(`font-${name}`);
    candidates.push(`theme-${name}`);
  }

  let lastError: Error | null = null;
  for (const candidate of candidates) {
    const url = `${cleanBase}/${candidate}.json`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        return (await res.json()) as RegistryItemResponse;
      }
    } catch (err) {
      lastError = err as Error;
    }
  }

  throw new Error(
    `Failed to fetch resource "${name}" from ${cleanBase}: ${lastError ? lastError.message : "Not found"}`,
    { cause: lastError }
  );
}

function isInsideWorkspace(destPath: string): boolean {
  const workspaceRoot = resolve(process.cwd());
  const rel = relative(workspaceRoot, destPath);
  return rel !== "" && !rel.startsWith("..") && !isAbsolute(rel);
}

/**
 * Resolves the destination path for a registry file based on its registry
 * metadata/path when the user has not forced a custom `--out` directory.
 */
export function resolveFileDestPath(
  file: RegistryFileEntry,
  item: RegistryItemResponse,
  configOutDir: string,
  hasCustomOutFlag: boolean,
  fallbackName: string
): string {
  const normalizedPath = (file.path || "").replace(/^\/+/, "").replace(/\\/g, "/");
  const fileName = normalizedPath.split("/").pop() || `${fallbackName}.tsx`;

  if (hasCustomOutFlag) {
    return join(configOutDir, fileName);
  }

  if (item.meta?.kind === "logo" || normalizedPath.includes("logos/")) {
    return join(configOutDir, fileName);
  }

  if (normalizedPath.startsWith("components/ui/") || normalizedPath.startsWith("ui/")) {
    return join("src/components/ui", fileName);
  }

  if (normalizedPath.startsWith("styles/")) {
    return join("src", normalizedPath);
  }

  return join(configOutDir, fileName);
}

interface InstallOptions {
  registryUrl: string;
  outDir: string;
  hasCustomOutFlag: boolean;
  format: "react" | "svg";
  variant: "color" | "mono" | "wordmark";
  dryRun: boolean;
  force: boolean;
  visited: Set<string>;
}

async function installResource(name: string, opts: InstallOptions): Promise<void> {
  const key = name.trim().toLowerCase();
  if (!key || opts.visited.has(key)) {
    return;
  }
  opts.visited.add(key);

  const item = await fetchRegistryItem(name, opts.registryUrl);

  // Recursively install registryDependencies first
  if (Array.isArray(item.registryDependencies) && item.registryDependencies.length > 0) {
    for (const dep of item.registryDependencies) {
      await installResource(dep, opts);
    }
  }

  console.log(`\n-> Installing [${item.type || "ui"}] "${item.title || name}"...`);

  if (opts.format === "svg" && item.meta?.kind === "logo" && item.name) {
    const registryOrigin = opts.registryUrl.replace(/\/r\/?$/, "");
    const svgUrl = `${registryOrigin}/svg/${item.name}/${opts.variant}.svg`;
    const svgFileName = `${item.name}-${opts.variant}.svg`;
    const destPath = resolve(join(opts.outDir, svgFileName));

    if (!isInsideWorkspace(destPath)) {
      throw new Error(`Access violation: target path ${destPath} is outside current workspace.`);
    }

    const svgRes = await fetch(svgUrl);
    if (!svgRes.ok) {
      throw new Error(`Could not fetch SVG variant "${opts.variant}" from ${svgUrl}`);
    }
    const svgContent = await svgRes.text();

    if (opts.dryRun) {
      console.log(`  [DRY-RUN] Would write: ${destPath} (${svgContent.length} bytes)`);
      return;
    }

    try {
      await access(destPath);
      if (!opts.force) {
        console.log(`  [SKIP] File exists: ${destPath}. Use --force to overwrite.`);
        return;
      }
    } catch {
      // File does not exist
    }

    await mkdir(dirname(destPath), { recursive: true });
    await writeFile(destPath, svgContent, "utf8");
    console.log(`  [OK] Wrote SVG: ${destPath}`);
    return;
  }

  if (!item.files || item.files.length === 0) {
    console.warn(`  [WARN] Resource "${name}" has no registered files.`);
    return;
  }

  for (const file of item.files) {
    const relDest = resolveFileDestPath(
      file,
      item,
      opts.outDir,
      opts.hasCustomOutFlag,
      name
    );
    const destPath = resolve(relDest);

    if (!isInsideWorkspace(destPath)) {
      throw new Error(`Access violation: target path ${destPath} is outside current workspace.`);
    }

    if (opts.dryRun) {
      console.log(`  [DRY-RUN] Would write: ${destPath} (${file.content.length} bytes)`);
      continue;
    }

    try {
      await access(destPath);
      if (!opts.force) {
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
}

async function handleAdd(args: string[]) {
  const dryRun = args.includes("--dry-run");
  const force = args.includes("--force");
  const config = await loadConfig();

  // Extract positional resource names while ignoring flags AND their option values
  const valueFlags = new Set(["--out", "--format", "--variant"]);
  const names: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (valueFlags.has(arg)) {
      i++; // skip option value
      continue;
    }
    if (arg.startsWith("-")) continue;
    names.push(arg);
  }

  if (names.length === 0) {
    console.error("[ERR] Please specify at least one resource name. Example: liber add react");
    process.exit(1);
  }

  // Parse custom --out, --format, --variant
  let outDir = config.outDir || "src/components/ui/logos";
  const outIdx = args.indexOf("--out");
  const outArg = outIdx !== -1 ? args[outIdx + 1] : undefined;
  const hasCustomOutFlag = Boolean(outArg);
  if (outArg) {
    outDir = outArg;
  }

  let format: "react" | "svg" = config.format || "react";
  const formatIdx = args.indexOf("--format");
  const formatArg = formatIdx !== -1 ? args[formatIdx + 1] : undefined;
  if (formatArg === "react" || formatArg === "svg") {
    format = formatArg;
  }

  let variant: "color" | "mono" | "wordmark" = config.variant || "color";
  const variantIdx = args.indexOf("--variant");
  const variantArg = variantIdx !== -1 ? args[variantIdx + 1] : undefined;
  if (variantArg === "color" || variantArg === "mono" || variantArg === "wordmark") {
    variant = variantArg;
  }

  console.log(
    `Installing ${names.length} resource(s) (format=${format}, variant=${variant}${hasCustomOutFlag ? `, out=${outDir}` : ""})...`
  );

  const registryUrl = config.registryUrl || DEFAULT_CONFIG.registryUrl || "";
  const visited = new Set<string>();

  for (const name of names) {
    try {
      await installResource(name, {
        registryUrl,
        outDir,
        hasCustomOutFlag,
        format,
        variant,
        dryRun,
        force,
        visited,
      });
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
    const registry = (await res.json()) as { items?: RegistrySearchResult[] };
    const items = registry.items || [];

    interface RegistrySearchResult {
      name?: string;
      title?: string;
      description?: string;
      type?: string;
    }
    const matches = items.filter((item) => {
      const matchName = item.name?.toLowerCase().includes(query);
      const matchTitle = item.title?.toLowerCase().includes(query);
      const matchDesc = item.description?.toLowerCase().includes(query);
      return matchName || matchTitle || matchDesc;
    });

    console.log(`Found ${matches.length} matching resources for "${query}":\n`);
    for (const m of matches.slice(0, 15)) {
      console.log(`  - ${(m.name || "").padEnd(20)} | ${m.title || ""} (${m.type || ""})`);
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
    const registryUrl = config.registryUrl || DEFAULT_CONFIG.registryUrl || "";
    const item = await fetchRegistryItem(name, registryUrl);
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
  const config = await loadConfig();
  const outDir = config.outDir || "src/components/ui/logos";
  console.log(`Checking diff for "${name}" against remote registry...`);

  try {
    const registryUrl = config.registryUrl || DEFAULT_CONFIG.registryUrl || "";
    const item = await fetchRegistryItem(name, registryUrl);
    for (const file of item.files || []) {
      const fileName = file.path.split("/").pop() || `${name}.tsx`;
      const relDest = resolveFileDestPath(file, item, outDir, false, name);
      const localPath = resolve(relDest);
      try {
        const localContent = await readFile(localPath, "utf8");
        if (localContent.trim() === (file.content || "").trim()) {
          console.log(`  [OK] ${fileName} is identical to upstream.`);
        } else {
          console.log(`  [DIFF] ${fileName} differs from upstream (${localContent.length} bytes local vs ${file.content.length} bytes remote).`);
        }
      } catch {
        console.log(`  [MISSING] ${fileName} is not installed locally at ./${relDest}.`);
      }
    }
  } catch (err) {
    console.error(`[ERR] Could not check diff for "${name}":`, (err as Error).message);
  }
}
