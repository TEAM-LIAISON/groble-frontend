import BannerSlider from "@/components/BannerSlider";
import ProductList from "@/components/products/ProductList";
import { getHomeData } from "@/lib/api/homeApi";

export default async function HomePage() {
  const res = await getHomeData();

  return (
    <div className="flex w-full flex-col items-center">
      {/* 배너 슬라이더 */}
      <div className="w-full max-w-[1250px] px-5 pt-5 sm:px-8 lg:px-12">
        <BannerSlider
          banners={[
            {
              imageUrl: "/Banner1.png",
              alt: "배너1",
              link: "/contents",
            },
            {
              imageUrl: "/Banner2.png",
              alt: "배너2",
              link: "/contents",
            },
            {
              imageUrl: "/Banner3.png",
              alt: "배너3",
              link: "/contents",
            },
            {
              imageUrl: "/Banner4.png",
              alt: "배너4",
              link: "/contents",
            },
          ]}
        />
      </div>

      {/* 콘텐츠 섹션 */}
      <div className="mt-8 flex w-full max-w-[1250px] flex-col gap-8 px-5 md:px-8 lg:px-12">
        {/* 창업에 필요한 자료를 받아보세요 */}
        <ProductList
          title="창업에 필요한 자료를 받아보세요"
          products={res?.data?.documentItems}
          viewAllHref="/products/category/all"
        />

        {/* 사업 전문가로부터 코칭을 받아 보세요 */}
        <ProductList
          title="사업 전문가로부터 코칭을 받아 보세요"
          products={res?.data?.coachingItems}
          viewAllHref="/products/category/all"
        />
      </div>
    </div>
  );
}
