// File: /apps/admin/features/dashboard/users/ui/UserDetail.tsx

import { useState } from 'react';
import { MakerDetailData, BusinessTypeLabels } from '../model/MakerType';
import { verifyMaker, MakerVerificationRequest } from '../model/makerApi';
import { Button, Modal } from '@groble/ui';

interface UserDetailProps {
  makerInfo: MakerDetailData;
  isLoading: boolean;
  nickname?: string;
  onRefresh?: () => void;
}

export default function UserDetail({
  makerInfo,
  isLoading,
  nickname,
  onRefresh,
}: UserDetailProps) {
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 파일명 표시 함수 (원본 파일명 우선 사용)
  const getDisplayFileName = (
    originalFileName?: string,
    url?: string
  ): string => {
    if (originalFileName) return originalFileName;
    if (url) return url.split('/').pop() || 'document';
    return '등록되지 않음';
  };

  // 파일 다운로드/열기 함수
  const handleFileClick = (url: string) => {
    window.open(url, '_blank');
  };

  // 승인 처리 함수
  const handleApprove = async () => {
    if (!nickname || isProcessing) return;

    setIsProcessing(true);
    try {
      await verifyMaker({
        nickname,
        status: 'APPROVED',
      });
      setApproveModal(false);
      onRefresh?.();
      alert('메이커가 성공적으로 승인되었습니다.');
    } catch (error) {
      console.error('승인 처리 실패:', error);
      alert(
        error instanceof Error ? error.message : '승인 처리에 실패했습니다.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // 거절 처리 함수
  const handleReject = async () => {
    if (!nickname || isProcessing) return;

    setIsProcessing(true);
    try {
      await verifyMaker({
        nickname,
        status: 'REJECTED',
      });
      setRejectModal(false);
      onRefresh?.();
      alert('메이커가 성공적으로 거절되었습니다.');
    } catch (error) {
      console.error('거절 처리 실패:', error);
      alert(
        error instanceof Error ? error.message : '거절 처리에 실패했습니다.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="p-8">
          <div className="space-y-10">
            {/* 승인/거절 버튼 (IN_PROGRESS 상태일 때만 표시) */}
            {makerInfo.verificationStatus === 'IN_PROGRESS' && (
              <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Button
                  onClick={() => setApproveModal(true)}
                  group="solid"
                  type="primary"
                  size="medium"
                  disabled={isProcessing}
                >
                  승인
                </Button>
                <Button
                  onClick={() => setRejectModal(true)}
                  group="solid"
                  type="secondary"
                  size="medium"
                  disabled={isProcessing}
                >
                  거절
                </Button>
              </div>
            )}

            {/* 기본 정보 섹션 */}
            <div className="space-y-6">
              <div className="space-y-5">
                <div className="flex items-start py-3">
                  <div className="w-32 text-body-2-normal text-label-alternative font-medium flex-shrink-0">
                    이름
                  </div>
                  <div className="text-body-2-normal text-label-normal">
                    {makerInfo.bankAccountOwner}
                  </div>
                </div>
                <div className="flex items-start py-3">
                  <div className="w-32 text-body-2-normal text-label-alternative font-medium flex-shrink-0">
                    전화번호
                  </div>
                  <div className="text-body-2-normal text-label-normal">
                    {makerInfo.phoneNumber}
                  </div>
                </div>

                <div className="flex items-start py-3 border-t border-gray-50">
                  <div className="w-32 text-body-2-normal text-label-alternative font-medium flex-shrink-0">
                    정산 은행
                  </div>
                  <div className="text-body-2-normal text-label-normal">
                    {makerInfo.bankName}
                  </div>
                </div>

                <div className="flex items-start py-3 border-t border-gray-50">
                  <div className="w-32 text-body-2-normal text-label-alternative font-medium flex-shrink-0">
                    계좌번호
                  </div>
                  <div className="text-body-2-normal text-label-normal">
                    {makerInfo.bankAccountNumber}
                  </div>
                </div>

                <div className="flex items-start py-3 border-t border-gray-50">
                  <div className="w-32 text-body-2-normal text-label-alternative font-semibold flex-shrink-0">
                    통장사본
                  </div>
                  {makerInfo.copyOfBankbookUrl ? (
                    <button
                      onClick={() =>
                        handleFileClick(makerInfo.copyOfBankbookUrl!)
                      }
                      className="text-body-2-normal text-label-normal hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-all duration-200 underline decoration-dotted underline-offset-2"
                    >
                      {getDisplayFileName(
                        makerInfo.copyOfBankBookOriginalFileName,
                        makerInfo.copyOfBankbookUrl
                      )}
                    </button>
                  ) : (
                    <div className="text-body-2-normal text-label-normal">
                      등록되지 않음
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 사업자 정보 섹션 (사업자 메이커인 경우만 표시) */}
            {makerInfo.isBusinessMaker && (
              <div className="space-y-6 pt-6 border-t border-gray-200">
                <div className="space-y-5">
                  {makerInfo.businessType && (
                    <div className="flex items-start py-3">
                      <div className="w-32 text-body-2-normal text-label-alternative font-medium flex-shrink-0">
                        사업자 유형
                      </div>
                      <div className="text-body-2-normal text-label-normal">
                        {BusinessTypeLabels[makerInfo.businessType]}
                      </div>
                    </div>
                  )}

                  {makerInfo.businessCategory && (
                    <div className="flex items-start py-3 border-t border-gray-50">
                      <div className="w-32 text-body-2-normal text-label-alternative font-medium flex-shrink-0">
                        업종
                      </div>
                      <div className="text-body-2-normal text-label-normal">
                        {makerInfo.businessCategory}
                      </div>
                    </div>
                  )}

                  {makerInfo.businessSector && (
                    <div className="flex items-start py-3 border-t border-gray-50">
                      <div className="w-32 text-body-2-normal text-label-alternative font-medium flex-shrink-0">
                        업태
                      </div>
                      <div className="text-body-2-normal text-label-normal">
                        {makerInfo.businessSector}
                      </div>
                    </div>
                  )}

                  {makerInfo.businessName && (
                    <div className="flex items-start py-3 border-t border-gray-50">
                      <div className="w-32 text-body-2-normal text-label-alternative font-medium flex-shrink-0">
                        상호
                      </div>
                      <div className="text-body-2-normal text-label-normal">
                        {makerInfo.businessName}
                      </div>
                    </div>
                  )}

                  {makerInfo.representativeName && (
                    <div className="flex items-start py-3 border-t border-gray-50">
                      <div className="w-32 text-body-2-normal text-label-alternative font-medium flex-shrink-0">
                        대표자명
                      </div>
                      <div className="text-body-2-normal text-label-normal">
                        {makerInfo.representativeName}
                      </div>
                    </div>
                  )}

                  {makerInfo.businessAddress && (
                    <div className="flex items-start py-3 border-t border-gray-50">
                      <div className="w-32 text-body-2-normal text-label-alternative font-medium flex-shrink-0">
                        사업장 소재지
                      </div>
                      <div className="text-body-2-normal text-label-normal">
                        {makerInfo.businessAddress}
                      </div>
                    </div>
                  )}

                  {/* 사업자등록증 사본 */}
                  {makerInfo.businessLicenseFileUrl && (
                    <div className="flex items-start py-3 border-t border-gray-50">
                      <div className="w-32 text-body-2-normal text-label-alternative font-medium flex-shrink-0">
                        사업자등록증 사본
                      </div>
                      <button
                        onClick={() =>
                          handleFileClick(makerInfo.businessLicenseFileUrl!)
                        }
                        className="text-body-2-normal text-label-normal hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-all duration-200 underline decoration-dotted underline-offset-2"
                      >
                        {getDisplayFileName(
                          makerInfo.businessLicenseOriginalFileName,
                          makerInfo.businessLicenseFileUrl
                        )}
                      </button>
                    </div>
                  )}

                  {makerInfo.taxInvoiceEmail && (
                    <div className="flex items-start py-3 border-t border-gray-50">
                      <div className="w-32 text-body-2-normal text-label-alternative font-medium flex-shrink-0">
                        세금계산서 수령 이메일
                      </div>
                      <div className="text-body-2-normal text-label-normal">
                        {makerInfo.taxInvoiceEmail}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 승인 확인 모달 */}
      <Modal
        isOpen={approveModal}
        onRequestClose={() => setApproveModal(false)}
        title="메이커를 승인하시겠습니까?"
        subText={`${makerInfo.bankAccountOwner} 님을 메이커로 승인하시겠습니까?`}
        actionButton={isProcessing ? '처리 중...' : '승인'}
        secondaryButton="취소"
        onActionClick={handleApprove}
        onSecondaryClick={() => setApproveModal(false)}
        actionButtonColor="primary"
      />

      {/* 거절 확인 모달 */}
      <Modal
        isOpen={rejectModal}
        onRequestClose={() => setRejectModal(false)}
        title="메이커를 거절하시겠습니까?"
        subText={`${makerInfo.bankAccountOwner} 님을 메이커로 거절하시겠습니까?`}
        actionButton={isProcessing ? '처리 중...' : '거절'}
        secondaryButton="취소"
        onActionClick={handleReject}
        onSecondaryClick={() => setRejectModal(false)}
        actionButtonColor="danger"
      />
    </>
  );
}
