import ProductDetailSkeleton from "@/components/products/detail/ProductDetailSkeleton";
import { getProductDetail } from "@/lib/api/productApi";
import ProductHeader from "@/components/products/detail/ProductThumbnail";
import ProductInfo from "@/components/products/detail/ProductInfo";
import ProductSaleInfo from "@/components/products/detail/ProductSaleInfo";
import ProductTabs from "@/components/products/detail/ProductTabs";
import ProductStatusBar from "@/components/products/detail/ProductStatusBar";
import { createMetadata } from "@/lib/utils/metadata";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const res = await getProductDetail(params.id);
  const product = res.data.data;
  console.log(product);

  return createMetadata({
    title: product.title,
    description: product.contentIntroduction,
    path: `/product/${params.id}`,
    images: [{ url: product.thumbnailUrl, alt: product.title }],
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const res = await getProductDetail(params.id);
  const product = res.data.data;

  return (
    <>
      <div className="flex w-full flex-col items-center pb-20">
        <div className="flex w-full max-w-[1250px] flex-col gap-9 px-5 pt-9 sm:px-8 lg:px-12">
          {/* 프로덕트 상태바 */}
          <ProductStatusBar id={params.id} status={product.status} />

          {/* 썸네일 섹션 */}
          <ProductHeader thumbnailUrl={product.thumbnailUrl} />

          {/* 프로덕트 Info */}
          <ProductInfo
            categoryId={product.categoryId}
            contentType={product.contentType}
            title={product.title}
            sellerProfileImageUrl={product.sellerProfileImageUrl}
            sellerName={product.sellerName}
          />

          {/* 프로덕트 판매 정보 */}
          <ProductSaleInfo
            lowestPrice={product.lowestPrice}
            options={product.options}
            contentType={product.contentType}
          />

          {/* 탭 컴포넌트 */}
          <ProductTabs
            contentIntroduction={product.contentIntroduction}
            makerIntro={product.makerIntro}
            options={product.options}
            contentType={product.contentType}
          />
        </div>
      </div>
    </>
  );
}
