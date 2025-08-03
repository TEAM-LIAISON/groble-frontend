import { useQuery } from '@tanstack/react-query';
import { getContentReviewList } from '../api/productDetailApi';

export const useContentReviewList = (
  contentId: string,
  page = 0,
  size = 15,
  sort = 'createdAt,desc'
) => {
  return useQuery({
    queryKey: ['contentReviewList', contentId, page, size, sort],
    queryFn: () => getContentReviewList(contentId, page, size, sort),
    enabled: !!contentId,
  });
};
