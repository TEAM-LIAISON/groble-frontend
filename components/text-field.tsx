"use client";

import { twMerge } from "@/lib/tailwind-merge";
import { ComponentPropsWithRef, HTMLInputTypeAttribute, useState } from "react";
import Check from "./icons/check";
import Exclamation from "./icons/exclamation";

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
        minLength={6}
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
          <Check /> 최소 6자 이상
        </li>
      </ul>
    </div>
  );
}
