import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPurchaseContents } from '../api/purchase-api';
import { PurchaseContentsParams } from '../types/purchase-types';

export const usePurchaseContents = (
  initialParams: Omit<PurchaseContentsParams, 'cursorRequest'>
) => {
  return useInfiniteQuery({
    queryKey: ['purchaseContents', initialParams],
    queryFn: ({ pageParam = null }) =>
      fetchPurchaseContents({
        cursorRequest: {
          cursor: pageParam,
          size: 10,
        },
        ...initialParams,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data?.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: null as string | null,
    staleTime: 5 * 60 * 1000, // 5분
    refetchOnWindowFocus: false,
  });
};
