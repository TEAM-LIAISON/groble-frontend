import { useQuery } from '@tanstack/react-query';
import { getPurchaseDetail } from '../api/purchaseApi';
import type { PurchaseDetailResponse } from '../types/purchaseTypes';

interface UsePurchaseDetailResult {
  data: PurchaseDetailResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function usePurchaseDetail(
  merchantUid: string
): UsePurchaseDetailResult {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['purchaseDetail', merchantUid],
    queryFn: () => getPurchaseDetail(merchantUid),
    enabled: !!merchantUid,
  });

  return {
    data: response?.data,
    isLoading,
    isError,
    error: error as Error | null,
  };
}
