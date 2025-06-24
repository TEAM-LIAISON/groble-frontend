import { fetchClient } from '@/shared/api/api-fetch';

export interface SendEmailChangeVerificationRequest {
  email: string;
}

export interface VerifyEmailChangeCodeRequest {
  email: string;
  verificationCode: string;
}

/**
 * 이메일 변경을 위한 인증코드 발송
 */
export const sendEmailChangeVerification = async (
  data: SendEmailChangeVerificationRequest
) => {
  return fetchClient('/api/v1/verification/email/code/change-email', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * 이메일 변경을 위한 인증코드 검증
 */
export const verifyEmailChangeCode = async (
  data: VerifyEmailChangeCodeRequest
) => {
  return fetchClient('/api/v1/verification/email/code/verify/change-email', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
