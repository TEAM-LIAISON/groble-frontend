"use server";

import {
  sendEmailVerificationForChangeEmail,
  sendEmailVerificationForSignUpResponse,
  verifyEmailCodeForChangeEmail,
  verifyEmailCodeResponse,
} from "@/lib/api";
import { redirect } from "next/navigation";

export async function verifyEmailCodeForChangeEmailAction(
  _: verifyEmailCodeResponse | null,
  formData: FormData,
) {
  const response = await verifyEmailCodeForChangeEmail(
    {
      email: formData.get("email") as string,
      verificationCode: formData.get("verification-code") as string,
    },
    // @ts-expect-error
    {},
  );

  if (response.status != 200) return response;

  redirect("/users/me/email-complete");
}

export async function sendEmailVerificationForChangeEmailAction(
  _: sendEmailVerificationForSignUpResponse | null,
  email: string,
) {
  const response = await sendEmailVerificationForChangeEmail(
    { email },
    // @ts-expect-error
    {},
  );

  return response;
}
