import { fetchServerSide } from '@/shared/api/fetch-ssr';
import { redirect } from 'next/navigation';

interface UserData {
  nickname: string | null;
  isLoginCompleted: boolean;
}

export default async function AuthCallbackPage() {
  try {
    // 서버에서 사용자 정보 확인
    const userData = await fetchServerSide<{ data: UserData }>('/api/v1/me');
    console.log(userData.data);

    // isLoginCompleted 있으면 홈, 없으면 가입 페이지로 리다이렉트
    if (userData.data.isLoginCompleted) {
      redirect('/');
    } else {
      redirect('/auth/sign-up/user-type?type=social');
    }
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    // 에러 시 로그인 페이지로 돌아가기
    redirect('/auth/sign-in');
  }
}
