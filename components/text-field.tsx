"use client";

import { twMerge } from "@/lib/tailwind-merge";
import { ComponentPropsWithRef, HTMLInputTypeAttribute, useState } from "react";

export default function TextField({
  label,
  labelHelper,
  helperText,
  type = "box",
  maxLength,
  className,
  disabled,
  onChange,
  inputType,
  ...props
}: {
  label?: string;
  labelHelper?: string;
  helperText?: string;
  type?: "box" | "line";
  inputType?: HTMLInputTypeAttribute;
} & Omit<ComponentPropsWithRef<"input">, "type">) {
  const [length, setLength] = useState(0);

  return (
    <label className="group flex flex-col gap-2">
      {(label || labelHelper) && (
        <div className="flex flex-col p-0.5">
          {label && (
            <div className="text-body-1-normal font-semibold text-label-normal group-has-disabled:text-label-disable">
              {label}
            </div>
          )}
          {labelHelper && (
            <div className="text-caption-1 font-medium text-label-alternative group-has-disabled:text-label-disable">
              {labelHelper}
            </div>
          )}
        </div>
      )}
      <input
        type={inputType}
        className={twMerge(
          "text-body-1-normal font-medium text-label-normal disabled:text-label-disable disabled:placeholder:text-label-disable",
          type == "box" &&
            "rounded-4 bg-background-alternative px-[14px] py-[15px] outline-[1.5px] -outline-offset-[1.5px] outline-background-alternative placeholder:text-label-alternative user-invalid:outline-status-error focus:outline-primary-normal disabled:bg-interaction-disable",
          type == "line" &&
            "border-b-[1.5px] border-line-neutral py-2 outline-0 user-valid:border-status-success user-invalid:border-status-error focus:border-label-normal",
          className,
        )}
        maxLength={maxLength}
        disabled={disabled}
        onChange={(event) => {
          setLength(event.currentTarget.value.length);
          onChange?.(event);
        }}
        {...props}
      />
      <BottomText
        helperText={helperText}
        length={length}
        maxLength={maxLength}
      />
    </label>
  );
}

export function BottomText({
  helperText,
  length,
  maxLength,
}: {
  helperText?: string;
  length?: number;
  maxLength?: number;
}) {
  return (
    <div
      hidden={!(helperText || maxLength)}
      className="flex items-center justify-stretch p-0.5 text-caption-1 text-label-alternative group-has-disabled:text-label-disable"
    >
      {helperText && (
        <span
          className={twMerge(
            "flex items-center gap-1 group-has-user-valid:text-status-success group-has-user-invalid:text-status-error",
          )}
        >
          <Exclamation />
          {helperText}
        </span>
      )}
      {maxLength && (
        <span className="ml-auto">
          {(length || 0).toLocaleString()}/{maxLength.toLocaleString()}
        </span>
      )}
    </div>
  );
}

function Exclamation() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.00016 13.6667C11.1298 13.6667 13.6668 11.1297 13.6668 8.00004C13.6668 4.87043 11.1298 2.33337 8.00016 2.33337C4.87055 2.33337 2.3335 4.87043 2.3335 8.00004C2.3335 11.1297 4.87055 13.6667 8.00016 13.6667ZM8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667ZM8.50016 8.66671L8.50016 4.66671H7.50016L7.50016 8.66671H8.50016ZM8.50016 11.3334V10.3334H7.50016V11.3334H8.50016Z"
      />
    </svg>
  );
}

export function PasswordTextField() {
  const [noNumber, setNoNumber] = useState<boolean | null>(null);
  const [noSpecial, setNoSpecial] = useState<boolean | null>(null);
  const [tooShort, setTooShort] = useState<boolean | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <TextField
        name="password"
        label="비밀번호"
        autoFocus
        inputType="password"
        required
        minLength={8}
        pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$"
        onInput={(event) => {
          setNoNumber(
            event.currentTarget.value
              ? event.currentTarget.value.search(/[0-9]/) == -1
              : true,
          );
          setNoSpecial(
            event.currentTarget.value
              ? event.currentTarget.value.search(/[!@#$%^&*()]/) == -1
              : true,
          );
          setTooShort(
            event.currentTarget.validity.valueMissing ||
              event.currentTarget.validity.tooShort,
          );
        }}
      />
      <ul className="flex flex-col gap-1">
        <li
          className={twMerge(
            "flex items-center gap-0.5 text-caption-1 text-label-alternative",
            noNumber === true && "text-accent-red-orange",
            noNumber === false && "text-status-success",
          )}
        >
          <Check /> 숫자 포함
        </li>
        <li
          className={twMerge(
            "flex items-center gap-0.5 text-caption-1 text-label-alternative",
            noSpecial === true && "text-accent-red-orange",
            noSpecial === false && "text-status-success",
          )}
        >
          <Check /> 특수문자 포함
        </li>
        <li
          className={twMerge(
            "flex items-center gap-0.5 text-caption-1 text-label-alternative",
            tooShort === true && "text-accent-red-orange",
            tooShort === false && "text-status-success",
          )}
        >
          <Check /> 최소 8자 이상
        </li>
      </ul>
    </div>
  );
}

function Check() {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current"
    >
      <path
        d="M5.75 10.4375L8.9 13.5L14.75 6.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
