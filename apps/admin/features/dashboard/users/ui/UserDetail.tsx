// File: /apps/admin/features/dashboard/users/ui/UserDetail.tsx

import { MakerDetailData, BusinessTypeLabels } from '../model/MakerType';

interface UserDetailProps {
  makerInfo: MakerDetailData;
  isLoading: boolean;
}

export default function UserDetail({ makerInfo, isLoading }: UserDetailProps) {
  console.log(makerInfo);
  // 파일명 추출 함수
  const getFilenameFromUrl = (url: string): string => {
    return url.split('/').pop() || 'document';
  };

  // 파일 다운로드/열기 함수
  const handleFileClick = (url: string) => {
    window.open(url, '_blank');
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
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="p-8">
        <div className="space-y-10">
          {/* 기본 정보 섹션 */}
          <div className="space-y-6">
            <div className="space-y-5">
              <div className="flex items-start py-3">
                <div className="w-32 text-body-2-normal text-label-alternative font-medium flex-shrink-0">
                  이름
                </div>
                <div className="text-body-2-normal text-label-normal ">
                  {makerInfo.representativeName || makerInfo.businessName}
                </div>
              </div>

              <div className="flex items-start py-3 border-t border-gray-50">
                <div className="w-32 text-body-2-normal text-label-alternative font-medium flex-shrink-0">
                  정산 은행
                </div>
                <div className="text-body-2-normal text-label-normal ">
                  {makerInfo.bankName}
                </div>
              </div>

              <div className="flex items-start py-3 border-t border-gray-50">
                <div className="w-32 text-body-2-normal text-label-alternative font-medium flex-shrink-0">
                  계좌번호
                </div>
                <div className="text-body-2-normal text-label-normal ">
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
                    {getFilenameFromUrl(makerInfo.copyOfBankbookUrl)}
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
                      {getFilenameFromUrl(makerInfo.businessLicenseFileUrl)}
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
  );
}
