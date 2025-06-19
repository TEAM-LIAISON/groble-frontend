import WebHeader from '@/components/(improvement)/layout/header';
import { Button, TextField } from '@groble/ui';
import Link from 'next/link';
import SocialLoginButtons from '@/features/account/sign-in/ui/SocialLoginButtons';
import { fetchServerSide } from '@/shared/api/fetch-ssr';
import { redirect } from 'next/navigation';

interface UserData {
  nickname: string | null;
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_uri?: string }>;
}) {
  const { redirect_uri: redirectURI } = await searchParams;

  try {
    // 서버에서 사용자 정보 확인
    const userData = await fetchServerSide<{ data: UserData }>('/api/v1/me');

    // nickname 있으면 홈, 없으면 가입 페이지로 리다이렉트
    if (userData.data.nickname) {
      redirect('/');
    } else {
      redirect('/auth/sign-up/user-type?type=social');
    }
  } catch (error) {
    // 인증되지 않은 사용자는 로그인 페이지 표시
    console.log('사용자 인증 안됨, 로그인 페이지 표시');
  }

  return (
    <>
      <WebHeader />
      <div
        className={`w-full flex  justify-center items-center h-[calc(100vh-68px)]`}
      >
        <div className="flex flex-col max-w-[480px] w-full">
          {/* 로그인 */}
          <div className=" flex flex-col w-full gap-5">
            <h1 className="text-title-3 font-bold text-label-normal text-left">
              로그인 하기
            </h1>
            <form className="flex flex-col gap-3">
              <TextField className="w-full" placeholder="이메일" />
              <TextField
                className="w-full"
                placeholder="비밀번호"
                inputType="password"
              />
              <Button
                buttonType="submit"
                className="w-full"
                group="solid"
                type="primary"
                size="medium"
              >
                로그인
              </Button>
            </form>
            <Link
              href="/reset-password-request"
              className="py-[0.56rem] text-body-2-normal text-label-alternative text-center"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>

          {/* 구분선 */}
          <div className="mt-8 flex items-center w-full">
            <div className="w-full h-[1px] bg-line-normal" />
            <span className="text-body-2-normal font-medium text-[#9DA3AB] px-8">
              OR
            </span>
            <div className="w-full h-[1px] bg-line-normal" />
          </div>

          {/* 소셜 로그인 */}
          <div className="mt-4 flex flex-col gap-2">
            <SocialLoginButtons redirectURI={redirectURI} />
          </div>
        </div>
      </div>
    </>
  );
}
