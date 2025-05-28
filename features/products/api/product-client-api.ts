import { ProductDetailType } from "@/entities/product/model";
import { fetchClient } from "@/shared/api/api-fetch";
import { ApiResponse } from "@/shared/types/api-types";

// 판매 등록 API 호출 (CSR 전용)
export async function activateProductClient({
  productId,
}: {
  productId: string;
}) {
  return fetchClient<{ status: "SUCCESS" | string }>(
    `/api/v1/content/${productId}/active`,
    { method: "POST" },
  );
}

/** 상품 상세 정보를 서버에서 조회합니다 (CSR 공용) */
export async function clientFetchProductDetail(
  productId: string,
): Promise<ApiResponse<ProductDetailType>> {
  return fetchClient<ProductDetailType>(`/api/v1/content/${productId}`, {
    cache: "no-cache",
  });
}
