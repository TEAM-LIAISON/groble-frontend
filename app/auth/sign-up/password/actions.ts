"use server";

import { signUpCookie } from "@/lib/headers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setPasswordAction(_: void, formData: FormData) {
  (await cookies()).set(
    "Sign-Up-Password",
    formData.get("password") as string,
    signUpCookie,
  );

  redirect("/auth/sign-up/nickname");
}
