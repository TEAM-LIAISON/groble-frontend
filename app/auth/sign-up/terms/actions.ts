"use server";

import { signUpCookie } from "@/lib/headers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function agreeToTermsAction(_: void, formData: FormData) {
  (await cookies()).set(
    "Sign-Up-Terms-Types",
    JSON.stringify(formData.getAll("terms-type")),
    signUpCookie,
  );

  redirect("/auth/sign-up/email");
}
