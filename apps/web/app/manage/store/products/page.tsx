'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, LinkButton, Modal } from '@groble/ui';
import { PlusIcon } from '@radix-ui/react-icons';
import { Suspense } from 'react';

import ProductCard from '@/entities/product/ui/product-card';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

import {
  useSellingContents,
  useDeleteContent,
  useActivateContent,
} from '@/features/manage/hooks/useSellingContents';
import { showToast } from '@/shared/ui/Toast';
import type {
  ContentStatus,
  ContentPreviewCardResponse,
} from '@/features/manage/types/productTypes';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';
import MobileFloatingButton from '@/shared/ui/MobileFloatingButton';
import MobileLoadMorePagination from '@/shared/ui/MobileLoadMorePagination';
import NoContent from '@/shared/ui/NoContent';

function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 현재 탭과 페이지 정보 가져오기 (데스크톱용)
  const activeTab = (searchParams.get('tab') as ContentStatus) || 'ACTIVE';
  const urlPage = parseInt(searchParams.get('page') || '1', 10); // UI는 1부터 시작
  const currentPage = urlPage - 1; // 서버는 0부터 시작하므로 -1

  // 모바일용 상태 관리
  const [mobileCurrentPage, setMobileCurrentPage] = useState(0);
  const [accumulatedItems, setAccumulatedItems] = useState<
    ContentPreviewCardResponse[]
  >([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { items, pageInfo, isLoading, isError } = useSellingContents({
    state: activeTab,
    page: currentPage,
  });

  const deleteContentMutation = useDeleteContent();
  const activateContentMutation = useActivateContent();

  // 데스크톱에서 첫 로드 또는 탭 변경 시 모바일 누적 데이터 초기화
  useEffect(() => {
    if (items.length > 0) {
      setAccumulatedItems(items);
      setMobileCurrentPage(0);
    }
  }, [items, activeTab]);

  // 모바일 더보기 핸들러
  const handleLoadMore = async () => {
    if (isLoadingMore || !pageInfo || pageInfo.last) return;

    setIsLoadingMore(true);

    try {
      // 다음 페이지 데이터를 가져오기 위해 mobileCurrentPage + 1 사용
      const nextPage = mobileCurrentPage + 1;
      const { getSellingContents } = await import(
        '@/features/manage/api/productApi'
      );

      const response = await getSellingContents({
        state: activeTab,
        page: nextPage,
        size: 12,
        sort: 'createdAt',
      });

      if (response.data) {
        setAccumulatedItems((prev) => [...prev, ...response.data.items]);
        setMobileCurrentPage(nextPage);
      }
    } catch (error) {
      showToast.error('더 많은 콘텐츠를 불러오는데 실패했습니다.');
    } finally {
      setIsLoadingMore(false);
    }
  };

  // 모달 상태 관리
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    contentId: number | null;
  }>({
    isOpen: false,
    contentId: null,
  });
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    contentId: number | null;
  }>({
    isOpen: false,
    contentId: null,
  });

  // 탭 변경 핸들러
  const handleTabChange = (tab: ContentStatus) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    params.set('page', '1'); // 탭 변경 시 첫 페이지로 (UI 기준)
    router.push(`?${params.toString()}`);

    // 모바일 상태 초기화
    setMobileCurrentPage(0);
    setAccumulatedItems([]);
  };

  // 콘텐츠 판매 활성화 핸들러
  const handleActivateContent = async (contentId: number) => {
    try {
      await activateContentMutation.mutateAsync(contentId);
      showToast.success('콘텐츠가 판매 활성화되었습니다.');
    } catch (error) {
      showToast.error('콘텐츠 판매 활성화에 실패했습니다.');
    }
  };

  // 콘텐츠 삭제 핸들러
  const handleDeleteContent = async (contentId: number) => {
    try {
      await deleteContentMutation.mutateAsync(contentId);
      showToast.success('콘텐츠가 삭제되었습니다.');
      setDeleteModal({ isOpen: false, contentId: null });
    } catch (error) {
      showToast.error('콘텐츠 삭제에 실패했습니다.');
    }
  };

  // 콘텐츠 수정 핸들러
  const handleEditContent = (contentId: number) => {
    router.push(`/products/register/info?contentId=${contentId}`);
    setEditModal({ isOpen: false, contentId: null });
  };

  // 판매 관리 핸들러
  const handleManageContent = (contentId: number) => {
    router.push(`/manage/store/products/${contentId}`);
  };

  // 통계 보기 핸들러
  const handleViewStats = (contentId: number) => {
    router.push(`/manage/store/products/${contentId}/sales`);
  };

  // 수정하기 모달 열기
  const openEditModal = (contentId: number) => {
    setEditModal({ isOpen: true, contentId });
  };

  // 삭제하기 모달 열기
  const openDeleteModal = (contentId: number) => {
    setDeleteModal({ isOpen: true, contentId });
  };

  // 상태별 버튼 렌더링
  const renderActionButtons = (content: ContentPreviewCardResponse) => {
    if (content.status === 'ACTIVE') {
      // 판매중 - 통계보기, 판매관리 버튼
      return (
        <div className="mt-3 flex gap-2">
          <Button
            onClick={() => handleViewStats(content.contentId)}
            group="outlined"
            type="tertiary"
            size="x-small"
            className="flex-1"
          >
            통계보기
          </Button>
          <Button
            onClick={() => handleManageContent(content.contentId)}
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
            onClick={() => handleManageContent(content.contentId)}
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
            onClick={() => handleActivateContent(content.contentId)}
            group="outlined"
            type="tertiary"
            size="x-small"
            className="flex-1"
          >
            판매하기
          </Button>
          <Button
            onClick={() => handleManageContent(content.contentId)}
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
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-label-1-normal text-label-alternative">
          콘텐츠를 불러오는데 실패했습니다.
        </p>
      </div>
    );
  }

  return (
    <div className=" md:pt-0  md:pb-0">
      {/* 모바일 헤더 - md 미만에서만 표시 */}
      <MobileStoreHeader title="상품 관리" />
      <div className="mt-16 bg-white px-5 md:px-9 py-5 md:py-12 md:rounded-xl md:shadow-card">
        <div className="hidden md:flex justify-between items-center mb-8">
          <h1 className="text-heading-1 text-label-normal font-bold">
            상품 관리
          </h1>
          <LinkButton href="/products/register/info" className="flex gap-1">
            <PlusIcon className="w-4 h-4" />
            상품등록
          </LinkButton>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex mb-6">
          <button
            onClick={() => handleTabChange('ACTIVE')}
            className={`text-body-2-normal text-label-alternative py-2 px-4 rounded-sm cursor-pointer ${
              activeTab === 'ACTIVE'
                ? 'font-semibold text-label-normal bg-component-fill-alternative'
                : 'text-label-alternative  hover:text-gray-700'
            }`}
          >
            판매중
          </button>
          <button
            onClick={() => handleTabChange('DRAFT')}
            className={`text-body-2-normal text-label-alternative py-2 px-4 rounded-sm cursor-pointer ${
              activeTab === 'DRAFT'
                ? 'font-semibold text-label-normal bg-component-fill-alternative'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            작성중
          </button>
        </div>

        {/* 콘텐츠 그리드 */}
        {(accumulatedItems.length > 0 ? accumulatedItems : items).length > 0 ? (
          <div
            className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            style={{ gridAutoRows: '1fr' }}
          >
            {(accumulatedItems.length > 0 ? accumulatedItems : items).map(
              (content) => (
                <div key={content.contentId} className="flex flex-col min-h-0">
                  <div className="flex-1">
                    <ProductCard
                      contentId={content.contentId}
                      thumbnailUrl={content.thumbnailUrl}
                      title={content.title}
                      lowestPrice={content.lowestPrice}
                      priceOptionLength={content.priceOptionLength}
                      orderStatus={content.status}
                      purchasedAt={content.createdAt}
                      dotDirection="vertical"
                      dropdownItems={[
                        {
                          label: '수정하기',
                          onClick: () => openEditModal(content.contentId),
                        },
                        {
                          label: '삭제하기',
                          onClick: () => openDeleteModal(content.contentId),
                          destructive: true,
                        },
                      ]}
                    />
                  </div>
                  <div className="mt-auto">{renderActionButtons(content)}</div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <NoContent message="아직 상품이 없어요" />
          </div>
        )}

        {/* 페이지네이션 */}
        {pageInfo && accumulatedItems.length > 0 && (
          <div className="mt-8 ">
            <MobileLoadMorePagination
              currentPage={urlPage} // UI 기준 페이지 번호 (1부터 시작)
              totalPages={pageInfo.totalPages}
              hasNextPage={!pageInfo.last}
              isLoadingMore={isLoadingMore}
              onLoadMore={handleLoadMore}
            />
          </div>
        )}
      </div>

      {/* 모바일 플로팅 버튼 */}
      <MobileFloatingButton href="/products/register/info">
        상품등록
      </MobileFloatingButton>

      {/* 수정하기 모달 */}
      <Modal
        isOpen={editModal.isOpen}
        onRequestClose={() => setEditModal({ isOpen: false, contentId: null })}
        title="정말 수정하시겠습니까?"
        subText="수정을 시작하면 편집 페이지로 이동됩니다."
        actionButton="수정하기"
        secondaryButton="취소"
        onActionClick={() =>
          editModal.contentId && handleEditContent(editModal.contentId)
        }
      />

      {/* 삭제하기 모달 */}
      <Modal
        isOpen={deleteModal.isOpen}
        onRequestClose={() =>
          setDeleteModal({ isOpen: false, contentId: null })
        }
        title="정말 삭제하시겠습니까?"
        subText="삭제된 콘텐츠는 복구할 수 없습니다."
        actionButton="삭제하기"
        secondaryButton="취소"
        onActionClick={() =>
          deleteModal.contentId && handleDeleteContent(deleteModal.contentId)
        }
        actionButtonColor="danger"
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
