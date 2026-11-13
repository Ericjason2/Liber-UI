import type { Metadata } from "next";
import Link from "next/link";
import { Scale, CheckCircle2, AlertTriangle, FileCode2, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation (CGU) — Liber UI",
  description: "Conditions d'utilisation, licence de code source et responsabilités liées à l'usage de Liber UI.",
};

export default function TermsPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      <div className="space-y-3 pb-6 border-b border-border">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono bg-muted text-muted-foreground border border-border">
          <Scale className="h-3.5 w-3.5 text-primary" />
          <span>Cadre Contractuel</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Conditions Générales d&apos;Utilisation
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          En naviguant sur ce site ou en utilisant le CLI et les composants Liber UI, vous acceptez sans réserve les présentes conditions d&apos;utilisation.
        </p>
      </div>

      {/* 1. Objet et champ d'application */}
      <section className="space-y-4" id="objet">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Globe2 className="h-5 w-5 text-primary" />
          <h2>1. Objet &amp; Description du service</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            Liber UI met à disposition des développeurs et créateurs d&apos;applications une bibliothèque open source de composants React, de tokens de design, d&apos;animations CSS, de polices typographiques libres et d&apos;outils en ligne de commande (CLI).
          </p>
          <p>
            Les composants sont fournis sous la forme de fichiers sources (TypeScript / Tailwind CSS) destinés à être intégrés directement au sein du code source de vos projets numériques.
          </p>
        </div>
      </section>

      {/* 2. Licence et droits d'utilisation */}
      <section className="space-y-4 border-t border-border pt-8" id="licence">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <FileCode2 className="h-5 w-5 text-primary" />
          <h2>2. Licence d&apos;exploitation et droits accordés</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            L&apos;ensemble des composants créés et maintenus par Liber UI est distribué sous les termes de la <strong className="text-foreground">Licence MIT</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-1">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Ce qui est autorisé
              </span>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Utilisation commerciale et privée, modification totale du code, intégration dans des applications propriétaires, redistribution sans redevance.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-card space-y-1">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Obligations
              </span>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Conserver la mention de copyright et la notice de licence MIT dans les copies substantielles des fichiers originaux.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Absence de garantie et limitation de responsabilité */}
      <section className="space-y-4 border-t border-border pt-8" id="responsabilite">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h2>3. Absence de garantie &amp; Responsabilité</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            LES COMPOSANTS, LOGICIELS ET SCRIPTS SONT FOURNIS « EN L&apos;ÉTAT » (&quot;AS IS&quot;), SANS AUCUNE GARANTIE D&apos;AUCUNE SORTE, EXPRESSE OU IMPLICITE, Y COMPRIS MAIS SANS S&apos;Y LIMITER LES GARANTIES DE QUALITÉ MARCHANDE, D&apos;ADÉQUATION À UN USAGE PARTICULIER OU D&apos;ABSENCE DE CONTREFAÇON.
          </p>
          <p>
            En aucun cas les auteurs ou mainteneurs de Liber UI ne pourront être tenus responsables d&apos;un quelconque dommage direct, indirect, accessoire ou consécutif survenant à la suite de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser les composants ou le site web.
          </p>
        </div>
      </section>

      {/* 4. Disponibilité du service */}
      <section className="space-y-4 border-t border-border pt-8" id="disponibilite">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Scale className="h-5 w-5 text-primary" />
          <h2>4. Disponibilité et modifications des conditions</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            L&apos;équipe Liber UI se réserve le droit d&apos;enrichir, de modifier ou de retirer des composants et des fonctionnalités du registre sans préavis. Les présentes CGU peuvent être modifiées à tout moment pour refléter les évolutions légales et techniques.
          </p>
        </div>
      </section>

      <div className="pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span>Version 1.2 — 13 novembre 2026</span>
        <div className="flex items-center gap-3">
          <Link href="/legal/mentions-legales" className="hover:text-foreground underline transition-colors">
            Mentions légales
          </Link>
          <span>•</span>
          <Link href="/legal/cookies" className="hover:text-foreground underline transition-colors">
            Politique cookies
          </Link>
        </div>
      </div>
    </div>
  );
}

