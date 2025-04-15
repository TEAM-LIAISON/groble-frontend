"use client";

import { ComponentPropsWithRef } from "react";
import { twJoin, twMerge } from "tailwind-merge";

export function buttonClassName({
  group = "solid",
  type = "primary",
  size = "large",
}: {
  group?: "solid" | "outlined" | "text";
  type?: "primary" | "primary-dark" | "secondary" | "tertiary";
  size?: "large" | "medium" | "small" | "x-small";
}) {
  return twJoin(
    "inline-flex cursor-pointer items-center justify-center gap-[4px] rounded-8",

    group == "solid" &&
      twJoin(
        type == "primary" && "bg-primary-normal text-label-normal",
        type == "primary-dark" && "bg-primary-sub-1 text-common-100",
        type == "secondary" && "bg-component-fill-strong text-label-normal",
      ),

    group == "outlined" &&
      twJoin(
        "outline-[1.5px] -outline-offset-[1.5px]",
        type == "primary" && "text-label-normal outline-label-normal",
        type == "secondary" && "text-primary-sub-1 outline-primary-sub-1",
      ),

    group == "text" &&
      twJoin(
        type == "primary" && "text-primary-sub-1",
        type == "secondary" && "text-label-normal",
        type == "tertiary" && "text-label-alternative",
      ),

    size == "large" && "px-[20px] py-[18px] text-healine-1 font-semibold",
    size == "medium" && "px-[16px] py-[14px] text-healine-1 font-medium",
    size == "small" && "px-[16px] py-[12px] text-body-1-normal font-medium",
    size == "x-small" && "px-[16px] py-[9px] text-body-2-normal font-medium",
  );
}

export default function Button({
  buttonType,
  group,
  type,
  size,
  className,
  children,
  ...props
}: {
  buttonType?: "button" | "submit" | "reset";
} & Parameters<typeof buttonClassName>[0] &
  Omit<ComponentPropsWithRef<"button">, "type">) {
  return (
    <button
      type={buttonType}
      className={twMerge(buttonClassName({ group, type, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
