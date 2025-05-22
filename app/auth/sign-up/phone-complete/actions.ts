"use server";

import { agreeMakerTerms, agreeMakerTermsResponse400 } from "@/lib/api";
import { cookies } from "next/headers";
import { signUpAction } from "../actions";

export async function agreeMakerTermsAction(
  _: agreeMakerTermsResponse400 | undefined | null,
  formData: FormData,
) {
  const makerTermsAgreement = Boolean(
    (await cookies()).get("Maker-Terms-Agreement")?.value,
  );

  if (makerTermsAgreement) {
    const response = await agreeMakerTerms(
      {
        makerTermsAgreement,
      },
      // @ts-expect-error
      {},
    );

    if (response.status != 200) return response;
  }

  (await cookies()).delete("Maker-Terms-Agreement");

  const response = await signUpAction();

  // @ts-expect-error
  if (response.status != 201) return response;
}
