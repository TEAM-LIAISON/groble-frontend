"use server";

import {
  checkNicknameDuplicate,
  checkNicknameDuplicateResponse,
  signUpResponse,
} from "@/lib/api";
import { redirect } from "next/navigation";
import { getSignUp, signUpAction, updateSignUp } from "../actions";

export async function setNicknameAction(
  _: signUpResponse | checkNicknameDuplicateResponse | null | undefined,
  formData: FormData,
) {
  const response = await checkNicknameDuplicate({
    nickname: formData.get("nickname") as string,
  });

  if (response.status != 200) return response;

  await updateSignUp({ nickname: formData.get("nickname") as string });

  const { userType } = await getSignUp();

  if (userType == "SELLER") {
    redirect("/auth/sign-up/phone-seller-terms");
  } else {
    const response = await signUpAction();

    // @ts-expect-error
    if (response.status != 201) return response;
  }
}
