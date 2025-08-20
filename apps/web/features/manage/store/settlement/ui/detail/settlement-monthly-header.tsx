import { SettlementMonthlyDetailResponse } from '../../types/settlement-detail-types';

export default function SettlementMonthlyHeader({
  data,
}: {
  data: SettlementMonthlyDetailResponse;
}) {
  const { settlementStartDate, settlementEndDate } = data;

  // YYYY-MM-DD -> YY.MM.DD
  const formattedStartDate = settlementStartDate
    .split('-')
    .slice(0, 4)
    .join('.');
  const formattedEndDate = settlementEndDate.split('-').slice(0, 4).join('.');

  return (
    <>
      <div className="flex justify-between items-center">
        {/* 헤더 */}
        <div className="flex flex-col gap-[0.12rem]">
          <h1 className="text-body-2-normal md:text-heading-1 text-label-normal">
            정산 상세 내역
          </h1>
          <p className="text-body-2-normal md:text-heading-1 font-bold text-label-normal">
            {formattedStartDate} ~ {formattedEndDate}
          </p>
        </div>
      </div>
    </>
  );
}
