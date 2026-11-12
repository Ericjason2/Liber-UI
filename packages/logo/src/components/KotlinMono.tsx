import * as React from "react";
import type { SVGProps } from "react";

export interface KotlinMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const KotlinMono = ({ size = 24, ...props }: KotlinMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"kotlin (monochrome)"}</title><path fill="currentColor" d="M112.484 112.484H15.516V15.516h96.968L64 64Zm0 0" /></svg>;
export { KotlinMono };