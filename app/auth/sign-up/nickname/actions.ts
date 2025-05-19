"use server";

import { signUpResponse } from "@/lib/api";
import { redirect } from "next/navigation";
import { getSignUp, signUpAction, updateSignUp } from "../actions";

export async function setNicknameAction(
  _: signUpResponse | null | undefined,
  formData: FormData,
) {
  await updateSignUp({ nickname: formData.get("nickname") as string });

  const { userType } = await getSignUp();

  if (userType == "SELLER") {
    redirect("/auth/sign-up/phone-number");
  } else {
    const response = await signUpAction();

    // @ts-expect-error
    if (response.status != 201) return response;
  }
}
