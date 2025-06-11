"use server";

import { redirect } from "next/navigation";
import { updateSignUp } from "../actions";

export async function setPasswordAction(_: void, formData: FormData) {
  await updateSignUp({ password: formData.get("password") as string });

  redirect("/auth/sign-up/nickname");
}
