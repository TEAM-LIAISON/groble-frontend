import { fetchClient } from '@/shared/api/api-fetch';
import { SettlementMonthlyDetailResponse } from '../types/settlement-detail-types';

export async function getSettlementMonthlyDetail(yearMonth: string) {
  return fetchClient<SettlementMonthlyDetailResponse>(
    `/api/v1/settlements/${yearMonth}`
  );
}
