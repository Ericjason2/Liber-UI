import { writeFile, mkdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const CONTENT_LOGOS = join(ROOT, "content/logos");

interface TargetLogo {
  deviconName: string;
  slug: string;
  name: string;
  description: string;
  category: "languages" | "frontend" | "backend" | "devops" | "tools";
  aliases: string[];
  website: string;
  brandGuidelinesUrl: string;
  defaultHex: string;
}

const TARGETS_6: TargetLogo[] = [
  {
    deviconName: "anaconda",
    slug: "anaconda",
    name: "Anaconda",
    description: "Distribution Python et R pour le calcul scientifique et la gestion de paquets de data science.",
    category: "tools",
    aliases: ["conda"],
    website: "https://www.anaconda.com",
    brandGuidelinesUrl: "https://www.anaconda.com",
    defaultHex: "#44a833",
  },
  {
    deviconName: "jupyter",
    slug: "jupyter",
    name: "Jupyter",
    description: "Environnement informatique interactif open source pour créer des notebooks de données.",
    category: "tools",
    aliases: ["jupyter-notebook", "ipynb"],
    website: "https://jupyter.org",
    brandGuidelinesUrl: "https://jupyter.org",
    defaultHex: "#f37626",
  },
  {
    deviconName: "pandas",
    slug: "pandas",
    name: "Pandas",
    description: "Bibliothèque logicielle d'analyse et de manipulation de données structurées pour Python.",
    category: "tools",
    aliases: ["dataframe"],
    website: "https://pandas.pydata.org",
    brandGuidelinesUrl: "https://pandas.pydata.org",
    defaultHex: "#150458",
  },
  {
    deviconName: "numpy",
    slug: "numpy",
    name: "NumPy",
    description: "Bibliothèque fondamentale pour le calcul scientifique et la manipulation de matrices multidimensionnelles en Python.",
    category: "tools",
    aliases: ["numpy-array"],
    website: "https://numpy.org",
    brandGuidelinesUrl: "https://numpy.org",
    defaultHex: "#013243",
  },
  {
    deviconName: "tensorflow",
    slug: "tensorflow",
    name: "TensorFlow",
    description: "Plateforme open-source de Machine Learning et réseaux de neurones profonds développée par Google.",
    category: "tools",
    aliases: ["tf"],
    website: "https://www.tensorflow.org",
    brandGuidelinesUrl: "https://www.tensorflow.org",
    defaultHex: "#ff6f00",
  },
  {
    deviconName: "keras",
    slug: "keras",
    name: "Keras",
    description: "API de Deep Learning de haut niveau pour Python, conçue pour l'expérimentation rapide.",
    category: "tools",
    aliases: ["keras-io"],
    website: "https://keras.io",
    brandGuidelinesUrl: "https://keras.io",
    defaultHex: "#d00000",
  },
];

console.log(`Starting Devicon final 6 scrape to reach 150 logos...`);

const deviconIndexRes = await fetch("https://raw.githubusercontent.com/devicons/devicon/master/devicon.json");
const deviconList: Array<{
  name: string;
  color?: string;
  versions: { svg: string[] };
}> = (await deviconIndexRes.json()) as Array<{
  name: string;
  color?: string;
  versions: { svg: string[] };
}>;

let addedCount = 0;

for (const target of TARGETS_6) {
  const targetDir = join(CONTENT_LOGOS, target.slug);

  try {
    await readFile(join(targetDir, "meta.json"), "utf8");
    console.log(`[SKIP] Already exists: ${target.slug}`);
    continue;
  } catch {
    // scrape
  }

  const deviconInfo = deviconList.find((d) => d.name === target.deviconName);
  const versions = deviconInfo?.versions.svg ?? [];

  const colorVersion =
    versions.find((v) => v === "original") ||
    versions.find((v) => v === "plain") ||
    versions[0];

  const monoVersion =
    versions.find((v) => v === "plain") ||
    versions.find((v) => v === "line") ||
    colorVersion;

  const wordmarkVersion =
    versions.find((v) => v === "original-wordmark") ||
    versions.find((v) => v === "plain-wordmark");

  const baseUrl = `https://raw.githubusercontent.com/devicons/devicon/master/icons/${target.deviconName}/${target.deviconName}-`;
  const colorSvgUrl = `${baseUrl}${colorVersion}.svg`;
  const monoSvgUrl = `${baseUrl}${monoVersion}.svg`;

  try {
    const colorRes = await fetch(colorSvgUrl);
    if (!colorRes.ok) throw new Error(`HTTP ${colorRes.status} fetching color SVG`);
    let colorSvg = await colorRes.text();

    const monoRes = await fetch(monoSvgUrl);
    if (!monoRes.ok) throw new Error(`HTTP ${monoRes.status} fetching mono SVG`);
    let monoSvg = await monoRes.text();

    let wordmarkSvg: string | null = null;
    if (wordmarkVersion) {
      const wmRes = await fetch(`${baseUrl}${wordmarkVersion}.svg`);
      if (wmRes.ok) {
        wordmarkSvg = await wmRes.text();
      }
    }

    colorSvg = colorSvg.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "");
    monoSvg = monoSvg.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "");
    if (wordmarkSvg) {
      wordmarkSvg = wordmarkSvg.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "");
    }

    await mkdir(targetDir, { recursive: true });
    await writeFile(join(targetDir, "color.svg"), colorSvg, "utf8");
    await writeFile(join(targetDir, "mono.svg"), monoSvg, "utf8");
    if (wordmarkSvg) {
      await writeFile(join(targetDir, "wordmark.svg"), wordmarkSvg, "utf8");
    }

    const hexColor =
      deviconInfo?.color && /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(deviconInfo.color)
        ? deviconInfo.color
        : target.defaultHex;

    const variants: Record<string, { file: string; hex?: string }> = {
      color: { file: "color.svg", hex: hexColor },
      mono: { file: "mono.svg" },
    };

    if (wordmarkSvg) {
      variants.wordmark = { file: "wordmark.svg" };
    }

    const meta = {
      slug: target.slug,
      kind: "logo",
      name: target.name,
      description: target.description,
      aliases: target.aliases,
      category: target.category,
      tags: [target.category, target.slug, ...target.aliases],
      license: "trademark",
      author: `${target.name} Team`,
      website: target.website,
      brandGuidelinesUrl: target.brandGuidelinesUrl,
      source: {
        url: colorSvgUrl,
        retrievedAt: "2026-10-29",
      },
      variants,
    };

    await writeFile(join(targetDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n", "utf8");
    console.log(`[ADD] Added "${target.slug}" (${target.name})`);
    addedCount++;
  } catch (err) {
    console.error(`[ERR] Failed "${target.slug}":`, (err as Error).message);
  }
}

console.log(`Finished: added ${addedCount} logos.`);
