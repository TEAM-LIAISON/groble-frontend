"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import Link from "next/link";
import ProductOptionItem from "@/features/products/detail/components/product-option-item";
import { ProductDetailType } from "@/entities/product/model";

// Tiptap 에디터 스타일 import
import "@/components/(improvement)/editor/tiptap-templates/simple/simple-editor.scss";
import "@/components/(improvement)/editor/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/(improvement)/editor/tiptap-node/list-node/list-node.scss";
import "@/components/(improvement)/editor/tiptap-node/image-node/image-node.scss";
import "@/components/(improvement)/editor/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/components/(improvement)/editor/tiptap-node/table-node/table-node.scss";
import "@/styles/tiptap-custom.module.css";

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
  const [originalDimensions, setOriginalDimensions] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const makerRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const refundRef = useRef<HTMLDivElement>(null);
  const stickyTopRef = useRef(0);
  const hasCalculatedRef = useRef(false);

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

  // 초기 탭 위치와 크기 계산 - 마운트 시와 리사이즈 시에만 실행
  useLayoutEffect(() => {
    const calculateStickyPosition = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        stickyTopRef.current = rect.top + scrollTop;
        setOriginalDimensions({
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top + scrollTop,
        });
        hasCalculatedRef.current = true;
      }
    };

    calculateStickyPosition();

    const handleResize = () => {
      calculateStickyPosition();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      if (!hasCalculatedRef.current) return;

      // 탭 고정 처리 - 원래 탭 위치에 도달했을 때부터 고정
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsSticky(scrollTop >= stickyTopRef.current);

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

    handleScroll(); // 초기 실행

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
    <div
      className="mt-9 flex-1"
      // style={{ width: "calc(100% - 22.8rem - 2.25rem)" }}
    >
      {/* 탭 컨테이너 - 스크롤 위치 감지용 */}
      <div ref={tabsContainerRef} className="w-full">
        {/* 탭 메뉴 */}
        <div
          ref={tabsRef}
          className={`border-b border-line-normal transition-all duration-300 ${
            isSticky ? "fixed top-0 z-10 bg-white" : ""
          }`}
          style={
            isSticky
              ? {
                  width: `${originalDimensions.width}px`,
                  left: `${originalDimensions.left}px`,
                }
              : {}
          }
        >
          <div className="grid w-full grid-cols-4">
            {tabItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className={`cursor-pointer py-3 text-center text-headline-1 font-medium transition-colors ${
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

        {/* 스티키 탭이 활성화될 때 레이아웃 유지를 위한 플레이스홀더 */}
        {isSticky && (
          <div
            className="border-b border-line-normal"
            style={{ height: `${originalDimensions.height}px` }}
          />
        )}
      </div>

      {/* 콘텐츠 섹션 */}
      <div ref={contentRef} className="mt-9">
        <h2 className="mb-4 text-headline-1 font-semibold text-label-normal">
          콘텐츠 소개
        </h2>
        {/* 에디터와 정확히 동일한 클래스 구조 적용 */}
        <div className="simple-editor-content">
          <div className="tiptap ProseMirror">
            {contentIntroduction && parse(contentIntroduction, parseOptions)}
          </div>
        </div>

        {/* 에디터 스타일 완전 복제 */}
        <style jsx global>{`
          /* 에디터 기본 스타일 */
          .simple-editor-content .tiptap.ProseMirror {
            line-height: 1.6 !important;
            overflow: visible;
            box-sizing: border-box;
            white-space: pre-wrap;
            outline: none;
          }

          /* 문단 스타일 - 줄 높이 개선 */
          .simple-editor-content .tiptap.ProseMirror p {
            margin: 0 0 0.8em !important;
            line-height: 1.7 !important;
          }

          .simple-editor-content .tiptap.ProseMirror p:not(:first-child) {
            font-size: 1rem;
            line-height: 1.7;
            font-weight: normal;
            margin-top: 20px;
          }

          /* 헤딩 스타일 - 에디터와 동일 */
          .simple-editor-content .tiptap.ProseMirror h1,
          .simple-editor-content .tiptap.ProseMirror h2,
          .simple-editor-content .tiptap.ProseMirror h3,
          .simple-editor-content .tiptap.ProseMirror h4 {
            position: relative;
            color: inherit;
            font-style: inherit;
            line-height: 1.5 !important;
          }

          .simple-editor-content .tiptap.ProseMirror h1:first-child,
          .simple-editor-content .tiptap.ProseMirror h2:first-child,
          .simple-editor-content .tiptap.ProseMirror h3:first-child,
          .simple-editor-content .tiptap.ProseMirror h4:first-child {
            margin-top: 0;
          }

          .simple-editor-content .tiptap.ProseMirror h1 {
            font-size: 1.5em;
            font-weight: 700;
            margin-top: 3em;
          }

          .simple-editor-content .tiptap.ProseMirror h2 {
            font-size: 1.25em;
            font-weight: 700;
            margin-top: 2.5em;
          }

          .simple-editor-content .tiptap.ProseMirror h3 {
            font-size: 1.125em;
            font-weight: 600;
            margin-top: 2em;
          }

          .simple-editor-content .tiptap.ProseMirror h4 {
            font-size: 1em;
            font-weight: 600;
            margin-top: 2em;
          }

          /* 리스트 스타일 - 줄 높이 개선 */
          .simple-editor-content .tiptap.ProseMirror ol,
          .simple-editor-content .tiptap.ProseMirror ul {
            margin-top: 1.5em;
            margin-bottom: 1.5em;
            padding-left: 1.5em;
            line-height: 1.7 !important;
          }

          .simple-editor-content .tiptap.ProseMirror ol:first-child,
          .simple-editor-content .tiptap.ProseMirror ul:first-child {
            margin-top: 0;
          }

          .simple-editor-content .tiptap.ProseMirror ol:last-child,
          .simple-editor-content .tiptap.ProseMirror ul:last-child {
            margin-bottom: 0;
          }

          .simple-editor-content .tiptap.ProseMirror ol ol,
          .simple-editor-content .tiptap.ProseMirror ol ul,
          .simple-editor-content .tiptap.ProseMirror ul ol,
          .simple-editor-content .tiptap.ProseMirror ul ul {
            margin-top: 0;
            margin-bottom: 0;
          }

          .simple-editor-content .tiptap.ProseMirror li {
            line-height: 1.7 !important;
            margin-bottom: 0.3em;
          }

          .simple-editor-content .tiptap.ProseMirror li p {
            margin-top: 0;
            line-height: 1.7 !important;
          }

          .simple-editor-content .tiptap.ProseMirror ol {
            list-style: decimal;
          }

          .simple-editor-content .tiptap.ProseMirror ol ol {
            list-style: lower-alpha;
          }

          .simple-editor-content .tiptap.ProseMirror ol ol ol {
            list-style: lower-roman;
          }

          .simple-editor-content
            .tiptap.ProseMirror
            ul:not([data-type="taskList"]) {
            list-style: disc;
          }

          .simple-editor-content .tiptap.ProseMirror ul ul {
            list-style: circle;
          }

          .simple-editor-content .tiptap.ProseMirror ul ul ul {
            list-style: disc;
          }

          /* Blockquote 스타일 - 줄 높이 개선 */
          .simple-editor-content .tiptap.ProseMirror blockquote {
            position: relative;
            padding-left: 1em;
            padding-top: 0.375em;
            padding-bottom: 0.375em;
            margin: 1.5rem 0;
            line-height: 1.6 !important;
          }

          .simple-editor-content .tiptap.ProseMirror blockquote p {
            margin-top: 0;
            line-height: 1.6 !important;
          }

          .simple-editor-content .tiptap.ProseMirror blockquote::before,
          .simple-editor-content
            .tiptap.ProseMirror
            blockquote.is-empty::before {
            position: absolute;
            bottom: 0;
            left: 0;
            top: 0;
            height: 100%;
            width: 0.25em;
            background-color: #6b7280;
            content: "";
            border-radius: 0;
          }

          /* 수평선 스타일 - 에디터와 동일 */
          .simple-editor-content .tiptap.ProseMirror hr {
            margin-top: 3em;
            margin-bottom: 3em;
            border: none;
            height: 1px;
            background-color: #e5e7eb;
          }

          /* 링크 스타일 - 에디터와 동일 */
          .simple-editor-content .tiptap.ProseMirror a {
            color: #3b82f6;
            text-decoration: underline;
          }

          /* 이미지 스타일 - 커서와 호버 효과 제거 */
          .simple-editor-content img.resizable-image {
            display: block !important;
            width: auto !important;
            max-width: 100% !important;
            height: auto !important;
            object-fit: contain !important;
            margin: 0.8em 0;
            min-width: 50px;
            border: none !important;
            cursor: default !important;
            transition: none !important;
          }

          /* 이미지 호버 효과 완전 제거 */
          .simple-editor-content img.resizable-image:hover {
            border: none !important;
            cursor: default !important;
          }

          /* 표(Table) 스타일 - 에디터와 동일 */
          .simple-editor-content .tiptap.ProseMirror table {
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%;
            overflow: hidden;
            table-layout: fixed;
            margin: 1.5rem 0;
            border: 1px solid #e5e7eb;
          }

          .simple-editor-content .tiptap.ProseMirror table td,
          .simple-editor-content .tiptap.ProseMirror table th {
            min-width: 1em;
            border: 1px solid #e5e7eb;
            padding: 8px 12px;
            vertical-align: top;
            box-sizing: border-box;
            position: relative;
            background-color: transparent;
          }

          .simple-editor-content .tiptap.ProseMirror table th {
            font-weight: 600;
            background-color: transparent;
            text-align: left;
          }

          .simple-editor-content .tiptap.ProseMirror table .selectedCell:after {
            z-index: 2;
            position: absolute;
            content: "";
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: rgba(59, 130, 246, 0.1);
            pointer-events: none;
          }

          .simple-editor-content
            .tiptap.ProseMirror
            table
            .column-resize-handle {
            position: absolute;
            right: -2px;
            top: 0;
            bottom: -2px;
            width: 4px;
            background-color: #3b82f6;
            pointer-events: none;
          }

          .simple-editor-content .tiptap.ProseMirror table p {
            margin: 0;
            line-height: 1.5 !important;
          }

          /* 다크 모드 지원 */
          @media (prefers-color-scheme: dark) {
            .simple-editor-content .tiptap.ProseMirror table {
              border-color: #374151;
            }

            .simple-editor-content .tiptap.ProseMirror table td,
            .simple-editor-content .tiptap.ProseMirror table th {
              border-color: #374151;
              background-color: transparent;
            }

            .simple-editor-content .tiptap.ProseMirror table th {
              background-color: transparent;
            }
          }
        `}</style>
      </div>

      {/* 메이커 소개 섹션 */}
      <div ref={makerRef} className="py-8">
        <h2 className="mb-4 text-headline-1 font-semibold text-label-normal">
          메이커 소개
        </h2>
        <div className="simple-editor-content">
          <div className="tiptap ProseMirror">
            {makerIntro && parse(makerIntro, parseOptions)}
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
