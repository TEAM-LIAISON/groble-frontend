'use client';
import WebHeader from '@/components/(improvement)/layout/header';
import { Button, TextField } from '@groble/ui';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { profileKeys } from '@/features/profile/model/queries';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { useSetNickname } from '@/features/account/sign-up/hooks/useSetNickname';

function PatchNicknameContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const nickname = searchParams.get('nickname') ?? '';
  const [nicknameValue, setNicknameValue] = useState(nickname);
  const setNicknameMutation = useSetNickname();

  // 닉네임 유효성 검사
  const isValidLength = nicknameValue.length >= 2 && nicknameValue.length <= 15;
  const isChanged = nicknameValue !== nickname;
  const isValidNickname = isValidLength && isChanged;

  // 서버 에러 메시지만 노출 (중복/충돌 시 서버 메시지 우선)
  const serverErrorMessage =
    setNicknameMutation.error instanceof Error
      ? setNicknameMutation.error.message
      : undefined;

  // 동일 위치에 안내/에러 메시지를 표시: 에러는 서버 에러만, 그 외에는 가이드 텍스트
  const computedErrorText = serverErrorMessage || undefined;
  const computedHelperText = computedErrorText
    ? undefined
    : '2~15자 이내로 입력해주세요';

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력 변경 시 서버 에러 초기화
    if (setNicknameMutation.error) setNicknameMutation.reset();
    setNicknameValue(e.target.value);
  };

  const handleContinue = () => {
    if (isValidNickname) {
      setNicknameMutation.mutate(
        { nickname: nicknameValue },
        {
          onSuccess: () => {
            // 프로필 데이터 무효화 후 페이지 이동
            queryClient.invalidateQueries({
              queryKey: profileKeys.userDetail(),
            });
            queryClient.invalidateQueries({ queryKey: ['userInfo'] });
            router.push('/users/profile/info');
          },
        }
      );
    }
  };

  return (
    <>
      <WebHeader mobileBack="back" />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full p-5 md:p-0">
          <h1 className="text-heading-1 md:text-title-3 font-semibold md:font-bold text-label-normal md:mt-[9.06rem] mb-5">
            새로운 닉네임을 입력해주세요
          </h1>

          <div className="flex flex-col gap-2">
            <TextField
              placeholder="닉네임 (2-15자)"
              value={nicknameValue}
              onChange={handleNicknameChange}
              disabled={setNicknameMutation.isPending}
              helperText={computedHelperText}
              errorText={computedErrorText}
              // error prop 미사용: 입력 UI 테두리 색은 유지하고 하단 텍스트 색만 변경
            />
          </div>

          <div className="mt-auto mb-5 w-full">
            <Button
              onClick={handleContinue}
              disabled={!isValidNickname || setNicknameMutation.isPending}
              className="w-full"
              group="solid"
              type="primary"
              size="large"
            >
              {setNicknameMutation.isPending ? <LoadingSpinner /> : '변경하기'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PatchNicknamePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PatchNicknameContent />
    </Suspense>
  );
}
