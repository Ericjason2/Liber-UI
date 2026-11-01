import * as React from "react";
import type { SVGProps } from "react";

export interface YocoColorProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const YocoColor = ({ size = 24, ...props }: YocoColorProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Yoco"}</title><rect width={128} height={128} fill="#00b2fe" rx={28} /><path fill="#fff" d="M34 32h18l12 24 12-24h18L72 74v22H56V74z" /></svg>;
export { YocoColor };