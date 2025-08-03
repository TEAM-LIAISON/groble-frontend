'use client';

import { OTPInput, type SlotProps } from 'input-otp';
import { twJoin } from 'tailwind-merge';

interface OTPInputComponentProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  errorText?: string;
}

function Slot(props: SlotProps & { error?: boolean }) {
  return (
    <div
      className={twJoin(
        'relative flex aspect-square flex-1 max-w-[6.93rem] min-w-[2.25rem] items-center justify-center rounded-lg bg-background-alternative text-title-3 font-bold',
        props.isActive && !props.error && 'border-[1.5px] border-label-normal',
        props.isActive && props.error && 'border-[1.5px] border-status-error',
        props.error && !props.isActive && 'border-[1.5px] border-status-error'
      )}
    >
      <div className="group-has-[input[data-input-otp-placeholder-shown]]:opacity-20">
        {props.char ?? props.placeholderChar}
      </div>
    </div>
  );
}

export default function OTPInputComponent({
  value,
  onChange,
  maxLength = 4,
  disabled = false,
  className,
  error = false,
  errorText,
}: OTPInputComponentProps) {
  return (
    <div className={twJoin('flex flex-col', className)}>
      <div className="flex">
        <OTPInput
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          disabled={disabled}
          containerClassName="group flex items-center w-full max-w-md"
          render={({ slots }) => (
            <div className="flex gap-2 sm:gap-3 w-full justify-center">
              {slots.map((slot, idx) => (
                <Slot key={idx} {...slot} error={error} />
              ))}
            </div>
          )}
        />
      </div>
      {errorText && (
        <div className="flex items-center gap-1 mt-2 text-caption-1 text-status-error">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="fill-current"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.00016 13.6667C11.1298 13.6667 13.6668 11.1297 13.6668 8.00004C13.6668 4.87043 11.1298 2.33337 8.00016 2.33337C4.87055 2.33337 2.3335 4.87043 2.3335 8.00004C2.3335 11.1297 4.87055 13.6667 8.00016 13.6667ZM8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667ZM8.50016 8.66671L8.50016 4.66671H7.50016L7.50016 8.66671H8.50016ZM8.50016 11.3334V10.3334H7.50016V11.3334H8.50016Z"
            />
          </svg>
          {errorText}
        </div>
      )}
    </div>
  );
}
