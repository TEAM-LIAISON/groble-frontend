"use server";

import { switchUserType, uploadProfileImage, UserTypeRequest } from "@/lib/api";

export async function switchUserTypeAction(userTypeRequest: UserTypeRequest) {
  const response = switchUserType(
    userTypeRequest,
    // @ts-expect-error
    {},
  );

  return response;
}

export async function uploadProfileImageAction(profileImage: File) {
  const response = await uploadProfileImage(
    { profileImage },
    // @ts-expect-error
    {},
  );

  return response;
}
