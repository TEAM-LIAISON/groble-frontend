"use client";

import { ComponentPropsWithRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Exclamation from "./icons/exclamation";

export default function TextField({
  label,
  labelHelper,
  helperText,
  variantType = "box",
  maxLength,
  className,
  disabled,
  onChange,
  ...props
}: {
  label?: string;
  labelHelper?: string;
  helperText?: string;
  variantType?: "box" | "line";
} & ComponentPropsWithRef<"input">) {
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
        className={twMerge(
          "text-body-1-normal font-medium text-label-normal disabled:text-label-disable disabled:placeholder:text-label-disable",
          variantType == "box" &&
            "rounded-xs bg-background-alternative px-[14px] py-[11px] outline-[1.5px] -outline-offset-[1.5px] outline-background-alternative placeholder:text-label-alternative focus:outline-primary-normal disabled:bg-interaction-disable [&:user-invalid]:outline-status-error",
          variantType == "line" &&
            "border-b-[1.5px] border-line-neutral py-2 outline-0 focus:border-label-normal [&:user-invalid]:border-status-error [&:user-valid]:border-status-success",
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
      {(helperText || maxLength) && (
        <div className="flex items-center justify-stretch p-0.5 text-caption-1 text-label-alternative group-has-disabled:text-label-disable">
          <span
            className={twMerge(
              "flex items-center gap-1 group-has-[&:user-invalid]:text-status-error group-has-[&:user-valid]:text-status-success",
            )}
          >
            <Exclamation />
            {helperText}
          </span>
          {maxLength && (
            <span className="ml-auto">
              {(length || 0).toLocaleString()}/{maxLength.toLocaleString()}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
