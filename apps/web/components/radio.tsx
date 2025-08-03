'use client';

import { twMerge } from '@/lib/tailwind-merge';
import { type ComponentPropsWithRef, useRef } from 'react';

export default function Radio({
  className,
  ...props
}: ComponentPropsWithRef<'input'>) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <span
      className={twMerge(
        'group/radio relative inline-block has-disabled:cursor-not-allowed',
        className
      )}
    >
      <input type="radio" className="hidden" ref={ref} {...props} />
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-opacity group-has-checked/radio:opacity-0"
        onClick={() => ref.current?.click()}
      >
        <rect
          x="1.15234"
          y="0.5"
          width="19"
          height="19"
          rx="9.5"
          fill="white"
        />
        <rect
          x="1.15234"
          y="0.5"
          width="19"
          height="19"
          rx="9.5"
          stroke="#C2C4C8"
        />
        <path
          d="M5.65234 10.5L9.15234 14L15.6523 6"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 opacity-0 transition-opacity group-has-checked/radio:opacity-100"
        onClick={() => ref.current?.click()}
      >
        <rect
          x="1.40234"
          y="0.75"
          width="18.5"
          height="18.5"
          rx="9.25"
          stroke="#008660"
          strokeWidth="1.5"
        />
        <rect x="4.65234" y="4" width="12" height="12" rx="6" fill="#008660" />
      </svg>
    </span>
  );
}
