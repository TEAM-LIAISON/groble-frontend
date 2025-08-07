'use client';
import Image from 'next/image';
import { useState } from 'react';
import type { MarketIntroData } from '../types/marketTypes';
import { HighlightText } from '@/features/manage/store/ui';
import { VertifyBadgeIcon } from '@/components/(improvement)/icons/Vertify_badge';
import { Button } from '@groble/ui';
import { ContextMenu, type ContextMenuItem } from '@/components/ui/ContextMenu';
import BottomSheet from '@/components/ui/BottomSheet';
import { showToast } from '@/shared/ui/Toast';

interface MakerSectionProps {
  marketData: MarketIntroData;
}

/**
 * 메이커 정보 섹션 컴포넌트
 */
export function MakerSection({ marketData }: MakerSectionProps) {
  const shouldShowVerifyBadge = marketData?.verificationStatus === 'VERIFIED';
  const [isInquirySheetOpen, setIsInquirySheetOpen] = useState(false);

  // 문의 수단 처리 함수
  const handleInquiryMethod = async (type: string, value: string) => {
    if (type === 'email') {
      try {
        await navigator.clipboard.writeText(value);
        showToast.success('클립보드에 복사되었습니다');
      } catch (err) {
        console.error('클립보드 복사 실패:', err);
        showToast.error('클립보드 복사에 실패했습니다');
      }
    } else {
      window.open(value, '_blank', 'noopener,noreferrer');
    }
    setIsInquirySheetOpen(false);
  };

  // 문의하기 메뉴 아이템들 - 실제 데이터가 있는 경우에만 표시
  const contactMenuItems: ContextMenuItem[] = [
    // 이메일이 있는 경우에만 추가
    ...(marketData.contactInfo?.email
      ? [
          {
            id: 'email',
            label: '이메일',
            action: {
              type: 'copy' as const,
              value: marketData.contactInfo.email,
            },
          },
        ]
      : []),

    // 인스타그램이 있는 경우에만 추가
    ...(marketData.contactInfo?.instagram
      ? [
          {
            id: 'instagram',
            label: '인스타그램',
            action: {
              type: 'link' as const,
              value: marketData.contactInfo.instagram,
            },
          },
        ]
      : []),

    // 오픈채팅이 있는 경우에만 추가
    ...(marketData.contactInfo?.openChat
      ? [
          {
            id: 'openchat',
            label: '오픈채팅',
            action: {
              type: 'link' as const,
              value: marketData.contactInfo.openChat,
            },
          },
        ]
      : []),

    // 기타 연락처가 있는 경우에만 추가
    ...(marketData.contactInfo?.etc
      ? [
          {
            id: 'etc',
            label: '기타',
            action: {
              type: 'link' as const,
              value: marketData.contactInfo.etc,
            },
          },
        ]
      : []),
  ];

  return (
    <section className="flex md:flex-row flex-col md:items-center mb-6 gap-3 md:justify-between">
      <div className="flex items-center min-w-0 flex-1">
        <div className="relative h-[4rem] w-[4rem] rounded-full flex-shrink-0">
          <Image
            src={marketData.profileImageUrl}
            alt="마켓 로고"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex items-center min-w-0 flex-1 ml-3">
          <h2 className="text-body-1-normal font-bold text-label-normal truncate mr-1">
            <HighlightText>{marketData.marketName}</HighlightText>
          </h2>
          {shouldShowVerifyBadge && (
            <VertifyBadgeIcon className="flex-shrink-0" />
          )}
        </div>
      </div>

      {/* 데스크톱 - ContextMenu */}
      <div className="hidden md:block">
        <ContextMenu
          items={contactMenuItems}
          trigger={
            <Button
              className="flex-shrink-0 w-auto"
              group="solid"
              type="secondary"
              size="x-small"
            >
              문의하기
            </Button>
          }
        />
      </div>

      {/* 모바일 - BottomSheet */}
      <div className="block md:hidden">
        <Button
          className="flex-shrink-0 w-full"
          group="solid"
          type="secondary"
          size="x-small"
          onClick={() => setIsInquirySheetOpen(true)}
        >
          문의하기
        </Button>
      </div>

      {/* 문의하기 바텀시트 */}
      <BottomSheet
        isOpen={isInquirySheetOpen}
        onClose={() => setIsInquirySheetOpen(false)}
        title="문의 수단 선택"
      >
        <div className="pb-2">
          <h2 className="text-headline-1 font-bold text-label-normal mb-6">
            문의 수단을 선택해주세요
          </h2>
          {marketData.contactInfo && (
            <div className="space-y-3">
              {marketData.contactInfo.email && (
                <Button
                  onClick={() =>
                    handleInquiryMethod('email', marketData.contactInfo?.email!)
                  }
                  className="w-full"
                  group="solid"
                  size="medium"
                  type="secondary"
                >
                  이메일
                </Button>
              )}
              {marketData.contactInfo.instagram && (
                <Button
                  onClick={() =>
                    handleInquiryMethod(
                      'instagram',
                      marketData.contactInfo?.instagram!
                    )
                  }
                  className="w-full"
                  group="solid"
                  size="medium"
                  type="secondary"
                >
                  인스타그램
                </Button>
              )}
              {marketData.contactInfo.openChat && (
                <Button
                  onClick={() =>
                    handleInquiryMethod(
                      'openChat',
                      marketData.contactInfo?.openChat!
                    )
                  }
                  className="w-full"
                  group="solid"
                  size="medium"
                  type="secondary"
                >
                  오픈채팅
                </Button>
              )}
            </div>
          )}
          {(!marketData.contactInfo ||
            (!marketData.contactInfo.email &&
              !marketData.contactInfo.instagram &&
              !marketData.contactInfo.openChat)) && (
            <div className="text-center py-8">
              <div className="text-body-2-normal text-label-alternative mb-4">
                등록된 문의 수단이 없습니다.
              </div>
              <Button
                type="secondary"
                size="small"
                group="solid"
                onClick={() => setIsInquirySheetOpen(false)}
                className="w-full"
              >
                닫기
              </Button>
            </div>
          )}
        </div>
      </BottomSheet>
    </section>
  );
}
