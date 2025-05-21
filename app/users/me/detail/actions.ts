"use server";

import {
  getUploadProfileImageUrl,
  switchUserType,
  uploadProfileImageResponse,
  UserTypeRequest,
} from "@/lib/api";
import { customFetch } from "@/lib/custom-fetch";
import { revalidatePath } from "next/cache";

export async function switchUserTypeAction(userTypeRequest: UserTypeRequest) {
  const response = await switchUserType(
    userTypeRequest,
    // @ts-expect-error
    {},
  );

  return response;
}

export async function uploadProfileImageAction(profileImage: File) {
  const formData = new FormData();
  formData.append("profileImage", profileImage);
  const response = await customFetch<uploadProfileImageResponse>(
    getUploadProfileImageUrl(
      // @ts-expect-error
      {},
    ),
    {
      method: "POST",
      body: formData,
    },
  );

  if (response.status == 201) revalidatePath("/users/me/detail", "layout");

  return response;
}
