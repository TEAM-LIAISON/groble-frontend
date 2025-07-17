import { useQuery } from '@tanstack/react-query';
import { getContentReviewList } from '../api/productDetailApi';

export const useContentReviewList = (
  contentId: string,
  page: number = 0,
  size: number = 15,
  sort: string = 'createdAt,desc'
) => {
  return useQuery({
    queryKey: ['contentReviewList', contentId, page, size, sort],
    queryFn: () => getContentReviewList(contentId, page, size, sort),
    enabled: !!contentId,
  });
};
