import * as React from "react";
import type { SVGProps } from "react";

export interface MoniepointColorProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const MoniepointColor = ({ size = 24, ...props }: MoniepointColorProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Moniepoint"}</title><rect width={128} height={128} fill="#036" rx={28} /><path fill="#08f" d="m30 40 34 30 34-30v26L64 96 30 66z" /><path fill="#fff" d="m42 40 22 20 22-20v14L64 74 42 54z" /></svg>;
export { MoniepointColor };