"use server";

import { SignUpRequestTermsTypesItem, signUp } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
  if (response.status != 201) return response;

  await setTokens(response.headers);

  cookieStore.delete("Sign-Up-User-Type");
  cookieStore.delete("Sign-Up-Terms-Types");
  cookieStore.delete("Sign-Up-Email");
  cookieStore.delete("Sign-Up-Password");
  cookieStore.delete("Sign-Up-Nickname");

  redirect("/auth/sign-up/welcome");
}
