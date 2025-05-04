"use client";

import { ReactNode } from "react";
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
      popover="auto"
      className="inset-[37.5px] m-auto h-fit w-auto max-w-[260px] rounded-[20px] bg-background-alternative p-[26px] backdrop:bg-label-neutral backdrop:opacity-30"
    >
      {children}
    </div>
  );
}

export function PopoverClose({ popoverTarget }: { popoverTarget?: string }) {
  return (
    <Button
      type="secondary"
      size="small"
      className="flex-1"
      popoverTarget={popoverTarget}
      popoverTargetAction="hide"
    >
      닫기
    </Button>
  );
}
