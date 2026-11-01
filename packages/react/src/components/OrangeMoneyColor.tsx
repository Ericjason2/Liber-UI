import * as React from "react";
import type { SVGProps } from "react";

export interface OrangeMoneyColorProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const OrangeMoneyColor = ({ size = 24, ...props }: OrangeMoneyColorProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Orange Money"}</title><rect width={128} height={128} fill="#ff7900" rx={24} /><circle cx={64} cy={64} r={38} fill="#fff" /><circle cx={64} cy={64} r={26} /><circle cx={64} cy={64} r={14} fill="#ff7900" /></svg>;
export { OrangeMoneyColor };