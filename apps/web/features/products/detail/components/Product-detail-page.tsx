'use client';

import { useState } from 'react';
import type {
  ProductDetailType,
  ContentReviewResponse,
} from '@/entities/product/model/product-types';
import ProductStatusBar from './product-status-bar';
import ProductInfo from './product-info';
import ProductSaleInfo from './product-sale-info';
import ProductThumbnail from './product-thumbnail';
import ProductTabs from './product-tabs';
import PurchasePanel from './purchase-panel';
import MobilePurchaseBar from '@/components/mobile-purchase-bar';
import MobilePurchaseForm from '@/features/products/components/MobilePurchaseForm/MobilePurchaseForm';

interface Props {
  product: ProductDetailType;
  reviews: ContentReviewResponse;
}

export default function ProductDetailPage({ product, reviews }: Props) {
  // 모바일 바텀 시트 상태 관리
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  console.log('product', product);

  // 구매 로직 (PC, 모바일 동일)
  const handlePurchase = (optionId: string) => {
    // 선택된 optionId를 기반으로 실제 구매 처리
    console.log('구매 처리:', optionId);
    // TODO: 실제 구매 로직 구현 (API 호출 등)

    // 구매 완료 후 바텀시트 닫기
    setIsSheetOpen(false);
  };

  return (
    <section className="flex w-full flex-col items-center pb-20 lg:pb-9">
      <div className="flex w-full max-w-[1080px] flex-col gap-9 px-5 xl:px-0 pt-9 ">
        <ProductStatusBar
          id={String(product.contentId)}
          status={product.status}
        />
        <ProductThumbnail thumbnailUrl={product.thumbnailUrl} />
        <ProductInfo
          categoryId={product.categoryId}
          contentType={product.contentType}
          title={product.title}
          sellerProfileImageUrl={product.sellerProfileImageUrl}
          sellerName={product.sellerName}
        />
        <div className="block lg:hidden">
          <ProductSaleInfo
            lowestPrice={product.lowestPrice}
            options={product.options}
            contentType={product.contentType}
          />
        </div>

        <div className="flex flex-col gap-9 lg:flex-row">
          <div className="flex-1">
            <ProductTabs
              contentIntroduction={product.contentIntroduction}
              makerIntro={product.makerIntro}
              options={product.options}
              contentType={product.contentType}
              serviceTarget={product.serviceTarget}
              serviceProcess={product.serviceProcess}
              reviews={reviews}
              contentId={String(product.contentId)}
            />
          </div>

          {/* PC PurchasePanel - xl 화면에서만 표시 */}
          <div className="hidden lg:block lg:w-auto">
            <PurchasePanel
              product={{
                contentId: product.contentId,

                title: product.title,
                lowestPrice: product.lowestPrice,
                options: product.options,
                contentType: product.contentType,
                contactInfo: product.contactInfo,
              }}
            />
          </div>
        </div>
      </div>

      {/* MobilePurchaseBar - lg 이하에서만 표시 (하단 플로팅) */}
      <MobilePurchaseBar onOpenSheet={() => setIsSheetOpen(true)} />

      {/* MobilePurchaseForm - 모바일 바텀 시트 */}
      <MobilePurchaseForm
        options={product.options}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onPurchase={handlePurchase}
      />
    </section>
  );
}
