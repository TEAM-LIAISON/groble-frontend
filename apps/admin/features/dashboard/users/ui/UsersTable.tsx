// File: /apps/admin/features/dashboard/users/ui/UsersTable.tsx

import { useRouter } from 'next/navigation';
import { User } from '../model/UserType';

type UsersTableProps = {
  users: User[];
  isLoading: boolean;
};

export default function UsersTable({ users, isLoading }: UsersTableProps) {
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

  // 사용자 타입 결정 함수
  const getUserType = (user: User) => {
    if (user.businessSeller) return '메이커';
    if (user.sellerInfo) return '메이커 및 구매자';
    return '구매자';
  };

  // 메이커 인증 상태 결정 함수
  const getMakerVerificationStatus = (user: User) => {
    if (!user.businessSeller && !user.sellerInfo) return '해당없음';

    if (user.verificationStatus === 'VERIFIED') return '승인';
    if (user.verificationStatus === 'PENDING') return '대기';
    if (user.verificationStatus === 'REJECTED') return '반려';
    return '해당없음';
  };

  // 메이커 인증 상태에 따른 스타일 클래스
  const getMakerVerificationStyle = (user: User) => {
    const status = getMakerVerificationStatus(user);
    if (status === '승인')
      return 'bg-green-100 text-green-800 px-2 py-1 rounded text-xs';
    if (status === '대기')
      return 'bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs';
    if (status === '반려')
      return 'bg-red-100 text-red-800 px-2 py-1 rounded text-xs';
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
                <tr
                  key={index}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/users/${user.nickname}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getUserType(user)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.nickname}
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
