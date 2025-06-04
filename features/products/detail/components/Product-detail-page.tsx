"use client";

import type { ProductDetailType } from "@/entities/product/model/product-types";
import ProductStatusBar from "./product-status-bar";
import ProductInfo from "./product-info";
import ProductSaleInfo from "./product-sale-info";
import ProductThumbnail from "./product-thumbnail";
import ProductTabs from "./product-tabs";
import PurchasePanel from "./purchase-panel";

interface Props {
  product: ProductDetailType;
}

export default function ProductDetailPage({ product }: Props) {
  return (
    <section className="flex w-full flex-col items-center pb-20">
      <div className="flex w-full max-w-[1250px] flex-col gap-9 px-5 pt-9 sm:px-8 lg:px-12">
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
        <ProductSaleInfo
          lowestPrice={product.lowestPrice}
          options={product.options}
          contentType={product.contentType}
        />

        <div className="flex flex-col gap-9 lg:flex-row">
          <div className="flex-1">
            <ProductTabs
              contentIntroduction={product.contentIntroduction}
              makerIntro={product.makerIntro}
              options={product.options}
              contentType={product.contentType}
            />
          </div>

          <div className="lg:w-auto">
            <PurchasePanel
              product={{
                title: product.title,
                lowestPrice: product.lowestPrice,
                options: product.options,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
