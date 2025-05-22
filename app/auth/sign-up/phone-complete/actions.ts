"use server";

import { agreeMakerTerms, agreeMakerTermsResponse400 } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function agreeMakerTermsAction(
  _: agreeMakerTermsResponse400 | null,
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

  redirect("/auth/sign-up/welcome");
}
