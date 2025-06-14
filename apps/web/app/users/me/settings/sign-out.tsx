"use client";

import { Button } from "@groble/ui";
import Popover, { PopoverClose } from "@/components/popover";
import { useUserStore } from "@/lib/store/useUserStore";
import { twMerge } from "@/lib/tailwind-merge";
import { startTransition } from "react";
import { logoutAction } from "./actions";
import itemClassName from "./item";

export default function SignOut() {
  return (
    <>
      <button
        popoverTarget="sign-out"
        className={twMerge(itemClassName(), "block text-left")}
      >
        로그아웃
      </button>
      <SignOutPopover />
    </>
  );
}

export function SignOutPopover() {
  const userStore = useUserStore();

  return (
    <Popover id="sign-out">
      <div className="flex flex-col justify-center gap-5">
        <div className="text-headline-1 font-bold text-label-normal">
          로그아웃할까요?
        </div>
        <div className="grid grid-cols-2 gap-2">
          <PopoverClose popoverTarget="sign-out" />
          <Button
            size="small"
            onClick={() =>
              startTransition(async () => {
                await userStore.logout();
                await logoutAction();
              })
            }
          >
            로그아웃
          </Button>
        </div>
      </div>
    </Popover>
  );
}
