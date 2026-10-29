"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Info,
  Copy,
  Check,
  ChevronRight,
  FolderCode,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

type Manager = "pnpm" | "npm" | "yarn" | "bun";

export default function DocsPage() {
  const [manager, setManager] = useState<Manager>("pnpm");
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    toast("Copied code to clipboard");
    setTimeout(() => setCopied(null), 2000);
  };

  const getAddCommand = () => {
    switch (manager) {
      case "pnpm":
        return "pnpm dlx shadcn add https://liber.dev/r/hero-centered.json";
      case "npm":
        return "npx shadcn add https://liber.dev/r/hero-centered.json";
      case "yarn":
        return "yarn dlx shadcn add https://liber.dev/r/hero-centered.json";
      case "bun":
        return "bunx --bun shadcn add https://liber.dev/r/hero-centered.json";
    }
  };

  const sidebarLinks = [
    { label: "Overview & Mission", href: "#overview" },
    { label: "Installation & CLI", href: "#installation" },
    { label: "Using Tech Logos", href: "#logos-guide" },
    { label: "Self-Hosting Fonts", href: "#fonts-guide" },
    { label: "Color Themes System", href: "#themes-guide" },
    { label: "Roadmap & Next Steps", href: "#roadmap", active: true },
    { label: "Contributing", href: "#contributing" },
  ];

  const tocLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Installation methods", href: "#installation" },
    { label: "Où placer les logos", href: "#logos-guide" },
    { label: "Où placer les polices", href: "#fonts-guide" },
    { label: "Thèmes de couleurs", href: "#themes-guide" },
    { label: "Énumération suite du projet", href: "#roadmap" },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar (3 cols, sticky) */}
        <aside className="hidden md:block md:col-span-3 sticky top-20 space-y-4 pr-4 border-r border-border text-xs">
          <div className="font-semibold text-foreground uppercase tracking-wider text-[11px] font-mono">
            Documentation
          </div>
          <nav className="space-y-1">
            {sidebarLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block px-2.5 py-1.5 rounded-[6px] transition-colors ${
                  item.active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Center Article (7 cols) */}
        <article className="md:col-span-6 space-y-10 max-w-[720px]">
          {/* Section: Overview */}
          <div className="space-y-2" id="overview">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Documentation & Architecture
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Liber UI est une librairie ouverte distribuant des logos de technologies, blocs de page,
              composants réactifs, thèmes WCAG et polices libres directement sous forme de code source dans votre projet.
            </p>
          </div>

          {/* Info Callout */}
          <div className="flex items-start gap-3 p-4 rounded-[10px] border border-border bg-muted/30 text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
            <div className="space-y-1">
              <span className="font-medium text-foreground">Philosophie : Zéro runtime verrouillé</span>
              <p className="leading-relaxed">
                Les ressources ne dépendent pas d'un wrapper lourd : les fichiers TypeScript, Tailwind et SVG propres atterrissent dans votre dossier source, entièrement modifiables.
              </p>
            </div>
          </div>

          {/* Section: Installation */}
          <section className="space-y-4" id="installation">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Méthodes d'installation
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Chaque ressource Liber est empaquetée selon la spécification de registry standard. Vous pouvez installer n'importe quel bloc ou composant avec votre gestionnaire de paquets favori :
            </p>

            <div className="rounded-[10px] border border-border bg-card overflow-hidden text-xs">
              <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-1.5">
                <div className="flex items-center gap-1">
                  {(["pnpm", "npm", "yarn", "bun"] as Manager[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setManager(m)}
                      className={`px-2 py-0.5 font-mono text-[11px] rounded-[6px] transition-colors ${
                        manager === m
                          ? "bg-card text-foreground font-semibold shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => copyCode(getAddCommand(), "cmd")}
                  className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground"
                >
                  {copied === "cmd" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  <span>{copied === "cmd" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <div className="p-3 font-mono text-xs select-all text-foreground bg-card">
                $ {getAddCommand()}
              </div>
            </div>
          </section>

          {/* Section: Logos Storage & Conventions */}
          <section className="space-y-4" id="logos-guide">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Logos : Emplacement & Conventions
              </h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pour garantir la cohérence visuelle en mode clair et sombre, les logos respectent une structure stricte :
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-[8px] border border-border bg-card space-y-2">
                <span className="font-mono font-semibold text-foreground text-[11px]">
                  📁 Dans votre projet consommateur :
                </span>
                <code className="block font-mono text-xs text-primary bg-muted/50 p-2 rounded border border-border select-all">
                  public/svg/&lt;marque&gt;/
                </code>
                <p className="text-[11px] text-muted-foreground">
                  Ex: <span className="font-mono text-foreground">public/svg/docker/color.svg</span> ou <span className="font-mono text-foreground">public/svg/github/mono.svg</span>.
                </p>
              </div>

              <div className="p-4 rounded-[8px] border border-border bg-card space-y-2">
                <span className="font-mono font-semibold text-foreground text-[11px]">
                  📁 Dans le monorepo Liber (Contribution) :
                </span>
                <code className="block font-mono text-xs text-primary bg-muted/50 p-2 rounded border border-border select-all">
                  content/logos/&lt;slug&gt;/
                </code>
                <p className="text-[11px] text-muted-foreground">
                  Chaque marque dispose d'un dossier unique validé par le schéma Zod.
                </p>
              </div>
            </div>

            <div className="rounded-[10px] border border-border bg-card p-4 space-y-3 text-xs">
              <span className="font-mono font-semibold text-foreground text-xs">
                Fichiers requis par dossier de marque :
              </span>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-foreground font-semibold">color.svg</span> : Vecteur couleur officiel fidèle à la charte graphique de la marque.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-foreground font-semibold">mono.svg</span> : Variante monochrome utilisant <code className="text-primary font-mono">fill="currentColor"</code> pour s'adapter au thème.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-foreground font-semibold">wordmark.svg</span> : Variante combinant symbole et lettrage officiel.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-foreground font-semibold">meta.json</span> : Métadonnées (nom, slug, source, brandGuidelinesUrl).
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Fonts Self-Hosting Guide */}
          <section className="space-y-4" id="fonts-guide">
            <div className="flex items-center gap-2">
              <FolderCode className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Polices : Auto-Hébergement & Dossiers
              </h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pour des performances optimales, zéro temps de blocage réseau (FOIT/FOUT) et une conformité RGPD totale sans appel à des serveurs tiers, auto-hébergez vos polices en local :
            </p>

            <div className="p-4 rounded-[8px] border border-border bg-card space-y-3 text-xs">
              <div className="space-y-1">
                <span className="font-mono font-semibold text-foreground">
                  📁 Dossier d'hébergement dans votre projet Next.js / Web :
                </span>
                <code className="block font-mono text-xs text-primary bg-muted/50 p-2 rounded border border-border select-all">
                  public/fonts/&lt;slug&gt;/
                </code>
              </div>

              <div className="space-y-1 pt-1">
                <span className="font-mono font-semibold text-foreground">Formats requis :</span>
                <p className="text-muted-foreground">
                  Téléchargez les fichiers <span className="font-mono text-foreground">.woff2</span> (prioritaire, compression supérieure) et <span className="font-mono text-foreground">.woff</span>.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-border">
                <span className="font-mono font-semibold text-foreground">Déclaration Next.js (app/fonts.ts) :</span>
                <pre className="p-3 rounded bg-muted/40 font-mono text-[11px] text-foreground overflow-x-auto leading-relaxed">
{`import localFont from "next/font/local";

export const fontSans = localFont({
  src: [
    { path: "../public/fonts/inter/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/inter/Inter-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});`}
                </pre>
              </div>
            </div>
          </section>

          {/* Section: Themes System */}
          <section className="space-y-4" id="themes-guide">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Thèmes & Contrôle du Contraste WCAG
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Toutes les palettes de Liber UI sont calibrées sur 5 teintes et validées selon la norme WCAG AA (ratio minimum de 4.5:1 entre texte et arrière-plan). Elles s'injectent directement dans vos variables CSS de Tailwind :
            </p>

            <div className="p-3 rounded-[8px] border border-border bg-card font-mono text-xs text-foreground select-all leading-relaxed">
              --background: #0f1117;<br />
              --foreground: #e6e8fa;<br />
              --primary: #5e6ad2;<br />
              --muted: #1a1d27;
            </div>
          </section>

          {/* Section: Roadmap & Ce qu'il faut développer pour la suite */}
          <section className="space-y-6 pt-4 border-t border-border" id="roadmap">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-mono text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Feuille de Route Officielle</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Ce qu'il faut développer pour la suite
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Voici l'énumération précise des prochaines étapes définies dans le cahier des charges officiel (<span className="font-mono text-foreground">Untitled (1).md</span>), structurées par phase de développement :
              </p>
            </div>

            {/* Checklist of phases */}
            <div className="space-y-4">
              {/* Completed Phases */}
              <div className="p-4 rounded-[10px] border border-emerald-500/30 bg-emerald-500/5 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Phases 0 à 3 : Terminées & Déployées</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Cadrage légal, schémas Zod, pipeline SVGO/SVGR, packages npm (@liber/core, @liber/svg, @liber/react), site Next.js avec catalogue unifié (Logos, Blocs, Composants, Thèmes, Polices) et déploiement Vercel.
                </p>
              </div>

              {/* Next Phases to Develop */}
              <div className="space-y-4 pt-2">
                {/* Phase 4 */}
                <div className="p-5 rounded-[10px] border border-border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-foreground">
                      Phase 4 · CLI Maison (@liber/cli) & Distribution CDN
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold">
                      À développer
                    </span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed list-disc list-inside">
                    <li>
                      <strong className="text-foreground">Package CLI autonome :</strong> Créer <code className="font-mono text-primary">packages/cli</code> en Node.js + TypeScript compilé avec <span className="font-mono text-foreground">tsup</span>.
                    </li>
                    <li>
                      <strong className="text-foreground">Commandes CLI :</strong> Implémenter <code className="font-mono">liber add &lt;slug&gt;</code>, <code className="font-mono">liber search &lt;query&gt;</code>, <code className="font-mono">liber view &lt;slug&gt;</code>, <code className="font-mono">liber init</code> (génération du <span className="font-mono">liber.json</span>) et <code className="font-mono">liber diff &lt;slug&gt;</code>.
                    </li>
                    <li>
                      <strong className="text-foreground">Déploiement CDN :</strong> Stockage R2 / CDN pour accès statique brut aux SVGs via <span className="font-mono">cdn.liber.dev/logos/&lt;slug&gt;/color.svg</span>.
                    </li>
                    <li>
                      <strong className="text-foreground">Publication automatisée :</strong> Configuration de Changesets et workflow GitHub Actions pour publication npm publique avec <code className="font-mono">--access public</code>.
                    </li>
                  </ul>
                </div>

                {/* Phase 5 */}
                <div className="p-5 rounded-[10px] border border-border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-foreground">
                      Phase 5 · Sélecteur Global de Thème & Police dans l'En-tête
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-semibold">
                      À développer
                    </span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed list-disc list-inside">
                    <li>
                      <strong className="text-foreground">Sélecteur Navbar global :</strong> Intégrer un switcher de thème et de typographie dans la barre de navigation du site qui modifie dynamiquement <strong className="text-foreground">tous</strong> les aperçus de blocs et composants en temps réel.
                    </li>
                    <li>
                      <strong className="text-foreground">Validation WCAG automatisée :</strong> Script <code className="font-mono">scripts/check-themes.ts</code> utilisant <span className="font-mono text-foreground">culori</span> pour bloquer en CI tout thème avec un contraste inférieur à 4.5:1.
                    </li>
                  </ul>
                </div>

                {/* Phase 6 */}
                <div className="p-5 rounded-[10px] border border-border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-foreground">
                      Phase 6 · Aperçus en Iframe Isolée & 30 Blocs / 20 Composants
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-semibold">
                      À développer
                    </span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed list-disc list-inside">
                    <li>
                      <strong className="text-foreground">Isolation totale par Iframe :</strong> Rendre chaque bloc dans une iframe avec injection de ses variables CSS propres afin d'éviter toute contamination par le CSS de la documentation.
                    </li>
                    <li>
                      <strong className="text-foreground">Expansion à 30 blocs originaux :</strong> Compléter les catégories Hero (5), Features (6), Tarifs (4), Témoignages (3), CTA (3), Pieds de page (4), Headers (5).
                    </li>
                    <li>
                      <strong className="text-foreground">Expansion à 20 composants :</strong> Intégrer les variantes complètes et le tableau interactif des props TypeScript.
                    </li>
                    <li>
                      <strong className="text-foreground">Script Playwright de captures :</strong> <code className="font-mono">scripts/build-previews.ts</code> pour générer automatiquement les captures d'écran clair et sombre à 360px et 1280px.
                    </li>
                  </ul>
                </div>

                {/* Phase 7 */}
                <div className="p-5 rounded-[10px] border border-border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-foreground">
                      Phase 7 · Expansion du Catalogue (150 Logos & Services Africains)
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border font-semibold">
                      Étape suivante
                    </span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed list-disc list-inside">
                    <li>
                      <strong className="text-foreground">Atteindre 150 logos vérifiés :</strong> Langages (20), Frameworks front (25), Backend & bases (30), Cloud & DevOps (30), Outils (30).
                    </li>
                    <li>
                      <strong className="text-foreground">Services tech & fintech africains :</strong> Intégration des vecteurs vérifiés d'Orange Money, MTN MoMo, Wave, Flutterwave, Paystack et Chipper Cash (selon chartes de marque accessibles).
                    </li>
                    <li>
                      <strong className="text-foreground">Script d'import par lot :</strong> Outil de validation de masse et de vérification des liens officiels de chartes de marque.
                    </li>
                  </ul>
                </div>

                {/* Phase 8 */}
                <div className="p-5 rounded-[10px] border border-border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-foreground">
                      Phase 8 · Tests Playwright E2E & Score Lighthouse &gt; 90
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border font-semibold">
                      Étape finale
                    </span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed list-disc list-inside">
                    <li>
                      <strong className="text-foreground">Tests de parcours complets :</strong> Recherche instantanée Ctrl+K, copie de SVG et JSX, téléchargement PNG, testeur de polices.
                    </li>
                    <li>
                      <strong className="text-foreground">Audits Lighthouse :</strong> Garantir un score de 90+ sur Performance, Accessibilité, Best Practices et SEO sur mobile et desktop.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Pagination */}
          <div className="pt-6 border-t border-border flex items-center justify-between text-xs">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              ← Accueil
            </Link>
            <Link href="/blocks" className="text-foreground font-medium flex items-center gap-1 hover:underline">
              <span>Explorer les blocs</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </article>

        {/* Right "On this page" TOC (3 cols, sticky) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-20 pl-4 space-y-3 text-xs border-l border-border">
          <div className="font-semibold text-foreground uppercase tracking-wider text-[11px] font-mono">
            Sur cette page
          </div>
          <nav className="space-y-1.5">
            {tocLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
}
