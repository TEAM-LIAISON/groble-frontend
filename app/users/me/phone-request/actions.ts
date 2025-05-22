"use server";

import { authPhoneNumber, authPhoneNumberResponse } from "@/lib/api";
import { redirect } from "next/navigation";

export async function authPhoneNumberAction(
  _: authPhoneNumberResponse | null,
  formData: FormData,
) {
  const response = await authPhoneNumber(
    { phoneNumber: formData.get("phone-number") as string },
    // @ts-expect-error
    {},
  );

  if (response.status != 200) return response;

  redirect(
    `/users/me/phone-code?phone-number=${encodeURIComponent(formData.get("phone-number") as string)}`,
  );
}
