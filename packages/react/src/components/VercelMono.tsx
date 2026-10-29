import * as React from "react";
import type { SVGProps } from "react";

export interface VercelMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const VercelMono = ({ size = 24, ...props }: VercelMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Vercel (monochrome)"}</title><path d="m64.002 8.575-.428.74L0 119.425h128Zm0 1.976 62.289 107.887H1.709Z" /></svg>;
export { VercelMono };