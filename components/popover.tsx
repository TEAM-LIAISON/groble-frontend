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
      className="inset-[37.5px] m-auto h-fit w-auto rounded-[20px] bg-background-alternative p-[26px] backdrop:bg-label-neutral backdrop:opacity-30"
    >
      <div className="flex flex-col justify-center gap-5">{children}</div>
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
