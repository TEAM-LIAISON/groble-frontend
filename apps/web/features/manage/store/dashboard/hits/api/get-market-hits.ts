import { fetchClient } from '@/shared/api/api-fetch';
import { MarketHits, MarketHitsContentList } from '../types/market-hits';

export function getMarketHits(period: string) {
  return fetchClient<MarketHits>(
    `/api/v1/dashboard/view-stats?period=${period}`
  );
}

// 조회수 순위 리스트(페이지네이션)
export function getMarketHitsContentList(
  period: string,
  page: number,
  size: number
) {
  return fetchClient<MarketHitsContentList>(
    `/api/v1/dashboard/content/view-stats?period=${period}&page=${page}&size=${size}`
  );
}
