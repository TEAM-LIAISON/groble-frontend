import WebHeader from '@/components/(improvement)/layout/header';
import {
  fetchProductDetail,
  fetchContentReviews,
} from '@/features/products/api/product-server-api';
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
 * 서버 컴포넌트: 초기 로딩 속도 향상을 위한 SSR 데이터 패칭
 * - 상품 정보: 필수 데이터
 * - 리뷰 정보: 기본 정렬(LATEST)만 SSR로 제공, 다른 정렬은 CSR에서 처리
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  // 병렬로 데이터 패칭 - 초기 로딩 속도 최적화
  const [productRes, reviewsRes] = await Promise.all([
    fetchProductDetail(id),
    fetchContentReviews(id), // 기본 정렬(LATEST)로 SSR 제공
  ]);

  const product = productRes.data;
  const reviews = reviewsRes.data;
  console.log(product);

  return (
    <>
      <WebHeader mobileBack="back" />
      <ProductDetailPage product={product} reviews={reviews} />
    </>
  );
}
