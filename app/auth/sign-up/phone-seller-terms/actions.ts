"use server";

import {
  agreeMakerTermsResponse400,
  getUserMyPageDetail,
  getUserMyPageDetailResponse401,
} from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setPhoneSellerTermsAction(
  _: getUserMyPageDetailResponse401 | agreeMakerTermsResponse400 | null,
  formData: FormData,
) {
  const response = await getUserMyPageDetail(
    // @ts-expect-error
    {},
  );

  if (response.status != 200) return response;

  (await cookies()).set("Maker-Terms-Agreement", "true");

  redirect("/auth/sign-up/phone-request");
}
