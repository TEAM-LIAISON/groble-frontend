"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "@/components/icons/Star";

export interface ProductCardProps {
  id: string;
  imageUrl: string;
  title: string;
  brand: string;
  price: number;
  rating: number;
  href?: string;
}

export default function ProductCard({
  id,
  imageUrl,
  title,
  brand,
  price,
  rating,
  href = `/products/${id}`,
}: ProductCardProps) {
  return (
    <Link href={href} className="group flex w-full flex-col">
      {/* 상품 이미지 */}
      <div className="relative mb-2 aspect-[4/3] w-full max-w-[180px] overflow-hidden rounded-lg bg-gray-100 md:max-w-none xl:mb-3 2xl:mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          // sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 상품 정보 */}
      <div className="flex max-w-[180px] flex-col space-y-1 md:max-w-none xl:space-y-1.5 2xl:space-y-2">
        {/* 제목 - 최대 두 줄로 제한 */}
        <h3 className="line-clamp-2 text-sm font-medium sm:text-label-1-normal xl:text-base 2xl:text-lg">
          {title}
        </h3>

        {/* 브랜드명 */}
        <p className="text-xs text-label-alternative xl:text-sm">{brand}</p>

        {/* 가격 */}
        <p className="text-sm font-bold sm:text-label-1-normal xl:text-base 2xl:text-lg">
          {price.toLocaleString()}
          <span className="font-medium">원</span>
        </p>

        {/* 평점 */}
        <div className="flex items-center">
          <Star className="h-3 w-3 text-yellow-400 sm:h-3.5 sm:w-3.5 xl:h-4 xl:w-4 2xl:h-5 2xl:w-5" />
          <span className="ml-1 text-xs text-gray-500 xl:text-sm">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
