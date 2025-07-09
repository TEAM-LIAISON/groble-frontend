import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';
import type {
  PurchasedContentsResponse,
  PurchasedContentsParams,
} from '../types/purchaseTypes';

/**
 * 구매한 콘텐츠 목록을 가져오는 API
 */
export async function getPurchasedContents(
  params: PurchasedContentsParams = {}
): Promise<ApiResponse<PurchasedContentsResponse>> {
  const { page = 0, size = 9, sort = 'purchasedAt', state } = params;

  const searchParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  });

  // state가 있고 빈 문자열이 아닌 경우에만 추가
  if (state && state.trim() !== '') {
    searchParams.append('state', state);
  }

  const response = await fetchClient<PurchasedContentsResponse>(
    `/api/v1/purchase/content/my/purchased-contents?${searchParams.toString()}`,
    {
      method: 'GET',
    }
  );

  if (!response.data) {
    throw new Error('구매한 콘텐츠 목록을 불러오는데 실패했습니다.');
  }

  return response;
}
