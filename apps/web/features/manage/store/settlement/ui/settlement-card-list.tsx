import SettlementCard from './settlement-card';

export default function SettlementCardList() {
  return (
    <div>
      <div className="grid md:grid-cols-2 space-y-3 md:space-y-0 md:space-x-3 w-full">
        {/* 누적 정산 금액 */}
        <SettlementCard title="누적 정산 금액" amount={1000000} />

        {/* 예정 정산 금액 */}
        <SettlementCard title="예정 정산 금액" amount={1000000} />
      </div>
    </div>
  );
}
