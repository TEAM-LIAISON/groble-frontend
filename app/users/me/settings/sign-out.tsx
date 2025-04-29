"use client";

import Button from "@/components/button";
import Popover, { PopoverClose } from "@/components/popover";
import { useId } from "react";

export default function SignOut() {
  const id = useId();

  return (
    <>
      <button popoverTarget={id} className="block w-full text-left">
        로그아웃
      </button>
      <Popover id={id}>
        <div className="flex flex-col justify-center gap-5">
          <div className="text-headline-1 font-bold text-label-normal">
            로그아웃할까요?
          </div>
          <div className="flex gap-2">
            <PopoverClose popoverTarget={id} />
            <Button size="small" className="flex-1">
              로그아웃
            </Button>
          </div>
        </div>
      </Popover>
    </>
  );
}
