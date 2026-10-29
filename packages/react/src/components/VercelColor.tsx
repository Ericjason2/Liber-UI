import * as React from "react";
import type { SVGProps } from "react";

export interface VercelColorProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const VercelColor = ({ size = 24, ...props }: VercelColorProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"vercel"}</title><path d="M64.002 8.576 128 119.424H0Zm0 0" /></svg>;
export { VercelColor };