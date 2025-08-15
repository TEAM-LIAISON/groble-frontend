// File: /apps/admin/features/dashboard/users/ui/UsersTable.tsx

import Link from 'next/link';
import { User } from '../model/UserType';

type UsersTableProps = {
  users: User[];
  isLoading: boolean;
};

export default function UsersTable({ users, isLoading }: UsersTableProps) {
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

  // 닉네임 링크는 Link 컴포넌트로 라우팅 처리 (URL 인코딩 포함)

  // 사용자 타입 결정 함수 (요구사항에 맞춰 수정)
  const getUserType = (user: User) => {
    if (user.sellerTermsAgreed) return '메이커 및 구매자';
    return '구매자';
  };

  // 메이커 인증 상태 결정 함수 (요구사항에 맞춰 수정)
  const getMakerVerificationStatus = (user: User) => {
    // 구매자만 가입한 경우 (sellerTermsAgreed가 false)
    if (!user.sellerTermsAgreed) return '해당없음';

    switch (user.verificationStatus) {
      case 'NONE':
        return '해당없음';
      case 'PENDING':
        return '해당없음';
      case 'IN_PROGRESS':
        return '대기';
      case 'FAILED':
        return '거절';
      case 'VERIFIED':
        if (user.businessSeller) {
          if (user.businessType === 'INDIVIDUAL_SIMPLIFIED') {
            return '완료 개인사업자(간이과세자)';
          } else if (user.businessType === 'INDIVIDUAL_NORMAL') {
            return '완료 개인사업자(일반과세자)';
          } else if (user.businessType === 'CORPORATE') {
            return '완료 법인사업자';
          }
        } else {
          return '완료 개인메이커';
        }
      default:
        return '해당없음';
    }
  };

  // 메이커 인증 상태에 따른 스타일 클래스
  const getMakerVerificationStyle = (user: User) => {
    const status = getMakerVerificationStatus(user);

    if (status.startsWith('완료')) {
      return 'bg-green-100 text-green-800 px-2 py-1 rounded text-xs';
    }
    if (status === '대기') {
      return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs';
    }
    if (status === '거절') {
      return 'bg-red-100 text-red-800 px-2 py-1 rounded text-xs';
    }
    return 'text-gray-500 text-xs';
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
                날짜
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                알림
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                닉네임
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                이메일
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                마케팅 동의
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                번호 인증
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                메이커 인증
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  등록된 사용자가 없습니다.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getUserType(user)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                    <Link href={`/users/${encodeURIComponent(user.nickname)}`}>
                      {user.nickname}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.marketingAgreed ? 'Y' : 'N'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.phoneNumber ? 'Y' : 'N'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={getMakerVerificationStyle(user)}>
                      {getMakerVerificationStatus(user)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
