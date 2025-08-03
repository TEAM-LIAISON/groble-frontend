'use client';
import { VertifyBadgeIcon } from '@/components/(improvement)/icons/Vertify_badge';
import { ContextMenu, type ContextMenuItem } from '@/components/ui/ContextMenu';
import { HighlightText } from '@/features/manage/store/ui';
import { Button } from '@groble/ui';
import Image from 'next/image';
import type { MarketIntroData } from '../types/marketTypes';

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
    <section className="flex items-center mb-6 gap-3 justify-between">
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

      <ContextMenu
        items={contactMenuItems}
        trigger={
          <Button
            className="flex-shrink-0"
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
