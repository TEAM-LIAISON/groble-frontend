"use server";

import {
  sendEmailVerificationForChangeEmail,
  sendEmailVerificationForChangeEmailResponse,
} from "@/lib/api";
import { redirect } from "next/navigation";

export async function sendEmailVerificationForChangeEmailAction(
  _: sendEmailVerificationForChangeEmailResponse | null,
  formData: FormData,
) {
  const response = await sendEmailVerificationForChangeEmail(
    {
      email: formData.get("email") as string,
    },
    // @ts-expect-error
    {},
  );

  if (response.status != 200) return response;

  redirect("/users/me/verify-code");
}
