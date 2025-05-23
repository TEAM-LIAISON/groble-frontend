"use server";

import { agreeMakerTermsResponse400 } from "@/lib/api";
import { signUpAction } from "../actions";

export async function agreeMakerTermsAction(
  _: agreeMakerTermsResponse400 | undefined | null,
  formData: FormData,
) {
  const response = await signUpAction();

  // @ts-expect-error
  if (response.status != 201) return response;
}
