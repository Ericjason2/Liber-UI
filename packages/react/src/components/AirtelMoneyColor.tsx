import * as React from "react";
import type { SVGProps } from "react";

export interface AirtelMoneyColorProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
const AirtelMoneyColor = ({ size = 24, ...props }: AirtelMoneyColorProps) => <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={size ?? 24} height={size ?? 24} {...props}><title>{"Airtel Money"}</title><rect width={128} height={128} fill="#ed1c24" rx={28} /><path fill="#fff" d="M64 30c-18.778 0-34 15.222-34 34 0 14.887 9.553 27.545 22.848 32.064L57 84.608C47.88 81.72 42 73.57 42 64c0-12.15 9.85-22 22-22s22 9.85 22 22c0 5.12-1.76 9.84-4.72 13.57C78.67 80.85 77 82 77 84c0 2.21 1.79 4 4 4 1.83 0 3.33-1.22 3.82-2.88C90.35 79.5 96 72.39 96 64c0-18.778-15.222-34-34-34z" /></svg>;
export { AirtelMoneyColor };