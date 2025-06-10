"use server";

import { resetPassword, resetPasswordResponse } from "@/lib/api";
import { redirect } from "next/navigation";

export async function resetPasswordAction(
  _: resetPasswordResponse | null,
  formData: FormData,
) {
  const response = await resetPassword({
    newPassword: formData.get("new-password") as string,
    token: formData.get("token") as string,
  });

  if (response.status == 200) redirect("/reset-password-complete");
  else return response;
}
