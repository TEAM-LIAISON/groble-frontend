"use server";

import {
  SignUpRequestTermsTypesItem,
  getUserMyPageDetail,
  signUp,
  signUpSocial,
} from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { setTokens } from "../sign-in/actions";

export interface SignUpRequestCookie {
  userType?: string;
  termsTypes?: SignUpRequestTermsTypesItem[];
  email?: string;
  password?: string;
  nickname?: string;
  phoneNumber?: string;
}

export async function getSignUp() {
  return JSON.parse(
    (await cookies()).get("Sign-Up")?.value ?? "{}",
  ) as SignUpRequestCookie;
}

export async function setSignUp(requestCookie: SignUpRequestCookie) {
  (await cookies()).set("Sign-Up", JSON.stringify(requestCookie), {
    secure: true,
    httpOnly: false,
    sameSite: "none",
    maxAge: 60 * 60 * 24,
  });
}

export async function updateSignUp(requestCookie: SignUpRequestCookie) {
  await setSignUp({ ...(await getSignUp()), ...requestCookie });
}

export async function deleteSignUp() {
  (await cookies()).delete("Sign-Up");
}

export async function signUpAction() {
  const { userType, termsTypes, email, password, nickname, phoneNumber } =
    await getSignUp();

  if ((await cookies()).get("Maker-Terms-Agreement")?.value)
    termsTypes?.push("SELLER_TERMS_POLICY");

  const detailResponse = await getUserMyPageDetail(
    // @ts-expect-error
    {},
  );

  let response;
  if (
    detailResponse.status == 200 &&
    detailResponse.data.data?.accountType == "SOCIAL"
  ) {
    response = await signUpSocial(
      {
        userType: userType!,
        termsTypes: termsTypes!,
        nickname: nickname!,
        phoneNumber: phoneNumber!,
      },
      // @ts-expect-error
      {},
    );
  } else {
    response = await signUp({
      userType: userType!,
      termsTypes: termsTypes!,
      email: email!,
      password: password!,
      nickname: nickname!,
      phoneNumber: phoneNumber!,
    });
  }

  if (response.status != 201) return response;

  await setTokens(response.headers);

  await deleteSignUp();

  (await cookies()).delete("Maker-Terms-Agreement");

  redirect("/auth/sign-up/welcome");
}
