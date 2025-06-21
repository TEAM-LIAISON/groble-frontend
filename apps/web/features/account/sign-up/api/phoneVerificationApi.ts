import { fetchClient } from '@/shared/api/api-fetch';

export interface PhoneVerifyRequest {
  phoneNumber: string;
}

export interface PhoneVerifyResponse {
  success: boolean;
  message?: string;
}

export interface PhoneCodeVerifyRequest {
  phoneNumber: string;
  verificationCode: string;
}

export interface PhoneCodeVerifyResponse {
  success: boolean;
  message?: string;
}

export const requestPhoneVerification = async (data: PhoneVerifyRequest) => {
  return fetchClient<PhoneVerifyResponse>(
    '/api/v1/verification/phone-number/verify-request',
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
};

export const verifyPhoneCode = async (data: PhoneCodeVerifyRequest) => {
  return fetchClient<PhoneCodeVerifyResponse>(
    '/api/v1/verification/phone-number/verify-code',
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
};
