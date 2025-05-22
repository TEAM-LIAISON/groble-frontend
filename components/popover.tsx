"use client";

import { twMerge } from "@/lib/tailwind-merge";
import { ReactNode } from "react";
import { twJoin } from "tailwind-merge";
import Button from "./button";

export default function Popover({
  id,
  children,
}: {
  id?: string;
  children?: ReactNode;
}) {
  return (
    <div
      id={id}
      popover=""
      className={twJoin(
        "inset-[37.5px] m-auto h-fit w-auto max-w-[300px] rounded-[20px] bg-background-alternative p-[20px] backdrop:bg-label-neutral md:max-w-[400px] md:p-8",
        "opacity-0 transition-all transition-discrete backdrop:opacity-0 backdrop:transition-all open:opacity-100 open:backdrop:opacity-30 starting:open:opacity-0 starting:open:backdrop:opacity-0",
      )}
    >
      {children}
    </div>
  );
}

export function HintPopover({
  id,
  children,
}: {
  id?: string;
  children?: ReactNode;
}) {
  return (
    <div
      id={id}
      // @ts-expect-error
      popover="hint"
      className="inset-auto m-4 rounded-4 bg-component-fill-neutral p-2.5 text-caption-1 font-medium text-label-inverse [position-area:right]"
    >
      <HintPopoverArrow />
      {children}
    </div>
  );
}

function HintPopoverArrow() {
  return (
    <svg
      width="13"
      height="16"
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -left-2 [position-area:left]"
    >
      <path
        d="M1 9.73205C-0.333332 8.96225 -0.333334 7.03775 0.999999 6.26795L10 1.0718C11.3333 0.301996 13 1.26425 13 2.80385L13 13.1962C13 14.7358 11.3333 15.698 10 14.9282L1 9.73205Z"
        fill="#878A93"
      />
    </svg>
  );
}

export function PopoverClose({
  popoverTarget,
  className,
}: {
  popoverTarget?: string;
  className?: string;
}) {
  return (
    <Button
      type="secondary"
      size="small"
      popoverTarget={popoverTarget}
      popoverTargetAction="hide"
      className={twMerge("bg-component-fill-normal", className)}
      buttonType="button"
    >
      닫기
    </Button>
  );
}
