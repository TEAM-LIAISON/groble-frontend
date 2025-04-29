"use server";

import { SignUpRequestTermsTypesItem, signUp } from "@/lib/api";
import { cookies } from "next/headers";

export async function signUpAction() {
  const cookieStore = await cookies();
  const userType = cookieStore.get("Sign-Up-User-Type")?.value;
  if (!userType) throw new Error();
  const termsTypesString = cookieStore.get("Sign-Up-Terms-Types")?.value;
  if (!termsTypesString) throw new Error();
  const termsTypes = JSON.parse(
    termsTypesString,
  ) as SignUpRequestTermsTypesItem[];
  const email = cookieStore.get("Sign-Up-Email")?.value;
  if (!email) throw new Error();
  const password = cookieStore.get("Sign-Up-Password")?.value;
  if (!password) throw new Error();
  const nickname = cookieStore.get("Sign-Up-Nickname")?.value;
  if (!nickname) throw new Error();

  const response = await signUp({
    userType,
    termsTypes,
    email,
    password,
    nickname,
  });
  // @ts-expect-error
  if (response.status != 201) {
    cookieStore.set(
      "Sign-Up-Email",
      response.headers
        .get("Set-Cookie")
        ?.split(";")
        .find((cookie) => cookie.startsWith("Sign-Up-Email")) ?? "",
    );
  }
  return response;
}
