'use client';
import WebHeader from '@/components/(improvement)/layout/header';
import { Button, TextField } from '@groble/ui';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { setNickname } from '@/features/account/sign-up/api/nicknameApi';
import { useQueryClient } from '@tanstack/react-query';
import { profileKeys } from '@/features/profile/model/queries';

export default function PatchNicknamePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const nickname = searchParams.get('nickname') ?? '';
  const [nicknameValue, setNicknameValue] = useState(nickname);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      <WebHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full ">
          <h1 className="text-title-3 font-bold text-label-normal mt-[13.91rem] ">
            새로운 닉네임을 알려주세요
          </h1>
          <div className="mt-5 flex flex-col">
            <TextField
              placeholder="닉네임"
              value={nicknameValue}
              onChange={(e) => setNicknameValue(e.target.value)}
            />
            <span className="flex mt-3 items-center gap-1 text-caption-1 text-label-alternative">
              <InfoCircledIcon className="w-4 h-4" />
              <p>2~15자 이내로 입력해주세요</p>
            </span>
          </div>

          <div className="mt-auto mb-8 w-full">
            <Button
              className="w-full"
              group="solid"
              type="primary"
              size="large"
              disabled={!isValidNickname || isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? '변경 중...' : '확인'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
