'use client';

import type { ComponentPropsWithRef } from 'react';

export default function Select({
  placeholder,
  children,
  ...props
}: { placeholder?: string } & ComponentPropsWithRef<'select'>) {
  return (
    <span className="relative">
      <select
        className="w-full appearance-none rounded-8 border bg-background-normal px-[14px] py-[16px] text-left text-body-2-normal font-medium transition-colors"
        defaultValue={placeholder && ''}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <Down />
    </span>
  );
}

function Down() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 right-4 bottom-0 m-auto"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.36191 6.15046C3.57319 5.94522 3.91084 5.95011 4.11608 6.16139L7.88907 10.0454L11.8951 6.15061C12.1063 5.94529 12.4439 5.95004 12.6493 6.16123C12.8546 6.37243 12.8498 6.71008 12.6386 6.91541L8.25007 11.1821C8.14862 11.2807 8.01214 11.335 7.87067 11.333C7.7292 11.3309 7.59433 11.2728 7.49574 11.1713L3.35098 6.90463C3.14574 6.69335 3.15063 6.3557 3.36191 6.15046Z"
        fill="#171717"
      />
    </svg>
  );
}
