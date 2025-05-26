"use client";

import { getUserHeaderInformResponse200 } from "@/lib/api";
import { useUserStore } from "@/lib/store/useUserStore";
import { ReactNode, useEffect } from "react";

export default function FetchUserProvider({
  response,
  children,
}: {
  response: getUserHeaderInformResponse200;
  children?: ReactNode;
}) {
  const userStore = useUserStore();

  useEffect(() => {
    // userStore.setUser(response.data.data as User);
    if (!userStore.user) location.reload();
  }, []);

  return children;
}
