'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type {
  ProductDetailType,
  ContentReviewResponse,
} from '@/entities/product/model/product-types';
import { useUserStore } from '@/lib/store/useUserStore';
import { showToast } from '@/shared/ui/Toast';
import ProductStatusBar from './product-status-bar';
import ProductInfo from './product-info';
import ProductSaleInfo from './product-sale-info';
import ProductThumbnail from './product-thumbnail';
import ProductTabs from './product-tabs';
import PurchasePanel from './purchase-panel';
import MobilePurchaseBar from '@/components/mobile-purchase-bar';
import MobilePurchaseForm from '@/features/products/components/MobilePurchaseForm/MobilePurchaseForm';
import ViewTracker from '@/shared/components/ViewTracker';

interface Props {
  product: ProductDetailType;
  reviews: ContentReviewResponse;
}

export default function ProductDetailPage({ product, reviews }: Props) {
  // 모바일 바텀 시트 상태 관리
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();
  const { user } = useUserStore();

  // 로그인 체크 함수 (옵션 ID를 함께 전달받아 세션에 보관)
  const checkLoginAndProceed = (
    selectedOptionId: string | null,
    callback: () => void
  ) => {
    if (!user?.isLogin) {
      sessionStorage.setItem(
        'pendingPurchase',
        JSON.stringify({
          contentId: product.contentId,
          optionId: selectedOptionId ?? undefined,
          timestamp: Date.now(),
        })
      );

      showToast.warning('로그인이 필요한 서비스입니다.');
      router.push(`/auth/sign-in?redirectYn=Y`);
      return;
    }
    callback();
  };

  // 구매 로직 (모바일)
  const handlePurchase = (optionId: string) => {
    checkLoginAndProceed(optionId, () => {
      // 구매 완료 후 바텀시트 닫기
      setIsSheetOpen(false);
      // 결제 페이지로 이동
      router.push(`/products/${product.contentId}/payment/${optionId}`);
    });
  };

  // 모바일 구매 바 클릭 시 로그인 체크
  const handleOpenSheet = () => {
    checkLoginAndProceed(null, () => {
      setIsSheetOpen(true);
    });
  };

  return (
    <section className="flex w-full flex-col items-center pb-20 lg:pb-9">
      {/* 콘텐츠 조회수 추적 */}
      <ViewTracker type="content" id={String(product.contentId)} />

      <div className="flex w-full max-w-[1080px] flex-col gap-5 md:gap-9 px-5 xl:px-0 md:pt-9 ">
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
            contactInfo={product.contactInfo}
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
              onPurchaseClick={(optionId, cb) =>
                checkLoginAndProceed(optionId, cb)
              }
            />
          </div>
        </div>
      </div>

      {/* MobilePurchaseBar - lg 이하에서만 표시 (하단 플로팅) */}
      <MobilePurchaseBar onOpenSheet={handleOpenSheet} />

      {/* MobilePurchaseForm - 모바일 바텀 시트 */}
      <MobilePurchaseForm
        contentId={product.contentId}
        options={product.options}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onPurchase={handlePurchase}
      />
    </section>
  );
}
