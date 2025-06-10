"use server";

import { updateNickname, updateNicknameResponse } from "@/lib/api";
import { redirect } from "next/navigation";

export async function updateNicknameAction(
  _: updateNicknameResponse | null | undefined,
  formData: FormData,
) {
  const response = await updateNickname(
    {
      nickname: formData.get("nickname") as string,
    },
    // @ts-expect-error
    {},
  );

  if (response.status != 200) return response;

  redirect("/users/me");
}
