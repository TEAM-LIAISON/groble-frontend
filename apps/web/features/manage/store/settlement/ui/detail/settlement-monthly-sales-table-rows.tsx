import { SettlementMonthlySalesHistoryItem } from '../../types/settlement-detail-types';

type Props = {
  items: SettlementMonthlySalesHistoryItem[];
};

export default function SettlementMonthlySalesTableRows({ items }: Props) {
  return (
    <div className="w-full">
      {items.map((item, idx) => (
        <div
          key={`${item.contentTitle}-${idx}`}
          className="flex w-full items-center justify-between gap-10 whitespace-nowrap"
        >
          <div className="min-w-[12rem] text-body-2-normal font-semibold text-label-normal py-3 border-b border-line-normal flex-1">
            {item.contentTitle}
          </div>

          <div className="flex  items-center  shrink-0 gap-10">
            <div className="w-[9.75rem] text-body-2-normal  text-label-normal border-b border-line-normal py-3">
              {Math.floor(item.settlementAmount).toLocaleString()}원
            </div>
            <div className="w-[10rem] text-left shrink-0 border-b border-line-normal p-3 bg-background-alternative">
              {item.purchasedAt.slice(0, 16)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
