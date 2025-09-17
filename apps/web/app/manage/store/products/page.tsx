'use client';

import { Suspense, useEffect } from 'react';
import { LinkButton } from '@groble/ui';
import { PlusIcon } from '@radix-ui/react-icons';

import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';
import MobileFloatingButton from '@/shared/ui/MobileFloatingButton';

import { useProductsPageLogic } from '@/features/manage/hooks/useProductsPageLogic';
import ProductsGrid from '@/features/manage/components/ProductsGrid';
import ProductsPageModals from '@/features/manage/components/ProductsPageModals';
import type { ContentStatus } from '@/features/manage/types/productTypes';
import { amplitudeEvents } from '@/lib/utils/amplitude';

function ProductsPageContent() {
  const {
    // 상태
    activeTab,
    urlPage,
    items,
    pageInfo,
    isLoading,
    isError,
    accumulatedItems,
    isLoadingMore,

    // 모달 상태
    editModal,
    setEditModal,
    deleteModal,
    setDeleteModal,
    stopModal,
    setStopModal,
    cannotDeleteModal,
    setCannotDeleteModal,
    cannotSaleModal,
    setCannotSaleModal,

    // 핸들러들
    handleTabChange,
    handleLoadMore,
    handleActivateContent,
    handleDeleteContent,
    handleStopContent,
    handleEditContent,
    handleManageContent,
    handleViewStats,
    openEditModal,
    openDeleteModal,
    openStopModal,
    openCannotDeleteModal,
    openCannotSaleModal,
  } = useProductsPageLogic();

  // 상품 관리 페이지 뷰 이벤트 트래킹
  useEffect(() => {
    amplitudeEvents.pageView("Product Management Page", {
      page_type: "admin_products",
      active_tab: activeTab,
      total_products: items?.length || 0,
    });
  }, [activeTab, items?.length]);

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
    <div className="md:pt-0  md:pb-0">
      {/* 모바일 헤더 - md 미만에서만 표시 */}
      <MobileStoreHeader title="상품 관리" back="back" />

      <div className="min-h-[calc(100vh-122px)] md:mt-16 bg-white px-5 md:px-9 py-5 md:py-12 md:rounded-xl md:shadow-card">
        <div className="hidden md:flex justify-between items-center mb-8">
          <h1 className="text-heading-1 text-label-normal font-bold">
            상품 관리
          </h1>
          <LinkButton href="/products/register/info" className="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.64823 2.81416C8.64823 2.45621 8.35806 2.16602 8.00008 2.16602C7.6421 2.16602 7.35193 2.45621 7.35193 2.81416V7.3512H2.8149C2.45692 7.3512 2.16675 7.64139 2.16675 7.99935C2.16675 8.35731 2.45692 8.6475 2.8149 8.6475H7.35193V13.1845C7.35193 13.5425 7.6421 13.8327 8.00008 13.8327C8.35806 13.8327 8.64823 13.5425 8.64823 13.1845V8.6475H13.1853C13.5432 8.6475 13.8334 8.35731 13.8334 7.99935C13.8334 7.64139 13.5432 7.3512 13.1853 7.3512H8.64823V2.81416Z"
                fill="#1D212C"
              />
            </svg>
            상품 등록하기
          </LinkButton>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex mb-6">
          <button
            onClick={() => handleTabChange('ACTIVE')}
            className={`text-body-2-normal text-label-alternative py-2 px-4 rounded-sm cursor-pointer ${activeTab === 'ACTIVE'
              ? 'font-semibold text-label-normal bg-component-fill-alternative'
              : 'text-label-alternative  hover:text-gray-700'
              }`}
          >
            판매중
          </button>
          <button
            onClick={() => handleTabChange('DRAFT')}
            className={`text-body-2-normal text-label-alternative py-2 px-4 rounded-sm cursor-pointer ${activeTab === 'DRAFT'
              ? 'font-semibold text-label-normal bg-component-fill-alternative'
              : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
          >
            작성중
          </button>
        </div>

        {/* 상품 그리드 컴포넌트 */}
        <ProductsGrid
          items={items}
          accumulatedItems={accumulatedItems}
          pageInfo={pageInfo}
          urlPage={urlPage}
          isLoadingMore={isLoadingMore}
          onLoadMore={handleLoadMore}
          handlers={{
            openEditModal,
            openStopModal,
            openDeleteModal,
            openCannotDeleteModal,
            openCannotSaleModal,
            handleActivateContent,
            handleManageContent,
            handleViewStats,
            handleEditContent,
          }}
        />
      </div>

      {/* 모바일 플로팅 버튼 */}
      <MobileFloatingButton href="/products/register/info">
        상품 등록하기
      </MobileFloatingButton>

      {/* 모달들 컴포넌트 */}
      <ProductsPageModals
        editModal={editModal}
        deleteModal={deleteModal}
        stopModal={stopModal}
        cannotDeleteModal={cannotDeleteModal}
        cannotSaleModal={cannotSaleModal}
        setEditModal={setEditModal}
        setDeleteModal={setDeleteModal}
        setStopModal={setStopModal}
        setCannotDeleteModal={setCannotDeleteModal}
        setCannotSaleModal={setCannotSaleModal}
        handlers={{
          handleEditContent,
          handleDeleteContent,
          handleStopContent,
        }}
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
