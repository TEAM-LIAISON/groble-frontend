import { fetchClient } from '@/shared/api/api-fetch';

export interface ContentReferrerStatsResponse {
  referrerUrl: string;
  visitCount: number;
}

export interface ContentReferrerStatsListResponse {
  items: ContentReferrerStatsResponse[];
  pageInfo: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  };
  meta: {
    contentTitle: string;
  };
}

export async function getContentReferrerStats(
  contentId: string,
  period: string,
  page: number,
  size: number = 20
): Promise<ContentReferrerStatsListResponse> {
  const response = await fetchClient<ContentReferrerStatsListResponse>(
    `/api/v1/dashboard/content/${contentId}/referrer-stats?period=${period}&page=${page}&size=${size}`
  );

  return response.data;
}
