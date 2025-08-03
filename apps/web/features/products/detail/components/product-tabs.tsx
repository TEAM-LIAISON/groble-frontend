'use client';

import type {
  ContentReviewResponse,
  ProductDetailType,
} from '@/entities/product/model';
import ReviewSection from '@/features/products/detail/components/ReviewSection';
import ProductOptionItem from '@/features/products/detail/components/product-option-item';
import parse, { type HTMLReactParserOptions, Element } from 'html-react-parser';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import '@/styles/tiptap-common.css';

export type ProductTabsProps = Pick<
  ProductDetailType,
  | 'contentIntroduction'
  | 'makerIntro'
  | 'options'
  | 'contentType'
  | 'serviceTarget'
  | 'serviceProcess'
> & {
  reviews: ContentReviewResponse;
  contentId: string;
};

export default function ProductTabs({
  contentIntroduction,
  makerIntro,
  options,
  serviceTarget,
  serviceProcess,
  reviews,
  contentId,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const makerRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  const sectionRefs = [contentRef, makerRef, priceRef, reviewRef] as const;

  const parseOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        const { name, attribs } = domNode;
        if (name === 'img') {
          const { title, class: className, style, ...otherProps } = attribs;
          let styleObj = {};
          if (style && typeof style === 'string') {
            try {
              const styles = style.split(';').filter(Boolean);
              styleObj = styles.reduce((acc: any, rule: string) => {
                const [property, value] = rule.split(':').map((s) => s.trim());
                if (property && value) {
                  const camelProperty = property.replace(/-([a-z])/g, (g) =>
                    g[1].toUpperCase()
                  );
                  acc[camelProperty] = value;
                }
                return acc;
              }, {});
            } catch {
              styleObj = {};
            }
          }
          return (
            <img
              {...otherProps}
              className={
                className ? `${className} resizable-image` : 'resizable-image'
              }
              style={styleObj}
              alt={otherProps.alt || ''}
            />
          );
        }
        if (name === 'a') {
          return {
            ...domNode,
            attribs: {
              ...attribs,
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          };
        }
      }
      return domNode;
    },
  };

  const scrollToSection = (index: number) => {
    const ref = sectionRefs[index];
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 60,
        behavior: 'smooth',
      });
    }
    setActiveTab(index);
  };

  const tabItems = ['콘텐츠 소개', '상세 설명', '가격 정보', '리뷰'];
  const tabItemsShort = ['콘텐츠', '상세', '가격', '리뷰'];

  return (
    <div className="flex-1">
      {/* 탭 메뉴 (CSS Sticky) */}
      <div className="sticky top-0 z-10 border-b-[1.5px] border-line-normal bg-white lg:bg-transparent">
        <div className="grid w-full grid-cols-4 lg:sticky lg:top-0 lg:z-10 lg:bg-white">
          {tabItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(idx)}
              className={`cursor-pointer py-2 text-center text-headline-1 font-semibold transition-colors ${
                activeTab === idx
                  ? 'border-b-2 border-label-normal text-label-normal'
                  : 'text-label-assistive hover:text-gray-600'
              }`}
            >
              {/* 모바일에서는 짧은 버전 표시 */}
              <span className="block md:hidden">{tabItemsShort[idx]}</span>
              {/* 데스크탑에서는 긴 버전 표시 */}
              <span className="hidden md:block">{item}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 콘텐츠 섹션 */}
      <div ref={contentRef} className="mt-9">
        <h2 className="mb-4 text-headline-1 font-semibold text-label-normal">
          콘텐츠 소개
        </h2>
        <div className="simple-editor-content">
          <div className="tiptap ProseMirror">
            {contentIntroduction && parse(contentIntroduction, parseOptions)}
          </div>
        </div>
      </div>

      {/* 서비스 타겟 섹션 */}
      <div ref={makerRef} className="mt-9">
        <h2 className="mb-1 text-headline-1 font-semibold text-label-normal">
          서비스 타겟
        </h2>
        <div className="text-body-2-reading text-label-neutral whitespace-pre-line">
          {serviceTarget}
        </div>
      </div>

      {/* 제공 절차 섹션 */}
      <div className="mt-9">
        <h2 className="mb-1 text-headline-1 font-semibold text-label-normal">
          제공 절차
        </h2>
        <div className="text-body-2-reading text-label-neutral whitespace-pre-line">
          {serviceProcess}
        </div>
      </div>

      {/* 메이커 소개 섹션 */}
      <div className="mt-9">
        <h2 className="mb-1 text-headline-1 font-semibold text-label-normal">
          메이커 소개
        </h2>
        <div className="">
          <div className="text-body-2-reading text-label-neutral whitespace-pre-line">
            {makerIntro}
          </div>
        </div>
      </div>

      {/* 가격 정보 섹션 (가격 + 환불 규정 통합) */}
      <div ref={priceRef} className="py-8">
        <h2 className="mb-[0.38rem] text-headline-1 font-semibold text-label-normal">
          가격 정보
        </h2>
        <div className="flex w-full flex-col gap-2">
          {options.map((option, i) => (
            <ProductOptionItem
              key={i}
              optionId={option.optionId}
              name={option.name}
              description={option.description}
              price={option.price}
            />
          ))}
        </div>

        {/* 환불 규정 섹션 */}
        <div className="mt-8">
          <h3 className="mb-2 text-headline-1 font-semibold text-label-normal">
            환불 규정
          </h3>
          <div className="mt-1">
            <ul className="list-disc pl-5 text-body-2-reading text-label-neutral">
              <li className="mb-1">
                콘텐츠 유형에 따라 환불 기준이 달라집니다.
              </li>
              <li className="mb-1">
                즉시 다운로드형 콘텐츠는 원칙적으로 환불이 불가합니다.
              </li>
              <li className="mb-1">
                작업 후 제공형 콘텐츠는 작업 시작 전까지 환불이 가능합니다.
              </li>
              <li className="mb-1">
                일정 협의형 콘텐츠(강의·컨설팅, 제작·대행)는 콘텐츠 제공
                전까지만 환불이 가능하며,
                <br /> 진행 단계에 따라 메이커와 협의 후 환불 여부가 결정됩니다.
              </li>
              <li className="mb-1">
                콘텐츠가 분할 제공되더라도 부분 환불은 제공되지 않습니다.{' '}
              </li>

              <li className="mb-1">
                상세한 환불 규정은{' '}
                <Link
                  href="https://paint-crowley-ff2.notion.site/1f2c158365ac80328c6fde9ceaf77ec6?pvs=4"
                  className="underline hover:text-primary-sub-1 "
                >
                  이곳
                </Link>{' '}
                에서 확인해 주세요.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 리뷰 섹션 */}
      <div ref={reviewRef}>
        <ReviewSection initialReviews={reviews} contentId={contentId} />
      </div>
    </div>
  );
}
