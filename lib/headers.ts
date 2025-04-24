import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const signUpCookie = {
  httpOnly: true,
  sameSite: "lax",
  maxAge: 60 * 60 * 24,
} satisfies Partial<ResponseCookie>;
