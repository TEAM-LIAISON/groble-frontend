import { SVGProps } from "react";
import { twMerge } from "@/lib/tailwind-merge";

type Direction = "up" | "down" | "left" | "right";

interface ChevronIconProps extends SVGProps<SVGSVGElement> {
  direction?: Direction;
}

export function ChevronIcon({
  direction = "right",
  className,
  ...props
}: ChevronIconProps) {
  const rotationMap: Record<Direction, string> = {
    right: "rotate-0",
    down: "rotate-90",
    left: "rotate-180",
    up: "-rotate-90",
  };

  return (
    <svg
      {...props}
      className={twMerge(
        "h-4 w-4 transition-transform",
        rotationMap[direction],
        className,
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
