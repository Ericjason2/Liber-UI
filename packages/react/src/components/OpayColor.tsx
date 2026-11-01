import * as React from "react";
import type { SVGProps } from "react";

export interface OpayColorProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const OpayColor = ({ size = 24, ...props }: OpayColorProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"OPay"}</title><rect width={128} height={128} fill="#17b890" rx={28} /><circle cx={64} cy={64} r={34} fill="none" stroke="#fff" strokeWidth={16} /><path stroke="#17b890" strokeLinecap="round" strokeWidth={8} d="M64 30v20" /><circle cx={64} cy={64} r={12} fill="#fff" /></svg>;
export { OpayColor };