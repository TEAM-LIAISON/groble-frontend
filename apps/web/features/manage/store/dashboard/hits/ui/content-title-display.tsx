'use client';

import { useQuery } from '@tanstack/react-query';
import { getContentViewStats } from '../api/get-content-view-stats';
import { useSearchParams } from 'next/navigation';
import { ChevronIcon } from '@/components/(improvement)/icons';
import Link from 'next/link';

interface ContentTitleDisplayProps {
  contentId: string;
}

export default function ContentTitleDisplay({
  contentId,
}: ContentTitleDisplayProps) {
  const searchParams = useSearchParams();
  const period = searchParams.get('period') ?? 'TODAY';

  const { data } = useQuery({
    queryKey: ['content-title', contentId, period],
    queryFn: () => {
      return getContentViewStats(contentId, period, 0, 1);
    },
    select: (res) => res.meta?.contentTitle ?? '',
  });

  // if (!data) return null;

  return (
    <div className="flex md:items-center md:justify-between mb-6 md:mb-8 flex-col md:flex-row gap-3">
      <Link href={`/products/${contentId}`} className="flex items-center gap-2">
        <span className="text-headline-1 md:text-heading-1 font-bold text-label-normal">
          {data}
        </span>
        <ChevronIcon className="text-label-normal w-6 h-6" />
      </Link>
      <Link
        href={`/manage/store/products/${contentId}`}
        className="px-4 py-2 bg-[#D8FFF4] text-primary-sub-1 text-center text-body-2-normal rounded-lg cursor-pointer hover:brightness-95 transition-colors"
      >
        판매 관리
      </Link>
    </div>
  );
}
