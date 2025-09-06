import { fetchServerSide } from '@/shared/api/fetch-ssr';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import AuthCallbackClient from './AuthCallbackClient';

export const dynamic = 'force-dynamic';

interface UserData {
  nickname: string | null;
  isLogin: boolean;
}

export default async function AuthCallbackPage() {
  try {
    // 서버에서 사용자 정보 확인
    const userData = await fetchServerSide<{ data: UserData }>('/api/v1/me');

    // isLogin 있으면 홈, 없으면 가입 페이지로 리다이렉트

    if (userData.data.isLogin) {
      // 클라이언트에서 provider 저장 후 홈으로 리다이렉트
      return (
        <Suspense fallback={<div>로그인 처리 중...</div>}>
          <AuthCallbackClient redirectTo="/" />
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={<div>회원가입 처리 중...</div>}>
          <AuthCallbackClient redirectTo="/auth/sign-up/user-type?type=social" />
        </Suspense>
      );
    }
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    // 에러 시 로그인 페이지로 돌아가기
    redirect('/');
  }
}
