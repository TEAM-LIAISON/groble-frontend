import { redirect } from 'next/navigation';

// import WebHeader from '@/components/(improvement)/layout/header';
// import NavigationBar from '@/components/navigation-bar';
// import { ProductList } from '@/entities/product/ui';
// import { fetchHomeData } from '@/features/home/api/home-api';
// import BannerSlider from '@/shared/ui/banner-slide';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  redirect('/intro');

  // const res = await fetchHomeData();
  // const { coachingItems = [], documentItems = [] } = res?.data || {};

  // return (
  //   <>
  //     <WebHeader />
  //     <div className="flex w-full flex-col items-center md:py-9 px-5 xl:px-0">
  //       <div className="w-full max-w-[1080px]">
  //         {/* 배너 슬라이더 */}
  //         {/* 배포 서버 */}
  //         <BannerSlider
  //           banners={[
  //             {
  //               imageUrl: '/Banner1.png',
  //               alt: '배너1',
  //               link: 'https://groble-maker.oopy.io/?utm_source=homepage&utm_medium=banner',
  //             },
  //             {
  //               imageUrl: '/Banner2.png',
  //               alt: '배너2',
  //               link: 'https://www.groble.im/category/contents?utm_source=homepage&utm_medium=banner',
  //             },
  //             {
  //               imageUrl: '/Banner3.png',
  //               alt: '배너3',
  //               link: 'https://www.groble.im/category/coach?utm_source=homepage&utm_medium=banner',
  //             },
  //             {
  //               imageUrl: '/Banner1.png',
  //               alt: '배너1',
  //               link: 'https://groble-maker.oopy.io/?utm_source=homepage&utm_medium=banner',
  //             },
  //             {
  //               imageUrl: '/Banner2.png',
  //               alt: '배너2',
  //               link: 'https://www.groble.im/category/contents?utm_source=homepage&utm_medium=banner',
  //             },
  //             {
  //               imageUrl: '/Banner3.png',
  //               alt: '배너3',
  //               link: 'https://www.groble.im/category/coach?utm_source=homepage&utm_medium=banner',
  //             },
  //           ]}
  //         />
  //       </div>

  //       {/* 콘텐츠 섹션 */}
  //       <div className="mt-6 flex w-full max-w-[1080px] flex-col gap-8 ">
  //         {/* 창업에 필요한 자료를 받아보세요 */}
  //         <ProductList
  //           title="전자책, 문서·템플릿까지 필요한 자료를 받아보세요"
  //           products={documentItems ?? []}
  //           viewAllHref="/category/contents"
  //         />

  //         {/* 사업 전문가로부터 서비스을 받아 보세요 */}
  //         <ProductList
  //           title="강의·컨설팅, 제작·대행 전문가와 바로 만나보세요"
  //           products={coachingItems ?? []}
  //           viewAllHref="/category/coach"
  //         />
  //       </div>
  //     </div>

  //     <NavigationBar />
  //   </>
  // );
}
