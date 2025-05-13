"use server";

import { SignUpRequestTermsTypesItem } from "@/lib/api";
import { redirect } from "next/navigation";
import { updateSignUp } from "../actions";

export async function agreeToTermsAction(_: void, formData: FormData) {
  await updateSignUp({
    termsTypes: formData.getAll("terms-type") as SignUpRequestTermsTypesItem[],
  });

  redirect("/auth/sign-up/email");
}
