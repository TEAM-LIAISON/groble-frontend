// File: /apps/admin/features/dashboard/contents/ui/ContentsTable.tsx

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Content } from '../model/ContentType';
import { Modal } from '@groble/ui';
import { examineContent, ContentExamineRequest } from '../model/contentApi';

type ContentsTableProps = {
  contents: Content[];
  isLoading: boolean;
  onRefresh?: () => void; // 데이터 새로고침을 위한 콜백
};

export default function ContentsTable({
  contents,
  isLoading,
  onRefresh,
}: ContentsTableProps) {
  const router = useRouter();

  // 모달 상태 관리
  const [approveModal, setApproveModal] = useState<{
    isOpen: boolean;
    content: Content | null;
  }>({ isOpen: false, content: null });

  const [rejectModal, setRejectModal] = useState<{
    isOpen: boolean;
    content: Content | null;
  }>({ isOpen: false, content: null });

  const [rejectReason, setRejectReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

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

  // 콘텐츠 타입 한글 변환
  const getContentTypeText = (type: string) => {
    switch (type) {
      case 'DOCUMENT':
        return '자료';
      case 'COACHING':
        return '코칭';
      default:
        return type;
    }
  };

  // 가격 포맷팅 함수
  const formatPrice = (minPrice: number, priceOptionLength: number) => {
    const formattedPrice = minPrice?.toLocaleString('ko-KR') || '0';
    return priceOptionLength === 1
      ? `${formattedPrice}원`
      : `${formattedPrice}원~`;
  };

  // 통합 상태 결정 함수 (요구사항에 맞춰 업데이트)
  const getUnifiedStatus = (content: Content) => {
    const { contentStatus, adminContentCheckingStatus } = content;

    // contentStatus별 처리
    switch (contentStatus) {
      case 'DRAFT':
        return {
          text: '작성중',
          style: 'bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs',
          clickable: false,
        };

      case 'DELETED':
        return {
          text: '삭제됨',
          style: 'bg-gray-400 text-white px-2 py-1 rounded text-xs',
          clickable: false,
        };

      case 'DISCONTINUED':
        return {
          text: '판매중단',
          style: 'bg-red-100 text-red-800 px-2 py-1 rounded text-xs',
          clickable: true,
        };

      case 'ACTIVE':
        // ACTIVE 상태에서는 adminContentCheckingStatus에 따라 결정
        switch (adminContentCheckingStatus) {
          case 'VALIDATED':
            return {
              text: '판매중',
              style: 'bg-green-100 text-green-800 px-2 py-1 rounded text-xs',
              clickable: true,
            };
          case 'PENDING':
            return {
              text: '모니터링 필요',
              style: 'bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs',
              clickable: true,
            };
          case 'REJECTED':
            return {
              text: '거절됨',
              style: 'bg-red-100 text-red-800 px-2 py-1 rounded text-xs',
              clickable: true,
            };
          default:
            return {
              text: '승인 대기',
              style: 'bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs',
              clickable: true,
            };
        }

      default:
        return {
          text: '알 수 없음',
          style: 'bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs',
          clickable: false,
        };
    }
  };

  // 콘텐츠 제목 클릭 핸들러 (DRAFT, DELETED일 때는 클릭 불가)
  const handleContentTitleClick = (content: Content) => {
    const status = getUnifiedStatus(content);

    if (!status.clickable) {
      alert(`${status.text} 상태의 콘텐츠는 조회할 수 없습니다.`);
      return;
    }

    // dev 환경에서는 dev.groble.im 사용
    const domain =
      process.env.NODE_ENV === 'development' ||
      process.env.NEXT_PUBLIC_ENV === 'development'
        ? 'https://dev.groble.im'
        : 'https://groble.im';

    window.open(`${domain}/products/${content.contentId}`, '_blank');
  };

  // 승인 버튼 클릭 핸들러
  const handleApproveClick = (content: Content) => {
    setApproveModal({ isOpen: true, content });
  };

  // 중단 버튼 클릭 핸들러
  const handleRejectClick = (content: Content) => {
    setRejectModal({ isOpen: true, content });
    setRejectReason(''); // 초기화
  };

  // 승인 확정 핸들러
  const handleApproveConfirm = async () => {
    if (!approveModal.content || isProcessing) return;

    setIsProcessing(true);
    try {
      await examineContent(approveModal.content.contentId, {
        action: 'APPROVE',
      });

      // 성공 시 모달 닫기 및 데이터 새로고침
      setApproveModal({ isOpen: false, content: null });
      onRefresh?.();

      // 성공 메시지 (선택사항)
      alert('콘텐츠가 성공적으로 승인되었습니다.');
    } catch (error) {
      console.error('승인 처리 실패:', error);
      alert(
        error instanceof Error ? error.message : '승인 처리에 실패했습니다.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // 중단 확정 핸들러
  const handleRejectConfirm = async () => {
    if (!rejectModal.content || isProcessing) return;

    setIsProcessing(true);
    try {
      await examineContent(rejectModal.content.contentId, {
        action: 'REJECT',
        rejectReason: rejectReason.trim(),
      });

      // 성공 시 모달 닫기 및 데이터 새로고침
      setRejectModal({ isOpen: false, content: null });
      setRejectReason('');
      onRefresh?.();

      // 성공 메시지 (선택사항)
      alert('콘텐츠가 성공적으로 중단되었습니다.');
    } catch (error) {
      console.error('중단 처리 실패:', error);
      alert(
        error instanceof Error ? error.message : '중단 처리에 실패했습니다.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // 승인 모달 닫기 핸들러
  const handleApproveModalClose = () => {
    setApproveModal({ isOpen: false, content: null });
  };

  // 중단 모달 닫기 핸들러
  const handleRejectModalClose = () => {
    setRejectModal({ isOpen: false, content: null });
    setRejectReason('');
  };

  // 작업 버튼 렌더링 함수
  const renderActionButtons = (content: Content) => {
    const status = getUnifiedStatus(content);

    // 승인 버튼을 보여줄 상태
    const showApproveButton = ['모니터링 필요', '거절됨'].includes(status.text);

    // 중단 버튼을 보여줄 상태
    const showRejectButton = ['판매중', '모니터링 필요', '승인 대기'].includes(
      status.text
    );

    return (
      <div className="flex gap-2">
        {showApproveButton && (
          <button
            onClick={() => handleApproveClick(content)}
            className="bg-primary-normal text-label-normal px-3 py-1 rounded text-xs hover:brightness-95 cursor-pointer transition-colors"
          >
            승인
          </button>
        )}

        {showRejectButton && (
          <button
            onClick={() => handleRejectClick(content)}
            className="bg-[#D8FFF4] text-label-normal px-3 py-1 rounded text-xs hover:brightness-95 cursor-pointer transition-colors"
          >
            중단
          </button>
        )}

        {!showApproveButton && !showRejectButton && (
          <span className="text-gray-400 text-xs">-</span>
        )}
      </div>
    );
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
                  작성 날짜
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  유형
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  판매자명
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  콘텐츠 제목
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
              {contents.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    등록된 콘텐츠가 없습니다.
                  </td>
                </tr>
              ) : (
                contents.map((content, index) => {
                  const unifiedStatus = getUnifiedStatus(content);
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(content.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getContentTypeText(content.contentType)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {content.sellerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs">
                        <button
                          onClick={() => handleContentTitleClick(content)}
                          className={`${
                            unifiedStatus.clickable
                              ? 'text-blue-600 hover:text-blue-800 hover:underline cursor-pointer'
                              : 'text-gray-400 cursor-not-allowed'
                          } truncate block max-w-full text-left`}
                          title={
                            unifiedStatus.clickable
                              ? content.contentTitle
                              : `${unifiedStatus.text} 상태의 콘텐츠는 조회할 수 없습니다.`
                          }
                          disabled={!unifiedStatus.clickable}
                        >
                          {content.contentTitle}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(
                          content.minPrice,
                          content.priceOptionLength
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={unifiedStatus.style}>
                          {unifiedStatus.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {renderActionButtons(content)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 승인 확인 모달 */}
      <Modal
        isOpen={approveModal.isOpen}
        onRequestClose={handleApproveModalClose}
        title="콘텐츠를 승인하시겠습니까?"
        actionButton={isProcessing ? '처리 중...' : '승인'}
        secondaryButton="취소"
        onActionClick={handleApproveConfirm}
        onSecondaryClick={handleApproveModalClose}
        actionButtonColor="primary"
      />

      {/* 중단 사유 입력 모달 */}
      <Modal
        isOpen={rejectModal.isOpen}
        onRequestClose={handleRejectModalClose}
        title="콘텐츠를 중단하시겠습니까?"
        actionButton={isProcessing ? '처리 중...' : '중단'}
        secondaryButton="취소"
        onActionClick={handleRejectConfirm}
        onSecondaryClick={handleRejectModalClose}
        actionButtonColor="danger"
        hasTextarea={true}
        textareaValue={rejectReason}
        onTextareaChange={setRejectReason}
        textareaPlaceholder="중단 사유를 상세히 입력해 주세요..."
        textareaLabel="중단 사유"
        textareaRequired={true}
        textareaMaxLength={1000}
        textareaRows={5}
      />
    </>
  );
}
