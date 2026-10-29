import * as React from "react";
import type { SVGProps } from "react";

export interface BackbonejsColorProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const BackbonejsColor = ({ size = 24, ...props }: BackbonejsColorProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"backbonejs"}</title><path fill="#002a41" d="M14.646 2.701v66.305l49.353 28.132V78.015l-33.017-18.82V29.633l33.017 18.821v-17.62z" /><path fill="#0071b5" d="M113.353 2.701v66.305L64 97.138V78.015l33.016-18.82V29.633L64 48.454v-17.62zM14.646 125.303V58.998l49.353-28.134v19.125L30.982 68.808v28.059l33.017-18.82v19.124z" /><path fill="#002a41" d="M113.353 125.303V58.998L64 30.864v19.125l33.016 18.819v28.059L64 78.047v19.124z" /></svg>;
export { BackbonejsColor };