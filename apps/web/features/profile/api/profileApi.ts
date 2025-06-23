import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';
import type { UserDetail } from '../model/types';

export const profileApi = {
  getUserDetail: async (): Promise<ApiResponse<UserDetail>> => {
    return fetchClient<UserDetail>('/api/v1/users/me/detail', {
      method: 'GET',
    });
  },
};
