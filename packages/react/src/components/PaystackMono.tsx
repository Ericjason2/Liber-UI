import * as React from "react";
import type { SVGProps } from "react";

export interface PaystackMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const PaystackMono = ({ size = 24, ...props }: PaystackMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Paystack (monochrome)"}</title><rect width={72} height={14} x={28} y={28} fill="currentColor" rx={7} /><rect width={48} height={14} x={28} y={50} fill="currentColor" rx={7} /><rect width={72} height={14} x={28} y={72} fill="currentColor" rx={7} /><rect width={48} height={14} x={28} y={94} fill="currentColor" rx={7} /></svg>;
export { PaystackMono };