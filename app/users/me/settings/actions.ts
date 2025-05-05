"use server";

import {
  AdvertisingAgreementRequest,
  updateAdvertisingAgreementStatus,
} from "@/lib/api";

export async function updateAdvertisingAgreementStatusAction(
  advertisingAgreement: AdvertisingAgreementRequest,
) {
  const response = await updateAdvertisingAgreementStatus(
    advertisingAgreement,
    // @ts-expect-error
    {},
  );

  if (response.status != 200) return response;
}
