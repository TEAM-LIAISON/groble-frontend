// File: /apps/admin/app/(dashboard)/contents/page.tsx

'use client';

import { useContents } from '@/features/dashboard/contents/hooks/useContents';
import { ContentsTable } from '@/features/dashboard/contents/ui';
import Pagination from '@/shared/ui/Pagination';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// 동적 렌더링 강제 설정
export const dynamic = 'force-dynamic';

function ContentsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const { contents, totalPages, isLoading, error } = useContents(currentPage);
  console.log(contents);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-title-3 text-label-normal">콘텐츠</h1>
        <div className="flex justify-center items-center h-32">
          <div className="text-red-500">
            오류가 발생했습니다: {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-title-3 text-label-normal">콘텐츠</h1>

      <ContentsTable contents={contents} isLoading={isLoading} />

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

export default function DashboardContentsPage() {
  return (
    <Suspense
      fallback={
        <LoadingSpinner size="lg" text="콘텐츠 목록을 불러오는 중..." />
      }
    >
      <ContentsPageContent />
    </Suspense>
  );
}
