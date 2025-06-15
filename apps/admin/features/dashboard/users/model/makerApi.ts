import { apiClient } from '@/shared/api/client';
import { MakerDetailData } from './MakerType';

// 메이커 상세 조회
export const fetchMakerDetail = async (nickname: string) => {
  return apiClient<MakerDetailData>(`/api/v1/admin/maker/${nickname}`);
};
