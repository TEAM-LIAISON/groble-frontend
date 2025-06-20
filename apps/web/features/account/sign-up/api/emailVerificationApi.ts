import { fetchClient } from '@/shared/api/api-fetch';

export interface SendEmailVerificationRequest {
  email: string;
}

export interface VerifyEmailCodeRequest {
  email: string;
  verificationCode: string;
}

export const sendEmailVerificationCode = async (
  data: SendEmailVerificationRequest
): Promise<void> => {
  await fetchClient<void>('/api/v1/verification/email/code/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const verifyEmailCode = async (
  data: VerifyEmailCodeRequest
): Promise<void> => {
  await fetchClient<void>('/api/v1/verification/email/code/verify/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
