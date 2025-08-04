'use client';

import { Suspense } from 'react';
import { LinkButton } from '@groble/ui';
import { PlusIcon } from '@radix-ui/react-icons';

import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';
import MobileFloatingButton from '@/shared/ui/MobileFloatingButton';

import { useProductsPageLogic } from '@/features/manage/hooks/useProductsPageLogic';
import ProductsGrid from '@/features/manage/components/ProductsGrid';
import ProductsPageModals from '@/features/manage/components/ProductsPageModals';
import type { ContentStatus } from '@/features/manage/types/productTypes';

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
      <MobileStoreHeader title="상품 관리" />

      <div className="min-h-[calc(100vh-122px)] mt-16 bg-white px-5 md:px-9 py-5 md:py-12 md:rounded-xl md:shadow-card">
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
          }}
        />
      </div>

      {/* 모바일 플로팅 버튼 */}
      <MobileFloatingButton href="/products/register/info">
        상품등록
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
