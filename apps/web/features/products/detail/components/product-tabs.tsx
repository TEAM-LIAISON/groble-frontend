"use client";

import { useRef, useEffect, useState } from "react";
import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import Link from "next/link";
import ProductOptionItem from "@/features/products/detail/components/product-option-item";
import { ProductDetailType } from "@/entities/product/model";

// Tiptap 에디터 스타일 import

export type ProductTabsProps = Pick<
  ProductDetailType,
  "contentIntroduction" | "makerIntro" | "options" | "contentType"
>;

export default function ProductTabs({
  contentIntroduction,
  makerIntro,
  options,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const makerRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const refundRef = useRef<HTMLDivElement>(null);

  const sectionRefs = [contentRef, makerRef, priceRef, refundRef] as const;

  // HTML 파싱 옵션 - 에디터 스타일 동기화
  const parseOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        const { name, attribs } = domNode;

        // 이미지는 그대로 두되 에디터와 동일한 클래스 적용
        if (name === "img") {
          const { title, class: className, style, ...otherProps } = attribs;

          // style 속성이 문자열인 경우 React 스타일 객체로 변환
          let styleObj = {};
          if (style && typeof style === "string") {
            try {
              // CSS 문자열을 React 스타일 객체로 변환
              const styles = style.split(";").filter(Boolean);
              styleObj = styles.reduce((acc: any, rule: string) => {
                const [property, value] = rule.split(":").map((s) => s.trim());
                if (property && value) {
                  // CSS 속성명을 camelCase로 변환 (예: background-color -> backgroundColor)
                  const camelProperty = property.replace(/-([a-z])/g, (g) =>
                    g[1].toUpperCase(),
                  );
                  acc[camelProperty] = value;
                }
                return acc;
              }, {});
            } catch (error) {
              console.warn("Failed to parse style attribute:", style);
              styleObj = {};
            }
          }

          return (
            <img
              {...otherProps}
              className={
                className ? `${className} resizable-image` : "resizable-image"
              }
              style={styleObj}
              alt={otherProps.alt || ""}
            />
          );
        }

        // 다른 요소들은 에디터와 동일한 방식으로 처리
        if (name === "a") {
          return {
            ...domNode,
            attribs: {
              ...attribs,
              target: "_blank",
              rel: "noopener noreferrer",
            },
          };
        }
      }

      // 기본 요소는 그대로 반환 (에디터와 동일한 HTML 구조 유지)
      return domNode;
    },
  };

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
    <div className="mt-9 w-full">
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
                className={`flex-1 cursor-pointer py-3 text-center text-headline-1 font-medium transition-colors ${
                  activeTab === index
                    ? "border-b-2 border-label-normal text-label-normal"
                    : "text-label-assistive hover:text-gray-600"
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
      <div ref={contentRef} className="mt-9">
        <h2 className="mb-4 text-headline-1 font-semibold text-label-normal">
          콘텐츠 소개
        </h2>
        {/* 에디터와 정확히 동일한 클래스 구조 적용 */}
        <div className="editor-container">
          <div className="content-wrapper">
            <div className="simple-editor-content">
              <div className="tiptap ProseMirror">
                {contentIntroduction &&
                  parse(contentIntroduction, parseOptions)}
              </div>
            </div>
          </div>
        </div>

        {/* 콘텐츠 표시용 에디터 스타일 재정의 */}
        <style jsx global>{`
          /* 콘텐츠 표시용: 에디터 컨테이너 높이 제한 제거 */
          .editor-container {
            height: auto !important;
            border: none !important;
            background: transparent !important;
            line-height: 1.7 !important;
          }

          .content-wrapper {
            max-height: none !important;
            height: auto !important;
            overflow: visible !important;
            padding: 0 !important;
            line-height: 1.7 !important;
          }

          .simple-editor-content {
            height: auto !important;
          }

          /* 일반 p 태그 스타일 */
          .simple-editor-content .tiptap.ProseMirror p {
            display: block;
            line-height: 1.7 !important;
          }

          /* 빈 p 태그 스타일 */
          .simple-editor-content .tiptap.ProseMirror p:empty {
            min-height: 1.7em;
          }
        `}</style>
      </div>

      {/* 메이커 소개 섹션 */}
      <div ref={makerRef} className="py-8">
        <h2 className="mb-4 text-headline-1 font-semibold text-label-normal">
          메이커 소개
        </h2>
        <div className="editor-container">
          <div className="content-wrapper">
            <div className="simple-editor-content">
              <div className="tiptap ProseMirror">
                {makerIntro && parse(makerIntro, parseOptions)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 가격 섹션 */}
      <div ref={priceRef} className="py-8">
        <h2 className="mb-4 text-headline-1 font-semibold text-label-normal">
          가격
        </h2>

        <div className="flex w-full flex-col gap-2">
          {options.map((option, index) => (
            <ProductOptionItem
              key={index}
              optionId={option.optionId}
              name={option.name}
              description={option.description}
              price={option.price}
            />
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
