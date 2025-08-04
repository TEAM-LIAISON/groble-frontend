import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  useSellingContents,
  useDeleteContent,
  useActivateContent,
} from './useSellingContents';
import { stopProductSale, getSellingContents } from '../api/productApi';
import { showToast } from '@/shared/ui/Toast';
import type {
  ContentStatus,
  ContentPreviewCardResponse,
} from '../types/productTypes';

export function useProductsPageLogic() {
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

  // API 호출
  const { items, pageInfo, isLoading, isError } = useSellingContents({
    state: activeTab,
    page: currentPage,
  });

  const deleteContentMutation = useDeleteContent();
  const activateContentMutation = useActivateContent();

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

  const [stopModal, setStopModal] = useState<{
    isOpen: boolean;
    contentId: number | null;
  }>({
    isOpen: false,
    contentId: null,
  });

  const [cannotDeleteModal, setCannotDeleteModal] = useState<{
    isOpen: boolean;
    contentId: number | null;
  }>({
    isOpen: false,
    contentId: null,
  });

  const [cannotSaleModal, setCannotSaleModal] = useState<{
    isOpen: boolean;
    contentId: number | null;
  }>({
    isOpen: false,
    contentId: null,
  });

  // 데스크톱에서 첫 로드 또는 탭 변경 시 모바일 누적 데이터 초기화
  useEffect(() => {
    if (items.length > 0) {
      setAccumulatedItems(items);
      setMobileCurrentPage(0);
    }
  }, [items, activeTab]);

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

  // 모바일 더보기 핸들러
  const handleLoadMore = async () => {
    if (isLoadingMore || !pageInfo || pageInfo.last) return;

    setIsLoadingMore(true);

    try {
      // 다음 페이지 데이터를 가져오기 위해 mobileCurrentPage + 1 사용
      const nextPage = mobileCurrentPage + 1;

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

  // 콘텐츠 중단 핸들러
  const handleStopContent = async (contentId: number) => {
    try {
      await stopProductSale(contentId);
      showToast.success('판매가 중단되었습니다.');
      setStopModal({ isOpen: false, contentId: null });
      // 데이터 새로고침을 위해 현재 페이지로 라우팅
      router.refresh();
    } catch (error) {
      showToast.error('판매 중단에 실패했습니다.');
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

  // 모달 열기 함수들
  const openEditModal = (contentId: number) => {
    setEditModal({ isOpen: true, contentId });
  };

  const openDeleteModal = (contentId: number) => {
    setDeleteModal({ isOpen: true, contentId });
  };

  const openStopModal = (contentId: number) => {
    setStopModal({ isOpen: true, contentId });
  };

  const openCannotDeleteModal = (contentId: number) => {
    setCannotDeleteModal({ isOpen: true, contentId });
  };

  const openCannotSaleModal = (contentId: number) => {
    setCannotSaleModal({ isOpen: true, contentId });
  };

  return {
    // 상태
    activeTab,
    urlPage,
    currentPage,
    mobileCurrentPage,
    accumulatedItems,
    isLoadingMore,
    items,
    pageInfo,
    isLoading,
    isError,

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
  };
}
