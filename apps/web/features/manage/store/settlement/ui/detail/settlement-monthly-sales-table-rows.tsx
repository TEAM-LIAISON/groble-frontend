import type { SettlementMonthlySalesHistoryItem } from '../../types/settlement-detail-types';

const ORDER_STATUS_CONFIG = {
  CANCEL_REQUEST: { label: '결제 취소' },
  CANCELLED: { label: '환불 완료' },
} as const;

const CANCELLED_STATUSES = new Set(['CANCEL_REQUEST', 'CANCELLED']);

const getOrderStatusInfo = (orderStatus: string) => {
  return ORDER_STATUS_CONFIG[orderStatus as keyof typeof ORDER_STATUS_CONFIG];
};

export default function SettlementMonthlySalesTableRows({
  items,
}: {
  items: SettlementMonthlySalesHistoryItem[];
}) {
  return (
    <div className="w-full">
      {items.map((item, index) => {
        const statusInfo = getOrderStatusInfo(item.orderStatus);
        const isCancelled = CANCELLED_STATUSES.has(item.orderStatus);
        const formattedAmount = Math.floor(
          item.settlementAmount
        ).toLocaleString();
        const formattedDate = item.purchasedAt.slice(0, 16);

        return (
          <div
            key={`${item.contentTitle}-${index}`}
            className="flex w-full items-center justify-between gap-10 whitespace-nowrap"
          >
            <div className="min-w-[12rem] text-body-2-normal font-semibold text-label-normal border-b border-line-normal py-3 flex-1">
              {item.contentTitle}
            </div>

            <div className="flex items-center shrink-0 gap-10">
              <div className="w-[9.75rem] text-body-2-normal text-label-normal border-b border-line-normal py-3">
                <div className="flex items-center gap-2">
                  <span className={isCancelled ? 'line-through' : ''}>
                    {formattedAmount}원
                  </span>
                  {statusInfo && (
                    <span className="bg-[#FEECEC] text-status-error px-1.5 py-[3px] rounded-sm text-caption-1">
                      {statusInfo.label}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-[10rem] shrink-0 border-b border-line-normal bg-background-alternative p-3 text-left">
                {formattedDate}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
