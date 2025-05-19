"use server";

import { redirect } from "next/navigation";
import { updateSignUp } from "../actions";

export async function setUserTypeAction(userType: "SELLER" | "BUYER") {
  await updateSignUp({ userType });

  redirect("/auth/sign-up/terms");
}
