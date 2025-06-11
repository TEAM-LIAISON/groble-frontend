"use client";

import { useUserInfo } from "@/lib/api/auth";
import { useEffect } from "react";

interface WelcomeClientProps {
  children: React.ReactNode;
}

export default function WelcomeClient({ children }: WelcomeClientProps) {
  const { refetch: refetchUserInfo } = useUserInfo();

  // 컴포넌트 마운트 시 사용자 정보 갱신
  useEffect(() => {
    // 회원가입 완료 후이므로 사용자 정보를 즉시 갱신하여 헤더 상태 업데이트
    refetchUserInfo()
      .then(() => {
        console.log("사용자 정보 갱신 완료");
      })
      .catch((error) => {
        console.error("사용자 정보 갱신 실패:", error);
      });
  }, [refetchUserInfo]);

  return <>{children}</>;
}
