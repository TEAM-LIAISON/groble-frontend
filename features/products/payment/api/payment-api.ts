// File: groble-frontend/features/products/payment/api/payment-api.ts

import { fetchClient } from "@/shared/api/api-fetch";
import { ProductPaymentTypes } from "../types/payment-types";
import { ApiResponse } from "@/shared/types/api-types";

export const fetchPaymentData = async (
  contentId: number,
  optionId: number,
): Promise<ApiResponse<ProductPaymentTypes>> => {
  return await fetchClient(`/api/v1/content/${contentId}/pay/${optionId}`, {
    method: "GET",
  });
};
