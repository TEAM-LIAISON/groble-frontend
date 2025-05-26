"use client";

import { getUserHeaderInformResponse200 } from "@/lib/api";
import { User, useUserStore } from "@/lib/store/useUserStore";
import { ReactNode } from "react";

export default function FetchUserProvider({
  response,
  children,
}: {
  response: getUserHeaderInformResponse200;
  children?: ReactNode;
}) {
  const userStore = useUserStore();

  userStore.setUser(response.data.data as User);

  return children;
}
