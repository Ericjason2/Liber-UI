import * as React from "react";
import type { SVGProps } from "react";

export interface OrangeMoneyMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const OrangeMoneyMono = ({ size = 24, ...props }: OrangeMoneyMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Orange Money (monochrome)"}</title><rect width={128} height={128} fill="none" stroke="currentColor" strokeWidth={8} rx={24} /><circle cx={64} cy={64} r={38} fill="none" stroke="currentColor" strokeWidth={6} /><circle cx={64} cy={64} r={22} fill="currentColor" /></svg>;
export { OrangeMoneyMono };