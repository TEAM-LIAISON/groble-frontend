"use server";

import { updateNickname, updateNicknameResponse } from "@/lib/api";

export async function updateNicknameAction(
  _: updateNicknameResponse | null,
  formData: FormData,
) {
  const response = await updateNickname(
    {
      nickname: formData.get("nickname") as string,
    },
    // @ts-expect-error
    {},
  );

  return response;
}
