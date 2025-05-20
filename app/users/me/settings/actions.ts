"use server";

import {
  AdvertisingAgreementRequest,
  logout,
  updateAdvertisingAgreementStatus,
} from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateAdvertisingAgreementStatusAction(
  advertisingAgreement: AdvertisingAgreementRequest,
) {
  const response = await updateAdvertisingAgreementStatus(
    advertisingAgreement,
    // @ts-expect-error
    {},
  );

  return response;
}

export async function signOutAction() {
  try {
    await logout(
      // @ts-expect-error
      {},
    );
  } catch (error) {
    console.error(error);
  }

  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  redirect("/");
}
