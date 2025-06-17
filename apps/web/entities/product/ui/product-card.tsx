'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ProductCardProps } from '../model';

export default function ProductCard({
  contentId,
  thumbnailUrl,
  title,
  sellerName,
  lowestPrice,
  priceOptionLength,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${contentId}`}
      className="group flex w-full flex-col"
    >
      {/* 상품 이미지 */}
      <div
        className="relative mb-2 w-full overflow-hidden rounded-[0.8rem] border border-line-normal bg-gray-100 xl:mb-3 "
        style={{ aspectRatio: '4/3' }}
      >
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
      </div>

      {/* 상품 정보 */}
      <div className="flex flex-col space-y-[0.12rem]">
        {/* 제목 - 최대 두 줄로 제한 */}
        <h3 className="line-clamp-2 font-semibold text-label-normal text-body-2-normal">
          {title}
        </h3>

        {/* 브랜드명 */}
        <p className="text-label-1-reading lg:text-label-1-normal text-label-alternative">
          {sellerName}
        </p>

        {/* 가격 */}
        <p className="text-body-2-normal font-bold">
          {lowestPrice.toLocaleString()}
          <span className="font-medium">원</span>
          {priceOptionLength > 1 && <span className="ml-1 font-medium">~</span>}
        </p>

        {/* 평점 */}
        {/* <div className="flex items-center">
          <Star className="h-3 w-3 text-yellow-400 sm:h-3.5 sm:w-3.5 xl:h-4 xl:w-4 2xl:h-5 2xl:w-5" />
          <span className="ml-1 text-xs text-gray-500 xl:text-sm">
            {rating.toFixed(1)}
          </span>
        </div> */}
      </div>
    </Link>
  );
}
