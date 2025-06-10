"use server";

import {
  UserWithdrawalRequestReason,
  withdrawUser,
  withdrawUserResponse,
} from "@/lib/api";

export async function withdrawUserAction(
  _: withdrawUserResponse | null,
  formData: FormData,
) {
  const response = await withdrawUser(
    {
      reason: formData.get("reason") as UserWithdrawalRequestReason,
      additionalComment: formData.get("additional-comment") as string,
    },
    // @ts-expect-error
    {},
  );

  return response;
}
