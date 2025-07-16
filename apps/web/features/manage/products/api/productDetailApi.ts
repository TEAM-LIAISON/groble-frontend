import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';
import type { ContentManageDetailResponse } from '../types/productDetailTypes';

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
