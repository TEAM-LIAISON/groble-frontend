"use server";

import { signUpCookie } from "@/lib/headers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setUserTypeAction(userType: "SELLER" | "BUYER") {
  (await cookies()).set("Sign-Up-User-Type", userType, signUpCookie);

  redirect("/auth/sign-up/terms");
}
