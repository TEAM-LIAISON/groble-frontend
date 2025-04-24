"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function agreeToTermsAction(_: void, formData: FormData) {
  (await cookies()).set(
    "Sign-Up-Terms-Types",
    JSON.stringify(formData.getAll("terms-type")),
  );

  redirect("/auth/sign-up/email");
}
