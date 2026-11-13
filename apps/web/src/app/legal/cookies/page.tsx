"use client";

import React from "react";
import Link from "next/link";
import { Cookie, Sliders } from "lucide-react";

export default function CookiesPolicyPage() {
  const handleOpenCookieSettings = () => {
    window.dispatchEvent(new CustomEvent("liber:open-cookie-settings"));
  };

  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      <div className="space-y-3 pb-6 border-b border-border">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono bg-muted text-muted-foreground border border-border">
          <Cookie className="h-3.5 w-3.5 text-primary" />
          <span>Vie Privée &amp; Traceurs</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Politique relative aux Cookies &amp; Traceurs
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Transparence complète sur les technologies de stockage local et cookies utilisés sur la plateforme Liber UI, conformément aux directives de la CNIL et au RGPD.
        </p>
      </div>

      {/* Bouton de configuration directe */}
      <div className="p-4 sm:p-5 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sliders className="h-4 w-4 text-primary" />
            Gérer vos choix de cookies à tout moment
          </h2>
          <p className="text-xs text-muted-foreground">
            Vous pouvez modifier ou retirer votre consentement à tout instant d&apos;un simple clic.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenCookieSettings}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity shadow-sm shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Personnaliser mes cookies
        </button>
      </div>

      {/* 1. Qu'est-ce qu'un cookie ? */}
      <section className="space-y-4" id="definition">
        <h2 className="text-base font-semibold text-foreground">
          1. Qu&apos;est-ce qu&apos;un cookie ou un stockage local ?
        </h2>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette ou smartphone) lors de la consultation d&apos;un service en ligne. Le stockage local (LocalStorage / SessionStorage) est une technologie équivalente permettant de mémoriser des données côté client sans transmission automatique au serveur lors de chaque requête HTTP.
          </p>
          <p>
            Sur Liber UI, nous privilégions le <strong className="text-foreground">LocalStorage</strong> local pour enregistrer vos préférences d&apos;interface (thème sombre, choix de gestionnaire de paquets pnpm/npm) de manière strictement confidentielle et sécurisée sur votre propre appareil.
          </p>
        </div>
      </section>

      {/* 2. Tableau des traceurs utilisés */}
      <section className="space-y-4 border-t border-border pt-8" id="tableau-cookies">
        <h2 className="text-base font-semibold text-foreground">
          2. Détail des cookies et données stockées
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-foreground font-semibold">
              <tr>
                <th className="p-3">Clé / Nom</th>
                <th className="p-3">Finalité</th>
                <th className="p-3">Type</th>
                <th className="p-3">Durée</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground font-mono text-[11px]">
              <tr>
                <td className="p-3 text-foreground font-semibold">theme</td>
                <td className="p-3 font-sans">Mémorise votre choix de mode d&apos;affichage (sombre ou clair).</td>
                <td className="p-3">LocalStorage (Essentiel)</td>
                <td className="p-3">Persistant</td>
              </tr>
              <tr>
                <td className="p-3 text-foreground font-semibold">liber_cookie_consent</td>
                <td className="p-3 font-sans">Enregistre votre décision de consentement RGPD (acceptation, refus).</td>
                <td className="p-3">LocalStorage (Essentiel)</td>
                <td className="p-3">6 mois</td>
              </tr>
              <tr>
                <td className="p-3 text-foreground font-semibold">preferred_pm</td>
                <td className="p-3 font-sans">Retient votre gestionnaire de paquets favori (pnpm, npm, yarn, bun) pour les commandes CLI.</td>
                <td className="p-3">LocalStorage (Fonctionnel)</td>
                <td className="p-3">Persistant</td>
              </tr>
              <tr>
                <td className="p-3 text-foreground font-semibold">_edge_perf</td>
                <td className="p-3 font-sans">Mesure agrégée et anonyme du temps de réponse du réseau Edge CDN (facultatif).</td>
                <td className="p-3">Cookie First-Party</td>
                <td className="p-3">13 mois</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Cookies tiers et traceurs publicitaires */}
      <section className="space-y-4 border-t border-border pt-8" id="tiers">
        <h2 className="text-base font-semibold text-foreground">
          3. Pas de traceurs publicitaires tiers
        </h2>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            Liber UI n&apos;intègre aucun réseau de régie publicitaire, aucun pixel de reciblage (retargeting Facebook, Google Ads, TikTok) ni aucun traceur inter-sites.
          </p>
          <p>
            Vos données de navigation ne sont jamais commercialisées, louées ni transmises à des tiers à des fins de profilage marketing.
          </p>
        </div>
      </section>

      {/* 4. Durée de validité du consentement */}
      <section className="space-y-4 border-t border-border pt-8" id="duree">
        <h2 className="text-base font-semibold text-foreground">
          4. Durée de validité du choix
        </h2>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            Conformément aux recommandations de la CNIL, votre choix (consentement ou refus) est conservé pour une durée maximale de <strong className="text-foreground">6 mois</strong>. À l&apos;issue de ce délai, le bandeau de consentement vous sera à nouveau présenté.
          </p>
        </div>
      </section>

      <div className="pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span>Mise à jour : Novembre 2026</span>
        <div className="flex items-center gap-3">
          <Link href="/legal/mentions-legales" className="hover:text-foreground underline transition-colors">
            Mentions légales
          </Link>
          <span>•</span>
          <Link href="/legal/terms" className="hover:text-foreground underline transition-colors">
            Conditions générales
          </Link>
        </div>
      </div>
    </div>
  );
}

