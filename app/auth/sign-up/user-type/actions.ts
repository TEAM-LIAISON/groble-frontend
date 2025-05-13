"use server";

import { getUserMyPageDetail, switchUserType } from "@/lib/api";
import { redirect } from "next/navigation";
import { updateSignUp } from "../actions";

export async function setUserTypeAction(userType: "SELLER" | "BUYER") {
  const response = await getUserMyPageDetail(
    // @ts-expect-error
    {},
  );

  if (response.status == 200 && response.data.data?.accountType == "SOCIAL") {
    const response = await switchUserType(
      { userType },
      // @ts-expect-error
      {},
    );

    if (response.status != 204) throw new Error(JSON.stringify(response));
  } else await updateSignUp({ userType });

  redirect("/auth/sign-up/terms");
}
