import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  requestGuestAuthCode,
  verifyGuestAuthCode,
  updateGuestInfo,
  type GuestAuthCodeRequest,
  type GuestAuthVerifyRequest,
  type GuestUpdateInfoRequest,
  type GuestAuthVerifyResponse,
  type GuestUpdateInfoResponse,
} from "../api/guest-auth-api";
import type { ApiResponse } from "@/shared/types/api-types";

export interface GuestAuthState {
  phoneNumber: string;
  email: string;
  username: string;
  authenticated: boolean;
  hasCompleteUserInfo: boolean;
  authStep: "phone" | "verify" | "info" | "completed";
}

const INITIAL_STATE: GuestAuthState = {
  phoneNumber: "",
  email: "",
  username: "",
  authenticated: false,
  hasCompleteUserInfo: false,
  authStep: "phone",
};

export const useGuestAuth = () => {
  const [authState, setAuthState] = useState<GuestAuthState>(INITIAL_STATE);

  // 인증번호 요청
  const requestCodeMutation = useMutation({
    mutationFn: requestGuestAuthCode,
    onSuccess: () => {
      setAuthState((prev) => ({ ...prev, authStep: "verify" }));
    },
    onError: (error) => {
      console.error("인증번호 요청 실패:", error);
    },
  });

  // 인증번호 검증
  const verifyCodeMutation = useMutation<
    GuestAuthVerifyResponse,
    Error,
    GuestAuthVerifyRequest
  >({
    mutationFn: verifyGuestAuthCode,
    onSuccess: (response) => {
      const {
        phoneNumber,
        email,
        username,
        authenticated,
        hasCompleteUserInfo,
      } = response.data;

      setAuthState((prev) => ({
        ...prev,
        phoneNumber,
        email: email || "",
        username: username || "",
        authenticated,
        hasCompleteUserInfo,
        authStep: hasCompleteUserInfo ? "completed" : "info",
      }));
    },
    onError: (error) => {
      console.error("인증번호 검증 실패:", error);
    },
  });

  // 개인정보 업데이트
  const updateInfoMutation = useMutation<
    ApiResponse<GuestUpdateInfoResponse>,
    Error,
    GuestUpdateInfoRequest
  >({
    mutationFn: updateGuestInfo,
    onSuccess: (response) => {
      console.log("🔄 updateGuestInfo API 응답:", response);
      const { email, username } =
        response.data as unknown as GuestUpdateInfoResponse["data"];

      console.log("🔄 업데이트된 정보:", {
        email,
        username,
        hasCompleteUserInfo: true, // API에서 반환하지 않으므로 직접 true로 설정
      });

      setAuthState((prev) => ({
        ...prev,
        email,
        username,
        hasCompleteUserInfo: true, // 이메일과 이름이 모두 있으므로 true로 설정
        authStep: "completed",
      }));
    },
    onError: (error) => {
      console.error("개인정보 업데이트 실패:", error);
    },
  });

  // 전화번호 설정
  const setPhoneNumber = useCallback((phoneNumber: string) => {
    setAuthState((prev) => ({ ...prev, phoneNumber }));
  }, []);

  // 이메일 설정
  const setEmail = useCallback((email: string) => {
    setAuthState((prev) => ({ ...prev, email }));
  }, []);

  // 사용자명 설정
  const setUsername = useCallback((username: string) => {
    setAuthState((prev) => ({ ...prev, username }));
  }, []);

  // 인증번호 요청
  const requestAuthCode = useCallback(
    (data: GuestAuthCodeRequest) => {
      requestCodeMutation.mutate(data);
    },
    [requestCodeMutation]
  );

  // 인증번호 검증
  const verifyAuthCode = useCallback(
    (data: GuestAuthVerifyRequest) => {
      verifyCodeMutation.mutate(data);
    },
    [verifyCodeMutation]
  );

  // 개인정보 업데이트
  const updateGuestUserInfo = useCallback(
    (data: GuestUpdateInfoRequest) => {
      updateInfoMutation.mutate(data);
    },
    [updateInfoMutation]
  );

  // 인증 상태 초기화
  const resetAuthState = useCallback(() => {
    setAuthState(INITIAL_STATE);
  }, []);

  // 다음 단계로 이동
  const goToNextStep = useCallback(() => {
    setAuthState((prev) => {
      switch (prev.authStep) {
        case "phone":
          return { ...prev, authStep: "verify" };
        case "verify":
          return { ...prev, authStep: "info" };
        case "info":
          return { ...prev, authStep: "completed" };
        default:
          return prev;
      }
    });
  }, []);

  return {
    authState,
    setAuthState,
    setPhoneNumber,
    setEmail,
    setUsername,
    requestAuthCode,
    verifyAuthCode,
    updateGuestUserInfo,
    resetAuthState,
    goToNextStep,
    isLoading:
      requestCodeMutation.isPending ||
      verifyCodeMutation.isPending ||
      updateInfoMutation.isPending,
    error:
      requestCodeMutation.error ||
      verifyCodeMutation.error ||
      updateInfoMutation.error,
  };
};
