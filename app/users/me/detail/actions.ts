"use server";

import { switchUserType, UserTypeRequest } from "@/lib/api";

export async function switchUserTypeAction(userTypeRequest: UserTypeRequest) {
  const response = switchUserType(
    userTypeRequest,
    // @ts-expect-error
    {},
  );

  return response;
}
