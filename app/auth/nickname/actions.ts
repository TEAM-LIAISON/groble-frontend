"use server";

import {
  setNickname,
  setNicknameResponse400,
  SetPasswordParams,
} from "@/lib/api";
import { redirect } from "next/navigation";

export async function setNicknameAction(
  _: setNicknameResponse400 | null,
  formData: FormData,
) {
  const response = await setNickname(
    {
      nickname: formData.get("nickname") as string,
    },
    undefined as unknown as SetPasswordParams,
  );

  if (response.status != 200) return response;

  redirect("/users/welcome");
}
