"use client";

import Button from "@/components/button";
import Popover, { PopoverClose } from "@/components/popover";
import { switchUserTypeResponse } from "@/lib/api";
import { useToastErrorMessage } from "@/lib/error";
import { ReactNode, useId, useState, useTransition } from "react";
import { switchUserTypeAction } from "./actions";

export default function SwitchRoleButton({
  userType,
  children,
}: {
  userType?: string;
  children?: ReactNode;
}) {
  const id = useId();
  const [, startTransition] = useTransition();
  const [response, setResponse] = useState<switchUserTypeResponse>();
  useToastErrorMessage(response);
  const userTypeToSwitch =
    userType == "BUYER" ? "SELLER" : userType == "SELLER" ? "BUYER" : userType;

  return (
    <>
      <button popoverTarget={id} className="appearance-none text-left">
        {children}
      </button>
      <Popover id={id}>
        <div className="flex flex-col justify-center gap-5">
          <div className="flex flex-col gap-1">
            <div className="text-headline-1 font-bold text-label-normal">
              {userTypeToSwitch == "SELLER" && "판매자"}
              {userTypeToSwitch == "BUYER" && "구매자"}로 전환할까요?
            </div>
            <div className="text-body-2-normal font-medium text-label-neutral">
              언제든 {userType == "SELLER" && "판매자"}
              {userType == "BUYER" && "구매자"}로 전환할 수 있어요.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <PopoverClose popoverTarget={id} />
            <Button
              size="small"
              onClick={() =>
                startTransition(async () =>
                  setResponse(
                    await switchUserTypeAction({ userType: userTypeToSwitch! }),
                  ),
                )
              }
            >
              전환하기
            </Button>
          </div>
        </div>
      </Popover>
    </>
  );
}
