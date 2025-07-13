import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';
import type {
  SellingContentsResponse,
  SellingContentsParams,
} from '../types/productTypes';

/**
 * 판매중/작성중 콘텐츠 목록을 가져오는 API
 */
export async function getSellingContents(
  params: SellingContentsParams = {}
): Promise<ApiResponse<SellingContentsResponse>> {
  const { page = 0, size = 12, sort = 'createdAt', state } = params;

  const searchParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  });

  // state가 있는 경우에만 추가
  if (state) {
    searchParams.append('state', state);
  }

  const response = await fetchClient<SellingContentsResponse>(
    `/api/v1/sell/content/my/selling-contents?${searchParams.toString()}`,
    {
      method: 'GET',
    }
  );

  if (!response.data) {
    throw new Error('콘텐츠 목록을 불러오는데 실패했습니다.');
  }

  return response;
}

/**
 * 콘텐츠 판매 활성화 API
 */
export async function activateContent(
  contentId: number
): Promise<ApiResponse<void>> {
  const response = await fetchClient<void>(`/api/v1/sell/content/register`, {
    method: 'POST',
    body: JSON.stringify({ contentId }),
  });

  return response;
}

/**
 * 콘텐츠 삭제 API
 */
export async function deleteContent(
  contentId: number
): Promise<ApiResponse<void>> {
  const response = await fetchClient<void>(
    `/api/v1/sell/content/${contentId}/delete`,
    {
      method: 'POST',
    }
  );

  return response;
}
