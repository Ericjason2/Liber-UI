import * as React from "react";
import type { SVGProps } from "react";

export interface KudaMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const KudaMono = ({ size = 24, ...props }: KudaMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Kuda (monochrome)"}</title><path fill="currentColor" d="M38 32h14v64H38zm14 32 28-32h18L68 64l30 32H80z" /></svg>;
export { KudaMono };