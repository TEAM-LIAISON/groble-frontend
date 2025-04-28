"use server";

import { resetPassword, resetPasswordResponse } from "@/lib/api";
import { redirect } from "next/navigation";

export async function resetPasswordAction(
  _: resetPasswordResponse | null,
  formData: FormData,
) {
  const response = await resetPassword(
    {
      newPassword: formData.get("new-password") as string,
      token: formData.get("token") as string,
    },
    // @ts-expect-error
    {},
  );

  if (response.status == 200) redirect("/auth/password/reset-success");
  else return response;
}
