import { fetchClient } from "@/shared/api/api-fetch";

// 판매 등록 API 호출 (CSR 전용)
export async function activateProductClient({
  productId,
}: {
  productId: string;
}) {
  return fetchClient<{ status: "SUCCESS" | string }>(
    `/api/v1/content/${productId}/activate`,
    { method: "POST" },
  );
}
