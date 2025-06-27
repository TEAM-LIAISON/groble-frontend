import { useState } from 'react';
import { Order } from '../model/OrderType';
import { Modal } from '@groble/ui';
import { apiClient } from '@/shared/api/client';

type OrdersTableProps = {
  orders: Order[];
  isLoading: boolean;
  onRefresh?: () => void;
};

export default function OrdersTable({
  orders,
  isLoading,
  onRefresh,
}: OrdersTableProps) {
  // 사유보기 모달 상태 관리
  const [reasonModal, setReasonModal] = useState<{
    isOpen: boolean;
    order: Order | null;
    reason: string;
    isLoading: boolean;
  }>({ isOpen: false, order: null, reason: '', isLoading: false });
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

  // 콘텐츠 링크 가능 여부 판단 함수
  const isContentLinkable = (contentStatus?: string) => {
    if (!contentStatus) return true; // 상태가 없으면 기본적으로 링크 가능
    return contentStatus !== 'DRAFT' && contentStatus !== 'DELETED';
  };

  // 환경에 따른 도메인 설정
  const getDomain = () => {
    return process.env.NODE_ENV === 'development'
      ? 'dev.groble.im'
      : 'groble.im';
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
      case 'CANCEL_REQUEST':
        return '취소 요청';
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
        return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs';
      case 'PAID':
        return 'bg-green-100 text-green-800 px-2 py-1 rounded text-xs';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs';
      case 'CANCEL_REQUEST':
        return 'bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs';
      case 'EXPIRED':
        return 'bg-red-100 text-red-800 px-2 py-1 rounded text-xs';
      case 'FAILED':
        return 'bg-red-100 text-red-800 px-2 py-1 rounded text-xs';
      default:
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs';
    }
  };

  // 취소 사유 조회 함수
  const fetchCancellationReason = async (merchantUid: string) => {
    try {
      const response = await apiClient<{ cancelReason: string }>(
        `/api/v1/admin/order/${merchantUid}/cancellation-reason`,
        {
          cache: 'no-store',
        }
      );

      if (response.code !== 200) {
        throw new Error(
          response.message || '취소 사유를 가져오는 데 실패했습니다.'
        );
      }

      return response.data.cancelReason;
    } catch (error) {
      console.error('취소 사유 조회 실패:', error);
      throw error;
    }
  };

  // 사유보기 버튼 클릭 핸들러
  const handleReasonClick = async (order: Order) => {
    setReasonModal({
      isOpen: true,
      order,
      reason: '',
      isLoading: true,
    });

    try {
      const reason = await fetchCancellationReason(order.merchantUid || '');
      setReasonModal((prev) => ({
        ...prev,
        reason,
        isLoading: false,
      }));
    } catch (error) {
      setReasonModal((prev) => ({
        ...prev,
        reason: '사유를 불러오는데 실패했습니다.',
        isLoading: false,
      }));
    }
  };

  // 사유보기 모달 닫기 핸들러
  const handleReasonModalClose = () => {
    setReasonModal({
      isOpen: false,
      order: null,
      reason: '',
      isLoading: false,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  주문날짜
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  유형
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  구매자
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  판매물
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  가격
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    등록된 주문이 없습니다.
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={order.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getContentTypeDisplay(order.contentType)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.purchaserName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs">
                      {order.contentId &&
                      isContentLinkable(order.contentStatus) ? (
                        <button
                          onClick={() =>
                            window.open(
                              `https://${getDomain()}/products/${
                                order.contentId
                              }`,
                              '_blank'
                            )
                          }
                          className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer truncate block max-w-full text-left"
                          title={order.contentTitle || '-'}
                        >
                          {order.contentTitle || '-'}
                        </button>
                      ) : (
                        <span
                          className="truncate block max-w-full text-left"
                          title={order.contentTitle || '-'}
                        >
                          {order.contentTitle || '-'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPrice(order.finalPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={getStatusStyle(order.orderStatus)}>
                        {getStatusDisplay(order.orderStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex gap-2">
                        {/* 사유보기 버튼: CANCELLED, CANCEL_REQUEST 상태에서만 표시 */}
                        {(order.orderStatus === 'CANCELLED' ||
                          order.orderStatus === 'CANCEL_REQUEST') && (
                          <button
                            onClick={() => handleReasonClick(order)}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-200 cursor-pointer transition-colors"
                          >
                            사유보기
                          </button>
                        )}

                        {/* 버튼이 없는 경우 빈 공간 표시 */}
                        {!(
                          order.orderStatus === 'CANCELLED' ||
                          order.orderStatus === 'CANCEL_REQUEST'
                        ) && <span className="text-gray-400 text-xs">-</span>}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 사유보기 모달 */}
      <Modal
        isOpen={reasonModal.isOpen}
        onRequestClose={handleReasonModalClose}
        title={
          reasonModal.order?.orderStatus === 'CANCELLED'
            ? '취소 사유'
            : '취소 요청 사유'
        }
        subText={
          reasonModal.isLoading
            ? '사유를 불러오는 중...'
            : `${reasonModal.reason || '사유가 제공되지 않았습니다.'}`
        }
        actionButton="확인"
        onActionClick="close"
      />
    </>
  );
}
