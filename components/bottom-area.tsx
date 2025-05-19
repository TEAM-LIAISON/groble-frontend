"use client";

import { twMerge } from "@/lib/tailwind-merge";
import { useVirtualKeyboardOpen } from "@/lib/virtual-keyboard";
import { ComponentPropsWithRef } from "react";
import Button, { LinkButton } from "./button";

export default function BottomArea({ ...props }: ComponentPropsWithRef<"div">) {
  return (
    <>
      <div className="h-[88px]" />
      <div
        className="fixed right-0 bottom-0 left-0 m-auto flex max-w-[480px] flex-col"
        {...props}
      />
    </>
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
        "m-5 mb-5 flex rounded-8 transition-all group-has-invalid:bg-interaction-disable group-has-invalid:text-label-disable",
        virtualKeyboardOpen && "m-0 rounded-none",
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
        "m-5 mb-5 flex rounded-8 transition-all group-has-invalid:bg-interaction-disable group-has-invalid:text-label-disable",
        virtualKeyboardOpen && "m-0 rounded-none",
        className,
      )}
      {...props}
    />
  );
}
