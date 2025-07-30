import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';
import type { ProductDetailType } from '@/entities/product/model/product-types';

// 임시저장 요청 타입
export interface DraftRequest {
  contentId?: number;
  title: string;
  contentType: 'COACHING' | 'DOCUMENT';
  categoryId?: string;
  thumbnailUrl?: string;
  serviceTarget?: string;
  serviceProcess?: string;
  makerIntro?: string;
  contentIntroduction?: string;
  contentDetailImageUrls?: string[];
  coachingOptions?: Array<{
    name: string;
    description: string;
    price: number;
  }>;
  documentOptions?: Array<{
    name: string;
    description: string;
    price: number;
    documentFileUrl?: string | null;
    documentLinkUrl?: string | null;
  }>;
}

// 임시저장 응답 타입
export interface DraftResponse {
  contentId: number;
  id?: number; // 응답에 따라 다를 수 있음
}

/**
 * 임시저장 API 호출
 */
export async function saveDraft(
  data: DraftRequest
): Promise<ApiResponse<DraftResponse>> {
  console.log('임시저장 API 호출:', data);

  return fetchClient<DraftResponse>('/api/v1/sell/content/draft', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

/**
 * 임시저장된 데이터 조회 (판매자 전용)
 */
export async function fetchDraft(
  contentId: string
): Promise<ApiResponse<ProductDetailType>> {
  console.log('fetchDraft 호출:', contentId);

  const response = await fetchClient<ProductDetailType>(
    `/api/v1/content/${contentId}`,
    {
      method: 'GET',
    }
  );

  console.log('fetchDraft 응답:', response);
  return response;
}
