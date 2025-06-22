import { fetchClient } from '@/shared/api/api-fetch';

export interface SendPasswordResetEmailRequest {
  email: string;
}

export interface ResetPasswordRequest {
  newPassword: string;
  token: string;
}

export const sendPasswordResetEmail = async (
  data: SendPasswordResetEmailRequest
): Promise<void> => {
  await fetchClient<void>('/api/v1/verification/email/code/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const resetPassword = async (
  data: ResetPasswordRequest
): Promise<void> => {
  await fetchClient<void>('/api/v1/verification/password/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
