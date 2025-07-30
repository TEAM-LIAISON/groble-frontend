import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { saveDraft, fetchDraft, type DraftRequest } from '../api/draft-api';
import { showToast } from '@/shared/ui/Toast';

/**
 * 임시저장 mutation
 */
export function useSaveDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveDraft,
    onSuccess: (response, variables) => {
      console.log('임시저장 성공:', response);

      if (response.code === 201 || response.code === 200) {
        const contentId = response.data?.contentId || response.data?.id;

        if (contentId) {
          // 기존 쿼리 캐시 무효화하여 최신 데이터 보장
          queryClient.invalidateQueries({
            queryKey: ['productDetail', String(contentId)],
          });

          showToast.success('임시 저장되었습니다.');
          return contentId;
        }
      }

      throw new Error(response.message || '임시 저장에 실패했습니다.');
    },
    onError: (error) => {
      console.error('임시저장 실패:', error);
      showToast.error(
        error instanceof Error
          ? error.message
          : '임시 저장 중 오류가 발생했습니다.'
      );
    },
  });
}

/**
 * 임시저장된 데이터 조회 (기존 useLoadProduct 개선)
 */
export function useDraft(contentId: string | null) {
  return useQuery({
    queryKey: ['productDetail', contentId],
    queryFn: () => fetchDraft(contentId!),
    enabled: !!contentId,
    staleTime: Infinity, // 무한 캐싱 - 한번 로드되면 항상 캐시 사용
    gcTime: 1000 * 60 * 30, // 30분 가비지 컬렉션
    refetchOnWindowFocus: false,
    refetchOnMount: false, // 마운트 시 재요청 방지
    refetchOnReconnect: false, // 재연결 시 재요청 방지
    select: (response) => {
      if (response.status !== 'SUCCESS') {
        throw new Error('데이터 로드 실패');
      }
      return response.data;
    },
  });
}
