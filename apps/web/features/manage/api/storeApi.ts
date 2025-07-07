import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';
import type { MarketInfoResponse } from '../types/storeTypes';

/**
 * 마켓 기본 정보를 조회합니다.
 */
export async function getMarketInfo(): Promise<
  ApiResponse<MarketInfoResponse>
> {
  return fetchClient<MarketInfoResponse>('/api/v1/market/edit/intro', {
    method: 'GET',
  });
}
