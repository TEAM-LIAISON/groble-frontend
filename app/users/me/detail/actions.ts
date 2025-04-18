"use server";

import {
  getUserMyPageDetail,
  getUserMyPageDetailResponse,
  SetPasswordParams,
} from "@/lib/api";

export async function getUserMyPageDetailAction(
  _: getUserMyPageDetailResponse | null,
) {
  const response = await getUserMyPageDetail(
    undefined as unknown as SetPasswordParams,
  );

  return response;
}
