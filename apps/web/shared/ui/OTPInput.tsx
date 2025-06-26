'use client';

import { OTPInput, SlotProps } from 'input-otp';
import { twJoin } from 'tailwind-merge';

interface OTPInputComponentProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
}

function Slot(props: SlotProps) {
  return (
    <div
      className={twJoin(
        'relative flex aspect-square flex-1 max-w-[6.93rem] min-w-[2.25rem] items-center justify-center rounded-lg bg-background-alternative text-title-3 font-bold ',
        props.isActive && ' border-[1.5px] border-label-normal',
        ''
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
}: OTPInputComponentProps) {
  return (
    <div className={twJoin('flex', className)}>
      <OTPInput
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        disabled={disabled}
        containerClassName="group flex items-center w-full max-w-md"
        render={({ slots }) => (
          <div className="flex gap-2 sm:gap-3 w-full justify-center">
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        )}
      />
    </div>
  );
}
