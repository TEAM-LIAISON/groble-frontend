import type { ProductCardProps } from '@/entities/product/model';
import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';

type CoachingList = {
  items: ProductCardProps[];
};

export async function getCoachingList(): Promise<ApiResponse<CoachingList>> {
  return fetchClient<CoachingList>('/api/v1/contents/coaching/category');
}
