'use client';

import { forwardRef, useId } from 'react';

interface GuestTextFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
  type?: 'text' | 'tel' | 'email';
}

const GuestTextField = forwardRef<HTMLInputElement, GuestTextFieldProps>(
  ({ label, placeholder, value, onChange, disabled = false, maxLength, className = '', type = 'text' }, ref) => {
    const id = useId();

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className="h-11 w-full rounded-lg border-background-alternative bg-background-alternative px-[14px] py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-primary-normal border-[1.5px] focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 text-body-2-normal font-medium"
        />
      </div>
    );
  }
);

GuestTextField.displayName = 'GuestTextField';

export default GuestTextField;
