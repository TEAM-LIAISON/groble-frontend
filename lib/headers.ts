import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const signUpCookie = {
  secure: true,
  httpOnly: true,
  sameSite: "lax",
  maxAge: 60 * 60 * 24,
} satisfies Partial<ResponseCookie>;

export const tokenCookie = {
  secure: true,
  httpOnly: true,
  sameSite: "lax",
  maxAge: 60 * 60 * 24,
} satisfies Partial<ResponseCookie>;
