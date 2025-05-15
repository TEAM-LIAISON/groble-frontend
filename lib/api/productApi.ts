import { ApiResponse } from "../types/apiTypes";
import { ProductDetail } from "../types/productType";
import { apiFetch } from "./fetch";

/**
 * 상품 상세 정보 조회 API
 * @param productId 상품 ID
 * @returns API 응답
 */
export async function getProductDetail(
  productId: string,
): Promise<ApiResponse<ProductDetail>> {
  try {
    const response = await apiFetch<ProductDetail>(
      `/api/v1/content/${productId}`,
    );
    return response;
  } catch (error) {
    console.error("상품 상세 조회 실패:", error);
    throw error;
  }
}
