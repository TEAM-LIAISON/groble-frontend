import { fetchClient } from '@/shared/api/api-fetch';
import { DashboardOverview } from '../types/dashboard-types';

export async function getDashboardOverview() {
  return fetchClient<DashboardOverview>('/api/v1/dashboard/overview');
}
