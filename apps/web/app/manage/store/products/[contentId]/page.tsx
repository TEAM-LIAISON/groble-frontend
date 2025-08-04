'use client';

import { useParams } from 'next/navigation';
import { useContentManageDetail } from '@/features/manage/products/hooks/useContentManageDetail';
import SummaryStats from '@/features/manage/products/ui/SummaryStats';
import SalesList from '@/features/manage/products/ui/SalesList';
import ReviewsList from '@/features/manage/products/ui/ReviewsList';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';

export default function ProductSalesDetailPage() {
  const params = useParams();
  const contentId = params.contentId as string;

  const { data, isLoading, error } = useContentManageDetail(contentId);

  if (isLoading) {
    return (
      <div
        className="bg-white px-5 md:px-9 py-6 md:py-12 md:rounded-xl"
        style={{
          boxShadow:
            '0px 1px 8px 0px rgba(0, 0, 0, 0.03), 0px 5px 15px 0px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-white px-5 md:px-9 py-6 md:py-12 md:rounded-xl"
        style={{
          boxShadow:
            '0px 1px 8px 0px rgba(0, 0, 0, 0.03), 0px 5px 15px 0px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">
            콘텐츠 정보를 불러오는데 실패했습니다.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-blue-600 underline"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div
        className="bg-white px-5 md:px-9 py-6 md:py-12 md:rounded-xl"
        style={{
          boxShadow:
            '0px 1px 8px 0px rgba(0, 0, 0, 0.03), 0px 5px 15px 0px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div className="text-center py-12">
          <p className="text-gray-500">데이터를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const { title, contentSellDetail, contentSellList, contentReviewList } =
    data.data;

  return (
    <>
      <MobileStoreHeader title="상품 관리" />
      <div className="bg-white mt-16 px-5 md:px-9 py-5 md:py-12 md:rounded-xl md:shadow-card">
        {/* 페이지 제목 */}
        <header className="mb-6">
          <h1 className="text-headline-1 md:text-heading-1 font-bold text-label-normal">
            {title ?? 'undefined'}
          </h1>
        </header>

        {/* 종합 통계 */}
        <SummaryStats data={contentSellDetail} />

        {/* 판매 리스트 */}
        <SalesList data={contentSellList} contentId={contentId} />

        {/* 리뷰 내역 */}
        <ReviewsList data={contentReviewList} contentId={contentId} />
      </div>
    </>
  );
}
