import * as React from "react";
import type { SVGProps } from "react";

export interface PiggyvestColorProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const PiggyvestColor = ({ size = 24, ...props }: PiggyvestColorProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"PiggyVest"}</title><rect width={128} height={128} fill="#083e9e" rx={28} /><circle cx={64} cy={64} r={36} fill="none" stroke="#22c55e" strokeWidth={10} /><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={8} d="m52 64 8 8 16-16" /></svg>;
export { PiggyvestColor };