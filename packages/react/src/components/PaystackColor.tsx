import * as React from "react";
import type { SVGProps } from "react";

export interface PaystackColorProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const PaystackColor = ({ size = 24, ...props }: PaystackColorProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Paystack"}</title><rect width={128} height={128} fill="#09203f" rx={28} /><rect width={72} height={14} x={28} y={28} fill="#00c3f7" rx={7} /><rect width={48} height={14} x={28} y={50} fill="#00c3f7" rx={7} /><rect width={72} height={14} x={28} y={72} fill="#00c3f7" rx={7} /><rect width={48} height={14} x={28} y={94} fill="#00c3f7" rx={7} /></svg>;
export { PaystackColor };