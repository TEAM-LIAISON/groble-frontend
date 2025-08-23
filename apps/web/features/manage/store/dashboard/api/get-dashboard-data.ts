import { fetchClient } from '@/shared/api/api-fetch';
import {
  DashboardMyContentList,
  DashboardOverview,
} from '../types/dashboard-types';

// 대시보드 오버뷰 조회
export async function getDashboardOverview() {
  return fetchClient<DashboardOverview>('/api/v1/dashboard/overview');
}

// 대시보드 내 컨텐츠 리스트 조회
export async function getDashboardMyContentList(page: number, size: number) {
  return fetchClient<DashboardMyContentList>(
    `/api/v1/dashboard/my-contents?page=${page}&size=${size}`
  );
}
