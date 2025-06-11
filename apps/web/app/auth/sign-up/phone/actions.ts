"use server";

import { signUpResponse } from "@/lib/api";
import { signUpAction, updateSignUp } from "../actions";

export async function setPhoneNumberAction(
  _: signUpResponse | null | undefined,
  formData: FormData,
) {
  await updateSignUp({ phoneNumber: formData.get("phone-number") as string });

  const response = await signUpAction();

  // @ts-expect-error
  if (response.status != 201) return response;
}
