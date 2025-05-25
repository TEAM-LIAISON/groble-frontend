import { customFetch } from "../custom-fetch";
import { ProductDetail } from "../types/productType";

/**
 * 상품 상세 정보 조회 API
 * @param productId 상품 ID
 * @returns API 응답
 */
export async function getProductDetail(
  productId: string,
): Promise<{ data: { data: ProductDetail } }> {
  try {
    const response = await customFetch<{ data: { data: ProductDetail } }>(
      `/api/v1/content/${productId}`,
      {
        cache: "no-cache",
      },
    );
    return response;
  } catch (error) {
    console.error("상품 상세 조회 실패:", error);
    throw error;
  }
}

/**
 * 상품 심사 반려 사유 조회 API
 * @param productId 상품 ID
 * @returns API 응답
 */
export async function getProductRejectReason(
  productId: number,
): Promise<{ data: { data: string } }> {
  try {
    const response = await customFetch<{ data: { data: string } }>(
      `/api/v1/sell/content/${productId}/examine/reject`,
      {
        cache: "no-cache",
      },
    );
    return response;
  } catch (error) {
    console.error("상품 심사 반려 사유 조회 실패:", error);
    throw error;
  }
}
