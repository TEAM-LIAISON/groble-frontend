"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setPhoneSellerTermsAction(
  _: void | null,
  formData: FormData,
) {
  (await cookies()).set("Maker-Terms-Agreement", "true");

  redirect("/auth/sign-up/phone-request");
}
