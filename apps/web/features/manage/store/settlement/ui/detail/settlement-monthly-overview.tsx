import { SettlementMonthlyDetailResponse } from '../../types/settlement-detail-types';

export default function SettlementMonthlyOverview({
  data,
}: {
  data: SettlementMonthlyDetailResponse;
}) {
  const {
    scheduledSettlementDate,
    settlementAmount,
    pgFee,
    platformFee,
    vatAmount,
  } = data;

  // YYYY-MM-DD -> YY.MM.DD
  const formattedScheduledSettlementDate = scheduledSettlementDate
    .split('-')
    .slice(0, 4)
    .join('.');

  return (
    <div className="w-full bg-background-alternative rounded-xl px-5 py-6 space-y-4">
      <div className="flex justify-between ">
        <span className="text-body-1-normal text-label-alternative">
          정산(예정)일
        </span>
        <span className="text-body-1-normal font-bold text-label-normal">
          {formattedScheduledSettlementDate}
        </span>
      </div>
      {/*  */}
      <div className="flex justify-between ">
        <span className="text-body-1-normal text-label-alternative">
          정산(예정)금액
        </span>
        <span className="text-body-1-normal font-bold text-label-normal">
          {Math.floor(settlementAmount).toLocaleString()}원
        </span>
      </div>
      {/*  */}
      <div className="flex justify-between ">
        <span className="text-body-1-normal text-label-alternative">
          PG 결제 수수료 (1.7%)
        </span>
        <span className="text-body-1-normal font-bold text-label-normal">
          {pgFee.toLocaleString()}원
        </span>
      </div>
      {/*  */}
      <div className="flex justify-between ">
        <span className="text-body-1-normal text-label-alternative">
          그로블 수수료 (1.5%)
        </span>
        <span className="text-body-1-normal font-bold text-label-normal">
          {platformFee.toLocaleString()}원
        </span>
      </div>
      {/*  */}
      <div className="flex justify-between ">
        <span className="text-body-1-normal text-label-alternative">VAT </span>
        <span className="text-body-1-normal font-bold text-label-normal">
          {vatAmount?.toLocaleString() ?? 0}원
        </span>
      </div>
    </div>
  );
}
