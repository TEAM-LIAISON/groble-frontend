import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';
import type { ContentReviewResponse } from '@/entities/product/model';

// 리뷰 정렬 옵션 타입
type ReviewSortType = 'LATEST' | 'RATING_HIGH' | 'RATING_LOW';

/**
 * 콘텐츠 리뷰 조회 API (클라이언트 사이드)
 */
async function fetchContentReviews(
  contentId: string,
  sort: ReviewSortType = 'LATEST'
): Promise<ApiResponse<ContentReviewResponse>> {
  const params = new URLSearchParams({
    sort,
  });

  return fetchClient<ContentReviewResponse>(
    `/api/v1/content/${contentId}/reviews?${params}`,
    {
      method: 'GET',
    }
  );
}

/**
 * 리뷰 데이터를 관리하는 React Query 훅
 */
export function useReviews(
  contentId: string,
  sort: ReviewSortType = 'LATEST',
  initialData?: ContentReviewResponse
) {
  // initialData는 오직 LATEST 정렬일 때만 적용 (SSR 데이터 활용)
  const shouldUseInitialData = sort === 'LATEST' && initialData;

  return useQuery({
    queryKey: ['reviews', contentId, sort],
    queryFn: () => fetchContentReviews(contentId, sort),
    enabled: !!contentId,
    initialData: shouldUseInitialData
      ? ({
          status: 'success',
          code: 200,
          message: '',
          data: initialData,
          timestamp: new Date().toISOString(),
        } as ApiResponse<ContentReviewResponse>)
      : undefined,
    staleTime: 5 * 60 * 1000, // 5분 동안 fresh
    gcTime: 10 * 60 * 1000, // 10분 동안 캐시 유지
  });
}
