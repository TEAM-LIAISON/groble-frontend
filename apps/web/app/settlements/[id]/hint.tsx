'use client';

import { HintPopover } from '@/components/popover';
import { type ComponentPropsWithRef, type ReactNode, useId } from 'react';

export default function Hint({ children }: { children?: ReactNode }) {
  const popoverId = useId();

  return (
    <>
      <button popoverTarget={popoverId}>
        <Info />
      </button>
      <HintPopover id={popoverId}>{children}</HintPopover>
    </>
  );
}

function Info({ ...props }: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6673 7.99967C13.6673 11.1293 11.1303 13.6663 8.00065 13.6663C4.87104 13.6663 2.33398 11.1293 2.33398 7.99967C2.33398 4.87006 4.87104 2.33301 8.00065 2.33301C11.1303 2.33301 13.6673 4.87006 13.6673 7.99967ZM14.6673 7.99967C14.6673 11.6816 11.6825 14.6663 8.00065 14.6663C4.31875 14.6663 1.33398 11.6816 1.33398 7.99967C1.33398 4.31778 4.31875 1.33301 8.00065 1.33301C11.6825 1.33301 14.6673 4.31778 14.6673 7.99967ZM7.50065 5.66634V4.66634H8.50065V5.66634H7.50065ZM7.50065 11.333V7.33301H8.50065V11.333H7.50065Z"
        fill="#C2C4C8"
      />
    </svg>
  );
}
