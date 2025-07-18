import { useQuery } from '@tanstack/react-query';
import { getSellDetail } from '../api/productDetailApi';

export const useSellDetail = (contentId: string, purchaseId: string) => {
  return useQuery({
    queryKey: ['sellDetail', contentId, purchaseId],
    queryFn: () => getSellDetail(contentId, purchaseId),
    enabled: !!contentId && !!purchaseId,
  });
};
