import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';
import type { ContentManageDetailResponse } from '../types/productDetailTypes';
import type { PageResponseContentSellDetailResponse } from '../types/productDetailTypes';

/**
 * 콘텐츠 관리 상세 정보 조회 API
 */
export async function getContentManageDetail(
  contentId: string
): Promise<ApiResponse<ContentManageDetailResponse>> {
  const response = await fetchClient<ContentManageDetailResponse>(
    `/api/v1/sell/content/manage/${contentId}`,
    {
      method: 'GET',
    }
  );

  return response;
}

export const getContentSellList = async (
  contentId: string,
  page: number = 0,
  size: number = 15,
  sort: string = 'purchasedAt,desc'
): Promise<ApiResponse<PageResponseContentSellDetailResponse>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  });

  const response = await fetchClient<PageResponseContentSellDetailResponse>(
    `/api/v1/sell/content/manage/${contentId}/sell-list?${params}`,
    {
      method: 'GET',
    }
  );

  return response;
};
