"use client";

import { LinkButton } from "@groble/ui";
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
        className={twMerge(itemClassName(), "flex items-center text-left")}
      >
        <span className="flex-1">탈퇴하기</span>
        <span className="hidden md:inline-block">
          <RightArrow />
        </span>
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

function RightArrow({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.22618 5.54238C8.91832 5.85929 8.92566 6.36577 9.24257 6.67363L15.0685 12.3331L9.2264 18.3421C8.91842 18.6589 8.92555 19.1654 9.24234 19.4734C9.55913 19.7814 10.0656 19.7743 10.3736 19.4575L16.7736 12.8746C16.9215 12.7224 17.003 12.5177 16.9999 12.3055C16.9969 12.0933 16.9097 11.891 16.7574 11.7431L10.3574 5.52598C10.0405 5.21812 9.53404 5.22546 9.22618 5.54238Z"
        fill="#878A93"
      />
    </svg>
  );
}
