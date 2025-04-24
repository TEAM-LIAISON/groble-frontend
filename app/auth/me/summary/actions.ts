"use server";

import {
  getUserMyPageSummary,
  getUserMyPageSummaryResponse,
  SetPasswordParams,
} from "@/lib/api";

export async function getUserMyPageSummaryAction(
  _: getUserMyPageSummaryResponse | null,
) {
  const response = await getUserMyPageSummary(
    undefined as unknown as SetPasswordParams,
  );

  return response;
}
