import * as React from "react";
import type { SVGProps } from "react";

export interface MoovMoneyMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const MoovMoneyMono = ({ size = 24, ...props }: MoovMoneyMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Moov Money (monochrome)"}</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={12} d="M34 82c0-16.569 13.431-30 30-30s30 13.431 30 30" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={8} d="M48 82c0-8.837 7.163-16 16-16s16 7.163 16 16" /><circle cx={64} cy={34} r={10} fill="currentColor" /></svg>;
export { MoovMoneyMono };