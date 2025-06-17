'use client';

import React, { useRef, useState } from 'react';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import Link from 'next/link';
import ProductOptionItem from '@/features/products/detail/components/product-option-item';
import type { ProductDetailType } from '@/entities/product/model';
import '@/styles/tiptap-common.css';

export type ProductTabsProps = Pick<
  ProductDetailType,
  'contentIntroduction' | 'makerIntro' | 'options' | 'contentType'
>;

export default function ProductTabs({
  contentIntroduction,
  makerIntro,
  options,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const makerRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const refundRef = useRef<HTMLDivElement>(null);

  const sectionRefs = [contentRef, makerRef, priceRef, refundRef] as const;

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

  const tabItems = ['콘텐츠 소개', '상세 설명', '가격 정보', '환불 규정'];

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
              {item}
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
              상세한 환불 규정은{' '}
              <Link
                href="https://paint-crowley-ff2.notion.site/1f2c158365ac80328c6fde9ceaf77ec6?pvs=4"
                className="underline hover:text-primary-sub-1"
              >
                이곳
              </Link>{' '}
              에서 확인해 주세요.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
