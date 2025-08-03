import { showToast } from '@/shared/ui/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api/profileApi';

export const profileKeys = {
  all: ['profile'] as const,
  userDetail: () => [...profileKeys.all, 'userDetail'] as const,
};

export const useUserDetail = () => {
  return useQuery({
    queryKey: profileKeys.userDetail(),
    queryFn: () => profileApi.getUserDetail(),
    staleTime: 1 * 60 * 1000, // 1분으로 단축하여 더 자주 새로운 데이터 가져오기
    gcTime: 5 * 60 * 1000, // 5분으로 단축
    refetchOnWindowFocus: true, // 창 포커스 시 리패치
    refetchOnMount: 'always', // 마운트 시 항상 리패치
  });
};

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => profileApi.uploadProfileImage(file),
    onSuccess: (data) => {
      // 기존 사용자 데이터를 가져와서 profileImageUrl만 업데이트
      queryClient.setQueryData(profileKeys.userDetail(), (oldData: any) => {
        if (oldData?.data) {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              profileImageUrl: data.data.fileUrl,
            },
          };
        }
        return oldData;
      });

      showToast.success('프로필 이미지가 성공적으로 업데이트되었습니다.');
    },
    onError: (error) => {
      showToast.error('프로필 이미지 업로드에 실패했습니다.');
      console.error('프로필 이미지 업로드 에러:', error);
    },
  });
};
