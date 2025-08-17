import InfoTooltip from '@/components/ui/InfoTooltip';

export default function SettlementMonthlySalesTableHeader() {
  return (
    <div className="flex w-full min-w-[36.7rem] gap-10 items-center justify-between py-3 border-b border-label-normal text-body-2-normal text-label-alternative">
      <span className="min-w-[12rem] shrink-0">콘텐츠명</span>

      <div className="flex items-center shrink-0 gap-10">
        <div className="flex items-center gap-1 w-[9.75rem] shrink-0">
          <span>정산 금액</span>
          <InfoTooltip
            className="md:block hidden"
            direction="left"
            text="그로블 수수료 1.5%, PG사 결제 수수료 1.7%, 두 항목에 대한 VAT 10%를 제외한 금액입니다."
            width="30rem"
          />
        </div>
        <span className="w-[10rem] text-left shrink-0">판매일</span>
      </div>
    </div>
  );
}
