"use server";

import { signUpCookie } from "@/lib/headers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setNicknameAction(_: void, formData: FormData) {
  (await cookies()).set(
    "Sign-Up-Nickname",
    formData.get("nickname") as string,
    signUpCookie,
  );

  redirect("/auth/sign-up/welcome");
}
