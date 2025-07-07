import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';
import type {
  MarketInfoResponse,
  MarketInfoUpdateRequest,
} from '../types/storeTypes';

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

/**
 * 마켓 기본 정보를 수정합니다.
 */
export async function updateMarketInfo(
  data: MarketInfoUpdateRequest
): Promise<ApiResponse<void>> {
  return fetchClient<void>('/api/v1/market/edit', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * 마켓 링크 사용 가능 여부를 확인합니다.
 */
export async function checkMarketLinkAvailability(
  linkUrl: string
): Promise<ApiResponse<{ available: boolean }>> {
  return fetchClient<{ available: boolean }>(
    `/api/v1/market/link-check?marketLinkCheckRequest=${encodeURIComponent(
      linkUrl
    )}`,
    {
      method: 'GET',
    }
  );
}
