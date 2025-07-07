import { useQuery } from '@tanstack/react-query';
import { getMarketInfo } from '../api/storeApi';
import type { ApiResponse } from '@/shared/types/api-types';
import type { MarketInfoResponse } from '../types/storeTypes';

export const STORE_INFO_QUERY_KEY = ['market', 'info'] as const;

/**
 * 마켓 기본 정보를 조회하는 훅
 */
export function useStoreInfo() {
  const query = useQuery<ApiResponse<MarketInfoResponse>>({
    queryKey: STORE_INFO_QUERY_KEY,
    queryFn: getMarketInfo,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });

  return {
    ...query,
    data: query.data?.data, // 실제 데이터는 response.data에 있음
  };
}
