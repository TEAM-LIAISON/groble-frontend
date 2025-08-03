import { twMerge } from '@/lib/tailwind-merge';
import { type ComponentPropsWithRef, forwardRef, useRef } from 'react';

const Switch = forwardRef<HTMLInputElement, ComponentPropsWithRef<'input'>>(
  ({ className, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = ref || internalRef;

    return (
      <span
        className={twMerge(
          'group/switch inline-block has-disabled:cursor-not-allowed cursor-pointer',
          className
        )}
        onClick={() => {
          if (typeof inputRef === 'function') return;
          inputRef.current?.click();
        }}
      >
        <input type="checkbox" className="hidden" ref={inputRef} {...props} />
        <svg
          width="36"
          height="20"
          viewBox="0 0 36 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            width="36"
            height="20"
            rx="10"
            className="fill-component-fill-strong transition-[fill] group-has-checked/switch:fill-primary-sub-1 group-has-disabled/switch:fill-label-disable group-has-disabled/switch:group-has-checked/switch:fill-label-disable"
          />
          <rect
            y="2"
            width="16"
            height="16"
            rx="8"
            className="fill-common-100 transition-[x] [x:2px] group-has-checked/switch:[x:18px] group-has-disabled/switch:fill-background-alternative group-has-disabled/switch:group-has-checked/switch:fill-background-alternative"
          />
        </svg>
      </span>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
