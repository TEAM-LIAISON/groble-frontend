// 내 컨텐츠 조회

import { fetchClient } from '@/shared/api/api-fetch';
import {
  PurchaseContentsParams,
  PurchaseContentsResponse,
} from '../types/purchase-types';

export const getPurchaseContents = async (
  params: PurchaseContentsParams
): Promise<PurchaseContentsResponse> => {
  const searchParams = new URLSearchParams();

  // type 파라미터 제거 - 코칭과 콘텐츠 통합 조회
  // searchParams.append("type", params.type);

  // state 처리: 빈 문자열이거나 "all"일 때 null로 설정, 그 외에는 실제 값 사용
  if (params.state === '' || params.state === 'all' || !params.state) {
    searchParams.append('state', 'null');
  } else {
    searchParams.append('state', params.state);
  }

  if (params.cursorRequest.cursor) {
    searchParams.append('cursor', params.cursorRequest.cursor);
  }

  if (params.cursorRequest.size) {
    searchParams.append('size', params.cursorRequest.size.toString());
  }

  const response = await fetchClient(
    `/api/v1/purchase/content/my/purchasing-contents?${searchParams.toString()}`,
    {
      method: 'GET',
    }
  );

  // API 응답을 정의된 타입으로 반환 (실제 구조에 맞게 조정 필요)
  return response.data as PurchaseContentsResponse;
};
