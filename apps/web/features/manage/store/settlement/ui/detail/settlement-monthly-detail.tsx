'use client';

import { Button } from '@groble/ui';
import SettlementMonthlyOverview from './settlement-monthly-overview';
import { useQuery } from '@tanstack/react-query';
import { getSettlementMonthlyDetail } from '../../api/get-settlement-detail-data';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { SettlementMonthlyDetailResponse } from '../../types/settlement-detail-types';
import SettlementMonthlyHeader from './settlement-monthly-header';

type Props = {
  yearMonth: string;
};

export default function SettlementMonthlyDetail({ yearMonth }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['settlement-monthly-detail', yearMonth],
    queryFn: () => {
      return getSettlementMonthlyDetail(yearMonth);
    },
  });
  const settlementMonthlyDetail = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* 헤더 */}
      <SettlementMonthlyHeader data={settlementMonthlyDetail!} />

      {/* 정산 상세 내역 overview */}
      <SettlementMonthlyOverview data={settlementMonthlyDetail!} />
    </div>
  );
}
