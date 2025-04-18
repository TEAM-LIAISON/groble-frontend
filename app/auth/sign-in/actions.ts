"use server";

import { signIn, signInResponse400 } from "@/lib/api";
import { redirect } from "next/navigation";

export async function signInAction(
  _: signInResponse400 | null,
  formData: FormData,
) {
  const response = await signIn({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (response.status != 200) return response;

  redirect("/");
}
