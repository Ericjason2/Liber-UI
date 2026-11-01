import * as React from "react";
import type { SVGProps } from "react";

export interface YocoMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const YocoMono = ({ size = 24, ...props }: YocoMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Yoco (monochrome)"}</title><path fill="currentColor" d="M34 32h18l12 24 12-24h18L72 74v22H56V74z" /></svg>;
export { YocoMono };