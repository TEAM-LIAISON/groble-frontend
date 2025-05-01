"use client";

import { twMerge } from "@/lib/tailwind-merge";
import { useVirtualKeyboardOpen } from "@/lib/virtual-keyboard";
import Link from "next/link";
import { ComponentPropsWithRef } from "react";
import { twJoin } from "tailwind-merge";

function buttonClassName({
  group = "solid",
  type = "primary",
  size = "large",
}: {
  group?: "solid" | "outlined" | "text";
  type?: "primary" | "primary-dark" | "secondary" | "tertiary";
  size?: "large" | "medium" | "small" | "x-small";
}) {
  return twJoin(
    "inline-flex cursor-pointer items-center justify-center gap-[4px] rounded-8 transition-colors",

    group == "solid" &&
      twJoin(
        type == "primary" && "bg-primary-normal text-label-normal",
        type == "primary-dark" && "bg-primary-sub-1 text-common-100",
        type == "secondary" && "bg-component-fill-normal text-label-normal",
      ),

    group == "outlined" &&
      twJoin(
        "outline-[1.5px] -outline-offset-[1.5px]",
        type == "primary" && "text-label-normal outline-label-normal",
        type == "secondary" && "text-primary-sub-1 outline-primary-sub-1",
        type == "tertiary" && "text-label-neutral outline-line-normal",
      ),

    group == "text" &&
      twJoin(
        type == "primary" && "text-primary-sub-1",
        type == "secondary" && "text-label-normal",
        type == "tertiary" && "text-label-alternative",
      ),

    size == "large" && "text-healine-1 px-[20px] py-[18px] font-semibold",
    size == "medium" && "text-healine-1 px-[16px] py-[14px] font-semibold",
    size == "small" && "px-[16px] py-[12px] text-body-1-normal font-semibold",
    size == "x-small" && "px-[16px] py-[9px] text-body-2-normal font-semibold",
  );
}

export default function Button({
  buttonType,
  group,
  type,
  size,
  className,
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
    />
  );
}

export function LinkButton({
  group,
  type,
  size,
  className,
  ...props
}: Parameters<typeof buttonClassName>[0] & Parameters<typeof Link>[0]) {
  return (
    <Link
      className={twMerge(buttonClassName({ group, type, size }), className)}
      {...props}
    />
  );
}

export function BottomButton({
  size,
  className,
  ...props
}: Parameters<typeof Button>[0]) {
  const virtualKeyboardOpen = useVirtualKeyboardOpen();

  return (
    <Button
      size={size ?? "small"}
      className={twMerge(
        "m-5 mb-5 flex rounded-8 group-has-invalid:bg-interaction-disable group-has-invalid:text-label-disable",
        virtualKeyboardOpen && "m-0 rounded-none",
        className,
      )}
      {...props}
    />
  );
}
