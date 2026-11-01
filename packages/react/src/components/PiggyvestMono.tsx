import * as React from "react";
import type { SVGProps } from "react";

export interface PiggyvestMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const PiggyvestMono = ({ size = 24, ...props }: PiggyvestMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"PiggyVest (monochrome)"}</title><circle cx={64} cy={64} r={36} fill="none" stroke="currentColor" strokeWidth={10} /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={8} d="m52 64 8 8 16-16" /></svg>;
export { PiggyvestMono };