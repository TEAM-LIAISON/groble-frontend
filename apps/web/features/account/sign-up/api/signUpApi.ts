import { fetchClient } from '@/shared/api/api-fetch';
import { TermsType } from '../types/signUpState';

export interface SocialSignUpBasicInfoRequest {
  userType: string;
  termsTypes: TermsType[];
}

export interface SignUpApiResponse {
  accessToken: string;
  refreshToken: string;
}

export const signUpSocialBasicInfo = async (
  data: SocialSignUpBasicInfoRequest
): Promise<SignUpApiResponse> => {
  const response = await fetchClient<SignUpApiResponse>(
    '/api/v1/social/user/basic-info',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  return response.data;
};

// 통합 회원가입 API
export interface IntegratedSignUpRequest {
  userType: 'SELLER' | 'BUYER';
  termsTypes: string[];
  email: string;
  password: string;
}

export const integratedSignUp = async (data: IntegratedSignUpRequest) => {
  const response = await fetchClient('/api/v1/auth/integrated/sign-up', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
