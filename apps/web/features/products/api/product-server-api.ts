// File: src/features/products/api/product-api.ts

import type {
  ContentReviewResponse,
  ProductDetailType,
} from '@/entities/product/model/product-types';
import { fetchServerSide } from '@/shared/api/fetch-ssr'; // ✅ SSR 전용 fetch 유틸
import type { ApiResponse } from '@/shared/types/api-types';

const PRODUCT_API_BASE = '/api/v1/content';

/**
 * 상품 상세 정보 조회 (SSR)
 * @param productId 상품 ID
 * @returns ApiResponse<{ data: ProductDetailType }>
 */
export async function fetchProductDetail(
  productId: string
): Promise<ApiResponse<ProductDetailType>> {
  return fetchServerSide<ApiResponse<ProductDetailType>>(
    `${PRODUCT_API_BASE}/${productId}`,
    { cache: 'no-cache' }
  );
}

/**
 * 콘텐츠 리뷰 조회 (SSR)
 * @param contentId 콘텐츠 ID
 * @returns ApiResponse<ContentReviewResponse>
 */
export async function fetchContentReviews(
  contentId: string
): Promise<ApiResponse<ContentReviewResponse>> {
  return fetchServerSide<ApiResponse<ContentReviewResponse>>(
    `${PRODUCT_API_BASE}/${contentId}/reviews`,
    { cache: 'no-cache' }
  );
}

/**
 * 상품 심사 반려 사유 조회 (SSR)
 * @param productId 상품 ID
 * @returns ApiResponse<{ data: string }>
 */
export async function fetchProductRejectReason(
  productId: string
): Promise<ApiResponse<{ data: string }>> {
  return fetchServerSide<ApiResponse<{ data: string }>>(
    `/api/v1/sell/content/${productId}/examine/reject`,
    { cache: 'no-cache' }
  );
}
