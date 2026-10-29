import * as React from "react";
import type { SVGProps } from "react";

export interface SolidityMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const SolidityMono = ({ size = 24, ...props }: SolidityMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"solidity (monochrome)"}</title><path d="M43.322 0 22.756 36.576l20.566 36.561 20.564-36.561h41.143L84.465 0zm41.342 54.863L64.1 91.424H22.955L43.519 128h41.145l20.58-36.576z" /></svg>;
export { SolidityMono };