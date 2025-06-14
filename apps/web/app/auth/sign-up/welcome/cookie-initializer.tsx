"use client";

import { useUserStore } from "@/lib/store/useUserStore";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    document.cookie = `accessToken=${accessToken}; Path=/; Domain=.groble.im`;
    document.cookie = `refreshToken=${refreshToken}; Path=/; Domain=.groble.im`;
    userStore.fetchUserWithoutDebouncing();
  }, []);

  return children;
}
