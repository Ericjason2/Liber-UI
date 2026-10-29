import * as React from "react";
import type { SVGProps } from "react";

export interface TerraformMonoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const TerraformMono = ({ size = 24, ...props }: TerraformMonoProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"terraform (monochrome)"}</title><path fillRule="evenodd" d="M46.324 26.082 77.941 44.5v36.836L46.324 62.918zM81.41 44.5v36.836l31.633-18.418V26.082zM11.242 5.523V42.36L42.86 60.777V23.941zm66.699 79.852L46.324 66.957v36.824L77.941 122.2zm0 0" /></svg>;
export { TerraformMono };