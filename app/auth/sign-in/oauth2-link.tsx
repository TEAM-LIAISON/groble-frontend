"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/oauth2/authorize?redirect_uri=${encodeURIComponent(redirectURI)}&provider=${encodeURIComponent(provider)}`}
      {...props}
    />
  );
}
