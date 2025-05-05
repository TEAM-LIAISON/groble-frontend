"use client";

import Switch from "@/components/switch";
import { toastErrorMessage } from "@/lib/error";
import { startTransition } from "react";
import { updateAdvertisingAgreementStatusAction } from "./actions";

export default function AdvertisingAgreement() {
  return (
    <label className="flex items-center gap-2 px-4 py-5">
      <span className="flex-1">광고성 정보 수신 동의</span>
      <Switch
        onChange={(event) =>
          startTransition(async () =>
            toastErrorMessage(
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
