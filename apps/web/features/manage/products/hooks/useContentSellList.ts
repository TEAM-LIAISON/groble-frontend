import { useQuery } from '@tanstack/react-query';
import { getContentSellList } from '../api/productDetailApi';

export const useContentSellList = (
  contentId: string,
  page = 0,
  size = 15,
  sort = 'purchasedAt,desc'
) => {
  return useQuery({
    queryKey: ['contentSellList', contentId, page, size, sort],
    queryFn: () => getContentSellList(contentId, page, size, sort),
    enabled: !!contentId,
  });
};
