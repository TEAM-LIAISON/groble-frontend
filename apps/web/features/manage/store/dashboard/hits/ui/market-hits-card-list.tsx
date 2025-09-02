'use client';
import { ChevronIcon } from '@/components/(improvement)/icons';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { getMarketHits } from '../api/get-market-hits';
import { useSearchParams } from 'next/navigation';
import InfoTooltip from '@/components/ui/InfoTooltip';

export default function MarketHitsCardList() {
  const searchParams = useSearchParams();
  const period = searchParams.get('period');

  const { data } = useQuery({
    queryKey: ['market-hits'],
    queryFn: () => {
      return getMarketHits(period ?? 'TODAY');
    },
  });
  const marketHits = data?.data;

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* 카드 1 */}
      <Link
        href="/manage/store/dashboard/hits/market"
        className="p-6 rounded-xl bg-background-alternative flex flex-col"
      >
        <span className="flex justify-between">
          <p className="md:text-body-1-normal text-body-2-normal font-semibold text-label-normal">
            마켓 조회수
          </p>
          <ChevronIcon className="text-label-assistive" />
        </span>
        <hr className="my-3 border-line-normal" />

        <p className="flex text-headline-1 md:text-heading-1 font-bold text-primary-sub-1 items-center md:items-end gap-[0.12rem]">
          {marketHits?.totalMarketViews}
          <span className="md:text-headline-1 text-body-2-normal font-medium text-primary-sub-1">
            회
          </span>
        </p>
      </Link>

      {/* 카드 2 */}
      <div className="p-6 rounded-xl bg-background-alternative flex flex-col">
        <span className="flex gap-1 items-center">
          <p className="md:text-body-1-normal text-body-2-normal font-semibold text-label-normal">
            콘텐츠 조회수
          </p>
          <InfoTooltip
            className="hidden md:block"
            text="판매 중인 콘텐츠들의 합산 조회수입니다"
            direction="right"
            width="14rem"
          />
        </span>

        <hr className="my-3 border-line-normal" />

        <p className="flex text-headline-1 md:text-heading-1 font-bold text-primary-sub-1 items-center md:items-end gap-[0.12rem]">
          {marketHits?.totalContentViews}
          <span className="md:text-headline-1 text-body-2-normal font-medium text-primary-sub-1">
            회
          </span>
        </p>
      </div>
    </div>
  );
}
