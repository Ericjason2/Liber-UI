# 📘 Document d'Évolution et Guide Utilisateur Complet – Liber UI

**Date de mise à jour :** Novembre 2026  
**Nom du projet :** **Liber UI** (initialement désigné comme *« la librairie »* dans le cahier des charges)  
**Organisation npm :** `@liber-ui` (`@liber-ui/cli`, `@liber-ui/react`, `@liber-ui/svg`, `@liber-ui/core`)  
**Application Web & Registry :** `https://liber-ui-delta.vercel.app`  
**Licence du code :** MIT

---

## Table des matières

1. [Introduction et Vision du Projet](#1-introduction-et-vision-du-projet)
2. [Ce qui a déjà été implémenté (État des lieux complet)](#2-ce-qui-a-déjà-été-implémenté-état-des-lieux-complet)
3. [Ce qui a changé par rapport au Cahier des Charges initial](#3-ce-qui-a-changé-par-rapport-au-cahier-des-charges-initial)
4. [Installation et Configuration Globale (Pour les Utilisateurs & Développeurs)](#4-installation-et-configuration-globale-pour-les-utilisateurs--développeurs)
5. [Guide d'Utilisation Détaillé Section par Section](#5-guide-dutilisation-détaillé-section-par-section)
   - [5.1. Accueil & Recherche Globale (`/` et `Ctrl + K`)](#51-accueil--recherche-globale--et-ctrl--k)
   - [5.2. Section Logos de Marques & Technologies (`/logos` et `/logos/[slug]`)](#52-section-logos-de-marques--technologies-logos-et-logosslug)
   - [5.3. Section Animations CSS & Tailwind (`/animations`)](#53-section-animations-css--tailwind-animations)
   - [5.4. Section Composants UI (`/components`)](#54-section-composants-ui-components)
   - [5.5. Section Thèmes & Palettes de Couleurs (`/themes`)](#55-section-thèmes--palettes-de-couleurs-themes)
   - [5.6. Section Polices & Typographies (`/fonts` et `/fonts/[slug]`)](#56-section-polices--typographies-fonts-et-fontsslug)
   - [5.7. Section Documentation Interactive (`/docs`)](#57-section-documentation-interactive-docs)
   - [5.8. Section Cadre Légal, Marques & Retrait (`/legal`)](#58-section-cadre-légal-marques--retrait-legal)
6. [Architecture Technique & Commandes pour les Contributeurs](#6-architecture-technique--commandes-pour-les-contributeurs)

---

## 1. Introduction et Vision du Projet

**Liber UI** est un catalogue gratuit et open-source de ressources pour développeurs front-end, designers UI/UX et créateurs de produits numériques. Conçu sur le modèle de `shadcn/ui` et `lucide.dev`, il réunit en une seule plateforme et un seul système d'installation **cinq grandes familles de ressources** :

1. **Logos (`/logos`)** : Logos vectoriels officiels de technologies, langages, frameworks et outils.
2. **Animations (`/animations`)** : Animations CSS `@keyframes` et configurations Tailwind CSS accélérées matériellement (GPU).
3. **Composants (`/components`)** : Primitives d'interface utilisateur accessibles et interactives.
4. **Thèmes (`/themes`)** : Palettes de couleurs modernes vérifiées au contraste WCAG AA/AAA et exportables en variables CSS / Tailwind.
5. **Polices (`/fonts`)** : Catalogue massif de typographies 100 % gratuites et libres de droits avec aperçu dynamique et auto-hébergement.

### Les 3 piliers fondamentaux respectés :
- **Copier-Coller en 1 clic** : Récupération instantanée du code SVG, JSX, CSS ou Tailwind depuis le navigateur sans installation.
- **Téléchargement direct** : Fichiers `.svg`, `.png` multi-tailles (`64px` à `512px`), `.json` (palettes) et archives `.zip` (polices `.ttf`/`.otf`).
- **Import via CLI & Packages npm** : Installation directe dans le code source du projet via `@liber-ui/cli`, `shadcn add` ou import ES module depuis `@liber-ui/react` / `@liber-ui/svg`.

---

## 2. Ce qui a déjà été implémenté (État des lieux complet)

### 2.1. Tableau comparatif : Objectifs Cahier des Charges (MVP) vs Implémentation Actuelle

| Domaine / Famille | Prévu au Cahier des Charges (MVP) | Implémenté dans Liber UI | Statut |
| :--- | :--- | :--- | :--- |
| **Identité & Nom** | À choisir avant la phase 1 (« la librairie ») | **Liber UI** (`@liber-ui/*`) | ✅ Déployé |
| **Logos** | 150 logos (`color`, `mono`, `wordmark`) | **150 logos vectoriels officiels** optimisés SVGO + composants React + PNG | ✅ 100 % |
| **Polices (Fonts)** | 20 polices libres | **7 382+ polices gratuites** classées A–Z et par thèmes/sous-thèmes + Live Preview | 🚀 Dépassé (×369) |
| **Thèmes de couleurs** | 12 thèmes vérifiés WCAG AA | **760+ palettes de couleurs** (77 thèmes de base + 684 palettes Color Hunt) WCAG AA/AAA | 🚀 Dépassé (×63) |
| **Animations / Blocs** | 30 blocs de page | Remplacé par **24 animations CSS & Tailwind interactives** (inspirées d'Animista) | 🔄 Évolué & Complété |
| **Composants UI** | 20 composants shadcn enrichis | **10 composants UI maîtres** interactifs avec bascule Preview / Code | ✅ Opérationnel |
| **Packages npm** | `@nom/core`, `@nom/svg`, `@nom/react`, `@nom/cli` | `@liber-ui/core`, `@liber-ui/svg`, `@liber-ui/react`, `@liber-ui/cli` (v0.1.1) | ✅ Publiés |
| **Registry shadcn** | Fichiers JSON statiques dans `/r/*.json` | **171 entrées de registry** générées automatiquement + `index.json` & `registry.json` | ✅ 100 % |
| **Recherche globale** | MiniSearch côté client (`Ctrl/Cmd + K`) | **Command Palette (`Ctrl+K`)** avec MiniSearch flou sur toutes les familles | ✅ 100 % |
| **Cadre juridique** | `LICENSE`, `TAKEDOWN.md`, `/legal`, chartes marques | `LICENSE` (MIT), `TAKEDOWN.md` (SLA 7 jours), `THIRD_PARTY_NOTICES.md`, `/legal` | ✅ 100 % |

---

### 2.2. Détail des fonctionnalités techniques implémentées

#### A. Monorepo & Pipeline de Build Automatisé (`scripts/`)
- **Validation stricte par Zod (`scripts/validate.ts` & `scripts/lib/schema.ts`)** :
  - Vérifie l'intégrité des métadonnées (`slug`, `kind`, `name`, `description`, `license`, `author`, `brandGuidelinesUrl`, `source`).
  - **Sécurité SVG automatique** : Rejette tout SVG contenant des balises `<script>`, `<foreignObject>`, des gestionnaires d'événements inline (`onload`, `onclick`...) ou des ressources externes, et contrôle la taille des fichiers.
- **Optimisation & Génération (`scripts/generate.ts`)** :
  - **SVGO (`optimize-svg.ts`)** : Nettoie les SVG, conserve le `viewBox`, préfixe les IDs avec le `slug` pour éviter toute collision DOM, injecte `role="img"` et `<title>`, et force `currentColor` sur toutes les variantes monochromes (`mono.svg`).
  - **SVGR (`build-react.ts`)** : Génère automatiquement les composants React TypeScript (`<ReactColor />`, `<GithubMono />`, `<DockerWordmark />`) dans `packages/react/src/components/` avec support des props `size`, `color`, `title` et `...props` (`SVGProps<SVGSVGElement>`).
  - **Registry Builder (`build-registry.ts`)** : Génère automatiquement tous les manifestes JSON dans `apps/web/public/r/<slug>.json`, compatibles à la fois avec `npx @liber-ui/cli add` et `npx shadcn add`.
  - **Contrôle WCAG des thèmes (`check-themes.ts`)** : Calcule et valide les ratios de contraste texte/fond selon les normes d'accessibilité WCAG AA et AAA.

#### B. Les 4 Packages du Monorepo (`packages/`)
1. **`@liber-ui/core` (v0.1.1)** : Contient l'index agrégé `index.json`, les statistiques du catalogue et tous les schémas/types TypeScript (`ResourceMeta`, `LogoMeta`, `FontMeta`, `ThemeMeta`, `CatalogIndex`).
2. **`@liber-ui/svg` (v0.1.1)** : Contient les 150 dossiers de logos SVG bruts optimisés (`color.svg`, `mono.svg`, `wordmark.svg`), utilisables dans n'importe quel framework (HTML, Vue, Svelte, Astro, Angular).
3. **`@liber-ui/react` (v0.1.1)** : Librairie de composants React tree-shakeable (`sideEffects: false`, moins de 2 Ko par icône importée), compilée en ESM avec définitions TypeScript `.d.ts`.
4. **`@liber-ui/cli` (v0.1.1)** : CLI officielle exécutable via `npx @liber-ui/cli` (ou la commande `liber`), implémentant les 5 commandes du cahier des charges (`init`, `add`, `search`, `view`, `diff`) avec protection contre l'écriture hors du répertoire projet (*path traversal protection*), mode `--dry-run`, `--force`, `--out`, `--format` et `--variant`.

#### C. Le Site Web Next.js (`apps/web/`)
- **Design System & Thème Nocturne (`Midnight Slate`)** :
  - Interface épurée construite avec Next.js (App Router), Tailwind CSS et Lucide Icons.
  - Mode Clair (`#FFFFFF` / `#F8FAFC`) et Mode Sombre profond **Midnight Slate** (`#0B0F17` / `#111827`) qui suit les préférences système (`prefers-color-scheme`) avec bascule manuelle persistée dans `localStorage`.
- **Pages complètes implémentées** :
  - `/` : Page d'accueil avec Hero, barre de recherche `Ctrl+K`, `InstallStrip` multi-gestionnaires (`pnpm`, `npm`, `yarn`, `bun`), cartes des 5 familles, section *Recently Added*, et testeur interactif `ThemeLivePreview`.
  - `/logos` & `/logos/[slug]` : Catalogue de 150 logos avec filtres par catégorie, index alphabétique A–Z, bascule globale `Color / Monochrome / Wordmark`, copie SVG/JSX en 1 clic, et fiche détaillée avec fond clair/sombre, curseur de taille (`16px` à `256px`), sélecteur de couleur pour le mode `mono`, et export PNG (`64px`, `128px`, `256px`, `512px`) par rendu Canvas HTML5.
  - `/animations` (et alias `/blocks`) : Studio interactif de 24 animations CSS & Tailwind avec contrôleur de vitesse (`0.5x`, `1x`, `2x`), déclenchement au clic/replay, et copie du code CSS ou Tailwind.
  - `/components` : Galerie interactive de 10 composants UI essentiels avec états fonctionnels en direct et vue code JSX.
  - `/themes` : Explorateur de plus de 760 palettes de couleurs inspiré de Coolors, avec recherche sémantique bilingue FR/EN, mode aléatoire par barre d'espace (`Spacebar`), copie HEX par bande, et export CSS/Tailwind/JSON.
  - `/fonts` & `/fonts/[slug]` : Explorateur typographique de plus de 7 382 polices gratuites avec index A–Z, filtres par thèmes et sous-thèmes, testeur de texte dynamique via l'API `/api/font-preview`, table complète des caractères (*Character Map*), bandes d'alphabet en direct et guide d'installation.
  - `/docs` : Documentation utilisateur complète avec sommaire latéral dynamique (*Scrollspy*), sélecteur de gestionnaire de paquets et exemples de code copiables.
  - `/legal` : Mentions légales sur les marques déposées, licences open-source (MIT, SIL OFL 1.1, Apache 2.0) et procédure de retrait sous 7 jours (`TAKEDOWN`).
  - `/sign-in`, `/sign-up`, `/forgot-password`, `/verify-email` : Pages d'interface d'authentification prêtes à l'emploi.

---

## 3. Ce qui a changé par rapport au Cahier des Charges initial

Au fil du développement et des retours d'expérience utilisateur, plusieurs évolutions stratégiques ont été apportées par rapport au document initial :

### Changement n°1 : Remplacement des « Blocs de page » par les « Animations CSS & Tailwind » (`/animations`)
- **Dans le cahier des charges initial :** Il était prévu de coder 30 blocs statiques de landing page (Hero, Pricing, Footer...) rendus dans des iframes.
- **Ce qui a été changé :** La section **Blocks** a été remplacée par une section **Animations CSS & Tailwind** (`/animations`) inspirée d'[Animista](https://animista.net/).
- **Pourquoi ce changement :** Les animations `@keyframes` prêtes à l'emploi (entrées, sorties, textes, effets d'attention, arrière-plans animés) apportent une valeur immédiate sans imposer une structure HTML rigide, tout en garantissant zéro dépendance JavaScript. La route `/blocks` a été conservée et redirige directement vers `/animations` pour assurer la rétrocompatibilité.

### Changement n°2 : Passage de 20 polices à un catalogue de 7 382+ polices gratuites avec Live Preview
- **Dans le cahier des charges initial :** Seulement 20 polices issues de Fontsource étaient prévues, avec un simple texte statique.
- **Ce qui a été changé :**
  1. Le catalogue a été étendu à **plus de 7 382 polices 100 % gratuites** (SIL OFL, Apache 2.0, Domaine Public).
  2. Ajout d'une classification par **6 grands thèmes et 25 sous-thèmes authentiques** (`Basic`, `Fancy`, `Script`, `Techno`, `Gothic`, `Bitmap`) ainsi qu'un **index alphabétique A–Z**.
  3. Création d'un **moteur d'aperçu vectoriel en temps réel (`/api/font-preview`)** : lorsque l'utilisateur saisit son propre texte dans le champ de test, l'API génère dynamiquement l'image PNG du texte rendu dans la police exacte, avec mise en cache CDN de 24h.
  4. Ajout sur chaque page `/fonts/[slug]` de la **table complète des glyphes (Character Map)**, des bandes d'alphabet majuscules/minuscules/chiffres/symboles, de la matrice Unicode, et du bouton de téléchargement direct `.zip`.

### Changement n°3 : Passage de 12 thèmes à 760+ palettes de couleurs & Recherche Sémantique Bilingue (FR/EN)
- **Dans le cahier des charges initial :** 12 thèmes de couleurs étaient prévus avec un simple aperçu statique.
- **Ce qui a été changé :**
  1. Intégration de **77 thèmes de base** + **684 palettes populaires Color Hunt** (soit plus de **760 palettes** vérifiées WCAG AA/AAA).
  2. Adoption d'un affichage interactif à **5 bandes verticales façon Coolors** : cliquer sur n'importe quelle bande copie immédiatement son code HEX.
  3. Ajout de la fonctionnalité **Shuffle (`Barre d'espace`)** permettant de découvrir une palette au hasard à tout moment.
  4. Création d'un **dictionnaire de recherche sémantique bilingue Français / Anglais (`THEME_SYNONYMS`)** : un utilisateur francophone peut taper *« médecine »*, *« santé »*, *« hôpital »*, *« nature »*, *« forêt »*, *« luxe »*, *« mer »*, *« chaud »*, *« froid »*, *« nuit »* ou *« minimal »* et obtenir instantanément les palettes correspondantes.

### Changement n°4 : Verrouillage du Thème de l'Application sur Neutral & Geist + Nouveau Dark Mode « Midnight Slate »
- **Dans le cahier des charges initial :** Un sélecteur global dans la barre de navigation devait changer la police et la couleur de tout le site web.
- **Ce qui a été changé :**
  - L'interface de l'application web est désormais volontairement verrouillée sur la police **Geist / Geist Mono** et le thème **Neutral**, afin que l'interface reste toujours neutre, lisible et ne fausse jamais le jugement visuel des couleurs de logos ou des palettes consultées.
  - Le mode sombre a été entièrement retravaillé en **Midnight Slate (`#0B0F17` / `#111827`)** au lieu d'un noir pur agressif, offrant une profondeur visuelle multicouche haut de gamme.
  - La prévisualisation dynamique des thèmes sur des composants UI reste disponible dans la section dédiée **« Try a theme live » (`ThemeLivePreview`)** sur la page d'accueil.

### Changement n°5 : Purge stricte des logos tracés à la main au profit de 150 SVG 100 % officiels
- **Dans le cahier des charges initial :** Il était envisagé d'inclure 15 services africains en phase 7 *« sous réserve de chartes accessibles »*, tout en imposant la règle stricte : *« aucun logo redessiné à l'approximation »*.
- **Ce qui a été changé :** Après un premier lot d'intégration, tous les logos qui avaient dû être tracés manuellement faute de source vectorielle officielle ont été retirés pour respecter scrupuleusement la règle d'authenticité du cahier des charges. Le catalogue conserve **exactement 150 logos vectoriels 100 % officiels** (`26` Frontend, `28` Backend & DB, `28` Cloud & DevOps, `25` Languages, `43` Tools & Design), complétés par un **filtre alphabétique A–Z** et une suppression du téléchargement `.zip` global pour privilégier le téléchargement unitaire ou l'installation par CLI.

### Changement n°6 : Déploiement sur Vercel & Workspaces npm
- **Dans le cahier des charges initial :** Hébergement statique prévu sur Cloudflare Pages + pnpm.
- **Ce qui a été changé :** Le monorepo utilise **npm Workspaces (`npm@11.14.0`) + Turborepo** et est déployé sur **Vercel (`liber-ui-delta.vercel.app`)**, ce qui permet de servir à la fois les pages statiques ultra-rapides, les fichiers du registry `/r/*.json` et la route API serverless `/api/font-preview` pour le rendu dynamique des 7 382 polices.

---

## 4. Installation et Configuration Globale (Pour les Utilisateurs & Développeurs)

Un utilisateur dispose de **3 méthodes principales** pour installer les ressources de Liber UI dans son propre projet (React, Next.js, Vite, Vue, Svelte, HTML, etc.).

### Méthode 1 : Utiliser la CLI officielle `@liber-ui/cli` (Recommandé)

Aucune installation globale n'est nécessaire. Vous pouvez exécuter la CLI directement avec votre gestionnaire de paquets préféré :

```bash
# Avec npm
npx @liber-ui/cli add <slug>

# Avec pnpm
pnpm dlx @liber-ui/cli add <slug>

# Avec yarn
yarn dlx @liber-ui/cli add <slug>

# Avec bun
bunx @liber-ui/cli add <slug>
```

#### Toutes les commandes de `@liber-ui/cli` :

| Commande | Description | Exemple d'utilisation |
| :--- | :--- | :--- |
| `init` | Crée un fichier de configuration `liber.json` à la racine de votre projet | `npx @liber-ui/cli init` |
| `add <slug...>` | Installe une ou plusieurs ressources (logo, police, thème, composant) dans votre projet | `npx @liber-ui/cli add react docker typescript` |
| `search <mot>` | Recherche une ressource dans le catalogue directement depuis le terminal | `npx @liber-ui/cli search postgres` |
| `view <slug>` | Affiche les métadonnées, dépendances et fichiers d'une ressource avant de l'installer | `npx @liber-ui/cli view react` |
| `diff <slug>` | Compare vos fichiers locaux avec la dernière version disponible sur le registry Liber UI | `npx @liber-ui/cli diff react` |

#### Options avancées de la commande `add` :
- `--variant color|mono|wordmark` : Choisit la variante du logo (par défaut : `color`).
- `--format react|svg` : Installe soit un composant React `.tsx`, soit un fichier `.svg` brut (par défaut : `react`).
- `--out <dossier>` : Définit le dossier de destination (par défaut : `src/components/ui/logos`).
- `--dry-run` : Simule l'installation et affiche les fichiers qui seraient créés sans rien écrire sur le disque.
- `--force` : Écrase les fichiers existants sans bloquer.

#### Fichier de configuration `liber.json` (généré par `init`) :
```json
{
  "$schema": "https://liber-ui-delta.vercel.app/schema.json",
  "format": "react",
  "variant": "color",
  "outDir": "src/components/ui/logos",
  "registryUrl": "https://liber-ui-delta.vercel.app/r"
}
```

---

### Méthode 2 : Utiliser la CLI standard `shadcn`

Comme le registry de Liber UI respecte le standard JSON de `shadcn/ui`, tout projet utilisant déjà `shadcn` peut installer n'importe quelle ressource directement via son URL de registry :

```bash
npx shadcn@latest add https://liber-ui-delta.vercel.app/r/react.json
npx shadcn@latest add https://liber-ui-delta.vercel.app/r/font-geist.json
```

---

### Méthode 3 : Installer les packages npm (`@liber-ui/react` ou `@liber-ui/svg`)

Si vous préférez importer les logos comme une librairie npm classique (avec tree-shaking automatique) :

```bash
# Pour les projets React / Next.js
npm install @liber-ui/react

# Pour les fichiers SVG bruts (Vue, Svelte, Astro, HTML...)
npm install @liber-ui/svg
```

---

## 5. Guide d'Utilisation Détaillé Section par Section

Voici comment un utilisateur navigue, configure, télécharge et intègre chaque section du site **Liber UI**.

---

### 5.1. Accueil & Recherche Globale (`/` et `Ctrl + K`)

1. **Barre de recherche rapide (`CommandPalette`)** :
   - Cliquez sur la barre de recherche centrale ou appuyez à tout moment sur **`Ctrl + K`** (ou **`Cmd + K`** sur Mac).
   - Tapez un mot-clé (ex. `docker`, `shimmer`, `button`, `ocean`, `minecraft`) : la recherche tolère les fautes de frappe (fuzzy search) et filtre instantanément parmi les **Logos**, **Animations**, **Composants**, **Thèmes** et **Polices**.
   - **Raccourcis clavier dans la palette** :
     - `↑` / `↓` : Naviguer entre les résultats.
     - `Entrée` (`↵`) : Ouvrir directement la fiche ou la section de la ressource.
     - **`Tab`** : Copier instantanément la commande CLI `npx @liber-ui/cli add <slug>` dans le presse-papiers sans quitter la page !
     - `Échap` (`ESC`) : Fermer la fenêtre de recherche.
2. **Bandeau d'installation rapide (`InstallStrip`)** :
   - Permet de basculer entre `pnpm`, `npm`, `yarn` et `bun` et de copier la commande d'installation en un clic.
3. **Aperçu de thème en direct (`Try a theme live`)** :
   - En bas de la page d'accueil, cliquez sur l'une des palettes proposées pour voir une carte de statistique, un champ de saisie et un bouton d'action s'adapter en temps réel aux couleurs du thème sélectionné.

---

### 5.2. Section Logos de Marques & Technologies (`/logos` et `/logos/[slug]`)

#### A. Explorer et filtrer sur `/logos`
1. **Filtres par Catégorie** : Cliquez sur les pastilles en haut (`All Logos (150)`, `Front-end (26)`, `Back-end & DB (28)`, `Cloud & DevOps (28)`, `Languages (25)`, `Tools & Design (43)`).
2. **Recherche textuelle** : Cherchez par nom, slug, alias ou tag (ex. taper `k8s` trouve `Kubernetes`, taper `db` trouve `PostgreSQL`, `MongoDB`, `Redis`...).
3. **Sélecteur de variante global** : Basculez entre **`Color`** (couleurs officielles), **`Monochrome`** (`currentColor` qui s'adapte au mode clair/sombre) et **`Wordmark`** (logo avec texte) pour prévisualiser toute la grille dans la variante choisie.
4. **Index alphabétique (`A–Z`)** : Cliquez sur une lettre de `A` à `Z` (ou `#`) pour filtrer les logos commençant par cette lettre.
5. **Actions rapides en 1 clic sur chaque carte** :
   - Bouton **`SVG`** : Copie le code vectoriel `<svg>...</svg>` optimisé directement dans votre presse-papiers.
   - Bouton **`JSX`** : Copie le composant React (ex. `<ReactColor size={28} />`).
   - Bouton **`Télécharger (Icône flèche)`** : Télécharge le fichier `.svg` sur votre ordinateur.

#### B. Personnaliser et exporter sur la fiche détaillée `/logos/[slug]`
En cliquant sur un logo (ex. `/logos/react` ou `/logos/docker`), vous accédez au studio d'inspection :
1. **Fond d'aperçu Clair / Sombre** : Cliquez sur l'icône Soleil/Lune en haut à droite du cadre d'aperçu pour tester le contraste du logo sur fond blanc ou sur fond noir.
2. **Curseur de taille (`Size`)** : Faites glisser le curseur de `16px` à `256px` pour vérifier la lisibilité du logo à différentes échelles.
3. **Sélecteur de couleur (`Color`) en mode Monochrome** : Lorsque la variante `mono` est sélectionnée, un sélecteur de couleur HEX apparaît. Choisissez par exemple `#3B82F6` : l'aperçu, le code SVG copié et les fichiers téléchargés prendront automatiquement cette couleur !
4. **Onglets de code (`REACT`, `SVG`, `CDN`, `CLI`)** :
   - **Onglet `REACT`** :
     ```tsx
     import { ReactColor, GithubMono, DockerWordmark } from "@liber-ui/react";

     export function TechStack() {
       return (
         <div className="flex items-center gap-4">
           <ReactColor size={32} />
           <GithubMono size={32} className="text-foreground hover:text-primary" />
           <DockerWordmark size={48} />
         </div>
       );
     }
     ```
   - **Onglet `SVG`** : Code SVG brut prêt à coller en HTML.
   - **Onglet `CDN`** : URL directe du manifeste JSON du registry (`https://liber-ui-delta.vercel.app/r/<slug>.json`).
   - **Onglet `CLI`** : `npx @liber-ui/cli add <slug>`.
5. **Téléchargement PNG multi-résolutions** : Sélectionnez la résolution souhaitée dans le menu déroulant (**`64×64 px`**, **`128×128 px`**, **`256×256 px`** ou **`512×512 px`**) puis cliquez sur **`Download PNG`**.

---

### 5.3. Section Animations CSS & Tailwind (`/animations`)

La page `/animations` propose **24 animations matérielles (GPU)** réparties en 6 catégories inspirées d'Animista :
- **Basic** (`Scale Up Center`, `Scale Down Center`, `Rotate Center`, `Flip Horizontal`, `Slide Top`, `Shadow Drop Center`)
- **Entrances** (`Scale In Center`, `Slide In Top`, `Slide In Bottom`, `Fade In`, `Bounce In Top`, `Roll In Left`)
- **Exits** (`Scale Out Center`, `Slide Out Top`, `Fade Out`)
- **Text** (`Tracking In Expand`, `TrackingIn Contract`, `Text Focus In`, `Text Blur Out`, `Text Shadow Pop`)
- **Attention** (`Heartbeat`, `Vibrate 1`, `Jello Horizontal`, `Wobble Hor Bottom`, `Shake Horizontal`, `Bounce Top`, `Pulsate Bck`, `Blink 1`)
- **Background** (`Ken Burns Top`, `Bg Pan Left`, `Color Change 2x`)

#### Comment tester et utiliser une animation :
1. **Contrôler la vitesse (`Speed`)** : En haut à droite de la page, cliquez sur **`0.5x`** (ralenti pour observer les détails), **`1x`** (vitesse normale) ou **`2x`** (accéléré).
2. **Rejouer l'animation** : Cliquez directement sur la zone d'aperçu de la carte ou sur le bouton de relecture **`↺`** en haut à droite de la carte.
3. **Choisir le format (`Pure CSS` ou `Tailwind`)** :
   - Cliquez sur **`Code`** pour dérouler et inspecter l'extrait directement dans la carte.
   - **Option A – Pure CSS** : Cliquez sur **`Copy CSS`** et collez le code dans votre fichier `globals.css` :
     ```css
     @keyframes scale-up-center {
       0% { transform: scale(0.5); }
       100% { transform: scale(1); }
     }

     .scale-up-center {
       animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
     }
     ```
   - **Option B – Tailwind CSS** : Basculez sur l'onglet **`Tailwind`**, puis cliquez sur **`Copy Tailwind`** pour obtenir à la fois la classe arbitraire prête à l'emploi (`animate-[scale-up-center_0.4s_cubic-bezier(0.39,0.575,0.565,1)_both]`) et l'extension `keyframes` pour `tailwind.config.js`.

---

### 5.4. Section Composants UI (`/components`)

La page `/components` présente **10 composants UI fondamentaux** entièrement interactifs :
1. **Button** (`button`) : Variantes *Primary*, *Secondary*, *Outline*, *Ghost* et *Destructive*.
2. **Input & Search Field** (`input`) : Champ de recherche avec icône et bouton d'effacement rapide.
3. **Stat Card** (`stat-card`) : Carte métrique avec indicateur d'évolution (`+24.8%`) et barre de progression de quota.
4. **Badge & Status Pill** (`badge-pill`) : Pastilles d'état avec point lumineux animé (*Operational*, *Degraded*, *Outage*, version).
5. **Segmented Tabs Control** (`tabs-control`) : Barre d'onglets segmentée interactive (*Overview*, *Analytics*, *Deployments*, *Settings*).
6. **Accordion & Collapsible** (`accordion-item`) : Panneau déroulant FAQ interactif.
7. **Avatar & User Stack** (`avatar-stack`) : Pile d'avatars d'équipe superposés avec compteur `+12`.
8. **Switch & Toggle** (`toggle-switch`) : Interrupteur booléen animé accessible au clavier.
9. **Alert & Callout Banner** (`alert-banner`) : Bannière d'alerte contextuelle refermable.
10. **Progress & Stepper Bar** (`progress-bar`) : Barre de progression dynamique avec boutons de test `-15%`, `+15%` et `Finish`.

#### Comment utiliser un composant :
- **Tester en direct** : Dans l'onglet **`Preview`**, interagissez directement avec le composant (tapez du texte, changez d'onglet, activez le switch, modifiez la barre de progression).
- **Copier le code JSX** : Basculez sur l'onglet **`Code`** en haut à droite de la carte, puis cliquez sur **`Copy JSX`**.
- **Installer via CLI** : Cliquez sur le bouton **`liber add <slug>`** en bas de la carte pour copier la commande :
  ```bash
  npx @liber-ui/cli add button
  ```

---

### 5.5. Section Thèmes & Palettes de Couleurs (`/themes`)

La page `/themes` donne accès à **plus de 760 palettes de couleurs** (chacune composée de 5 nuances harmonisées et d'un badge de contraste WCAG `AA` ou `AAA`).

#### Fonctionnalités pour l'utilisateur :
1. **Recherche Sémantique Bilingue (Français / Anglais)** :
   - Tapez un domaine métier, une ambiance ou une couleur dans la barre de recherche :
     - **Santé / Médical** : `médecine`, `santé`, `hôpital`, `pharmacie`, `clinic`, `medical`
     - **Nature / Écologie** : `nature`, `forêt`, `botanique`, `plante`, `bio`, `vert`
     - **Tech / Cyber** : `technologie`, `tech`, `cyber`, `code`, `neon`, `matrix`
     - **Luxe / Prestige** : `luxe`, `or`, `gold`, `prestige`, `elegant`
     - **Mer / Eau** : `mer`, `océan`, `eau`, `plage`, `bleu`
     - **Ambiances thermiques & lumineuses** : `chaud`, `soleil`, `sunset`, `feu`, `froid`, `hiver`, `sombre`, `nuit`, `noir`, `clair`, `blanc`, `minimal`
     - **Code couleur exact** : Tapez un code hexadécimal (ex. `#2563EB`).
2. **Mode Découverte Aléatoire (`Shuffle` / Touche `Espace`)** :
   - Appuyez sur la **barre d'espace (`Space`)** de votre clavier (ou cliquez sur le bouton **`Shuffle`**) : la page sélectionne une palette au hasard, défile automatiquement jusqu'à elle et la met en évidence.
3. **Copier une couleur individuelle (Façon Coolors)** :
   - Survolez l'une des 5 bandes verticales d'une palette et **cliquez dessus** : son code HEX (ex. `#1E293B`) est immédiatement copié dans votre presse-papiers.
4. **Exporter toute la palette (Barre d'outils en bas de chaque carte)** :
   - Bouton **`HEX`** : Copie la liste des 5 codes HEX séparés par des virgules (`#FFFFFF, #171717, ...`).
   - Bouton **`CSS`** : Copie les variables CSS prêtes à coller dans `:root` :
     ```css
     --color-1: #222831;
     --color-2: #393E46;
     --color-3: #00ADB5;
     --color-4: #EEEEEE;
     --color-5: #00FFF5;
     ```
   - Bouton **`Tailwind`** : Copie l'objet JSON `colors` prêt à étendre votre `tailwind.config.js`.
   - Bouton **`Télécharger (Icône flèche)`** : Télécharge le fichier complet `palette-<slug>.json` contenant les swatches, les tokens sémantiques et le ratio WCAG.

---

### 5.6. Section Polices & Typographies (`/fonts` et `/fonts/[slug]`)

La section `/fonts` permet de parcourir, tester et installer **plus de 7 382 polices gratuites** pour un usage personnel et commercial.

#### A. Navigation et test en direct sur `/fonts`
1. **Index Alphabétique (`A–Z`, `#`, `All`)** : Filtrez instantanément les polices par leur première lettre.
2. **Navigation par Thèmes et Sous-thèmes** :
   - Cliquez sur un thème principal pour afficher ses sous-thèmes dédiés :
     - **Basic** : *Sans serif*, *Serif*, *Fixed width*
     - **Fancy** : *Cartoon*, *Comic*, *Retro*, *Groovy*, *Horror*, *Western*, *Old School*, *Typewriter*, *Eroded*, *Distorted*
     - **Script** : *Calligraphy*, *Handwritten*, *Brush*, *Graffiti*
     - **Techno** : *Sci-fi*, *3D*, *Square*, *LCD*
     - **Gothic** : *Medieval*, *Modern*, *Celtic*
     - **Bitmap** : *Pixel*
3. **Testeur de texte en direct (`Live Text Tester`)** :
   - Saisissez n'importe quelle phrase dans le champ *« Type custom text to preview across all font specimens... »*.
   - Toutes les cartes de polices visibles mettent à jour leur aperçu graphique en temps réel avec votre propre texte !

#### B. Inspection approfondie et installation sur `/fonts/[slug]`
En cliquant sur une police (ou sur **`View Glyphs →`**), vous ouvrez sa page dédiée composée de **3 onglets** :

1. **Onglet 1 : `Live Specimen & Preview`**
   - Saisissez votre texte personnalisé ou cliquez sur l'un des **Presets** rapides.
   - Changez la taille de rendu en temps réel (**`24px`**, **`32px`**, **`48px`**, **`64px`**, **`72px`**, **`96px`**).
2. **Onglet 2 : `Character Map & Glyphs`**
   - Affiche la **planche complète des caractères (Character Map)** de l'auteur (majuscules, minuscules, chiffres, accents et symboles).
   - Affiche les **bandes d'alphabet rendues en direct** (`Uppercase A–Z`, `Lowercase a–z`, `Numerals 0–9`, `Punctuation & Special Symbols`).
   - Affiche la **matrice de référence Unicode** (`U+0041` à `U+007A`) pour vérifier chaque point de code ASCII.
3. **Onglet 3 : `Installation & CSS Code` (4 méthodes au choix)** :
   - **Méthode 1 – Installation automatique via Liber CLI** :
     ```bash
     npx @liber-ui/cli add font-geist
     ```
     *(Crée automatiquement le fichier de style CSS de la police dans votre projet).*
   - **Méthode 2 – Téléchargement direct de l'archive `.zip`** :
     Cliquez sur le bouton **`Download (.zip)`** en haut de la page pour récupérer les fichiers `.ttf` / `.otf` originaux.
   - **Méthode 3 – Auto-hébergement dans Next.js (`next/font/local`)** :
     Copiez l'extrait généré automatiquement pour votre fichier `app/layout.tsx` :
     ```tsx
     import localFont from 'next/font/local';

     const myFont = localFont({
       src: './fonts/ma-police/MaPolice-Regular.woff2',
       variable: '--font-ma-police',
       display: 'swap',
     });
     ```
   - **Méthode 4 – CSS Standard `@font-face` & Configuration Tailwind** :
     Copiez la règle `@font-face` et l'extension `fontFamily` pour `tailwind.config.js` en un clic.

---

### 5.7. Section Documentation Interactive (`/docs`)

La page `/docs` regroupe toute la documentation utilisateur sur une seule page fluide avec :
- **Table des matières latérale avec Scrollspy** : Met en surbrillance la section active au fur et à mesure du défilement (`Introduction`, `Quick Start & CLI`, `CLI Reference`, `Typography & Fonts`, `Brand & Tech Logos`, `Color Themes & WCAG`, `CSS & Tailwind Animations`, `Trademark Policy`).
- **Sélecteur de gestionnaire de paquets** : Adapte tous les exemples de commandes entre `pnpm`, `npm`, `yarn` et `bun`.

---

### 5.8. Section Cadre Légal, Marques & Retrait (`/legal`)

La page `/legal` (ainsi que le fichier `TAKEDOWN.md` à la racine du dépôt) garantit la conformité juridique du projet :
1. **Usage nominatif des marques (`Trademark Notice`)** : Rappelle que tous les logos restent la propriété exclusive de leurs détenteurs respectifs et ne doivent être utilisés que pour désigner la technologie (ex. pile technique d'un portfolio), sans jamais suggérer de parrainage officiel. Chaque fiche de logo renvoie vers la charte officielle (`Official brand guidelines`) et la source du fichier.
2. **Licences Open Source** : Code sous licence **MIT**, polices sous licences libres (**SIL OFL 1.1**, **Apache 2.0**, **Domaine Public**).
3. **Procédure de retrait sous 7 jours (`7-Day SLA Takedown`)** : Tout propriétaire de marque peut demander le retrait ou la mise à jour d'un logo via `takedown@liber.dev` (accusé de réception sous 2 jours ouvrés, retrait complet du site, du registry et des packages sous 7 jours).

---

## 6. Architecture Technique & Commandes pour les Contributeurs

Si vous souhaitez cloner le dépôt complet de **Liber UI**, ajouter de nouvelles ressources dans `content/` ou modifier le site web :

### Structure du Monorepo
```text
liber/
├── content/                  # Source de vérité des ressources
│   ├── logos/<slug>/         # meta.json + color.svg + mono.svg + wordmark.svg
│   └── fonts/<slug>/         # font.json + OFL.txt
├── packages/
│   ├── core/                 # @liber-ui/core (index.json + schémas Zod + types TS)
│   ├── svg/                  # @liber-ui/svg (fichiers SVG optimisés)
│   ├── react/                # @liber-ui/react (composants React générés)
│   └── cli/                  # @liber-ui/cli (CLI officielle : init, add, search, view, diff)
├── apps/
│   └── web/                  # Application Next.js (App Router) + Registry public (/public/r/)
└── scripts/                  # Scripts de validation (validate.ts) et de build (generate.ts)
```

### Commandes de développement local
Depuis le dossier `liber/` :

```bash
# 1. Installer toutes les dépendances des workspaces
npm install

# 2. Valider toutes les ressources (schémas Zod, licences et sécurité SVG)
npm run validate

# 3. Générer les SVG optimisés, les composants React, l'index et le registry /r/*.json
npm run generate

# 4. Lancer le serveur de développement du site web (http://localhost:3000)
npm run dev

# 5. Lancer le build complet de tous les packages et du site Next.js
npm run build

# 6. Exécuter les tests unitaires (Vitest) et les tests E2E (Playwright)
npm test
npm run test:e2e
```


---

## 7. Pistes d'Améliorations & Feuille de Route Future (Audit Multi-Plans)

Suite à l'audit technique complet du code actuel de **Liber UI**, voici les axes d'amélioration prioritaires pour faire passer le projet au niveau supérieur :

### 7.1. Performance & Architecture Front-End (Priorité Critique)
1. **Allègement du bundle client (~4,7 Mo de JSON actuellement embarqués)** :
   - *Constat* : `Navbar.tsx` → `CommandPalette.tsx` → `search.ts` → `catalog.ts` importe statiquement `scraped-fonts.json` (`4,07 Mo`) et `colorhunt-themes.json` (`503 Ko`) et exécute `miniSearch.addAll()` sur plus de 8 300 entrées au chargement initial de chaque page.
   - *Solution* : Charger l'index de recherche en *lazy-loading* uniquement à l'ouverture de `Ctrl + K` (ou via une route API `/api/search`), et découper `catalog.ts` par famille (`logos`, `themes`, `fonts`, `animations`, `components`).
2. **Pagination / Virtualisation sur `/themes`** :
   - *Constat* : Les 761 cartes de palettes (soit plus de 3 800 bandes de couleurs interactives) sont rendues simultanément dans le DOM sur `/themes`.
   - *Solution* : Ajouter une pagination progressive par lots de 36 palettes (« Load more palettes », comme sur `/fonts`) ou une virtualisation via `@tanstack/react-virtual`.
3. **Indépendance vis-à-vis des serveurs tiers (Dafont) pour `/api/font-preview`** :
   - *Constat* : Le générateur d'aperçu dynamique proxifie `img.dafont.com` et les liens `.zip` pointent vers `dl.dafont.com`.
   - *Solution* : Héberger les fichiers `.woff2` / `.zip` sur **Cloudflare R2** ou **Vercel Blob** et générer les aperçus vectoriels en interne via `opentype.js` ou `@resvg/resvg-js`.

### 7.2. Cohérence du Registry `/r/*.json` & de la CLI `@liber-ui/cli` (Priorité Haute)
1. **Étendre `scripts/generate.ts` à toutes les familles** :
   - Générer dans `apps/web/public/r/` les manifestes JSON pour les **10 composants UI** (`button.json`, `stat-card.json`...), les **24 animations** (`animation-<slug>.json`), les **thèmes** (`theme-<slug>.json`) et l'ensemble des **polices** (`font-<slug>.json`), afin qu'aucune commande `npx @liber-ui/cli add` copiée depuis le site ne retourne d'erreur 404.
2. **Finaliser les options avancées dans `packages/cli/src/index.ts`** :
   - Prendre en charge le filtrage effectif de `--variant <color|mono|wordmark>` et `--format <react|svg>` dans la commande `add`.
   - Implémenter la comparaison réelle de contenu fichier local vs registry distant dans la commande `liber diff <slug>`.
   - Harmoniser les dernières occurrences de `@liber/*` vers `@liber-ui/*` (`next.config.mjs`, `README.md` des packages et aide CLI).

### 7.3. Expérience Utilisateur (UX/UI) & Fonctionnalités
1. **Correction des ancres de la Recherche Globale (`search.ts`)** :
   - Faire pointer les résultats de polices vers `/fonts/${f.slug}` (fiche dédiée) au lieu de `/fonts#${f.slug}`.
   - Faire pointer les résultats de thèmes vers `/themes#palette-${t.slug}` pour correspondre à l'attribut `id="palette-${theme.slug}"` de `themes/page.tsx`.
2. **Code source complet pour les 10 Composants UI (`/components`)** :
   - Compléter `getComponentCode(slug)` dans `components/page.tsx` pour les 7 composants qui affichent actuellement un commentaire générique (`stat-card`, `badge-pill`, `tabs-control`, `accordion-item`, `avatar-stack`, `alert-banner`, `progress-bar`).
3. **Export « Full shadcn Theme (`:root` + `.dark`) » sur `/themes`** :
   - Permettre de copier en un clic un thème complet formaté pour `shadcn/ui` (`--background`, `--foreground`, `--primary`, `--card`, `--border`) en **HEX**, **HSL** ou **OKLCH**.
4. **Panier « My Stack » / Favoris** :
   - Permettre de sélectionner plusieurs logos, polices, animations et thèmes et de générer une commande CLI groupée unique (`npx @liber-ui/cli add react nextjs docker font-geist`) ou une archive `.zip` sur mesure.

### 7.4. SEO, Accessibilité & CI/CD
1. **Séparation Server / Client Components pour le SEO** :
   - Extraire la logique interactive des pages `/logos`, `/animations`, `/components`, `/themes`, `/fonts` et `/docs` dans des composants clients afin d'exporter `metadata` (`title`, `description`, `openGraph`) côté serveur sur chaque route, et ajouter `app/sitemap.ts` + `app/robots.ts`.
2. **Accessibilité (`prefers-reduced-motion`)** :
   - Ajouter le support de `motion-safe:` et `@media (prefers-reduced-motion: reduce)` dans les extraits d'animations CSS/Tailwind.
3. **Tests automatisés & CI** :
   - Ajouter des tests unitaires Vitest pour `@liber-ui/cli` et un test d'intégrité vérifiant que chaque commande CLI affichée dans l'UI possède son fichier `/r/<slug>.json`.
4. **Serveur MCP (`@liber-ui/mcp`)** :
   - Offrir un serveur *Model Context Protocol* permettant aux agents IA (Cursor, Claude Code, Antigravity) de rechercher et d'installer directement les ressources de Liber UI.
