'use client';
import WebHeader from '@/components/(improvement)/layout/header';
import BottomArea, { BottomLinkButton } from '@/components/bottom-area';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MakerCompletePage() {
  const router = useRouter();

  return (
    <>
      {/* 이전 페이지로 뒤로가기 */}
      <WebHeader mobileBack="back" />
      <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
        <div className="w-full md:mt-[150px] md:max-w-[480px]">
          <main className="flex w-full flex-col items-center">
            <Image
              src="/assets/common/icons/megaphone.svg"
              alt="인증을 완료했어요"
              width={200}
              height={200}
            />
            <h1 className="mt-6 text-title-3 font-bold text-label-normal">
              인증 요청을 완료했어요
            </h1>
            <p className="mt-2 text-body-1-normal text-label-alternative">
              빠르게 인증을 진행해드릴게요!
              <br />
              그동안 상품 등록도 가능해요.
            </p>
          </main>

          <BottomArea narrow>
            <BottomLinkButton
              href="/products/register/info"
              className="mb-[0.62rem]"
            >
              <span className="flex min-h-[1.5rem] items-center justify-center">
                상품 등록하기
              </span>
            </BottomLinkButton>
            <BottomLinkButton href="/" group="solid" type="secondary">
              <span className="flex min-h-[1.5rem] items-center justify-center">
                홈으로 가기{' '}
              </span>
            </BottomLinkButton>
          </BottomArea>
        </div>
      </div>
    </>
  );
}
