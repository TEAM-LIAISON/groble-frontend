import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { setNickname } from '../api/nicknameApi';
import { showToast } from '@/shared/ui/Toast';

export const useSetNickname = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: setNickname,
    onSuccess: () => {
      showToast.success('닉네임이 설정되었습니다');
      // 회원가입 완료 후 메인 페이지나 온보딩 완료 페이지로 이동
      router.push('/auth/sign-up/phone');
    },
    onError: (error) => {
      console.error('닉네임 설정 실패:', error);
    },
  });
};
