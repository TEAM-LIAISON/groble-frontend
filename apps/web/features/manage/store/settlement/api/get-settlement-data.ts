import { fetchClient } from '@/shared/api/api-fetch';
import { SettlementSummaryResponse } from '../types/settlement-types';

export async function getSettlementData() {
  return fetchClient<SettlementSummaryResponse>('/api/v1/settlements/overview');
}
