"use client";

import { useRef, useEffect, useState } from "react";
import { ProductOption } from "@/lib/types/productType";
import ProductOptionItem from "./ProductOptionItem";
import parse from "html-react-parser"; // 추가
import Link from "next/link";

interface ProductTabsProps {
  contentIntroduction: string;
  makerIntro: string;
  options: ProductOption[];
  contentType: string;
}

export default function ProductTabs({
  contentIntroduction,
  makerIntro,
  options,
  contentType,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const makerRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const refundRef = useRef<HTMLDivElement>(null);

  const sectionRefs = [contentRef, makerRef, priceRef, refundRef];

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      // 탭 고정 처리 - 탭 컨테이너 위치에 도달했을 때부터 고정
      if (tabsContainerRef.current) {
        const containerTop =
          tabsContainerRef.current.getBoundingClientRect().top;
        setIsSticky(containerTop <= 0);
      }

      // 현재 보이는 섹션에 따라 탭 활성화
      const scrollPosition = window.scrollY + 100;

      for (let i = sectionRefs.length - 1; i >= 0; i--) {
        const ref = sectionRefs[i];
        if (ref.current && ref.current.offsetTop <= scrollPosition) {
          setActiveTab(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 특정 섹션으로 스크롤 이동
  const scrollToSection = (index: number) => {
    const ref = sectionRefs[index];
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 60, // 헤더 높이를 고려하여 조정
        behavior: "smooth",
      });
    }
    setActiveTab(index);
  };

  const tabItems = ["콘텐츠", "메이커", "가격", "환불 규정"];

  return (
    <div className="w-full">
      {/* 탭 컨테이너 - 스크롤 위치 감지용 */}
      <div ref={tabsContainerRef} className="w-full">
        {/* 탭 메뉴 */}
        <div
          ref={tabsRef}
          className={`flex w-full border-b border-line-normal ${
            isSticky ? "fixed top-0 left-0 z-10 bg-white" : ""
          }`}
        >
          <div
            className={`flex w-full max-w-[1250px] justify-between ${
              isSticky ? "mx-auto px-5 sm:px-8 lg:px-12" : ""
            }`}
          >
            {tabItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className={`flex-1 py-3 text-center text-body-2-normal font-medium transition-colors ${
                  activeTab === index
                    ? "border-b-2 border-black text-black"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* 스티키 탭이 활성화될 때 공간 확보 */}
        {isSticky && <div className="h-[45px]"></div>}
      </div>

      {/* 콘텐츠 섹션 */}
      <div ref={contentRef} className="py-8">
        <h2 className="mb-4 text-headline-1 font-semibold text-label-normal">
          콘텐츠 소개
        </h2>
        <div className="product-content whitespace-pre-wrap">
          {parse(contentIntroduction)}
        </div>
      </div>

      {/* 메이커 소개 섹션 */}
      <div ref={makerRef} className="py-8">
        <h2 className="mb-4 text-headline-1 font-semibold text-label-normal">
          메이커 소개
        </h2>
        <div className="whitespace-pre-wrap">{makerIntro}</div>
      </div>

      {/* 가격 섹션 */}
      <div ref={priceRef} className="py-8">
        <h2 className="mb-4 text-headline-1 font-semibold text-label-normal">
          가격
        </h2>

        <div className="flex w-full flex-col gap-2">
          {options.map((option, index) => (
            <ProductOptionItem key={index} option={option} />
          ))}
        </div>
      </div>

      {/* 환불 규정 섹션 */}
      <div ref={refundRef} className="py-8">
        <h2 className="text-headline-1 font-semibold text-label-normal">
          환불 규정
        </h2>
        <div className="mt-2">
          <ul className="list-disc pl-5 text-body-2-normal text-label-neutral">
            <li className="mb-2">
              콘텐츠가 제공되기 전이며, 결제일로부터 7일 이내인 경우에는 환불이
              가능합니다.
            </li>
            <li className="mb-2">
              다운로드 완료 또는 작업이 시작된 경우 환불이 불가합니다.
            </li>
            <li className="mb-2">
              콘텐츠가 분할 제공되더라도 부분 환불은 제공하지 않습니다.
            </li>
            <li className="mb-2">
              상세한 환불 규정은{" "}
              <Link
                href="https://paint-crowley-ff2.notion.site/1f2c158365ac80328c6fde9ceaf77ec6?pvs=4"
                className="underline hover:text-primary-sub-1"
              >
                이곳
              </Link>{" "}
              에서 확인해 주세요.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
