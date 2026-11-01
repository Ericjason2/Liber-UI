import * as React from "react";
import type { SVGProps } from "react";

export interface KudaColorProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const KudaColor = ({ size = 24, ...props }: KudaColorProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Kuda"}</title><rect width={128} height={128} fill="#40196d" rx={28} /><path fill="#fff" d="M38 32h14v64H38z" /><path fill="#00d09c" d="m52 64 28-32h18L68 64l30 32H80z" /></svg>;
export { KudaColor };