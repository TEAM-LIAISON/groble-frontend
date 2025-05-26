"use client";

import { useUserStore } from "@/lib/store/useUserStore";
import { ReactNode, useEffect } from "react";

export default function CookieInitializer({
  accessToken,
  refreshToken,
  children,
}: {
  accessToken: string;
  refreshToken: string;
  children?: ReactNode;
}) {
  const userStore = useUserStore();

  useEffect(() => {
    document.cookie = `accessToken=${accessToken}; Path=/; Domain=.groble.im`;
    document.cookie = `refreshToken=${refreshToken}; Path=/; Domain=.groble.im`;
    if (!userStore.user) location.reload();
  }, []);

  return children;
}
