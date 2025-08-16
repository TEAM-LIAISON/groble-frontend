import { SettlementHistoryStatus } from '../types/settlement-types';

type Props = { status: SettlementHistoryStatus };

const LABEL: Record<SettlementHistoryStatus, string> = {
  PENDING: '정산 전',
  PROCESSING: '정산 처리중',
  COMPLETED: '정산 완료',
  ON_HOLD: '정산 보류',
  CANCELLED: '정산 취소',
};

const COLOR: Record<SettlementHistoryStatus, string> = {
  PENDING: 'text-status-error',
  PROCESSING: 'text-status-success',
  COMPLETED: 'text-status-success',
  ON_HOLD: 'text-status-error',
  CANCELLED: 'text-status-error',
};

export default function SettlementStatusBadge({ status }: Props) {
  return (
    <span className={`text-body-2-normal font-semibold ${COLOR[status]}`}>
      {LABEL[status]}
    </span>
  );
}
