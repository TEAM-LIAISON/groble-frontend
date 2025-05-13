"use server";

import { signIn, signInResponse400 } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAction(
  _: signInResponse400 | null,
  formData: FormData,
) {
  const response = await signIn({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (response.status != 200) return response;

  await setTokens(response.headers);

  redirect("/");
}

export async function setTokens(headers: Headers) {
  const cookieStore = await cookies();
  const setCookie = headers.getSetCookie();

  const accessTokenSetCookie = setCookie.find((cookie) =>
    cookie.startsWith("accessToken="),
  );
  if (!accessTokenSetCookie) throw new Error("accessTokenSetCookie not found");
  const refreshTokenSetCookie = setCookie.find((cookie) =>
    cookie.startsWith("refreshToken="),
  );
  if (!refreshTokenSetCookie)
    throw new Error("refreshTokenSetCookie not found");

  const accessToken = accessTokenSetCookie.split("=")[1].split(";")[0];
  const refreshToken = refreshTokenSetCookie.split("=")[1].split(";")[0];

  cookieStore.set("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });
  cookieStore.set("refreshToken", refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });
}
