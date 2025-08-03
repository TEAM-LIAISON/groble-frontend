import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';

/**
 * 상품 심사 승인(판매하기)
 * @param productId 상품 ID
 * @returns API 응답
 */
export async function activateProduct(
  productId: string
): Promise<ApiResponse<void>> {
  try {
    const response = await fetchClient<void>(
      `/api/v1/sell/content/${productId}/active`,
      {
        cache: 'no-cache',
        method: 'POST',
      }
    );
    return response;
  } catch (error) {
    console.error('상품 심사 승인 실패:', error);
    throw error;
  }
}
