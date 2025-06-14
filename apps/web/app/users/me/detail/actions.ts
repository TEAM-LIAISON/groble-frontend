"use server";

import {
  getUploadProfileImageUrl,
  switchUserType,
  uploadProfileImageResponse,
  UserTypeRequest,
} from "@/lib/api";
import { customFetch } from "@/lib/custom-fetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function switchUserTypeAction(userTypeRequest: UserTypeRequest) {
  const response = await switchUserType(
    userTypeRequest,
    // @ts-expect-error
    {},
  );

  if (response.status != 204) return response;

  redirect("/users/me");
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
