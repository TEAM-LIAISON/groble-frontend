import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../api/payment-api";
import { CreateOrderRequestTypes } from "../types/payment-types";

export const useOrderSubmit = () => {
  return useMutation({
    mutationFn: (orderData: CreateOrderRequestTypes) => createOrder(orderData),
    onSuccess: (response) => {
      console.log("주문 생성 성공:", response);
      // 성공 시 처리 로직 (예: 페이지 이동, 토스트 메시지 등)
    },
    onError: (error) => {
      console.error("주문 생성 실패:", error);
      // 에러 처리 로직
    },
  });
};
