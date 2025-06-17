import { Order } from '../model/OrderType';

type OrderDetailProps = {
  orderInfo: Order;
  isLoading: boolean;
};

export default function OrderDetail({
  orderInfo,
  isLoading,
}: OrderDetailProps) {
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
        return 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium';
      case 'PAID':
        return 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium';
      case 'EXPIRED':
        return 'bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium';
      case 'FAILED':
        return 'bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium';
      default:
        return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            주문 상세 정보
          </h2>
        </div>
        <div className="p-6">
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 기본 정보 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            주문 기본 정보
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                주문 번호
              </h3>
              <p className="text-base font-mono text-gray-900">
                {orderInfo.id}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                주문 날짜
              </h3>
              <p className="text-base text-gray-900">
                {formatDate(orderInfo.createdAt)}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">유형</h3>
              <p className="text-base text-gray-900">
                {getContentTypeDisplay(orderInfo.contentType)}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">상태</h3>
              <span className={getStatusStyle(orderInfo.orderStatus)}>
                {getStatusDisplay(orderInfo.orderStatus)}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">구매자</h3>
              <p className="text-base text-gray-900">
                {orderInfo.purchaserName}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">가격</h3>
              <p className="text-base font-semibold text-gray-900">
                {formatPrice(orderInfo.finalPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 정보 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">상품 정보</h2>
        </div>

        <div className="p-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">상품명</h3>
            <p className="text-base text-gray-900">
              {orderInfo.contentTitle || '-'}
            </p>
          </div>

          {orderInfo.contentId && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                콘텐츠 ID
              </h3>
              <p className="text-base text-gray-900 font-mono">
                {orderInfo.contentId}
              </p>
            </div>
          )}

          {orderInfo.coachingId && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                코칭 ID
              </h3>
              <p className="text-base text-gray-900 font-mono">
                {orderInfo.coachingId}
              </p>
            </div>
          )}

          {orderInfo.sellerId && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                판매자 ID
              </h3>
              <p className="text-base text-gray-900 font-mono">
                {orderInfo.sellerId}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 결제 정보 */}
      {orderInfo.paymentMethod && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">결제 정보</h2>
          </div>

          <div className="p-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                결제 방법
              </h3>
              <p className="text-base text-gray-900">
                {orderInfo.paymentMethod}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 환불 정보 */}
      {orderInfo.refundReason && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">환불 정보</h2>
          </div>

          <div className="p-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                환불 사유
              </h3>
              <p className="text-base text-gray-900">
                {orderInfo.refundReason}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
