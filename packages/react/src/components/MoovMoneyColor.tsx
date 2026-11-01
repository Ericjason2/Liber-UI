import * as React from "react";
import type { SVGProps } from "react";

export interface MoovMoneyColorProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const MoovMoneyColor = ({ size = 24, ...props }: MoovMoneyColorProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Moov Money"}</title><rect width={128} height={128} fill="#004b97" rx={28} /><path fill="none" stroke="#f37023" strokeLinecap="round" strokeWidth={12} d="M34 76c0-16.569 13.431-30 30-30s30 13.431 30 30" /><path fill="none" stroke="#fff" strokeLinecap="round" strokeWidth={8} d="M46 76c0-9.941 8.059-18 18-18s18 8.059 18 18" /><circle cx={64} cy={30} r={10} fill="#f37023" /></svg>;
export { MoovMoneyColor };