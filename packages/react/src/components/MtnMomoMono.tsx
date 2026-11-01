import * as React from "react";
import type { SVGProps } from "react";

export interface MtnMomoMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const MtnMomoMono = ({ size = 24, ...props }: MtnMomoMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"MTN MoMo (monochrome)"}</title><ellipse cx={64} cy={64} fill="none" stroke="currentColor" strokeWidth={8} rx={54} ry={38} /><text x={64} y={73} fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize={28} fontWeight={900} letterSpacing={-1} textAnchor="middle">{"MoMo"}</text></svg>;
export { MtnMomoMono };