"use client";

import React, { useMemo } from "react";

export interface ComponentLivePreviewProps {
  rawHtml: string;
  title: string;
  mode?: "thumbnail" | "full";
  darkMode?: boolean;
  viewportWidth?: "100%" | "768px" | "375px";
  className?: string;
  minHeight?: number;
}

/**
 * Builds a complete, isolated HTML document for an iframe srcDoc that renders
 * the exact creator-submitted Tailwind HTML (`rawHtml`) just like tailwindflex.com.
 */
export function buildPreviewSrcDoc(
  rawHtml: string,
  darkMode = false,
  isThumbnail = false
): string {
  const trimmed = (rawHtml || "").trim();

  // Extract body content if the snippet already contains <html> or <body> tags
  let bodyContent: string;
  const bodyMatch = trimmed.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch && bodyMatch[1]) {
    bodyContent = bodyMatch[1].trim();
  } else {
    bodyContent = trimmed
      .replace(/<!DOCTYPE[^>]*>/gi, "")
      .replace(/<\/?html[^>]*>/gi, "")
      .replace(/<head[\s\S]*?<\/head>/gi, "")
      .trim();
  }

  const htmlClass = darkMode ? "dark" : "";
  const bgClass = darkMode
    ? "bg-slate-950 text-slate-100"
    : "bg-slate-50 text-slate-900";

  return `<!DOCTYPE html>
<html lang="fr" class="${htmlClass}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
          }
        }
      }
    };
  </script>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 100vh;
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    ${
      isThumbnail
        ? `
    html, body {
      overflow: hidden !important;
    }
    ::-webkit-scrollbar {
      display: none;
    }`
        : ""
    }
    .preview-root > * {
      max-width: 100%;
    }
  </style>
</head>
<body class="${bgClass} transition-colors duration-200">
  <div class="preview-root min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6">
    <div class="w-full">
      ${bodyContent}
    </div>
  </div>
  <script>
    // Prevent links and form submissions inside the preview from navigating the iframe away
    document.addEventListener('click', function(e) {
      var anchor = e.target && e.target.closest ? e.target.closest('a') : null;
      if (anchor) {
        e.preventDefault();
      }
    }, true);
    document.addEventListener('submit', function(e) {
      e.preventDefault();
    }, true);
  </script>
</body>
</html>`;
}

export function ComponentLivePreview({
  rawHtml,
  title,
  mode = "thumbnail",
  darkMode = false,
  viewportWidth = "100%",
  className = "",
  minHeight = 560,
}: ComponentLivePreviewProps) {
  const isThumbnail = mode === "thumbnail";

  const srcDoc = useMemo(
    () => buildPreviewSrcDoc(rawHtml, darkMode, isThumbnail),
    [rawHtml, darkMode, isThumbnail]
  );

  if (isThumbnail) {
    return (
      <div
        className={`relative w-full h-[260px] overflow-hidden bg-slate-50 dark:bg-slate-950 select-none ${className}`}
      >
        <iframe
          title={`Aperçu de ${title}`}
          srcDoc={srcDoc}
          loading="lazy"
          sandbox="allow-scripts"
          tabIndex={-1}
          aria-hidden="true"
          className="w-[200%] h-[520px] border-0 origin-top-left scale-50 pointer-events-none"
        />
      </div>
    );
  }

  return (
    <div
      className={`w-full flex justify-center bg-muted/20 dark:bg-neutral-950/60 p-2 sm:p-4 overflow-x-auto ${className}`}
    >
      <div
        style={{
          width: viewportWidth,
          minHeight: `${minHeight}px`,
        }}
        className="relative rounded-xl border border-border bg-white dark:bg-slate-950 shadow-sm overflow-hidden transition-all duration-300 w-full"
      >
        <iframe
          title={`Prévisualisation interactive de ${title}`}
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          style={{ minHeight: `${minHeight}px` }}
          className="w-full h-full border-0 block"
        />
      </div>
    </div>
  );
}
