import WebHeader from '@/components/(improvement)/layout/header';
import { fetchProductDetail } from '@/features/products/api/product-server-api';
import ProductDetailPage from '@/features/products/detail/components/Product-detail-page';
import { createMetadata } from '@/lib/utils/metadata';

interface ProductPageProps {
  params: {
    id: string;
  };
}
/**
 * 메타데이터 생성
 */
export async function generateMetadata({ params }: ProductPageProps) {
  // 1) params를 비동기로 해제
  const { id } = await params;
  const res = await fetchProductDetail(id);
  const product = res.data;

  return createMetadata({
    title: product.title,
    description: product.contentIntroduction,
    path: `/products/${product.contentId}`,
    images: [{ url: product.thumbnailUrl, alt: product.title }],
  });
}

/**
 * 서버 컴포넌트: 데이터만 가져와서 하위 UI에 전달
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const res = await fetchProductDetail(id);
  const product = res.data;

  return (
    <>
      <WebHeader mobileBack="back" />
      <ProductDetailPage product={product} />
    </>
  );
}
