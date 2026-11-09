import { type NextRequest, NextResponse } from "next/server";
import {
  OFFICIAL_LOGOS,
  SAMPLE_FONTS,
  SAMPLE_THEMES,
  SAMPLE_COMPONENTS,
  SAMPLE_ANIMATIONS,
} from "@/lib/catalog";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug: rawParam } = await context.params;
  const cleanSlug = rawParam.replace(/\.json$/i, "").trim().toLowerCase();

  // 1. Check Fonts (font-<slug> or <slug>)
  const fontCandidateSlug = cleanSlug.startsWith("font-")
    ? cleanSlug.replace(/^font-/, "")
    : cleanSlug;
  const fontMatch = SAMPLE_FONTS.find((f) => f.slug.toLowerCase() === fontCandidateSlug);
  if (fontMatch && (cleanSlug.startsWith("font-") || !OFFICIAL_LOGOS.some((l) => l.slug === cleanSlug))) {
    const fallbackStack =
      fontMatch.category === "mono"
        ? "monospace"
        : fontMatch.category === "serif"
          ? "serif"
          : "sans-serif";
    const cssContent = `/* Liber UI Font Definition: ${fontMatch.name} (${fontMatch.license}) */
/* Direct CDN Import: @import url('https://liber-ui-delta.vercel.app/api/font-css/${fontMatch.slug}'); */
@font-face {
  font-family: '${fontMatch.name}';
  src: local('${fontMatch.name}'),
       url('https://liber-ui-delta.vercel.app/api/font-file/${fontMatch.slug}.ttf') format('truetype'),
       url('/fonts/${fontMatch.slug}/${fontMatch.name.replace(/\s+/g, "-")}-Regular.woff2') format('woff2'),
       url('/fonts/${fontMatch.slug}/${fontMatch.name.replace(/\s+/g, "-")}-Regular.ttf') format('truetype');
  font-weight: ${fontMatch.weights?.[0] || 400};
  font-style: normal;
  font-display: swap;
}

:root {
  --font-${fontMatch.slug}: '${fontMatch.name}', ${fallbackStack};
}

.font-${fontMatch.slug} {
  font-family: '${fontMatch.name}', ${fallbackStack};
}
`;
    return NextResponse.json({
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: `font-${fontMatch.slug}`,
      type: "registry:font",
      title: fontMatch.name,
      description: fontMatch.description,
      author: fontMatch.author || "Liber UI",
      categories: [fontMatch.theme || fontMatch.category || "basic"],
      files: [
        {
          path: `styles/fonts/${fontMatch.slug}.css`,
          content: cssContent,
          type: "registry:style",
        },
      ],
      meta: {
        kind: "font",
        license: fontMatch.license,
        weights: fontMatch.weights,
        downloadUrl: fontMatch.downloadUrl,
      },
    });
  }

  // 2. Check Themes (theme-<slug> or <slug>)
  const themeCandidateSlug = cleanSlug.startsWith("theme-")
    ? cleanSlug.replace(/^theme-/, "")
    : cleanSlug;
  const themeMatch = SAMPLE_THEMES.find((t) => t.slug.toLowerCase() === themeCandidateSlug);
  if (themeMatch && (cleanSlug.startsWith("theme-") || !OFFICIAL_LOGOS.some((l) => l.slug === cleanSlug))) {
    const cssContent = `/* Liber UI Theme: ${themeMatch.name} (WCAG ${themeMatch.wcagLevel} - ${themeMatch.contrastRatio}) */
:root {
  --background: ${themeMatch.tokens?.background || themeMatch.swatches[0]};
  --foreground: ${themeMatch.tokens?.foreground || themeMatch.swatches[1]};
  --primary: ${themeMatch.tokens?.primary || themeMatch.swatches[2]};
  --muted: ${themeMatch.tokens?.muted || themeMatch.swatches[3]};
  --accent: ${themeMatch.tokens?.accent || themeMatch.swatches[4]};
  --card: ${themeMatch.tokens?.card || themeMatch.swatches[0]};
  --border: ${themeMatch.tokens?.border || themeMatch.swatches[3]};
  --color-1: ${themeMatch.swatches[0]};
  --color-2: ${themeMatch.swatches[1]};
  --color-3: ${themeMatch.swatches[2]};
  --color-4: ${themeMatch.swatches[3]};
  --color-5: ${themeMatch.swatches[4]};
}
`;
    return NextResponse.json({
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: `theme-${themeMatch.slug}`,
      type: "registry:theme",
      title: themeMatch.name,
      description: themeMatch.description,
      author: themeMatch.author || "Liber UI",
      categories: [themeMatch.category],
      files: [
        {
          path: `styles/themes/${themeMatch.slug}.css`,
          content: cssContent,
          type: "registry:style",
        },
      ],
      meta: {
        kind: "theme",
        swatches: themeMatch.swatches,
        contrastRatio: themeMatch.contrastRatio,
        wcagLevel: themeMatch.wcagLevel,
      },
    });
  }

  // 3. Check Animations (animation-<slug>, anim-<slug>, or <slug>)
  const animCandidateSlug = cleanSlug.replace(/^(animation-|anim-)/, "");
  const animMatch = SAMPLE_ANIMATIONS.find((a) => a.slug.toLowerCase() === animCandidateSlug);
  if (animMatch) {
    const cssContent = `/* Liber UI Animation: ${animMatch.name} (${animMatch.category}) */\n${animMatch.cssKeyframes}\n\n@media (prefers-reduced-motion: no-preference) {\n  ${animMatch.cssClasses.replace(/\n/g, "\n  ")}\n}\n\n/* Tailwind arbitrary class: motion-safe:${animMatch.tailwindClasses} */\n`;
    return NextResponse.json({
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: animMatch.slug,
      type: "registry:style",
      title: animMatch.name,
      description: animMatch.description,
      author: "Liber UI",
      categories: [animMatch.category],
      files: [
        {
          path: `styles/animations/${animMatch.slug}.css`,
          content: cssContent,
          type: "registry:style",
        },
      ],
      meta: {
        kind: "animation",
        trigger: animMatch.trigger,
        tailwindClasses: animMatch.tailwindClasses,
      },
    });
  }

  // 4. Check Components
  const compMatch = SAMPLE_COMPONENTS.find((c) => c.slug.toLowerCase() === cleanSlug);
  if (compMatch) {
    return NextResponse.json({
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: compMatch.slug,
      type: "registry:ui",
      title: compMatch.name,
      description: compMatch.description,
      author: "Liber UI",
      categories: [compMatch.category],
      dependencies: compMatch.dependencies,
      registryDependencies: compMatch.registryDependencies,
      files: [
        {
          path: `ui/${compMatch.slug}.tsx`,
          content: `// Liber UI Component: ${compMatch.name}\nimport React from "react";\n\nexport function ${compMatch.slug
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join("")}() {\n  return <div className="p-4 rounded-[10px] border border-border bg-card">${compMatch.name}</div>;\n}\n`,
          type: "registry:ui",
        },
      ],
      meta: {
        kind: "component",
      },
    });
  }

  return NextResponse.json(
    { error: `Resource "${cleanSlug}" not found in Liber UI registry.` },
    { status: 404 }
  );
}

