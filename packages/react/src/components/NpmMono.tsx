import * as React from "react";
import type { SVGProps } from "react";

export interface NpmMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const NpmMono = ({ size = 24, ...props }: NpmMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"npm (monochrome)"}</title><path fill="currentColor" d="M0 7.062C0 3.225 3.225 0 7.062 0h113.88c3.838 0 7.063 3.225 7.063 7.062v113.88c0 3.838-3.225 7.063-7.063 7.063H7.062c-3.837 0-7.062-3.225-7.062-7.063zm23.69 97.518h40.395l.05-58.532h19.494l-.05 58.581h19.543l.05-78.075-78.075-.1-.1 78.126z" /></svg>;
export { NpmMono };