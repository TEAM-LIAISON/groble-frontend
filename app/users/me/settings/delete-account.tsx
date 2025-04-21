"use client";

import { buttonClassName } from "@/components/button";
import Popover, { PopoverClose } from "@/components/popover";
import Link from "next/link";
import { useId } from "react";
import { twMerge } from "tailwind-merge";

export default function DeleteAccount() {
  const id = useId();

  return (
    <>
      <button popoverTarget={id} className="block w-full text-left">
        탈퇴하기
      </button>
      <Popover id={id}>
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
        <div className="flex gap-2">
          <PopoverClose popoverTarget={id} />
          <Link
            className={twMerge(buttonClassName({ size: "small" }), "flex-1")}
            href="/auth/delete-account"
          >
            탈퇴하기
          </Link>
        </div>
      </Popover>
    </>
  );
}
