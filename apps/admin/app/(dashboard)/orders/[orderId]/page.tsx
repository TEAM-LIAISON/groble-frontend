'use client';
import { useOrderDetail } from '@/features/dashboard/orders/hooks/useOrderDetail';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { useParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

// 동적 렌더링 강제 설정
export const dynamic = 'force-dynamic';

function OrderDetailPageContent() {
  const router = useRouter();
  const { orderId } = useParams();

  const { order, isLoading, error, refetch } = useOrderDetail(
    orderId as string
  );

  // 뒤로가기 버튼 핸들러
  const handleBack = () => {
    router.push('/orders');
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 가격 포맷팅 함수
  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ko-KR')}원`;
  };

  // 주문 유형 표시 함수
  const getContentTypeDisplay = (contentType: string | null) => {
    if (!contentType) return '-';
    switch (contentType) {
      case 'COACHING':
        return '코칭';
      case 'DOCUMENT':
        return '콘텐츠';
      default:
        return contentType;
    }
  };

  // 주문 상태 표시 함수
  const getStatusDisplay = (orderStatus: string) => {
    switch (orderStatus) {
      case 'PENDING':
        return '결제 대기';
      case 'PAID':
        return '결제 완료';
      case 'CANCELLED':
        return '결제 취소';
      case 'EXPIRED':
        return '기간 만료';
      case 'FAILED':
        return '결제 실패';
      default:
        return orderStatus;
    }
  };

  // 상태에 따른 스타일 클래스
  const getStatusStyle = (orderStatus: string) => {
    switch (orderStatus) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm';
      case 'PAID':
        return 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm';
      case 'EXPIRED':
        return 'bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm';
      case 'FAILED':
        return 'bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm';
      default:
        return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm';
    }
  };

  if (isLoading) {
    return (
      <div className=" bg-gray-50">
        <div className=" mx-auto ">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              뒤로가기
            </button>
          </div>

          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <div className="text-gray-500">주문 정보를 불러오는 중...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className=" bg-gray-50">
        <div className=" mx-auto ">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-label-alternative hover:text-gray-800 transition-colors cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              뒤로가기
            </button>
          </div>

          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-lg mb-2">
                오류가 발생했습니다
              </div>
              <div className="text-gray-600 mb-4">
                {error instanceof Error
                  ? error.message
                  : '주문 정보를 불러올 수 없습니다.'}
              </div>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  다시 시도
                </button>
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  목록으로 돌아가기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className=" bg-gray-50">
        <div className="mx-auto ">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              뒤로가기
            </button>
          </div>

          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-gray-500 text-lg mb-4">
                주문을 찾을 수 없습니다
              </div>
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                목록으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={``}>
      <div className=" mx-auto">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-6 ">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-label-alternative hover:text-gray-800 transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            뒤로가기
          </button>
        </div>

        {/* 주문 상세 정보 */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              주문 상세 정보
            </h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  주문 번호
                </h3>
                <p className="text-lg font-mono text-gray-900">{order.id}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  주문 날짜
                </h3>
                <p className="text-lg text-gray-900">
                  {formatDate(order.createdAt)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">유형</h3>
                <p className="text-lg text-gray-900">
                  {getContentTypeDisplay(order.contentType)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  구매자
                </h3>
                <p className="text-lg text-gray-900">{order.purchaserName}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  판매물
                </h3>
                <p className="text-lg text-gray-900">
                  {order.contentTitle || '-'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">가격</h3>
                <p className="text-lg font-semibold text-gray-900">
                  {formatPrice(order.finalPrice)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">상태</h3>
                <span className={getStatusStyle(order.orderStatus)}>
                  {getStatusDisplay(order.orderStatus)}
                </span>
              </div>

              {order.paymentMethod && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    결제 방법
                  </h3>
                  <p className="text-lg text-gray-900">{order.paymentMethod}</p>
                </div>
              )}

              {order.refundReason && (
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    환불 사유
                  </h3>
                  <p className="text-lg text-gray-900">{order.refundReason}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminOrderDetailPage() {
  return (
    <Suspense
      fallback={<LoadingSpinner size="lg" text="주문 정보를 불러오는 중..." />}
    >
      <OrderDetailPageContent />
    </Suspense>
  );
}
