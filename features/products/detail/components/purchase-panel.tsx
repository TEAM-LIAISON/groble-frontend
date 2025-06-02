"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Button from "@/components/button";
import type { ProductDetailType } from "@/entities/product/model/product-types";

interface PurchasePanelProps {
  product: Pick<ProductDetailType, "title" | "lowestPrice" | "options">;
}

export default function PurchasePanel({ product }: PurchasePanelProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [originalDimensions, setOriginalDimensions] = useState({
    width: 0,
    height: 0,
    left: 0,
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const stickyThresholdRef = useRef(0);
  const hasCalculatedRef = useRef(false);

  // 초기 위치와 크기 계산 - 마운트 시와 리사이즈 시에만 실행
  useLayoutEffect(() => {
    const calculatePosition = () => {
      if (panelRef.current) {
        const rect = panelRef.current.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        setOriginalDimensions({
          width: rect.width,
          height: rect.height,
          left: rect.left,
        });

        // 리모컨이 화면 상단에서 36px(top-9) 위치에 오게 되는 스크롤 지점 계산
        stickyThresholdRef.current = rect.top + scrollTop - 36;
        hasCalculatedRef.current = true;
      }
    };

    calculatePosition();

    const handleResize = () => {
      calculatePosition();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 스크롤 이벤트 핸들러 - stickyThreshold 의존성 제거
  useEffect(() => {
    const handleScroll = () => {
      if (!hasCalculatedRef.current) return;

      const currentScroll = window.scrollY;
      // 리모컨이 실제로 가려질 시점에 sticky 활성화 (PC에서만)
      const shouldBeSticky =
        currentScroll >= stickyThresholdRef.current &&
        window.innerWidth >= 1024;
      setIsSticky(shouldBeSticky);
    };

    handleScroll(); // 초기 실행

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 의존성 배열에서 stickyThreshold 제거

  return (
    <>
      <div
        ref={panelRef}
        className={`w-[22.8rem] transition-all duration-300 ${
          isSticky ? `fixed top-9 z-20` : "relative mt-9"
        }`}
        style={
          isSticky
            ? {
                left: `${originalDimensions.left}px`,
                width: `${originalDimensions.width}px`,
              }
            : {}
        }
      >
        <div className="rounded-xl border border-line-normal bg-white p-5 shadow-sm">
          {/* 헤더 */}
          <div className="mb-4">
            <h2 className="mb-2 text-headline-1 font-semibold text-label-normal">
              콘텐츠 정보
            </h2>
            <p className="line-clamp-2 text-body-2-normal text-label-neutral">
              {product.title}
            </p>
          </div>

          {/* 가격 정보 */}
          <div className="mb-4 rounded-lg bg-background-normal p-3">
            <div className="flex items-center justify-between">
              <span className="text-body-2-normal text-label-neutral">
                최저 가격
              </span>
              <span className="text-headline-1 font-semibold text-label-normal">
                ₩{product.lowestPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* 옵션 개수 */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-body-2-normal">
              <span className="text-label-neutral">구매 옵션</span>
              <span className="font-medium text-label-normal">
                {product.options.length}개 옵션
              </span>
            </div>
          </div>

          {/* 구매 버튼들 */}
          <div className="space-y-3">
            <Button
              group="solid"
              type="secondary"
              size="large"
              buttonType="button"
              className="w-full"
            >
              문의하기
            </Button>
            <Button
              group="solid"
              type="primary"
              size="large"
              buttonType="button"
              className="w-full"
            >
              구매하기
            </Button>
          </div>
        </div>
      </div>

      {/* 스티키 패널이 활성화될 때 레이아웃 유지를 위한 플레이스홀더 */}
      {isSticky && (
        <div
          className="mt-9 w-[22.8rem]"
          style={{ height: `${originalDimensions.height}px` }}
        />
      )}
    </>
  );
}
