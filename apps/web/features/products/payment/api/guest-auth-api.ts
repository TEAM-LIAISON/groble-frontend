import { fetchClient } from "@/shared/api/api-fetch";

export interface GuestAuthCodeRequest {
  phoneNumber: string;
}

export interface GuestAuthVerifyRequest {
  phoneNumber: string;
  authCode: string;
}

export interface GuestAuthVerifyResponse {
  status: string;
  code: number;
  message: string;
  data: {
    phoneNumber: string;
    email: string | null;
    username: string | null;
    authenticated: boolean;
    hasCompleteUserInfo: boolean;
  };
  timestamp: string;
}

export interface GuestUpdateInfoRequest {
  email: string;
  username: string;
}

export interface GuestUpdateInfoResponse {
  status: string;
  code: number;
  message: string;
  data: {
    phoneNumber: string;
    email: string;
    username: string;
    authenticated: boolean;
    hasCompleteUserInfo: boolean;
  };
  timestamp: string;
}

// 1. 인증번호 요청
export const requestGuestAuthCode = async (data: GuestAuthCodeRequest) => {
  const response = await fetchClient("/api/v1/guest/auth/code-request", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

// 2. 인증번호 검증
export const verifyGuestAuthCode = async (data: GuestAuthVerifyRequest) => {
  const response = await fetchClient<GuestAuthVerifyResponse>(
    "/api/v1/guest/auth/verify-request",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  return response as unknown as GuestAuthVerifyResponse;
};

// 3. 개인정보 업데이트
export const updateGuestInfo: any = async (data: GuestUpdateInfoRequest) => {
  const response = await fetchClient<GuestUpdateInfoResponse>(
    "/api/v1/guest/auth/update-info",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  return response as unknown as GuestUpdateInfoResponse;
};
