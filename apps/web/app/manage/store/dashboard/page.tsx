import ComingSoon from '@/features/manage/store/ui/ComingSoon';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';

export default function DashboardPage() {
  return (
    <>
      <header className="">
        <MobileStoreHeader title="대시보드" />
      </header>
      <div className="mt-16 flex flex-col justify-center md:justify-start mx-auto rounded-xl bg-white  md:px-9 md:py-12 py-5 shadow-card min-h-[calc(100vh-122px)]">
        <ComingSoon
          title="대시보드"
          subTitle="스토어 운영 현황을 한 눈에 확인하세요"
          description="총 수익, 조회수, 고객수 등을\n 확인할 수 있어요."
        />
      </div>
    </>
  );
}
