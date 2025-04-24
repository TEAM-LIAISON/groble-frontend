"use server";

import {
  setInitialUserType,
  setInitialUserTypeResponse400,
  SetPasswordParams,
} from "@/lib/api";
import { redirect } from "next/navigation";

export async function setInitialUserTypeAction(
  _: setInitialUserTypeResponse400 | null,
  formData: FormData,
) {
  const response = await setInitialUserType(
    {
      userType: formData.get("user-type") as string,
    },
    undefined as unknown as SetPasswordParams,
  );

  if (response.status != 200) return response;

  redirect("/terms/agree");
}
