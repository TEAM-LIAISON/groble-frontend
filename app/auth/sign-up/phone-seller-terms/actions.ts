"use server";

import {
  agreeMakerTermsResponse400,
  getUserMyPageDetailResponse401,
} from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setPhoneSellerTermsAction(
  _: getUserMyPageDetailResponse401 | agreeMakerTermsResponse400 | null,
  formData: FormData,
) {
  (await cookies()).set("Maker-Terms-Agreement", "true");

  redirect("/auth/sign-up/phone-request");
}
