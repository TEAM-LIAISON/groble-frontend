import Link from 'next/link';
import { SettlementHistory } from '../types/settlement-types';
import SettlementStatusBadge from './settlement-status-badge';

type Props = {
  items: SettlementHistory[];
};

export default function SettlementTableRows({ items }: Props) {
  // 응답 형태 YYYY-MM-DD -> YY.MM.DD
  const formatPeriod = (startDate: string, endDate: string) => {
    const toYYMMDD = (d: string) => {
      const [y, m, day] = d.split('-');
      return `${y.slice(2)}.${m}.${day}`;
    };

    return `${toYYMMDD(startDate)} ~ ${toYYMMDD(endDate)}`;
  };

  return (
    <div>
      {items.map((item, idx) => (
        <Link
          key={`${item.settlementStartDate}-${idx}`}
          className="flex w-full items-center justify-between gap-10 whitespace-nowrap cursor-pointer"
          // YYYY-MM 형식으로
          href={`/manage/store/settlement/${item.settlementStartDate.slice(
            0,
            7
          )}`}
        >
          {/* (1,2) 그룹 */}
          <div className="flex flex-1 items-center py-3 border-b border-line-normal shrink-0">
            {/* 기간 */}
            <div className="w-[12rem] text-body-2-normal font-semibold text-label-normal ">
              {formatPeriod(item.settlementStartDate, item.settlementEndDate)}
            </div>
            {/* 가격 */}
            <div className="w-[8rem] sm:w-[13rem] text-body-2-normal  text-label-normal">
              <span className="font-semibold">
                {Math.floor(item.settlementAmount).toLocaleString()}
              </span>
              <span className="font-medium">원</span>
            </div>
          </div>

          {/* (3) 그룹: 상태 */}
          <div className="w-[8.75rem] px-3 bg-background-alternative shrink-0">
            <div className="border-b border-line-normal py-3">
              <SettlementStatusBadge status={item.settlementStatus} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
