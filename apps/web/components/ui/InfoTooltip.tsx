'use client';

import { useState } from 'react';
import { twMerge } from '@/lib/tailwind-merge';

type TooltipDirection = 'top' | 'bottom' | 'left' | 'right';

interface InfoTooltipProps {
  text: string;
  direction?: TooltipDirection;
  width?: string;
  className?: string;
}

export default function InfoTooltip({
  text,
  direction = 'bottom',
  width = '18rem',
  className,
}: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const getTooltipPositionClasses = (dir: TooltipDirection) => {
    switch (dir) {
      case 'top':
        return 'bottom-full left-1/2 mb-2 -translate-x-1/2';
      case 'bottom':
        return 'top-full left-1/2 mt-2 -translate-x-1/2';
      case 'left':
        return 'right-full top-1/2 mr-2 -translate-y-1/2';
      case 'right':
        return 'left-full top-1/2 ml-2 -translate-y-1/2';
      default:
        return 'top-full left-1/2 mt-2 -translate-x-1/2';
    }
  };

  const getArrowClasses = (dir: TooltipDirection) => {
    switch (dir) {
      case 'top':
        return 'top-full left-1/2 -translate-x-1/2 border-t-4 border-r-4 border-l-4 border-t-component-fill-neutral border-r-transparent border-l-transparent';
      case 'bottom':
        return 'bottom-full left-1/2 -translate-x-1/2 border-b-4 border-r-4 border-l-4 border-b-component-fill-neutral border-r-transparent border-l-transparent';
      case 'left':
        return 'left-full top-1/2 -translate-y-1/2 border-l-4 border-t-4 border-b-4 border-l-component-fill-neutral border-t-transparent border-b-transparent';
      case 'right':
        return 'right-full top-1/2 -translate-y-1/2 border-r-4 border-t-4 border-b-4 border-r-component-fill-neutral border-t-transparent border-b-transparent';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 border-b-4 border-r-4 border-l-4 border-b-component-fill-neutral border-r-transparent border-l-transparent';
    }
  };

  return (
    <div className={twMerge('relative inline-block', className)}>
      <div
        className="flex h-5 w-5 cursor-help items-center justify-center text-label-alternative hover:text-label-normal"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M10 1.66797C14.6024 1.66797 18.333 5.3986 18.333 10.001C18.333 14.6033 14.6024 18.334 10 18.334C5.39763 18.334 1.66699 14.6033 1.66699 10.001C1.66699 5.3986 5.39763 1.66797 10 1.66797ZM10 2.91797C6.08798 2.91797 2.91699 6.08896 2.91699 10.001C2.91699 13.913 6.08798 17.084 10 17.084C13.912 17.084 17.083 13.913 17.083 10.001C17.083 6.08896 13.912 2.91797 10 2.91797ZM10.625 14.168H9.375V9.16797H10.625V14.168ZM10.625 7.08398H9.375V5.83398H10.625V7.08398Z"
            fill="#C2C4C8"
          />
        </svg>{' '}
      </div>
      {isVisible && (
        <div
          className={twMerge(
            'absolute z-50 transform',
            getTooltipPositionClasses(direction)
          )}
          style={{ width }}
        >
          <div className="rounded-lg bg-component-fill-neutral p-[0.62rem] text-caption-1 break-words whitespace-pre-wrap text-label-inverse shadow-lg">
            {text}
            <div
              className={twMerge(
                'absolute h-0 w-0',
                getArrowClasses(direction)
              )}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
