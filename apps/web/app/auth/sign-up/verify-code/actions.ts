"use server";

import {
  sendEmailVerificationForSignUp,
  sendEmailVerificationForSignUpResponse,
  verifyEmailCode,
  verifyEmailCodeResponse,
} from "@/lib/api";
import { redirect } from "next/navigation";

export async function verifyEmailCodeAction(
  _: verifyEmailCodeResponse | null,
  formData: FormData,
) {
  const response = await verifyEmailCode({
    email: formData.get("email") as string,
    verificationCode: formData.get("verification-code") as string,
  });

  if (response.status != 200) return response;

  redirect("/auth/sign-up/password");
}

export async function sendEmailVerificationForSignUpAction(
  _: sendEmailVerificationForSignUpResponse | null,
  email: string,
) {
  const response = await sendEmailVerificationForSignUp({ email });

  return response;
}
