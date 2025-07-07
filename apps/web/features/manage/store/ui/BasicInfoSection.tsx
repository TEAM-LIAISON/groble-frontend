'use client';

import InputField from './InputField';
import HighlightText from './HighlightText';
import { VertifyBadgeIcon } from '@/components/(improvement)/icons/Vertify_badge';
import Image from 'next/image';
import { useStoreInfo } from '../../hooks/useStoreInfo';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import type { VerificationStatus } from '../../types/storeTypes';

/**
 * 인증 상태에 따른 인증 배지 표시 여부 확인
 */
function shouldShowVerifyBadge(status: VerificationStatus): boolean {
  return status === 'VERIFIED';
}

/**
 * 연락처 타입에 따른 한글 라벨 반환
 */
function getContactLabel(type: string): string {
  const labels: Record<string, string> = {
    instagram: '인스타그램',
    email: '이메일',
    openChat: '카카오 오픈채팅',
    etc: '기타',
  };
  return labels[type] || type;
}

/**
 * 가격 포맷팅 함수
 */
function formatPrice(price: number | null): string {
  if (price === null) return '가격미정';
  return `${price.toLocaleString()}원`;
}

/**
 * 기본 정보 섹션 컴포넌트 - 뷰어용
 */
export function BasicInfoViewSection() {
  const { data: marketInfo, isLoading, error } = useStoreInfo();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-label-1-normal text-label-alternative">
          마켓 정보를 불러오는데 실패했습니다.
        </p>
      </div>
    );
  }

  if (!marketInfo) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-label-1-normal text-label-alternative">
          마켓 정보가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <section className="flex flex-col">
      {/* 마켓 이름 */}
      <div className="my-6 flex gap-1 items-center">
        <h1 className="text-body-1-normal font-bold text-label-normal">
          <HighlightText>
            {marketInfo.marketName === ''
              ? '마켓 이름을 설정해주세요.'
              : marketInfo.marketName}
          </HighlightText>
        </h1>

        {shouldShowVerifyBadge(marketInfo.verificationStatus) && (
          <VertifyBadgeIcon />
        )}
      </div>

      {/* 마켓 로고 */}
      <div className="flex flex-col">
        <h2 className="text-body-2-normal font-bold text-label-normal">
          마켓 로고
        </h2>
        <hr className="my-3 border-line-normal" />

        <div className="w-[4rem] h-[4rem] rounded-full relative">
          <Image
            src={
              marketInfo.profileImageUrl || '/assets/common/icons/Avatar.svg'
            }
            alt="마켓 로고"
            fill
            className="rounded-full object-cover"
          />
        </div>
      </div>

      {/* 문의 수단 */}
      <div className="flex flex-col mt-10">
        <h2 className="text-body-2-normal font-bold text-label-normal">
          문의 수단
        </h2>
        <hr className="my-3 border-line-normal" />

        {!marketInfo.contactInfo ||
        Object.keys(marketInfo.contactInfo).length === 0 ? (
          /* 문의 수단 없을 경우 */
          <div className="rounded-lg bg-background-alternative py-4 px-3 max-w-[20.9rem] text-label-1-normal font-semibold text-label-alternative">
            문의 수단을 추가해주세요
          </div>
        ) : (
          /* 문의 수단 있을 경우 */
          <div className="flex flex-col gap-3">
            {Object.entries(marketInfo.contactInfo).map(([type, value]) =>
              value ? (
                <div key={type} className="flex flex-col gap-1">
                  <p className="text-label-1-normal font-semibold text-label-alternative">
                    {getContactLabel(type)}
                  </p>
                  <div className="rounded-lg bg-background-alternative py-4 px-3 max-w-[20.9rem] text-label-1-normal font-semibold text-label-normal">
                    {value}
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>

      {/* 대표 콘텐츠 */}
      <div className="flex flex-col mt-10">
        <h2 className="text-body-2-normal font-bold text-label-normal">
          대표 콘텐츠
        </h2>
        <hr className="my-3 border-line-normal" />

        {!marketInfo.representativeContent ? (
          /* 대표 콘텐츠 없을 경우 */
          <p className="text-label-1-normal font-semibold text-label-alternative">
            대표 콘텐츠를 추가해주세요
          </p>
        ) : (
          /* 대표 콘텐츠 있을 경우 */
          <div className="flex gap-3 items-center">
            <div className="w-[5rem] h-[5rem] rounded-sm relative">
              <Image
                src={
                  marketInfo.representativeContent.thumbnailUrl ||
                  '/assets/common/icons/Avatar.svg'
                }
                alt="대표 콘텐츠"
                fill
                className="rounded-sm object-cover"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-body-1-normal font-semibold text-label-normal">
                {marketInfo.representativeContent.title}
              </p>
              <p className="text-label-1-normal font-semibold text-label-alternative">
                {marketInfo.representativeContent.sellerName}
              </p>
              <p className="text-label-1-normal font-semibold text-label-alternative">
                {formatPrice(marketInfo.representativeContent.lowestPrice)}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
