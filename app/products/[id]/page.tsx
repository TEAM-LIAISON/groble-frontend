import { fetchProductDetail } from "@/features/products/api/product-server-api";
import ProductDetailPage from "@/features/products/detail/components/Product-detail-page";
import { createMetadata } from "@/lib/utils/metadata";

interface ProductPageProps {
  params: {
    id: string;
  };
}
/**
 * 메타데이터 생성
 */
export async function generateMetadata({ params }: ProductPageProps) {
  const res = await fetchProductDetail(params.id);
  const product = res.data;

  return createMetadata({
    title: product.title,
    description: product.contentIntroduction,
    path: `/product/${params.id}`,
    images: [{ url: product.thumbnailUrl, alt: product.title }],
  });
}

/**
 * 서버 컴포넌트: 데이터만 가져와서 하위 UI에 전달
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const res = await fetchProductDetail(params.id);
  const product = res.data;

  return <ProductDetailPage product={product} />;
}
