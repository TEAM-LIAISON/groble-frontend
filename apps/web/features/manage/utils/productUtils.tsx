import { Button } from '@groble/ui';
import type { ContentPreviewCardResponse } from '../types/productTypes';

// 드롭다운 아이템 타입 정의
export interface DropdownItem {
  label: string;
  onClick: () => void;
  destructive?: boolean;
  icon?: React.ReactNode;
}

// 드롭다운 아이템 생성 함수
export function getDropdownItems(
  content: ContentPreviewCardResponse,
  handlers: {
    openEditModal: (contentId: number) => void;
    openStopModal: (contentId: number) => void;
    openDeleteModal: (contentId: number) => void;
    openCannotDeleteModal: (contentId: number) => void;
  }
): DropdownItem[] {
  const items: DropdownItem[] = [];

  // 판매중단이 아닌 경우에만 수정하기 포함
  if (content.status !== 'DISCONTINUED') {
    items.push({
      label: '수정하기',
      onClick: () => handlers.openEditModal(content.contentId),
    });
  }

  // 상태에 따라 중단하기 또는 삭제하기 표시
  if (content.status === 'ACTIVE') {
    // 판매중인 경우 중단하기
    items.push({
      label: '중단하기',
      onClick: () => handlers.openStopModal(content.contentId),
      destructive: true,
    });
  } else {
    // 다른 상태에서는 삭제하기 (isDeletable에 따라 다른 모달)
    items.push({
      label: '삭제하기',
      onClick: () => {
        if (content.isDeletable) {
          handlers.openDeleteModal(content.contentId);
        } else {
          handlers.openCannotDeleteModal(content.contentId);
        }
      },
      destructive: true,
    });
  }

  return items;
}

// 상태별 버튼 렌더링 함수
export function renderActionButtons(
  content: ContentPreviewCardResponse,
  handlers: {
    handleActivateContent: (contentId: number) => void;
    handleManageContent: (contentId: number) => void;
    handleViewStats: (contentId: number) => void;
    openCannotSaleModal: (contentId: number) => void;
  }
): React.ReactNode {
  if (content.status === 'ACTIVE') {
    // 판매중 - 통계보기, 판매관리 버튼
    return (
      <div className="mt-3 flex gap-2">
        {/* <Button
          onClick={() => handlers.handleViewStats(content.contentId)}
          group="outlined"
          type="tertiary"
          size="x-small"
          className="flex-1"
        >
          통계보기
        </Button> */}
        <Button
          onClick={() => handlers.handleManageContent(content.contentId)}
          group="solid"
          type="secondary"
          size="x-small"
          className="flex-1"
        >
          판매관리
        </Button>
      </div>
    );
  } else if (content.status === 'DISCONTINUED') {
    // 판매중단 - 판매관리 버튼만
    return (
      <div className="mt-3 flex gap-2">
        <Button
          onClick={() => handlers.handleManageContent(content.contentId)}
          group="solid"
          type="secondary"
          size="x-small"
          className="w-full"
        >
          판매관리
        </Button>
      </div>
    );
  } else if (content.status === 'DRAFT') {
    // 작성중 - 판매하기, 판매관리 버튼
    return (
      <div className="mt-3 flex gap-2">
        <Button
          onClick={() => {
            if (content.isAvailableForSale) {
              handlers.handleActivateContent(content.contentId);
            } else {
              handlers.openCannotSaleModal(content.contentId);
            }
          }}
          group="outlined"
          type="tertiary"
          size="x-small"
          className="flex-1"
        >
          판매하기
        </Button>
        <Button
          onClick={() => handlers.handleManageContent(content.contentId)}
          group="solid"
          type="secondary"
          size="x-small"
          className="flex-1"
        >
          판매관리
        </Button>
      </div>
    );
  } else {
    // 다른 상태 (심사중, 심사완료 등)
    return (
      <div className="mt-3">
        <div className="text-sm text-gray-500 text-center py-2">
          {content.status === 'PENDING' && '심사중'}
          {content.status === 'VALIDATED' && '심사완료(승인)'}
          {content.status === 'REJECTED' && '심사완료(거절)'}
        </div>
      </div>
    );
  }
}
