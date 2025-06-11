"use client";

import { useResetNewProductOutsidePages } from "@/hooks/useClearProductFormOnRouteChange";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import ChannelTalkProvider from "./ChannelTalkProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  useResetNewProductOutsidePages();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <ChannelTalkProvider />
    </QueryClientProvider>
  );
}
