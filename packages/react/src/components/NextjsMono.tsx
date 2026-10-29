import * as React from "react";
import type { SVGProps } from "react";

export interface NextjsMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const NextjsMono = ({ size = 24, ...props }: NextjsMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Next.js (monochrome)"}</title><path d="M64 0A64 64 0 0 0 0 64a64 64 0 0 0 64 64 64 64 0 0 0 35.508-10.838L47.014 49.34v40.238H38.4V38.4h10.768l57.125 73.584A64 64 0 0 0 128 64 64 64 0 0 0 64 0m17.777 38.4h8.534v48.776L81.777 75.97Zm24.18 73.92-.111.096z" /></svg>;
export { NextjsMono };