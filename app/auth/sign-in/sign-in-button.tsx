"use client";

import { buttonClassName } from "@/components/button";
import Link from "next/link";

export default function SignInButton() {
  return (
    <Link
      className={buttonClassName({ group: "text", size: "x-small" })}
      href="/auth/email-verification/sign-up"
    >
      회원가입 하기
    </Link>
  );
}
