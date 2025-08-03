import type { ApiResponse } from '@/shared/types/api-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMarketInfo, updateMarketInfo } from '../api/storeApi';
import type {
  MarketInfoResponse,
  MarketInfoUpdateRequest,
} from '../types/storeTypes';

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

/**
 * 마켓 기본 정보를 수정하는 훅
 */
export function useUpdateStoreInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMarketInfo,
    onSuccess: () => {
      // 수정 성공 시 캐시 무효화하여 최신 데이터 반영
      queryClient.invalidateQueries({ queryKey: STORE_INFO_QUERY_KEY });
    },
  });
}
