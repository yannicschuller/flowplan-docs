// Phosphor icons for client components (regular weight; MIT, the same
// drawings as @phosphor-icons/react). The package's icons carry all six
// weights each and its context provider; these are one path apiece and cost
// next to nothing. Here only the ones in every page's JavaScript (header and
// sidebar); a lazily loaded component keeps its own paths next to it, so
// they stay in its chunk. Server components may keep using
// @phosphor-icons/react/dist/ssr.
import type { SVGProps } from "react";

export const LIST = "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z";
export const MAGNIFYING_GLASS = "M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z";
export const X = "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z";

export function Icon({ path, size = 16, ...rest }: { path: string; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" {...rest}>
      <path d={path} />
    </svg>
  );
}
