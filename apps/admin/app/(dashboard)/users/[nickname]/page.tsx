// File: /apps/admin/app/(dashboard)/users/[nickname]/page.tsx
'use client';
import { useUserDetail } from '@/features/dashboard/users/hooks/useUserDetail';
import UserDetail from '@/features/dashboard/users/ui/UserDetail';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { useParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

// 동적 렌더링 강제 설정
export const dynamic = 'force-dynamic';

function UserDetailPageContent() {
  const router = useRouter();
  const { nickname: encodedNickname } = useParams();

  // URL 인코딩된 닉네임을 디코딩
  const nickname = encodedNickname
    ? decodeURIComponent(encodedNickname as string)
    : '';

  const { user, isLoading, error, refetch } = useUserDetail(nickname);

  // 뒤로가기 버튼 핸들러
  const handleBack = () => {
    router.push('/users');
  };

  if (isLoading) {
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
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <div className="text-gray-500">사용자 정보를 불러오는 중...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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
                오류가 발생했습니다: {error.message}
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

  if (!user) {
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
                사용자를 찾을 수 없습니다
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

        {/* 사용자 상세 정보 */}
        <UserDetail
          makerInfo={user}
          isLoading={isLoading}
          nickname={nickname}
          onRefresh={refetch}
        />
      </div>
    </div>
  );
}

export default function AdminUserDetailPage() {
  return (
    <Suspense
      fallback={
        <LoadingSpinner size="lg" text="사용자 정보를 불러오는 중..." />
      }
    >
      <UserDetailPageContent />
    </Suspense>
  );
}
