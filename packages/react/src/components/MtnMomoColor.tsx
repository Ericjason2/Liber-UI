import * as React from "react";
import type { SVGProps } from "react";

export interface MtnMomoColorProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const MtnMomoColor = ({ size = 24, ...props }: MtnMomoColorProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"MTN MoMo"}</title><rect width={128} height={128} fill="#fc0" rx={28} /><ellipse cx={64} cy={64} fill="#004f71" rx={46} ry={32} /><text x={64} y={73} fill="#fc0" fontFamily="system-ui, -apple-system, sans-serif" fontSize={28} fontWeight={900} letterSpacing={-1} textAnchor="middle">{"MoMo"}</text></svg>;
export { MtnMomoColor };