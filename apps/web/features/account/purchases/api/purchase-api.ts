import { fetchClient } from '@/shared/api/api-fetch';
import { ApiResponse } from '@/shared/types/api-types';
import {
  PurchaseContentTypes,
  PurchaseContentsParams,
} from '../types/purchase-types';

// 구매한 콘텐츠 목록 조회
export const fetchPurchaseContents = async (
  params: PurchaseContentsParams
): Promise<ApiResponse<PurchaseContentTypes>> => {
  const queryParams = new URLSearchParams();

  // 커서 기반 페이지네이션
  if (params.cursorRequest.cursor) {
    queryParams.append('cursor', params.cursorRequest.cursor);
  }
  queryParams.append('size', params.cursorRequest.size.toString());

  // 상태 필터
  if (params.state) {
    queryParams.append('state', params.state);
  }

  return await fetchClient(
    `/api/v1/purchase/content/my/purchasing-contents?${queryParams}`,
    {
      method: 'GET',
    }
  );
};
