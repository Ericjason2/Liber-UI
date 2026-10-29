import * as React from "react";
import type { SVGProps } from "react";

export interface JuliaMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const JuliaMono = ({ size = 24, ...props }: JuliaMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"julia (monochrome)"}</title><circle cx={29.1} cy={94.2} r={29.1} /><circle cx={98.9} cy={94.2} r={29.1} /><circle cx={64} cy={33.8} r={29.1} /></svg>;
export { JuliaMono };