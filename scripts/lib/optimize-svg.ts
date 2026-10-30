import { optimize } from "svgo";

export interface SvgOptimizeOptions {
  slug: string;
  variant: "color" | "mono" | "wordmark" | "light" | "dark";
  brandName: string;
}

/**
 * Optimizes an SVG according to Liber specs:
 * 1. SVGO with viewBox preserved
 * 2. Prefix IDs with slug to prevent collision
 * 3. For mono variant, replace fills and strokes with currentColor
 * 4. Add role="img" and accessible <title>
 */
export function optimizeSvgString(
  rawSvg: string,
  options: SvgOptimizeOptions,
): { svg: string; bytes: number } {
  const { slug, variant, brandName } = options;

  let intermediate = rawSvg;

  // Mono normalization: replace hex / rgb / named colors with currentColor
  if (variant === "mono") {
    intermediate = intermediate
      .replace(/fill="#[0-9a-fA-F]{3,8}"/gi, 'fill="currentColor"')
      .replace(/stroke="#[0-9a-fA-F]{3,8}"/gi, 'stroke="currentColor"')
      .replace(/fill:#[0-9a-fA-F]{3,8}/gi, "fill:currentColor")
      .replace(/stroke:#[0-9a-fA-F]{3,8}/gi, "stroke:currentColor");
  }

  // Remove non-standard CSS properties from style attributes that break React CSSProperties types
  intermediate = intermediate.replace(/style="([^"]*)"/gi, (_match, styleContent) => {
    const cleaned = styleContent
      .split(";")
      .map((s: string) => s.trim())
      .filter((s: string) => {
        if (!s) return false;
        const prop = s.split(":")[0]?.trim().toLowerCase();
        if (!prop) return false;
        const forbidden = [
          "solid-color",
          "solid-opacity",
          "shape-padding",
          "shape-margin",
          "inline-size",
          "block-progression",
          "-inkscape-font-specification",
        ];
        return !forbidden.includes(prop) && !prop.startsWith("-inkscape");
      })
      .join("; ");
    return cleaned ? `style="${cleaned}"` : "";
  });

  const result = optimize(intermediate, {
    multipass: true,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            cleanupIds: false,
          },
        },
      },
      {
        name: "prefixIds",
        params: {
          prefix: `liber-${slug}-${variant}`,
        },
      },
      {
        name: "removeDimensions",
      },
    ],
  });

  let optimized = result.data;

  // Ensure role="img" and accessible title
  if (!optimized.includes('role="img"')) {
    optimized = optimized.replace(/<svg\b([^>]*)>/i, '<svg role="img"$1>');
  }

  const titleTag = `<title>${brandName}${variant === "mono" ? " (monochrome)" : ""}</title>`;
  if (!optimized.includes("<title>")) {
    optimized = optimized.replace(/<svg\b([^>]*)>/i, `<svg$1>${titleTag}`);
  }

  return {
    svg: optimized,
    bytes: Buffer.byteLength(optimized, "utf8"),
  };
}
