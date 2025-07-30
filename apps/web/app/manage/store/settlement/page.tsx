import ComingSoon from '@/features/manage/store/ui/ComingSoon';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';

export default function SettlementPage() {
  return (
    <>
      <header className="">
        <MobileStoreHeader title="정산 관리" />
      </header>
      <div className="flex flex-col justify-center md:justify-start mx-auto rounded-xl bg-white  md:px-9 md:py-12 py-5 shadow-card min-h-[calc(100vh-122px)]">
        <div className="md:flex items-center justify-between hidden ">
          <h1 className="text-heading-1 font-bold text-label-normal ">
            마켓 관리
          </h1>
        </div>

        <ComingSoon
          title="정산 관리"
          description="누적 금액, 예정 금액, 정산 내역,\n 상태를 확인할 수 있어요."
        />
      </div>
    </>
  );
}
