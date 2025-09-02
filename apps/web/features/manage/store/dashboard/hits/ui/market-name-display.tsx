'use client';

import { useQuery } from '@tanstack/react-query';
import { getMarketViewStats } from '../api/get-market-view-stats';
import { useSearchParams } from 'next/navigation';

export default function MarketNameDisplay() {
  const searchParams = useSearchParams();
  const period = searchParams.get('period') ?? 'TODAY';

  const { data } = useQuery({
    queryKey: ['market-name', period],
    queryFn: () => {
      return getMarketViewStats(period, 0, 1);
    },
    select: (res) => res.meta?.marketName ?? '',
  });

  if (!data) return null;

  return (
    <div className="mb-6 md:mb-8">
      <span className="text-headline-1 md:text-heading-1 font-bold text-label-normal">
        {data}
      </span>
    </div>
  );
}
