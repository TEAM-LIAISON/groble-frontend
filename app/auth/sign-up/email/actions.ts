"use server";

import {
  sendEmailVerificationForSignUp,
  sendEmailVerificationForSignUpResponse,
} from "@/lib/api";
import { signUpCookie } from "@/lib/headers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function sendEmailVerificationForSignUpAction(
  _: sendEmailVerificationForSignUpResponse | null,
  formData: FormData,
) {
  const response = await sendEmailVerificationForSignUp({
    email: formData.get("email") as string,
  });

  if (response.status != 200) return response;

  (await cookies()).set(
    "Sign-Up-Email",
    formData.get("email") as string,
    signUpCookie,
  );

  redirect("/auth/sign-up/verify-code");
}
