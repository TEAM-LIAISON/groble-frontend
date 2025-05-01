"use server";

import { requestPasswordReset, requestPasswordResetResponse } from "@/lib/api";
import { redirect } from "next/navigation";

export async function requestPasswordResetAction(
  _: requestPasswordResetResponse | null,
  formData: FormData,
) {
  const response = await requestPasswordReset(
    {
      email: formData.get("email") as string,
    },
    // @ts-expect-error
    {},
  );

  if (response.status == 200) redirect("/auth/password/reset-request-complete");
  else return response;
}
