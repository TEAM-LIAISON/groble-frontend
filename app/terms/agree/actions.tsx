"use server";

import {
  agreeToTerms,
  agreeToTermsResponse,
  SetPasswordParams,
} from "@/lib/api";
import { redirect } from "next/navigation";

export async function agreeToTermsAction(
  _: agreeToTermsResponse | null,
  formData: FormData,
) {
  const response = await agreeToTerms(
    {
      termsTypes: [],
    },
    undefined as unknown as SetPasswordParams,
  );

  if (response.status != 200) return response;

  redirect("/users/nickname");
}
