import { useMutation } from '@tanstack/react-query';
import { requestPaymentCancel } from '../api/purchaseApi';
import type {
  PaymentCancelRequest,
  PaymentCancelResponse,
} from '../types/purchaseTypes';
import type { ApiResponse } from '@/shared/types/api-types';

interface UsePaymentCancelResult {
  mutate: (data: {
    merchantUid: string;
    cancelData: PaymentCancelRequest;
  }) => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  data: ApiResponse<PaymentCancelResponse> | undefined;
}

export function usePaymentCancel(
  onSuccess?: (data: ApiResponse<PaymentCancelResponse>) => void,
  onError?: (error: Error) => void
): UsePaymentCancelResult {
  const { mutate, isPending, isError, error, isSuccess, data } = useMutation({
    mutationFn: ({
      merchantUid,
      cancelData,
    }: {
      merchantUid: string;
      cancelData: PaymentCancelRequest;
    }) => requestPaymentCancel(merchantUid, cancelData),
    onSuccess,
    onError,
  });

  return {
    mutate,
    isLoading: isPending,
    isError,
    error: error as Error | null,
    isSuccess,
    data,
  };
}
