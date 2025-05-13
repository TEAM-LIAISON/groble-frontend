"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // 클라이언트 사이드 렌더링 확인을 위한 상태
  const [isMounted, setIsMounted] = useState(false);

  // 첫 렌더링 후 마운트 상태 업데이트
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true, // 창 포커스 시 재요청 활성화
            retry: 1,
            staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선함 유지
            gcTime: 1000 * 60 * 60, // 60분 동안 캐시 유지
            refetchOnMount: "always", // 컴포넌트 마운트 시 항상 재요청
            refetchOnReconnect: true, // 재연결 시 자동 재요청 활성화
          },
        },
      }),
  );

  // 개발 환경에서는 ReactQueryDevtools 표시
  const isDev = process.env.NODE_ENV === "development";

  if (!isMounted) {
    return null; // 클라이언트 사이드 렌더링이 완료될 때까지 아무것도 렌더링하지 않음
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isDev && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
