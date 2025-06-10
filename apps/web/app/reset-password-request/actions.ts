"use server";

import { requestPasswordReset, requestPasswordResetResponse } from "@/lib/api";
import { redirect } from "next/navigation";

export async function requestPasswordResetAction(
  _: requestPasswordResetResponse | null,
  formData: FormData,
) {
  const response = await requestPasswordReset({
    email: formData.get("email") as string,
  });

  if (response.status == 200) redirect("/reset-password-request-complete");
  else return response;
}
