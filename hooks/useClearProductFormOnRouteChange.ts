"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useNewProductStore } from "@/lib/store/useNewProductStore";

export function useResetNewProductOutsidePages() {
  const pathname = usePathname();
  const reset = useNewProductStore((s) => s.resetState);

  useEffect(() => {
    const allowedPrefixes = [
      "/users/newproduct",
      "/users/newproduct/step2",
      "/users/newproduct/step3",
    ];

    const isInNewProductFlow = allowedPrefixes.some((prefix) =>
      pathname.startsWith(prefix),
    );

    if (!isInNewProductFlow) {
      reset();
    }
  }, [pathname, reset]);
}
