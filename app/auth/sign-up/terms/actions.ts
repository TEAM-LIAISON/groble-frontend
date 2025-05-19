"use server";

import { getUserMyPageDetail, SignUpRequestTermsTypesItem } from "@/lib/api";
import { redirect } from "next/navigation";
import { updateSignUp } from "../actions";

export async function agreeToTermsAction(_: void, formData: FormData) {
  await updateSignUp({
    termsTypes: formData.getAll("terms-type") as SignUpRequestTermsTypesItem[],
  });

  const response = await getUserMyPageDetail(
    // @ts-expect-error
    {},
  );

  if (response.status == 200 && response.data.data?.accountType == "SOCIAL")
    redirect("/auth/sign-up/nickname");
  else redirect("/auth/sign-up/email");
}
