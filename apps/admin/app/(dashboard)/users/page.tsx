// File: /apps/admin/app/(dashboard)/users/page.tsx

'use client';

import { useUsers } from '@/features/dashboard/users/hooks/useUsers';
import { UsersTable } from '@/features/dashboard/users/ui';
import Pagination from '@/shared/ui/Pagination';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// 동적 렌더링 강제 설정
export const dynamic = 'force-dynamic';

function UsersPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const { users, totalPages, isLoading, error } = useUsers(currentPage);
  console.log(users);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-title-3 text-label-normal">사용자</h1>
        <div className="flex justify-center items-center h-32">
          <div className="text-red-500">
            오류가 발생했습니다: {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-title-3 text-label-normal">사용자</h1>

      <UsersTable users={users} isLoading={isLoading} />

      <div className="flex justify-center">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default function DashboardUsersPage() {
  return (
    <Suspense
      fallback={
        <LoadingSpinner size="lg" text="사용자 목록을 불러오는 중..." />
      }
    >
      <UsersPageContent />
    </Suspense>
  );
}
