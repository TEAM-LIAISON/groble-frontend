"use client";

import Switch from "@/components/switch";
import { updateAdvertisingAgreementStatusResponse } from "@/lib/api";
import { useToastErrorMessage } from "@/lib/error";
import { twMerge } from "@/lib/tailwind-merge";
import { useState, useTransition } from "react";
import { updateAdvertisingAgreementStatusAction } from "./actions";
import itemClassName from "./item";

export default function AdvertisingAgreement({ agreed }: { agreed: boolean }) {
  const [, startTransition] = useTransition();
  const [response, setResponse] =
    useState<updateAdvertisingAgreementStatusResponse>();
  useToastErrorMessage(response);

  return (
    <label className={twMerge(itemClassName(), "flex items-center gap-2")}>
      <span className="flex-1">광고성 정보 수신 동의</span>
      <Switch
        defaultChecked={agreed}
        onChange={(event) =>
          startTransition(async () =>
            setResponse(
              await updateAdvertisingAgreementStatusAction({
                agreed: event.currentTarget.checked,
              }),
            ),
          )
        }
      />
    </label>
  );
}
