import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';

/**
 * 리뷰 삭제 API
 */
export async function deleteReview(
  reviewId: number
): Promise<ApiResponse<void>> {
  return fetchClient<void>(`/api/v1/purchase/review/delete/${reviewId}`, {
    method: 'POST',
  });
}
