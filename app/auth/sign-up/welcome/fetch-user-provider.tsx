"use client";

import { ReactNode, useEffect } from "react";

export default function FetchUserProvider({
  accessToken,
  refreshToken,
  children,
}: {
  accessToken: string;
  refreshToken: string;
  children?: ReactNode;
}) {
  useEffect(() => {
    document.cookie = `accessToken=${accessToken}; Path=/; Domain=.groble.im`;
    document.cookie = `refreshToken=${refreshToken}; Path=/; Domain=.groble.im`;
  }, []);

  return children;
}
