"use client";

import { LinkButton } from "@/components/button";
import Popover, { PopoverClose } from "@/components/popover";
import { twMerge } from "@/lib/tailwind-merge";
import { useId } from "react";
import itemClassName from "./item";

export default function DeleteAccount() {
  const id = useId();

  return (
    <>
      <button
        popoverTarget={id}
        className={twMerge(itemClassName(), "block text-left")}
      >
        탈퇴하기
      </button>
      <Popover id={id}>
        <div className="flex flex-col justify-center gap-5">
          <div className="flex flex-col gap-1">
            <div className="text-headline-1 font-bold text-label-normal">
              탈퇴하시겠어요?
            </div>
            <div className="text-body-2-normal font-medium text-label-neutral">
              탈퇴하시면 지금까지 저장된
              <br />
              소중한 정보들이 모두 사라져요.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <PopoverClose popoverTarget={id} />
            <LinkButton size="small" href="/users/me/delete-account">
              탈퇴하기
            </LinkButton>
          </div>
        </div>
      </Popover>
    </>
  );
}
