import * as React from "react";
import type { SVGProps } from "react";

export interface DjamoMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const DjamoMono = ({ size = 24, ...props }: DjamoMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Djamo (monochrome)"}</title><path fill="currentColor" d="M38 34h26c18.778 0 34 13.431 34 30S82.778 94 64 94H38zm16 14v32h10c9.941 0 18-7.163 18-16s-8.059-16-18-16z" /></svg>;
export { DjamoMono };