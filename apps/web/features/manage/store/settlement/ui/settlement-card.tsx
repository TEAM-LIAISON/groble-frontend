type SettlementCardProps = {
  title: string;
  amount: number | undefined;
};

export default function SettlementCard({ title, amount }: SettlementCardProps) {
  return (
    <div className="px-5 py-6 bg-background-alternative rounded-xl flex flex-col">
      <h2 className="text-body-2-normal md:text-body-1-normal font-semibold text-label-normal">
        {title}
      </h2>

      <hr className="border-line-normal my-3" />

      <p className="text-label-1-normal md:text-body-2-normal font-semibold text-label-alternative">
        금액
      </p>
      <span className="flex gap-[0.12rem] text-primary-sub-1 items-center md:items-end">
        <p className="text-heading-1 font-bold">
          {amount ? Math.floor(amount).toLocaleString() : '0'}
        </p>
        <p className="text-body-2-normal md:text-headline-1 font-medium">원</p>
      </span>

      <p className="mt-1 text-caption-1 text-label-assistive">
        그로블 수수료 1.5% + PG사 수수료 1.7%를 제외한 금액입니다
      </p>
    </div>
  );
}
