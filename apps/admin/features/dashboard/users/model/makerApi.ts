import { apiClient } from '@/shared/api/client';
import { MakerDetailData } from './MakerType';

// 메이커 상세 조회
export const fetchMakerDetail = async (nickname: string) => {
  return apiClient<MakerDetailData>(`/api/v1/admin/maker/${nickname}`);
};

// 메이커 승인/거절 요청 타입
export interface MakerVerificationRequest {
  nickname: string;
  status: 'APPROVED' | 'REJECTED';
}

// 메이커 승인/거절 처리
export const verifyMaker = async (
  request: MakerVerificationRequest
): Promise<void> => {
  const response = await apiClient<void>('/api/v1/admin/maker/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (response.code !== 200) {
    throw new Error(response.message || '메이커 인증 처리에 실패했습니다.');
  }
};
