import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  type SocialSignUpBasicInfoRequest,
  signUpSocialBasicInfo,
} from '../api/signUpApi';

export const useSignUpSocial = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SocialSignUpBasicInfoRequest) =>
      signUpSocialBasicInfo(data),
    onSuccess: (data) => {
      // 토큰을 받았으므로 회원가입 완료
      router.push('/auth/sign-up/nickname');
    },
    onError: (error) => {
      console.error('소셜 회원가입 실패:', error);
      // 에러 처리 로직 추가 가능
    },
  });
};
