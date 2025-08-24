import { fetchClient } from '@/shared/api/api-fetch';

export interface ReferrerStatsResponse {
  referrerUrl: string;
  visitCount: number;
}

export interface MarketReferrerStatsResponse {
  items: ReferrerStatsResponse[];
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

export async function getMarketReferrerStats(
  period: string,
  page: number,
  size: number = 20
): Promise<MarketReferrerStatsResponse> {
  const response = await fetchClient<MarketReferrerStatsResponse>(
    `/api/v1/dashboard/market/referrer-stats?period=${period}&page=${page}&size=${size}`
  );

  return response.data;
}
