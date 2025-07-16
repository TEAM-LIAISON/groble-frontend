import { useQuery } from '@tanstack/react-query';
import { getContentManageDetail } from '../api/productDetailApi';
import type { ContentManageDetailResponse } from '../types/productDetailTypes';

export function useContentManageDetail(contentId: string) {
  return useQuery({
    queryKey: ['contentManageDetail', contentId],
    queryFn: () => getContentManageDetail(contentId),
    enabled: !!contentId,
    staleTime: 1000 * 60 * 5, // 5분
  });
}
