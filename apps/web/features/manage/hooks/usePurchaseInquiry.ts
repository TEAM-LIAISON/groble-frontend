import { useQuery } from '@tanstack/react-query';
import { getPurchaseInquiry } from '../api/purchaseApi';
import type { InquiryResponse } from '../types/purchaseTypes';

interface UsePurchaseInquiryResult {
  data: InquiryResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function usePurchaseInquiry(
  merchantUid: string,
  enabled = false
): UsePurchaseInquiryResult {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['purchaseInquiry', merchantUid],
    queryFn: () => getPurchaseInquiry(merchantUid),
    enabled: enabled && !!merchantUid,
  });

  return {
    data: response?.data,
    isLoading,
    isError,
    error: error as Error | null,
  };
}
