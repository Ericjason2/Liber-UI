import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Building2, Server, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions Légales — Liber UI",
  description: "Mentions légales, éditeur, hébergeur et gouvernance open-source de la plateforme Liber UI.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      <div className="space-y-3 pb-6 border-b border-border">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono bg-muted text-muted-foreground border border-border">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>Conformité &amp; Transparence</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Mentions Légales
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Informations légales requises en application de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN).
        </p>
      </div>

      {/* 1. Éditeur de la plateforme */}
      <section className="space-y-4" id="editeur">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Building2 className="h-5 w-5 text-primary" />
          <h2>1. Éditeur de la plateforme</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed p-4 rounded-xl border border-border bg-card">
          <p>
            Le site web et le registre de composants <strong className="text-foreground">Liber UI</strong> sont édités dans le cadre d&apos;un projet open source communautaire.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 font-mono text-[11px] text-foreground">
            <li><span className="text-muted-foreground">Nom du projet :</span> Liber UI</li>
            <li><span className="text-muted-foreground">Responsable de publication :</span> L&apos;équipe de maintenance Liber UI</li>
            <li><span className="text-muted-foreground">Contact électronique :</span> contact@liber-ui.dev</li>
            <li><span className="text-muted-foreground">Dépôt officiel du code :</span> https://github.com/liber-ui/liber</li>
          </ul>
        </div>
      </section>

      {/* 2. Hébergement de l'infrastructure */}
      <section className="space-y-4 border-t border-border pt-8" id="hebergement">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Server className="h-5 w-5 text-primary" />
          <h2>2. Hébergement de l&apos;infrastructure</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed p-4 rounded-xl border border-border bg-card">
          <p>
            Les applications et API de Liber UI sont hébergées et distribuées mondialement via des infrastructures sécurisées de diffusion de contenu (Edge CDN) :
          </p>
          <ul className="list-disc pl-5 space-y-1.5 font-mono text-[11px] text-foreground">
            <li><span className="text-muted-foreground">Hébergeur :</span> Vercel Inc. / Cloudflare Inc.</li>
            <li><span className="text-muted-foreground">Adresse :</span> 440 N Barranca Ave #4133, Covina, CA 91723, USA</li>
            <li><span className="text-muted-foreground">Protection des transferts :</span> Clauses contractuelles types approuvées par la Commission Européenne (Data Privacy Framework).</li>
          </ul>
        </div>
      </section>

      {/* 3. Propriété intellectuelle & Licences */}
      <section className="space-y-4 border-t border-border pt-8" id="propriete-intellectuelle">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <FileText className="h-5 w-5 text-primary" />
          <h2>3. Propriété intellectuelle &amp; Licences libres</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            Les codes sources des composants d&apos;interface, des packages CLI et des utilitaires sont publiés sous licence libre et permissive <strong className="text-foreground">MIT</strong>. Vous êtes libre de les copier, modifier, intégrer et distribuer dans vos projets personnels ou commerciaux sans frais de redevance.
          </p>
          <p>
            Les animations CSS sont adaptées sous licence libre FreeBSD (Animista). Les typographies distribuées reposent exclusivement sur des licences ouvertes de type SIL Open Font License 1.1 ou Apache 2.0.
          </p>
          <p>
            Les marques et logos tiers référencés au catalogue demeurent la propriété exclusive de leurs détenteurs légitimes et ne sont utilisés qu&apos;à titre d&apos;identification nominative (Fair Use).
          </p>
        </div>
      </section>

      {/* 4. Données personnelles et contact */}
      <section className="space-y-4 border-t border-border pt-8" id="donnees-contact">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Mail className="h-5 w-5 text-primary" />
          <h2>4. Données personnelles &amp; Contact DPO</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD 2016/679) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;opposition aux données vous concernant.
          </p>
          <p>
            Pour exercer ce droit ou pour toute question d&apos;ordre légal ou de conformité, contactez-nous par e-mail à : <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[11px] text-foreground">legal@liber-ui.dev</code>.
          </p>
        </div>
      </section>

      <div className="pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span>Dernière mise à jour : 13 novembre 2026</span>
        <div className="flex items-center gap-3">
          <Link href="/legal/terms" className="hover:text-foreground underline transition-colors">
            Conditions générales
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

