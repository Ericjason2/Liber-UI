import * as React from "react";
import type { SVGProps } from "react";

export interface MoniepointMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const MoniepointMono = ({ size = 24, ...props }: MoniepointMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Moniepoint (monochrome)"}</title><path fill="currentColor" d="m30 40 34 30 34-30v26L64 96 30 66z" /></svg>;
export { MoniepointMono };