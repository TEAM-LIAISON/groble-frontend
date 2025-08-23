'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const PERIOD_OPTIONS = [
  { label: '오늘', value: 'TODAY' },
  { label: '지난 7일', value: 'LAST_7_DAYS' },
  { label: '최근 30일', value: 'LAST_30_DAYS' },
  { label: '이번 달', value: 'THIS_MONTH' },
  { label: '지난 달', value: 'LAST_MONTH' },
];

export default function PeriodFilterBtn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPeriod = searchParams.get('period') || 'today';

  const handleClick = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('period', value);

    // URL 변경 (replace를 쓰면 히스토리 누적 방지)
    router.replace(`?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex">
      {PERIOD_OPTIONS.map((option) => {
        const isActive = currentPeriod === option.value;
        return (
          <button
            key={option.value}
            onClick={() => handleClick(option.value)}
            className={`px-4 py-2 rounded-sm text-body-2-normal transition cursor-pointer
          ${
            isActive
              ? 'bg-component-fill-alternative font-semibold text-label-normal'
              : 'text-label-assistive hover:text-label-normal'
          }
        `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
