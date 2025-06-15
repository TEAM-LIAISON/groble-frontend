'use client';

import { useUsers } from '@/features/dashboard/users/hooks/useUsers';
import { UsersTable } from '@/features/dashboard/users/ui';
import Pagination from '@/shared/ui/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DashboardUsersPage() {
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
