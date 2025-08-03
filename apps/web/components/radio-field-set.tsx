'use client';

import { twMerge } from '@/lib/tailwind-merge';
import { type ComponentPropsWithRef, useRef } from 'react';

export default function RadioFieldSet({
  className,
  ...props
}: ComponentPropsWithRef<'div'>) {
  return (
    <div className={twMerge('grid grid-cols-2 gap-2', className)} {...props} />
  );
}

export function RadioButton({
  children,
  ...props
}: ComponentPropsWithRef<'input'>) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <fieldset className="group">
      <input ref={ref} type="radio" className="hidden" {...props} />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="w-full rounded-8 border border-line-normal bg-background-normal px-[14px] py-[16px] text-left text-body-2-normal font-medium transition-colors group-has-checked:border-primary-sub-1 group-has-checked:bg-[EFFFA]"
      >
        {children}
      </button>
    </fieldset>
  );
}
