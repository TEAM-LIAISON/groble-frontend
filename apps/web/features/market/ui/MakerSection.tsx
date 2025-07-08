'use client';
import Image from 'next/image';
import type { MarketIntroData } from '../types/marketTypes';
import { HighlightText } from '@/features/manage/store/ui';
import { VertifyBadgeIcon } from '@/components/(improvement)/icons/Vertify_badge';
import { Button } from '@groble/ui';
import { ContextMenu, type ContextMenuItem } from '@/components/ui/ContextMenu';

interface MakerSectionProps {
  marketData: MarketIntroData;
}

/**
 * 메이커 정보 섹션 컴포넌트
 */
export function MakerSection({ marketData }: MakerSectionProps) {
  const shouldShowVerifyBadge = marketData?.verificationStatus === 'VERIFIED';

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
            label: '기타 연락처',
            action: {
              type: 'copy' as const,
              value: marketData.contactInfo.etc,
            },
          },
        ]
      : []),
  ];

  return (
    <section className="flex items-center mb-6">
      <div className="relative h-[4rem] w-[4rem] rounded-full">
        <Image
          src={marketData.profileImageUrl}
          alt="마켓 로고"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <h2 className="text-body-1-normal font-bold text-label-normal ml-3 mr-1">
        <HighlightText>{marketData.marketName}</HighlightText>
      </h2>
      {shouldShowVerifyBadge && <VertifyBadgeIcon />}

      <ContextMenu
        items={contactMenuItems}
        trigger={
          <Button
            className="ml-6"
            group="solid"
            type="secondary"
            size="x-small"
          >
            문의하기
          </Button>
        }
      />
    </section>
  );
}
