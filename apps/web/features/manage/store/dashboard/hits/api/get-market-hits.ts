import { fetchClient } from '@/shared/api/api-fetch';
import { MarketHits } from '../types/market-hits';

export function getMarketHits(period: string) {
  return fetchClient<MarketHits>(
    `/api/v1/dashboard/view-stats?period=${period}`
  );
}
