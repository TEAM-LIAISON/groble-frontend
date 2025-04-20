"use client";

import { ReactNode } from "react";
import Button from "./button";

export default function Popover({ children }: { children?: ReactNode }) {
  return (
    <div id="popover" popover="auto">
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-background-alternative">
        {children}
      </div>
    </div>
  );
}

export function PopoverClose() {
  return (
    <Button
      type="secondary"
      size="small"
      className="flex-1"
      popoverTarget="popover"
      popoverTargetAction="hide"
    >
      닫기
    </Button>
  );
}
