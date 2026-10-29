import { transform } from "@svgr/core";
import jsxPlugin from "@svgr/plugin-jsx";

export function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

export async function generateReactComponent(
  svgCode: string,
  componentName: string,
): Promise<string> {
  const code = await transform(
    svgCode,
    {
      plugins: [jsxPlugin],
      typescript: true,
      dimensions: false,
      exportType: "named",
      namedExport: componentName,
      svgProps: {
        width: "{size ?? 24}",
        height: "{size ?? 24}",
      },
    },
    { componentName },
  );

  // Replace standard props type with LiberLogoProps
  const typed = code
    .replace(/solidColor:\s*[^,}]+,?/g, "")
    .replace(/solidOpacity:\s*[^,}]+,?/g, "")
    .replace(/shapePadding:\s*[^,}]+,?/g, "")
    .replace(/shapeMargin:\s*[^,}]+,?/g, "")
    .replace(/inlineSize:\s*[^,}]+,?/g, "")
    .replace(/blockProgression:\s*[^,}]+,?/g, "")
    .replace(
      'import type { SVGProps } from "react";',
      'import type { SVGProps } from "react";\n\nexport interface ' +
        componentName +
        'Props extends SVGProps<SVGSVGElement> {\n  size?: number | string;\n  title?: string;\n}',
    )
    .replace(
      `(props: SVGProps<SVGSVGElement>)`,
      `({ size = 24, ...props }: ${componentName}Props)`,
    );

  return typed;
}
