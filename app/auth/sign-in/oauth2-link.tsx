"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSocialLoginUrl } from "@/lib/api/auth";

export default function OAuth2Link({
  searchParamRedirectURI,
  provider,
  ...props
}: {
  searchParamRedirectURI?: string;
  provider: string;
} & Omit<Parameters<typeof Link>[0], "href">) {
  const [redirectURI, setRedirectURI] = useState(searchParamRedirectURI ?? "");

  useEffect(() => {
    if (!redirectURI) setRedirectURI(location.href);
  }, [redirectURI]);

  // 소셜 로그인 URL 생성
  const socialLoginUrl = getSocialLoginUrl(provider, redirectURI);

  return <Link href={socialLoginUrl} {...props} />;
}
