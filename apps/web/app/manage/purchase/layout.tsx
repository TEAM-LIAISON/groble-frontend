'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCallback, Suspense } from 'react';
import WebHeader from '@/components/(improvement)/layout/header';

function PurchaseLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabs = [
    { name: '자료', path: '/manage/purchase/contents' },
    { name: '코칭', path: '/manage/purchase/coaching' },
  ];

  const filters = [
    { name: '전체', value: '' },
    { name: '결제완료', value: 'PAID' },
    { name: '기간만료', value: 'EXPIRED' },
    { name: '결제취소', value: 'CANCELLED' },
  ];

  const currentFilter = searchParams.get('status') || '';

  // 필터 변경 핸들러
  const handleFilterChange = useCallback(
    (filterValue: string) => {
      const params = new URLSearchParams(searchParams);

      if (filterValue === '') {
        params.delete('status');
      } else {
        params.set('status', filterValue);
      }

      const search = params.toString();
      const query = search ? `?${search}` : '';

      router.replace(`${pathname}${query}`);
    },
    [pathname, router, searchParams]
  );

  return (
    <>
      <WebHeader mobileTitle="내 콘텐츠" />
      <div className="flex w-full flex-col items-center pb-28 px-5 lg:px-0">
        <div className="flex w-full max-w-[1080px] flex-col  ">
          <h1 className="text-heading-1 font-bold text-label-normal hidden md:block pt-9">
            내 콘텐츠
          </h1>

          {/* 탭바 */}
          <div className="border-b border-line-normal">
            <div className="flex gap-0 sm:gap-8">
              {tabs.map((tab) => {
                const isActive = pathname === tab.path;
                return (
                  <Link
                    key={tab.name}
                    href={tab.path}
                    className={`flex-1 sm:flex-none px-[2.12rem] py-2 sm:py-5 text-headline-1 text-center sm:text-left transition-colors ${
                      isActive
                        ? 'border-b-[1.5px] border-label-normal text-label-normal font-semibold'
                        : 'text-label-assistive hover:text-label-normal'
                    }`}
                  >
                    {tab.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 필터 UI */}
          <div className="flex gap-2 pt-5">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterChange(filter.value)}
                className={`cursor-pointer rounded-lg px-4 py-2 text-body-2-normal font-medium transition-colors ${
                  currentFilter === filter.value
                    ? 'bg-component-fill-alternative font-semibold text-label-normal'
                    : 'text-label-alternative hover:text-label-normal'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          {children}
        </div>
      </div>
    </>
  );
}

export default function PurchaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseLayoutContent>{children}</PurchaseLayoutContent>
    </Suspense>
  );
}
