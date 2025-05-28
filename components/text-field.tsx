"use client";

import { twMerge } from "@/lib/tailwind-merge";
import {
  ComponentPropsWithRef,
  HTMLInputTypeAttribute,
  ReactNode,
  useRef,
  useState,
} from "react";
import { twJoin } from "tailwind-merge";

function textFieldInputClassName({
  type,
  error,
  value,
}: {
  type: "box" | "line";
  error?: boolean;
  value?: string;
}) {
  // 값이 있으면 에러 스타일을 적용하지 않음
  const shouldShowError = error && (!value || value.trim() === "");

  return twJoin(
    "appearance-none text-body-1-normal font-medium text-label-normal disabled:text-label-disable disabled:placeholder:text-label-disable",
    type == "box" &&
      "rounded-4 bg-background-alternative px-[14px] py-[15px] outline-[1.5px] -outline-offset-[1.5px] outline-background-alternative placeholder:text-label-alternative user-invalid:outline-status-error focus:outline-primary-normal focus:invalid:outline-status-error disabled:bg-interaction-disable",
    type == "line" &&
      "border-b-[1.5px] border-line-neutral py-2 outline-0 user-valid:border-status-success user-invalid:border-status-error focus:border-label-normal",
    shouldShowError &&
      type == "box" &&
      "outline-status-error placeholder:text-status-error",
    shouldShowError &&
      type == "line" &&
      "border-status-error placeholder:text-status-error",
  );
}

export default function TextField({
  label,
  labelHelper,
  helperText,
  errorText,
  type = "box",
  maxLength,
  className,
  disabled,
  onChange,
  inputType,
  error,
  ...props
}: {
  label?: string;
  labelHelper?: string;
  helperText?: ReactNode;
  errorText?: ReactNode;
  type?: "box" | "line";
  inputType?: HTMLInputTypeAttribute;
  error?: boolean;
} & Omit<ComponentPropsWithRef<"input">, "type">) {
  const [length, setLength] = useState(0);

  return (
    <label className="group flex flex-col gap-1">
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
          textFieldInputClassName({
            type,
            error,
            value: props.value as string,
          }),
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
        errorText={errorText}
        length={length}
        maxLength={maxLength}
      />
    </label>
  );
}

export function BottomText({
  helperText,
  errorText,
  length,
  maxLength,
}: {
  helperText?: ReactNode;
  errorText?: ReactNode;
  length?: number;
  maxLength?: number;
}) {
  return (
    <>
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
      {errorText && (
        <div className="flex items-center justify-stretch p-0.5 text-caption-1 text-label-alternative group-has-disabled:text-label-disable">
          <span
            className={twMerge("flex items-center gap-1 text-status-error")}
          >
            <Exclamation />
            {errorText}
          </span>
        </div>
      )}
    </>
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

export function PasswordTextField({ name }: { name?: string }) {
  const [noNumber, setNoNumber] = useState<boolean | null>(null);
  const [noSpecial, setNoSpecial] = useState<boolean | null>(null);
  const [tooShort, setTooShort] = useState<boolean | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <TextField
        name={name ?? "password"}
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
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.33594 10.9375L9.48594 14L15.3359 7"
        className="stroke-[currentcolor]"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TextAreaTextField({
  label,
  labelHelper,
  helperText,
  errorText,
  className,
  type = "box",
  onChange,
  value,
  error,
  maxLength,
  disabled,
  ...props
}: {
  label?: string;
  labelHelper?: string;
  helperText?: ReactNode;
  errorText?: ReactNode;
  className?: string;
  type?: "box" | "line";
  error?: boolean;
  maxLength?: number;
  disabled?: boolean;
} & ComponentPropsWithRef<"textarea">) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [length, setLength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLength(e.currentTarget.value.length);
    onChange?.(e);
  };

  return (
    <label className="group flex flex-col gap-1">
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
      <textarea
        ref={textareaRef}
        rows={1}
        className={twMerge(
          textFieldInputClassName({ type, error, value: String(value) }),
          "resize-none overflow-hidden",
          className,
        )}
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        onChange={handleChange}
        {...props}
      />
      <BottomText
        helperText={helperText}
        errorText={errorText}
        length={length}
        maxLength={maxLength}
      />
    </label>
  );
}
