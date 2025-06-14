"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useNewProductStore } from "@/features/products/register/store/useNewProductStore";

export function useResetNewProductOutsidePages() {
  const pathname = usePathname();
  const reset = useNewProductStore((s) => s.resetState);

  useEffect(() => {
    const allowedPrefixes = [
      "/products/register",
      "/products/register/description",
      "/products/register/review",
    ];

    const isInNewProductFlow = allowedPrefixes.some((prefix) =>
      pathname.startsWith(prefix),
    );

    if (!isInNewProductFlow) {
      reset();
    }
  }, [pathname, reset]);
}
