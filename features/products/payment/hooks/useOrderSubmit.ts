import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../api/payment-api";
import { CreateOrderRequestTypes } from "../types/payment-types";

export const useOrderSubmit = () => {
  return useMutation({
    mutationFn: (orderData: CreateOrderRequestTypes) => createOrder(orderData),
    // onSuccess와 onError는 컴포넌트에서 처리하도록 제거
  });
};
