// File: /apps/admin/features/dashboard/contents/ui/ContentsTable.tsx

import { useRouter } from 'next/navigation';
import { Content } from '../model/ContentType';

type ContentsTableProps = {
  contents: Content[];
  isLoading: boolean;
};

export default function ContentsTable({
  contents,
  isLoading,
}: ContentsTableProps) {
  const router = useRouter();

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
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
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
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
                      {formatPrice(content.minPrice, content.priceOptionLength)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={unifiedStatus.style}>
                        {unifiedStatus.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex gap-2">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors">
                          승인
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors">
                          중단
                        </button>
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
  );
}
