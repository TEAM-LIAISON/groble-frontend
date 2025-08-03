import { showToast } from '@/shared/ui/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type SwitchUserTypeRequest, switchUserType } from '../api/userTypeApi';
import { profileKeys } from '../model/queries';

/**
 * 사용자 유형 전환 훅
 */
export const useSwitchUserType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SwitchUserTypeRequest) => switchUserType(data),
    onMutate: async (variables) => {
      // Optimistic update: 즉시 UI 업데이트
      await queryClient.cancelQueries({ queryKey: profileKeys.userDetail() });

      const previousUserData = queryClient.getQueryData(
        profileKeys.userDetail()
      );

      // 사용자 유형을 즉시 업데이트
      queryClient.setQueryData(profileKeys.userDetail(), (oldData: any) => {
        if (oldData?.data) {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              userType: variables.userType,
            },
          };
        }
        return oldData;
      });

      return { previousUserData };
    },
    onSuccess: () => {
      showToast.success('사용자 유형이 성공적으로 변경되었습니다.');
      // 서버에서 최신 데이터를 다시 가져와서 동기화
      queryClient.invalidateQueries({ queryKey: profileKeys.userDetail() });
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      // 전체 캐시를 리프레시하여 다른 컴포넌트들도 업데이트되도록
      queryClient.refetchQueries({ queryKey: profileKeys.userDetail() });
    },
    onError: (error: any, variables, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousUserData) {
        queryClient.setQueryData(
          profileKeys.userDetail(),
          context.previousUserData
        );
      }
      console.error('사용자 유형 전환 실패:', error);
      showToast.error('사용자 유형 변경에 실패했습니다.');
    },
  });
};
