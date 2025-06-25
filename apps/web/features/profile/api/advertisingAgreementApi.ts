import { fetchClient } from '@/shared/api/api-fetch';

export interface UpdateAdvertisingAgreementRequest {
  agreed: boolean;
}

export interface AdvertisingAgreementResponse {
  isAdvertisingAgreement: boolean;
  isAllowWithdraw: boolean;
}

/**
 * 마케팅 동의 상태 조회 API
 */
export const getAdvertisingAgreement =
  async (): Promise<AdvertisingAgreementResponse> => {
    const response = await fetchClient<AdvertisingAgreementResponse>(
      '/api/v1/terms/users/me/advertising-agreement',
      {
        method: 'GET',
      }
    );
    return response.data;
  };

/**
 * 마케팅 동의 상태 변경 API
 */
export const updateAdvertisingAgreement = async (
  data: UpdateAdvertisingAgreementRequest
): Promise<void> => {
  await fetchClient('/api/v1/terms/users/me/advertising-agreement', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
