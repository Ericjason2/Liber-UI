import * as React from "react";
import type { SVGProps } from "react";

export interface OpayMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const OpayMono = ({ size = 24, ...props }: OpayMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"OPay (monochrome)"}</title><circle cx={64} cy={64} r={34} fill="none" stroke="currentColor" strokeWidth={16} /><circle cx={64} cy={64} r={12} fill="currentColor" /></svg>;
export { OpayMono };