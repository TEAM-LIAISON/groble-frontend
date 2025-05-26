import BannerSlider from "@/components/BannerSlider";
import ProductList from "@/components/products/ProductList";
import { getHomeData } from "@/lib/api/homeApi";

export default async function HomePage() {
  const res = await getHomeData();

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full max-w-[1250px] px-5 pt-9 sm:px-8 lg:px-12">
        {/* 배너 슬라이더 */}
        <BannerSlider
          banners={[
            {
              imageUrl: "/Banner1.png",
              alt: "배너1",
              link: "https://groble-maker.oopy.io/?utm_source=homepage&utm_medium=banner",
            },
            {
              imageUrl: "/Banner2.png",
              alt: "배너2",
              link: "https://www.groble.im/category/contents?utm_source=homepage&utm_medium=banner",
            },
            {
              imageUrl: "/Banner3.png",
              alt: "배너3",
              link: "https://www.groble.im/category/coach?utm_source=homepage&utm_medium=banner",
            },
            {
              imageUrl: "/Banner1.png",
              alt: "배너1",
              link: "https://groble-maker.oopy.io/?utm_source=homepage&utm_medium=banner",
            },
            {
              imageUrl: "/Banner2.png",
              alt: "배너2",
              link: "https://www.groble.im/category/contents?utm_source=homepage&utm_medium=banner",
            },
            {
              imageUrl: "/Banner3.png",
              alt: "배너3",
              link: "https://www.groble.im/category/coach?utm_source=homepage&utm_medium=banner",
            },
          ]}
        />
      </div>

      {/* 콘텐츠 섹션 */}
      <div className="mt-6 flex w-full max-w-[1250px] flex-col gap-8 px-5 md:px-8 lg:px-12">
        {/* 창업에 필요한 자료를 받아보세요 */}
        <ProductList
          title="전자책, 문서·템플릿까지 필요한 자료를 받아보세요"
          products={res?.data?.documentItems || []}
          viewAllHref="/category/contents"
        />

        {/* 사업 전문가로부터 코칭을 받아 보세요 */}
        <ProductList
          title="강의·컨설팅, 제작·대행 전문가와 바로 만나보세요"
          products={res?.data?.coachingItems || []}
          viewAllHref="/category/coach"
        />
      </div>
    </div>
  );
}
