import { twMerge } from '@/lib/tailwind-merge';
import type { SVGProps } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';
type Variant = 'chevron' | 'triangle';

interface ChevronIconProps extends SVGProps<SVGSVGElement> {
  direction?: Direction;
  variant?: Variant;
}

export function ChevronIcon({
  direction = 'right',
  variant = 'chevron',
  className,
  ...props
}: ChevronIconProps) {
  const rotationMap: Record<Direction, string> = {
    right: 'rotate-0',
    down: 'rotate-90',
    left: 'rotate-180',
    up: '-rotate-90',
  };

  // 삼각형 variant인 경우
  if (variant === 'triangle') {
    return (
      <svg
        {...props}
        className={twMerge('h-[38px] w-[13px] transition-transform', className)}
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="38"
        viewBox="0 0 13 38"
        fill="none"
      >
        <path
          d="M5.83203 21L2.33203 16L9.33203 16L5.83203 21Z"
          fill="#171717"
        />
      </svg>
    );
  }

  // 기본 chevron variant
  return (
    <svg
      {...props}
      className={twMerge(
        'h-4 w-4 transition-transform',
        rotationMap[direction],
        className
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
