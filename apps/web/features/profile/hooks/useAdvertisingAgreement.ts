import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAdvertisingAgreement,
  updateAdvertisingAgreement,
  UpdateAdvertisingAgreementRequest,
  AdvertisingAgreementResponse,
} from '../api/advertisingAgreementApi';
import { showToast } from '@/shared/ui/Toast';

export const advertisingAgreementKeys = {
  all: ['advertising-agreement'] as const,
  detail: () => [...advertisingAgreementKeys.all, 'detail'] as const,
};

/**
 * 마케팅 동의 상태 조회 훅
 */
export const useAdvertisingAgreement = () => {
  return useQuery({
    queryKey: advertisingAgreementKeys.detail(),
    queryFn: getAdvertisingAgreement,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

/**
 * 마케팅 동의 상태 변경 훅
 */
export const useUpdateAdvertisingAgreement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAdvertisingAgreementRequest) =>
      updateAdvertisingAgreement(data),
    onMutate: async (variables) => {
      // Optimistic update
      await queryClient.cancelQueries({
        queryKey: advertisingAgreementKeys.detail(),
      });

      const previousData =
        queryClient.getQueryData<AdvertisingAgreementResponse>(
          advertisingAgreementKeys.detail()
        );

      // 기존 데이터를 유지하면서 isAdvertisingAgreement만 업데이트
      if (previousData) {
        queryClient.setQueryData(advertisingAgreementKeys.detail(), {
          ...previousData,
          isAdvertisingAgreement: variables.agreed,
        });
      }

      return { previousData };
    },
    onSuccess: () => {
      showToast.success('마케팅 동의 설정이 변경되었습니다.');
      // 서버에서 최신 데이터 가져오기
      queryClient.invalidateQueries({
        queryKey: advertisingAgreementKeys.detail(),
      });
    },
    onError: (error: any, variables, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousData) {
        queryClient.setQueryData(
          advertisingAgreementKeys.detail(),
          context.previousData
        );
      }
      console.error('마케팅 동의 설정 변경 실패:', error);
      showToast.error('마케팅 동의 설정 변경에 실패했습니다.');
    },
  });
};
