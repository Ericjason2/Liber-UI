import * as React from "react";
import type { SVGProps } from "react";

export interface DjamoColorProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const DjamoColor = ({ size = 24, ...props }: DjamoColorProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Djamo"}</title><rect width={128} height={128} fill="#2764ff" rx={28} /><path fill="#fff" d="M38 34h26c18.778 0 34 13.431 34 30S82.778 94 64 94H38zm16 14v32h10c9.941 0 18-7.163 18-16s-8.059-16-18-16z" /></svg>;
export { DjamoColor };