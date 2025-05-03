"use server";

import { SignUpRequestTermsTypesItem, signUp } from "@/lib/api";
import { cookies } from "next/headers";
import { setTokens } from "../sign-in/actions";

export async function signUpAction() {
  const cookieStore = await cookies();
  const userType = cookieStore.get("Sign-Up-User-Type")?.value;
  if (!userType) throw new Error("Sign-Up-User-Type not found");
  const termsTypesString = cookieStore.get("Sign-Up-Terms-Types")?.value;
  if (!termsTypesString) throw new Error("Sign-Up-Terms-Types not found");
  const termsTypes = JSON.parse(
    termsTypesString,
  ) as SignUpRequestTermsTypesItem[];
  const email = cookieStore.get("Sign-Up-Email")?.value;
  if (!email) throw new Error("Sign-Up-Email not found");
  const password = cookieStore.get("Sign-Up-Password")?.value;
  if (!password) throw new Error("Sign-Up-Password not found");
  const nickname = cookieStore.get("Sign-Up-Nickname")?.value;
  if (!nickname) throw new Error("Sign-Up-Nickname not found");

  const response = await signUp({
    userType,
    termsTypes,
    email,
    password,
    nickname,
  });
  // @ts-expect-error
  if (response.status != 201) await setTokens(response.headers);

  return response;
}
