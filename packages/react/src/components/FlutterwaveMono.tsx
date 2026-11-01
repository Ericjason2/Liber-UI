import * as React from "react";
import type { SVGProps } from "react";

export interface FlutterwaveMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const FlutterwaveMono = ({ size = 24, ...props }: FlutterwaveMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Flutterwave (monochrome)"}</title><path fill="none" stroke="currentColor" strokeWidth={8} d="M32 40c0-6.627 5.373-12 12-12h18c18.778 0 34 15.222 34 34S80.778 96 62 96h-6c-6.627 0-12-5.373-12-12V40z" /><path fill="currentColor" d="M44 54a8 8 0 0 1 8-8h10c11.046 0 20 8.954 20 20s-8.954 20-20 20H52a8 8 0 0 1-8-8z" /></svg>;
export { FlutterwaveMono };