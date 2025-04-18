"use server";

import {
  sendEmailVerificationForSignUp,
  sendEmailVerificationForSignUpResponse,
} from "@/lib/api";
import { redirect } from "next/navigation";

export async function sendEmailVerificationForSignUpAction(
  _: sendEmailVerificationForSignUpResponse | null,
  formData: FormData,
) {
  const response = await sendEmailVerificationForSignUp({
    email: formData.get("email") as string,
  });

  if (400 <= response.status && response.status <= 499) return response;

  redirect(
    `/auth/verify-code/sign-up?email=${encodeURIComponent(formData.get("email") as string)}`,
  );
}
