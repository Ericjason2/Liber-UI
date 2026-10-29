import * as React from "react";
import type { SVGProps } from "react";

export interface FlutterMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const FlutterMono = ({ size = 24, ...props }: FlutterMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"flutter (monochrome)"}</title><path fill="currentColor" d="M12.3 64.2 76.3 0h39.4L32.1 83.6zm64 63.8h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.5z" /></svg>;
export { FlutterMono };