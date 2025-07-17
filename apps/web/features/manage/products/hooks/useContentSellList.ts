import { useQuery } from '@tanstack/react-query';
import { getContentSellList } from '../api/productDetailApi';

export const useContentSellList = (
  contentId: string,
  page: number = 0,
  size: number = 15,
  sort: string = 'purchasedAt,desc'
) => {
  return useQuery({
    queryKey: ['contentSellList', contentId, page, size, sort],
    queryFn: () => getContentSellList(contentId, page, size, sort),
    enabled: !!contentId,
  });
};
