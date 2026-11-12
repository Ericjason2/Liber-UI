import * as React from "react";
import type { SVGProps } from "react";

export interface CapacitorMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const CapacitorMono = ({ size = 24, ...props }: CapacitorMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"capacitor (monochrome)"}</title><path fill="currentColor" d="M108.215 0 77.512 30.691 46.96.156 27.184 19.957l80.82 80.926 19.777-19.805-30.496-30.586L128 19.738ZM19.93 27.059.156 46.859l30.496 30.59L0 108.191l19.715 19.813L50.43 97.246l30.547 30.535 19.777-19.8Zm0 0" /></svg>;
export { CapacitorMono };