import { fetchClient } from '@/shared/api/api-fetch';

export interface ContentViewStatsResponse {
  viewDate: string;
  dayOfWeek: string;
  viewCount: number;
}

export interface ContentViewStatsListResponse {
  items: ContentViewStatsResponse[];
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

export async function getContentViewStats(
  contentId: string,
  period: string,
  page: number,
  size: number = 20
): Promise<ContentViewStatsListResponse> {
  const response = await fetchClient<ContentViewStatsListResponse>(
    `/api/v1/dashboard/content/${contentId}/view-stats?period=${period}&page=${page}&size=${size}`
  );

  return response.data;
}
