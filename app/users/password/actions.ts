"use server";

import {
  setPassword,
  SetPasswordParams,
  setPasswordResponse400,
} from "@/lib/api";
import { redirect } from "next/navigation";

export async function setPasswordAction(
  _: setPasswordResponse400 | null,
  formData: FormData,
) {
  const response = await setPassword(
    {
      password: formData.get("password") as string,
    },
    undefined as unknown as SetPasswordParams,
  );

  if (response.status != 200) return response;

  redirect("/users/initial-user-type");
}
