"use server";

import { signUpResponse } from "@/lib/api";
import { signUpCookie } from "@/lib/headers";
import { cookies } from "next/headers";
import { signUpAction } from "../actions";

export async function setNicknameAction(
  _: signUpResponse | null | undefined,
  formData: FormData,
) {
  (await cookies()).set(
    "Sign-Up-Nickname",
    formData.get("nickname") as string,
    signUpCookie,
  );

  const response = await signUpAction();

  // @ts-expect-error
  if (response.status != 201) return response;
}
