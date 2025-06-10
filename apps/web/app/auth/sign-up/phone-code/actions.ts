"use server";

import { verifyPhoneNumber, verifyPhoneNumberResponse } from "@/lib/api";
import { redirect } from "next/navigation";
import { updateSignUp } from "../actions";

export async function verifyPhoneNumberAction(
  _: verifyPhoneNumberResponse | null,
  formData: FormData,
) {
  const response = await verifyPhoneNumber(
    {
      phoneNumber: formData.get("phone-number") as string,
      verificationCode: formData.get("verification-code") as string,
    },
    // @ts-expect-error
    {},
  );

  if (response.status != 200) return response;

  await updateSignUp({ phoneNumber: formData.get("phone-number") as string });

  redirect("/auth/sign-up/phone-complete");
}
