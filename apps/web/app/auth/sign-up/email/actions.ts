"use server";

import {
  sendEmailVerificationForSignUp,
  sendEmailVerificationForSignUpResponse,
} from "@/lib/api";
import { redirect } from "next/navigation";
import { updateSignUp } from "../actions";

export async function sendEmailVerificationForSignUpAction(
  _: sendEmailVerificationForSignUpResponse | null,
  formData: FormData,
) {
  const response = await sendEmailVerificationForSignUp({
    email: formData.get("email") as string,
  });

  if (response.status != 200) return response;

  await updateSignUp({ email: formData.get("email") as string });

  redirect("/auth/sign-up/verify-code");
}
