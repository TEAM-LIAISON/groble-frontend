import { Suspense } from "react";
import ProductDetail from "@/components/products/detail/ProductDetail";
import ProductDetailSkeleton from "@/components/products/detail/ProductDetailSkeleton";
import { getProductDetail } from "@/lib/api/productApi";
import ProductHeader from "@/components/products/detail/ProductThumbnail";
import ProductInfo from "@/components/products/detail/ProductInfo";
import ProductSaleInfo from "@/components/products/detail/ProductSaleInfo";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const res = await getProductDetail(params.id);
  const product = res.data;
  console.log(res);

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <div className="flex w-full flex-col items-center pb-20">
        <div className="flex w-full max-w-[1250px] flex-col gap-9 px-5 sm:px-8 lg:px-12">
          {/* 썸네일 섹션 */}
          <ProductHeader thumbnailUrl={product.thumbnailUrl} />

          {/* 프로덕트 Info */}
          <ProductInfo
            contentType={product.contentType}
            title={product.title}
            sellerProfileImageUrl={product.sellerProfileImageUrl}
            sellerName={product.sellerName}
          />

          {/* 프로덕트 판매 정보 */}
          <ProductSaleInfo
            options={product.options}
            contentType={product.contentType}
          />
        </div>
      </div>
    </Suspense>
  );
}
