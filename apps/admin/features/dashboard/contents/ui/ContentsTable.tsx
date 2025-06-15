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

  // 통합 상태 결정 함수 (5가지: 판매중, 작성중, 승인, 중단, 모니터링 필요)
  const getUnifiedStatus = (content: Content) => {
    const { contentStatus, adminContentCheckingStatus } = content;

    if (contentStatus === 'DRAFT') {
      return {
        text: '작성중',
        style: 'bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs',
      };
    }

    if (contentStatus === 'ACTIVE') {
      if (adminContentCheckingStatus === 'VALIDATED') {
        return {
          text: '판매중',
          style: 'bg-green-100 text-green-800 px-2 py-1 rounded text-xs',
        };
      } else if (adminContentCheckingStatus === 'DISCONTINUED') {
        return {
          text: '중단',
          style: 'bg-red-100 text-red-800 px-2 py-1 rounded text-xs',
        };
      } else if (adminContentCheckingStatus === 'PENDING') {
        return {
          text: '모니터링 필요',
          style: 'bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs',
        };
      }
    }

    // 기본적으로 승인 대기 상태
    return {
      text: '승인',
      style: 'bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs',
    };
  };

  // 콘텐츠 제목 클릭 핸들러
  const handleContentTitleClick = (contentId: string) => {
    window.open(`https://groble.im/products/${contentId}`, '_blank');
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
                          onClick={() =>
                            handleContentTitleClick(content.contentId)
                          }
                          className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer truncate block max-w-full text-left"
                          title={content.contentTitle}
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
                        <div className="flex gap-2">
                          {/* 승인 버튼: 판매중, 모니터링 필요 상태에서만 표시 */}
                          {(unifiedStatus.text === '판매중' ||
                            unifiedStatus.text === '모니터링 필요') && (
                            <button
                              onClick={() => handleApproveClick(content)}
                              className="bg-primary-normal text-label-normal px-3 py-1 rounded text-xs hover:brightness-95 cursor-pointer transition-colors"
                            >
                              승인
                            </button>
                          )}

                          {/* 중단 버튼: 승인, 판매중, 모니터링 필요 상태에서만 표시 */}
                          {(unifiedStatus.text === '승인' ||
                            unifiedStatus.text === '판매중' ||
                            unifiedStatus.text === '모니터링 필요') && (
                            <button
                              onClick={() => handleRejectClick(content)}
                              className="bg-[#D8FFF4] text-label-normal px-3 py-1 rounded text-xs hover:brightness-95 cursor-pointer transition-colors"
                            >
                              중단
                            </button>
                          )}

                          {/* 버튼이 없는 경우 빈 공간 표시 */}
                          {!(
                            unifiedStatus.text === '승인' ||
                            unifiedStatus.text === '판매중' ||
                            unifiedStatus.text === '모니터링 필요'
                          ) && <span className="text-gray-400 text-xs">-</span>}
                        </div>
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
        subText={
          approveModal.content
            ? `"${approveModal.content.contentTitle}"을(를) 승인하면 판매가 시작됩니다.`
            : ''
        }
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
