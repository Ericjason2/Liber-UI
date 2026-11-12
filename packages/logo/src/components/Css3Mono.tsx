import * as React from "react";
import type { SVGProps } from "react";

export interface Css3MonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const Css3Mono = ({ size = 24, ...props }: Css3MonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"css3 (monochrome)"}</title><path fill="currentColor" d="m8.76 1 10.055 112.883 45.118 12.58 45.244-12.626L119.24 1zm89.591 25.862-3.347 37.605.01.203-.014.467v-.004l-2.378 26.294-.262 2.336L64 101.607v.001l-.022.019-28.311-7.888L33.75 72h13.883l.985 11.054 15.386 4.17-.004.008v-.002l15.443-4.229L81.075 65H48.792l-.277-3.043-.631-7.129L47.553 51h34.749l1.264-14H30.64l-.277-3.041-.63-7.131L29.401 23h69.281z" /></svg>;
export { Css3Mono };