import { useInfiniteQuery } from '@tanstack/react-query';
import { getPurchaseContents } from '../api/manage-products-api';
import {
  PurchaseContentsParams,
  PurchaseContentsResponse,
} from '../types/purchase-types';

interface UsePurchaseCoachingProps {
  status?: string;
}

export const usePurchaseCoaching = ({ status }: UsePurchaseCoachingProps) => {
  const query = useInfiniteQuery<PurchaseContentsResponse, Error>({
    queryKey: ['purchase-coaching', status],
    queryFn: ({ pageParam }) => {
      const params: PurchaseContentsParams = {
        state: status || undefined,
        cursorRequest: {
          cursor: pageParam as string | undefined,
          size: 20,
        },
      };
      return getPurchaseContents(params);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage: PurchaseContentsResponse) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5분
  });

  // 모든 페이지의 데이터를 합침
  const allItems = query.data?.pages.flatMap((page) => page.items || []) || [];

  return {
    ...query,
    allItems,
  };
};
