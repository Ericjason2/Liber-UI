import * as React from "react";
import type { SVGProps } from "react";

export interface AlpinejsMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const AlpinejsMono = ({ size = 24, ...props }: AlpinejsMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"alpinejs (monochrome)"}</title><path fill="currentColor" fillRule="evenodd" d="M98.444 35.562 126 62.997 98.444 90.432 70.889 62.997zm-68.888 0 57.126 56.876H31.571L2 62.997z" clipRule="evenodd" /></svg>;
export { AlpinejsMono };