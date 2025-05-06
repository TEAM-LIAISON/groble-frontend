"use server";

import {
  AdvertisingAgreementRequest,
  updateAdvertisingAgreementStatus,
} from "@/lib/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

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

export async function signOutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  revalidatePath("/", "layout");
}
