import { fetchClient } from '@/shared/api/api-fetch';

export interface MarketViewStatsResponse {
  viewDate: string;
  dayOfWeek: string;
  viewCount: number;
}

export interface MarketViewStatsListResponse {
  items: MarketViewStatsResponse[];
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
    marketName: string;
  };
}

export async function getMarketViewStats(
  period: string,
  page: number,
  size: number = 20
): Promise<MarketViewStatsListResponse> {
  const response = await fetchClient<MarketViewStatsListResponse>(
    `/api/v1/dashboard/market/view-stats?period=${period}&page=${page}&size=${size}`
  );

  return response.data;
}
