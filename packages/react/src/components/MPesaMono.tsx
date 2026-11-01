import * as React from "react";
import type { SVGProps } from "react";

export interface MPesaMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const MPesaMono = ({ size = 24, ...props }: MPesaMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"M-Pesa (monochrome)"}</title><circle cx={64} cy={64} r={48} fill="none" stroke="currentColor" strokeWidth={8} /><path fill="currentColor" d="M48 48h14l10 18 10-18h14v36H84V64l-9 16h-6l-9-16v20H48z" /></svg>;
export { MPesaMono };