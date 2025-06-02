"use client";

import { twMerge } from "@/lib/tailwind-merge";
import Link from "next/link";
import { ComponentPropsWithRef } from "react";
import { twJoin } from "tailwind-merge";

function buttonClassName({
  group = "solid",
  type = "primary",
  size = "large",
  error,
}: {
  group?: "solid" | "outlined" | "text";
  type?: "primary" | "primary-dark" | "secondary" | "tertiary";
  size?: "large" | "medium" | "small" | "x-small";
  error?: boolean;
}) {
  return twJoin(
    "inline-flex cursor-pointer items-center justify-center gap-[4px] transition-colors",

    group == "solid" &&
      twJoin(
        type == "primary" && "bg-primary-normal text-label-normal",
        type == "primary-dark" && "bg-primary-sub-1 text-common-100",
        type == "secondary" && "bg-component-fill-normal text-label-normal",
        type == "tertiary" && "bg-[#D8FFF4] text-primary-sub-1",
      ),

    group == "outlined" &&
      twJoin(
        "outline-[1.5px] -outline-offset-[1.5px]",
        type == "primary" && "text-label-normal outline-label-normal",
        type == "secondary" && "text-primary-sub-1 outline-primary-sub-1",
        type == "tertiary" && "text-label-neutral outline-line-normal",
        error && "text-status-error outline-status-error",
      ),

    group == "text" &&
      twJoin(
        type == "primary" && "text-primary-sub-1",
        type == "secondary" && "text-label-normal",
        type == "tertiary" && "text-label-alternative",
        error && "text-status-error",
      ),

    size == "large" &&
      "rounded-12 px-[20px] py-[18px] text-headline-1 font-semibold",
    size == "medium" &&
      "rounded-8 px-[16px] py-[14px] text-headline-1 font-semibold",
    size == "small" &&
      "rounded-8 px-[16px] py-[12px] text-body-1-normal font-semibold",
    size == "x-small" &&
      "rounded-8 px-[16px] py-[9px] text-body-2-normal font-medium",
  );
}

export default function Button({
  buttonType,
  group,
  type,
  size,
  error,
  className,
  ...props
}: {
  buttonType?: "button" | "submit" | "reset";
  error?: boolean;
} & Parameters<typeof buttonClassName>[0] &
  Omit<ComponentPropsWithRef<"button">, "type">) {
  return (
    <button
      type={buttonType}
      className={twMerge(
        buttonClassName({ group, type, size, error }),
        className,
      )}
      {...props}
    />
  );
}

export function LinkButton({
  group,
  type,
  size,
  error,
  className,
  ...props
}: Parameters<typeof buttonClassName>[0] & Parameters<typeof Link>[0]) {
  return (
    <Link
      className={twMerge(
        buttonClassName({ group, type, size, error }),
        className,
      )}
      {...props}
    />
  );
}
