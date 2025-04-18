"use server";

import { resetPassword, resetPasswordResponse } from "@/lib/api";

export async function setPasswordAction(
  _: resetPasswordResponse | null,
  formData: FormData,
) {
  const response = await resetPassword({
    token: formData.get("token") as string,
    newPassword: formData.get("new-password") as string,
  });

  if (response.status != 200) return response;

  //   redirect("/");
}
