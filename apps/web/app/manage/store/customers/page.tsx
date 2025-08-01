import ComingSoon from '@/features/manage/store/ui/ComingSoon';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';

export default function CustomersPage() {
  return (
    <>
      <header className="">
        <MobileStoreHeader title="고객 관리" />
      </header>
      <div className="mt-16 flex flex-col justify-center md:justify-start mx-auto rounded-xl bg-white  md:px-9 md:py-12 py-5 shadow-card min-h-[calc(100vh-122px)]">
        <ComingSoon
          title="고객 관리"
          description="고객 목록, 주문 내역, 문의사항 등을\n 관리할 수 있습니다."
        />
      </div>
    </>
  );
}
