import * as React from "react";
import type { SVGProps } from "react";

export interface ChipperCashMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const ChipperCashMono = ({ size = 24, ...props }: ChipperCashMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Chipper Cash (monochrome)"}</title><rect width={128} height={128} fill="none" stroke="currentColor" strokeWidth={8} rx={28} /><path fill="currentColor" d="M78 36H50c-7.732 0-14 6.268-14 14v28c0 7.732 6.268 14 14 14h28c7.732 0 14-6.268 14-14v-8H76v8H52V50h40c0-7.732-6.268-14-14-14" /></svg>;
export { ChipperCashMono };