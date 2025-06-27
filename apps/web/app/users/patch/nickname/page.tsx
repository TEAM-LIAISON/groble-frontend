'use client';
import WebHeader from '@/components/(improvement)/layout/header';
import { Button, TextField } from '@groble/ui';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { setNickname } from '@/features/account/sign-up/api/nicknameApi';
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
  const [isLoading, setIsLoading] = useState(false);
  const setNicknameMutation = useSetNickname();

  // 닉네임 유효성 검사
  const isValidLength = nicknameValue.length >= 2 && nicknameValue.length <= 15;
  const isChanged = nicknameValue !== nickname;
  const isValidNickname = isValidLength && isChanged;

  // 닉네임 변경 핸들러
  const handleSubmit = async () => {
    if (!isValidNickname) return;

    setIsLoading(true);
    try {
      await setNickname({ nickname: nicknameValue });

      // 프로필 쿼리 무효화하여 새로운 데이터 로드
      await queryClient.invalidateQueries({
        queryKey: profileKeys.userDetail(),
      });

      // 사용자 정보 쿼리도 무효화 (헤더 등에서 사용)
      await queryClient.invalidateQueries({
        queryKey: ['userInfo'],
      });

      router.push('/users/profile');
    } catch (error) {
      console.error('닉네임 변경 실패:', error);
      alert('닉네임 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            router.push('/users/profile');
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
            />
            <span className="flex mt-1 md:mt-3 items-center gap-1 text-caption-1 text-label-alternative">
              <InfoCircledIcon className="w-4 h-4" />
              <p>2~15자 이내로 입력해주세요</p>
            </span>
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
