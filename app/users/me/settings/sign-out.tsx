"use client";

import Button from "@/components/button";
import Popover, { PopoverClose } from "@/components/popover";
import { useId } from "react";
import { twMerge } from "tailwind-merge";
import { signOutAction } from "./actions";
import itemClassName from "./item";

export default function SignOut() {
  const id = useId();

  return (
    <>
      <button
        popoverTarget={id}
        className={twMerge(itemClassName(), "block text-left")}
      >
        로그아웃
      </button>
      <Popover id={id}>
        <div className="flex flex-col justify-center gap-5">
          <div className="text-headline-1 font-bold text-label-normal">
            로그아웃할까요?
          </div>
          <div className="grid grid-cols-2 gap-2">
            <PopoverClose popoverTarget={id} />
            <Button size="small" onClick={signOutAction}>
              로그아웃
            </Button>
          </div>
        </div>
      </Popover>
    </>
  );
}
