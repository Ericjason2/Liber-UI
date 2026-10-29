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

const TARGETS_45: TargetLogo[] = [
  // --- Languages (4) ---
  {
    deviconName: "erlang",
    slug: "erlang",
    name: "Erlang",
    description: "Langage fonctionnel concurrent conçu pour bâtir des systèmes hautement distribués et tolérants aux pannes.",
    category: "languages",
    aliases: ["erl", "beam"],
    website: "https://www.erlang.org",
    brandGuidelinesUrl: "https://www.erlang.org",
    defaultHex: "#a90533",
  },
  {
    deviconName: "julia",
    slug: "julia",
    name: "Julia",
    description: "Langage de programmation haute performance pour le calcul scientifique et numérique.",
    category: "languages",
    aliases: ["jl", "julialang"],
    website: "https://julialang.org",
    brandGuidelinesUrl: "https://julialang.org",
    defaultHex: "#9558b2",
  },
  {
    deviconName: "zig",
    slug: "zig",
    name: "Zig",
    description: "Langage de programmation système moderne, robuste, optimal et maintenable.",
    category: "languages",
    aliases: ["ziglang"],
    website: "https://ziglang.org",
    brandGuidelinesUrl: "https://ziglang.org",
    defaultHex: "#f7a41d",
  },
  {
    deviconName: "nim",
    slug: "nim",
    name: "Nim",
    description: "Langage compilé expressif avec typage statique, métaprogrammation et garbage collector efficace.",
    category: "languages",
    aliases: ["nimlang"],
    website: "https://nim-lang.org",
    brandGuidelinesUrl: "https://nim-lang.org",
    defaultHex: "#ffe95b",
  },

  // --- Frontend & Mobile (10) ---
  {
    deviconName: "solidjs",
    slug: "solidjs",
    name: "SolidJS",
    description: "Bibliothèque JavaScript déclarative, sans DOM virtuel, ultra-performante pour les interfaces web.",
    category: "frontend",
    aliases: ["solid", "solid.js"],
    website: "https://www.solidjs.com",
    brandGuidelinesUrl: "https://www.solidjs.com",
    defaultHex: "#2c4f7c",
  },
  {
    deviconName: "preact",
    slug: "preact",
    name: "Preact",
    description: "Alternative rapide et légère (3 Ko) à React avec la même API moderne.",
    category: "frontend",
    aliases: ["preactjs"],
    website: "https://preactjs.com",
    brandGuidelinesUrl: "https://preactjs.com",
    defaultHex: "#673ab8",
  },
  {
    deviconName: "remix",
    slug: "remix",
    name: "Remix",
    description: "Framework fullstack moderne pour React axé sur les standards du web et l'expérience utilisateur.",
    category: "frontend",
    aliases: ["remix-run"],
    website: "https://remix.run",
    brandGuidelinesUrl: "https://remix.run",
    defaultHex: "#121212",
  },
  {
    deviconName: "alpinejs",
    slug: "alpinejs",
    name: "Alpine.js",
    description: "Framework léger et robuste pour composer du comportement dynamique directement dans votre markup HTML.",
    category: "frontend",
    aliases: ["alpine"],
    website: "https://alpinejs.dev",
    brandGuidelinesUrl: "https://alpinejs.dev",
    defaultHex: "#77c1d2",
  },
  {
    deviconName: "qwik",
    slug: "qwik",
    name: "Qwik",
    description: "Framework web reprenable (resumable) à chargement instantané sans hydratation.",
    category: "frontend",
    aliases: ["qwikcity"],
    website: "https://qwik.dev",
    brandGuidelinesUrl: "https://qwik.dev",
    defaultHex: "#18b6f6",
  },
  {
    deviconName: "lit",
    slug: "lit",
    name: "Lit",
    description: "Bibliothèque simple et légère pour créer des Web Components rapides et interopérables.",
    category: "frontend",
    aliases: ["lit-html", "lit-element"],
    website: "https://lit.dev",
    brandGuidelinesUrl: "https://lit.dev",
    defaultHex: "#324fff",
  },
  {
    deviconName: "ember",
    slug: "ember",
    name: "Ember.js",
    description: "Framework JavaScript productif pour créer des applications web ambitieuses.",
    category: "frontend",
    aliases: ["emberjs"],
    website: "https://emberjs.com",
    brandGuidelinesUrl: "https://emberjs.com/logos",
    defaultHex: "#e04e39",
  },
  {
    deviconName: "ionic",
    slug: "ionic",
    name: "Ionic",
    description: "Kit de développement d'interface mobile multiplateforme basé sur le web pour iOS, Android et le Web.",
    category: "frontend",
    aliases: ["ionicframework"],
    website: "https://ionicframework.com",
    brandGuidelinesUrl: "https://ionicframework.com",
    defaultHex: "#3880ff",
  },
  {
    deviconName: "backbonejs",
    slug: "backbonejs",
    name: "Backbone.js",
    description: "Bibliothèque MVC légère fournissant des modèles, collections et vues pour les applications web.",
    category: "frontend",
    aliases: ["backbone"],
    website: "https://backbonejs.org",
    brandGuidelinesUrl: "https://backbonejs.org",
    defaultHex: "#0071b5",
  },
  {
    deviconName: "capacitor",
    slug: "capacitor",
    name: "Capacitor",
    description: "Runtime natif multiplateforme pour créer des applications iOS, Android et PWA avec du code web.",
    category: "frontend",
    aliases: ["ionic-capacitor"],
    website: "https://capacitorjs.com",
    brandGuidelinesUrl: "https://capacitorjs.com",
    defaultHex: "#119eff",
  },

  // --- Backend & Databases (9) ---
  {
    deviconName: "fastify",
    slug: "fastify",
    name: "Fastify",
    description: "Framework web ultra-rapide et à faible surcharge pour Node.js avec validation de schéma.",
    category: "backend",
    aliases: ["fastify-http"],
    website: "https://fastify.dev",
    brandGuidelinesUrl: "https://fastify.dev",
    defaultHex: "#000000",
  },
  {
    deviconName: "rails",
    slug: "rails",
    name: "Ruby on Rails",
    description: "Framework web fullstack suivant le patron MVC et la philosophie de convention plutôt que configuration.",
    category: "backend",
    aliases: ["ror", "ruby on rails"],
    website: "https://rubyonrails.org",
    brandGuidelinesUrl: "https://rubyonrails.org",
    defaultHex: "#cc0000",
  },
  {
    deviconName: "gin",
    slug: "gin",
    name: "Gin",
    description: "Framework web HTTP haute performance pour Go avec un routeur de type Martini.",
    category: "backend",
    aliases: ["gin-gonic"],
    website: "https://gin-gonic.com",
    brandGuidelinesUrl: "https://gin-gonic.com",
    defaultHex: "#00add8",
  },
  {
    deviconName: "couchdb",
    slug: "couchdb",
    name: "Apache CouchDB",
    description: "Base de données NoSQL orientée documents avec réplication bidirectionnelle et API JSON HTTP.",
    category: "backend",
    aliases: ["couch"],
    website: "https://couchdb.apache.org",
    brandGuidelinesUrl: "https://couchdb.apache.org",
    defaultHex: "#e42528",
  },
  {
    deviconName: "cassandra",
    slug: "cassandra",
    name: "Apache Cassandra",
    description: "Base de données NoSQL distribuée et scalable linéairement conçue pour les gros volumes de données.",
    category: "backend",
    aliases: ["c*"],
    website: "https://cassandra.apache.org",
    brandGuidelinesUrl: "https://cassandra.apache.org",
    defaultHex: "#1287b1",
  },
  {
    deviconName: "dynamodb",
    slug: "dynamodb",
    name: "Amazon DynamoDB",
    description: "Service de base de données NoSQL clé-valeur et orienté document entièrement managé par AWS.",
    category: "backend",
    aliases: ["aws dynamodb"],
    website: "https://aws.amazon.com/dynamodb/",
    brandGuidelinesUrl: "https://aws.amazon.com",
    defaultHex: "#4053d6",
  },
  {
    deviconName: "cockroachdb",
    slug: "cockroachdb",
    name: "CockroachDB",
    description: "Base de données SQL distribuée et résiliente garantissant une cohérence ACID globale.",
    category: "backend",
    aliases: ["cockroach"],
    website: "https://www.cockroachlabs.com",
    brandGuidelinesUrl: "https://www.cockroachlabs.com",
    defaultHex: "#6933ff",
  },
  {
    deviconName: "clickhouse",
    slug: "clickhouse",
    name: "ClickHouse",
    description: "Système de gestion de bases de données orienté colonnes temps réel pour l'analytique OLAP.",
    category: "backend",
    aliases: ["olap"],
    website: "https://clickhouse.com",
    brandGuidelinesUrl: "https://clickhouse.com",
    defaultHex: "#ffcc01",
  },
  {
    deviconName: "bun",
    slug: "bun",
    name: "Bun",
    description: "Environnement d'exécution JavaScript & TypeScript tout-en-un ultra-rapide avec gestionnaire de paquets.",
    category: "backend",
    aliases: ["bunjs", "bun runtime"],
    website: "https://bun.sh",
    brandGuidelinesUrl: "https://bun.sh",
    defaultHex: "#fbf0df",
  },

  // --- DevOps & Cloud (8) ---
  {
    deviconName: "traefik",
    slug: "traefik",
    name: "Traefik",
    description: "Reverse-proxy et répartiteur de charge moderne pour microservices et conteneurs.",
    category: "devops",
    aliases: ["traefik proxy"],
    website: "https://traefik.io",
    brandGuidelinesUrl: "https://traefik.io",
    defaultHex: "#24a1c1",
  },
  {
    deviconName: "consul",
    slug: "consul",
    name: "HashiCorp Consul",
    description: "Plateforme de maillage de services pour la découverte, la configuration et la segmentation sécurisée.",
    category: "devops",
    aliases: ["hashicorp consul"],
    website: "https://www.consul.io",
    brandGuidelinesUrl: "https://www.hashicorp.com/brand",
    defaultHex: "#f24c53",
  },
  {
    deviconName: "nomad",
    slug: "nomad",
    name: "HashiCorp Nomad",
    description: "Orchestrateur de charge de travail flexible et simple pour conteneurs et applications non-conteneurisées.",
    category: "devops",
    aliases: ["hashicorp nomad"],
    website: "https://www.nomadproject.io",
    brandGuidelinesUrl: "https://www.hashicorp.com/brand",
    defaultHex: "#00ca8e",
  },
  {
    deviconName: "vault",
    slug: "vault",
    name: "HashiCorp Vault",
    description: "Solution de gestion des secrets, chiffrement des données sensibles et contrôle d'accès.",
    category: "devops",
    aliases: ["hashicorp vault"],
    website: "https://www.vaultproject.io",
    brandGuidelinesUrl: "https://www.hashicorp.com/brand",
    defaultHex: "#ffec6e",
  },
  {
    deviconName: "podman",
    slug: "podman",
    name: "Podman",
    description: "Moteur de conteneurs sans démon (daemonless) et rootless conforme OCI.",
    category: "devops",
    aliases: ["libpod"],
    website: "https://podman.io",
    brandGuidelinesUrl: "https://podman.io",
    defaultHex: "#892ca0",
  },
  {
    deviconName: "minikube",
    slug: "minikube",
    name: "Minikube",
    description: "Outil permettant d'exécuter un cluster Kubernetes mono-nœud en local pour le développement.",
    category: "devops",
    aliases: ["k8s local"],
    website: "https://minikube.sigs.k8s.io",
    brandGuidelinesUrl: "https://kubernetes.io",
    defaultHex: "#326ce5",
  },
  {
    deviconName: "helm",
    slug: "helm",
    name: "Helm",
    description: "Gestionnaire de paquets pour Kubernetes permettant de définir, installer et mettre à jour des applications.",
    category: "devops",
    aliases: ["k8s helm"],
    website: "https://helm.sh",
    brandGuidelinesUrl: "https://helm.sh",
    defaultHex: "#0f1689",
  },
  {
    deviconName: "datadog",
    slug: "datadog",
    name: "Datadog",
    description: "Service de monitoring et d'observabilité SaaS pour serveurs, bases de données, outils et services cloud.",
    category: "devops",
    aliases: ["dd"],
    website: "https://www.datadoghq.com",
    brandGuidelinesUrl: "https://www.datadoghq.com",
    defaultHex: "#632ca6",
  },

  // --- Tools & Frameworks (14) ---
  {
    deviconName: "pycharm",
    slug: "pycharm",
    name: "PyCharm",
    description: "IDE dédié au développement Python développé par JetBrains.",
    category: "tools",
    aliases: ["jetbrains pycharm"],
    website: "https://www.jetbrains.com/pycharm/",
    brandGuidelinesUrl: "https://www.jetbrains.com/company/brand/",
    defaultHex: "#21d789",
  },
  {
    deviconName: "webstorm",
    slug: "webstorm",
    name: "WebStorm",
    description: "IDE JavaScript et TypeScript puissant avec autocomplétion intelligente par JetBrains.",
    category: "tools",
    aliases: ["jetbrains webstorm"],
    website: "https://www.jetbrains.com/webstorm/",
    brandGuidelinesUrl: "https://www.jetbrains.com/company/brand/",
    defaultHex: "#00cdd7",
  },
  {
    deviconName: "neovim",
    slug: "neovim",
    name: "Neovim",
    description: "Éditeur de texte moderne basé sur Vim, extensible via Lua et doté d'un client LSP intégré.",
    category: "tools",
    aliases: ["nvim"],
    website: "https://neovim.io",
    brandGuidelinesUrl: "https://neovim.io",
    defaultHex: "#57a143",
  },
  {
    deviconName: "dbeaver",
    slug: "dbeaver",
    name: "DBeaver",
    description: "Client universel de gestion de bases de données SQL et NoSQL multiplateforme gratuit.",
    category: "tools",
    aliases: ["dbeaver-ce"],
    website: "https://dbeaver.io",
    brandGuidelinesUrl: "https://dbeaver.io",
    defaultHex: "#453835",
  },
  {
    deviconName: "webpack",
    slug: "webpack",
    name: "Webpack",
    description: "Module bundler statique hautement configurable pour les applications JavaScript modernes.",
    category: "tools",
    aliases: ["webpackjs"],
    website: "https://webpack.js.org",
    brandGuidelinesUrl: "https://webpack.js.org/branding/",
    defaultHex: "#8dd6f9",
  },
  {
    deviconName: "rollup",
    slug: "rollup",
    name: "Rollup",
    description: "Empaqueteur de modules pour JavaScript qui compile de petits bouts de code en bibliothèques complexes.",
    category: "tools",
    aliases: ["rollupjs"],
    website: "https://rollupjs.org",
    brandGuidelinesUrl: "https://rollupjs.org",
    defaultHex: "#ec4a3f",
  },
  {
    deviconName: "playwright",
    slug: "playwright",
    name: "Playwright",
    description: "Framework d'automatisation et de tests end-to-end multi-navigateurs par Microsoft.",
    category: "tools",
    aliases: ["pw"],
    website: "https://playwright.dev",
    brandGuidelinesUrl: "https://playwright.dev",
    defaultHex: "#2ead33",
  },
  {
    deviconName: "puppeteer",
    slug: "puppeteer",
    name: "Puppeteer",
    description: "Bibliothèque Node.js fournissant une API de haut niveau pour contrôler Chrome ou Chromium en headless.",
    category: "tools",
    aliases: ["chrome puppeteer"],
    website: "https://pptr.dev",
    brandGuidelinesUrl: "https://pptr.dev",
    defaultHex: "#00d8a2",
  },
  {
    deviconName: "jest",
    slug: "jest",
    name: "Jest",
    description: "Framework de test JavaScript axé sur la simplicité avec assertion, espion et couverture intégrés.",
    category: "tools",
    aliases: ["jestjs"],
    website: "https://jestjs.io",
    brandGuidelinesUrl: "https://jestjs.io",
    defaultHex: "#c21325",
  },
  {
    deviconName: "vitest",
    slug: "vitest",
    name: "Vitest",
    description: "Framework de test unitaire ultra-rapide propulsé nativement par Vite.",
    category: "tools",
    aliases: ["vite test"],
    website: "https://vitest.dev",
    brandGuidelinesUrl: "https://vitest.dev",
    defaultHex: "#729b1b",
  },
  {
    deviconName: "selenium",
    slug: "selenium",
    name: "Selenium",
    description: "Suite d'outils pour l'automatisation des navigateurs web multi-plateforme.",
    category: "tools",
    aliases: ["webdriver"],
    website: "https://www.selenium.dev",
    brandGuidelinesUrl: "https://www.selenium.dev",
    defaultHex: "#43b02a",
  },
  {
    deviconName: "composer",
    slug: "composer",
    name: "Composer",
    description: "Gestionnaire de dépendances standard pour l'écosystème de programmation PHP.",
    category: "tools",
    aliases: ["packagist"],
    website: "https://getcomposer.org",
    brandGuidelinesUrl: "https://getcomposer.org",
    defaultHex: "#885630",
  },
  {
    deviconName: "gradle",
    slug: "gradle",
    name: "Gradle",
    description: "Outil d'automatisation de build multi-langages performant et flexible pour la JVM.",
    category: "tools",
    aliases: ["gradle build"],
    website: "https://gradle.org",
    brandGuidelinesUrl: "https://gradle.org",
    defaultHex: "#02303a",
  },
  {
    deviconName: "pytorch",
    slug: "pytorch",
    name: "PyTorch",
    description: "Framework open-source de Machine Learning et Deep Learning pour la recherche et la production.",
    category: "tools",
    aliases: ["torch"],
    website: "https://pytorch.org",
    brandGuidelinesUrl: "https://pytorch.org",
    defaultHex: "#ee4c2c",
  },
];

console.log(`Starting Devicon batch scrape for ${TARGETS_45.length} targeted logos...`);

const deviconIndexRes = await fetch("https://raw.githubusercontent.com/devicons/devicon/master/devicon.json");
const deviconList: Array<{
  name: string;
  color?: string;
  versions: { svg: string[] };
}> = await deviconIndexRes.json();

let addedCount = 0;
let skippedCount = 0;

for (const target of TARGETS_45) {
  const targetDir = join(CONTENT_LOGOS, target.slug);

  try {
    await readFile(join(targetDir, "meta.json"), "utf8");
    console.log(`[SKIP] Already exists: ${target.slug}`);
    skippedCount++;
    continue;
  } catch {
    // Needs scraping
  }

  const deviconInfo = deviconList.find((d) => d.name === target.deviconName);
  const versions = deviconInfo?.versions.svg ?? [];

  const colorVersion =
    versions.find((v) => v === "original") ||
    versions.find((v) => v === "plain") ||
    versions.find((v) => v.includes("original")) ||
    versions.find((v) => v.includes("plain")) ||
    versions[0];

  const monoVersion =
    versions.find((v) => v === "plain") ||
    versions.find((v) => v === "original") ||
    colorVersion;

  const wordmarkVersion =
    versions.find((v) => v === "original-wordmark") ||
    versions.find((v) => v === "plain-wordmark") ||
    versions.find((v) => v.includes("wordmark"));

  if (!colorVersion) {
    console.warn(`[WARN] No SVG versions found for devicon: ${target.deviconName}`);
    continue;
  }

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

    // Safety checks: clean forbidden tags
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
    console.log(`[ADD] (${addedCount + 1}/45) Added "${target.slug}" (${target.name})`);
    addedCount++;
  } catch (err) {
    console.error(`[ERR] Failed to fetch or process "${target.slug}":`, (err as Error).message);
  }
}

console.log(`\nBatch completed: added ${addedCount} logos, skipped ${skippedCount}.`);
