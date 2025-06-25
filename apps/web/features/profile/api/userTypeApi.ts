import { fetchClient } from '@/shared/api/api-fetch';

export interface SwitchUserTypeRequest {
  userType: 'BUYER' | 'SELLER';
}

/**
 * 사용자 유형 전환 API
 */
export const switchUserType = async (data: SwitchUserTypeRequest) => {
  return fetchClient('/api/v1/users/switch-role', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
