import { useQuery } from '@tanstack/react-query';
import { getReviewDetail } from '../api/productDetailApi';

export const useReviewDetail = (contentId: string, reviewId: string) => {
  return useQuery({
    queryKey: ['reviewDetail', contentId, reviewId],
    queryFn: () => getReviewDetail(contentId, reviewId),
    enabled: !!contentId && !!reviewId,
  });
};
