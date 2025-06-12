// File: groble-frontend/features/products/payment/api/payment-api.ts

import { fetchClient } from "@/shared/api/api-fetch";
import {
  ProductPaymentTypes,
  CreateOrderRequestTypes,
  CreateOrderResponseTypes,
  PaymentResultTypes,
} from "../types/payment-types";
import { ApiResponse } from "@/shared/types/api-types";

// 결제 정보 조회
export const fetchPaymentData = async (
  contentId: number,
  optionId: number,
): Promise<ApiResponse<ProductPaymentTypes>> => {
  return await fetchClient(`/api/v1/content/${contentId}/pay/${optionId}`, {
    method: "GET",
  });
};

// 주문 생성
export const createOrder = async (
  orderData: CreateOrderRequestTypes,
): Promise<ApiResponse<CreateOrderResponseTypes>> => {
  return await fetchClient("/api/v1/orders/create", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
};

// 결제 결과 조회
export const fetchPaymentResult = async (
  merchantUid: string,
): Promise<ApiResponse<PaymentResultTypes>> => {
  return await fetchClient(`/api/v1/orders/success/${merchantUid}`, {
    method: "GET",
    cache: "no-store",
  });
};
