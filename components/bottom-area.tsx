"use client";

import { twMerge } from "@/lib/tailwind-merge";
import { useVirtualKeyboardOpen } from "@/lib/virtual-keyboard";
import { ComponentPropsWithRef } from "react";
import Button, { LinkButton } from "./button";

export default function BottomArea({
  narrow,
  ...props
}: { narrow?: boolean } & ComponentPropsWithRef<"div">) {
  return (
    <div className="w-full">
      <div className="h-[88px]" />
      <div
        className={twMerge(
          "fixed right-0 bottom-0 left-0 m-auto flex max-w-[1250px] flex-col px-5 sm:px-8 lg:px-12",
          narrow && "max-w-none sm:p-0 md:max-w-[480px] lg:p-0",
        )}
        {...props}
      />
    </div>
  );
}

export function BottomButton({
  size,
  className,
  disabled,
  ...props
}: Parameters<typeof Button>[0]) {
  const virtualKeyboardOpen = useVirtualKeyboardOpen();

  return (
    <Button
      size={size ?? "small"}
      className={twMerge(
        "mb-5 flex rounded-8 transition-all group-has-invalid:bg-interaction-disable group-has-invalid:text-label-disable hover:brightness-95",
        virtualKeyboardOpen && "m-0 rounded-none",
        disabled && "cursor-not-allowed opacity-50",

        className,
      )}
      {...props}
    />
  );
}

export function BottomLinkButton({
  size,
  className,
  ...props
}: Parameters<typeof LinkButton>[0]) {
  const virtualKeyboardOpen = useVirtualKeyboardOpen();

  return (
    <LinkButton
      size={size ?? "small"}
      className={twMerge(
        "mb-5 flex rounded-8 transition-all group-has-invalid:bg-interaction-disable group-has-invalid:text-label-disable hover:brightness-95",
        virtualKeyboardOpen && "m-0 rounded-none",
        className,
      )}
      {...props}
    />
  );
}
