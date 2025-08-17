import InfoTooltip from '@/components/ui/InfoTooltip';

export default function SettlementTableHeader() {
  return (
    <div className="flex w-full min-w-[31.2rem] items-center justify-between py-3 border-b border-label-normal text-body-2-normal text-label-alternative">
      <div className="flex items-center shrink-0">
        <span className="w-[12rem] shrink-0">기간</span>

        <div className="flex items-center gap-1 w-[8rem] sm:w-[13rem] shrink-0">
          <span>정산(예정) 금액</span>
          <InfoTooltip
            className="md:block hidden"
            direction="right"
            text="그로블 수수료 1.5%, PG사 결제 수수료 1.7%, 두 항목에 대한 VAT 10%를 제외한 금액입니다."
            width="30rem"
          />
        </div>
      </div>

      <span className="w-[8.75rem] text-center shrink-0">상태</span>
    </div>
  );
}
