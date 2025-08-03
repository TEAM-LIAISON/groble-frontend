'use client';

import { ChevronIcon } from '@/components/(improvement)/icons';
import type React from 'react';
import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// 간단한 텍스트 파싱 함수
const parseContent = (content: string) => {
  const lines = content.split('\n');

  return lines.map((line, lineIndex) => {
    if (line.trim() === '') {
      return <br key={lineIndex} />;
    }

    const parts: React.ReactNode[] = [];
    let remainingText = line;

    // 링크 처리 [텍스트](URL)
    while (true) {
      const linkStart = remainingText.indexOf('[');
      if (linkStart === -1) break;

      const linkTextEnd = remainingText.indexOf('](', linkStart);
      const linkUrlEnd = remainingText.indexOf(')', linkTextEnd);

      if (linkTextEnd === -1 || linkUrlEnd === -1) break;

      // 링크 전 텍스트
      if (linkStart > 0) {
        parts.push(remainingText.substring(0, linkStart));
      }

      // 링크 요소
      const linkText = remainingText.substring(linkStart + 1, linkTextEnd);
      const linkUrl = remainingText.substring(linkTextEnd + 2, linkUrlEnd);

      parts.push(
        <a
          key={`link-${lineIndex}-${parts.length}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-500 hover:text-primary-600 underline transition-colors"
        >
          {linkText}
        </a>
      );

      remainingText = remainingText.substring(linkUrlEnd + 1);
    }

    // 남은 텍스트가 있으면 추가
    if (remainingText) {
      parts.push(remainingText);
    }

    // 전체 라인을 다시 파싱해서 볼드와 이탤릭 처리
    const finalParts = parts.flatMap((part, index) => {
      if (typeof part === 'string') {
        return parseTextStyles(part, lineIndex, index);
      }
      return part;
    });

    return (
      <span key={lineIndex}>
        {finalParts.length > 0 ? finalParts : line}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    );
  });
};

// 볼드와 이탤릭 스타일 파싱
const parseTextStyles = (
  text: string,
  lineIndex: number,
  partIndex: number
) => {
  const parts: React.ReactNode[] = [];
  let remainingText = text;

  // 볼드 처리 **텍스트**
  while (true) {
    const boldStart = remainingText.indexOf('**');
    if (boldStart === -1) break;

    const boldEnd = remainingText.indexOf('**', boldStart + 2);
    if (boldEnd === -1) break;

    // 볼드 전 텍스트
    if (boldStart > 0) {
      const beforeText = remainingText.substring(0, boldStart);
      // 이탤릭 파싱
      parts.push(
        ...parseItalicText(beforeText, lineIndex, partIndex, parts.length)
      );
    }

    // 볼드 텍스트
    const boldText = remainingText.substring(boldStart + 2, boldEnd);
    parts.push(
      <strong
        key={`bold-${lineIndex}-${partIndex}-${parts.length}`}
        className="font-bold"
      >
        {boldText}
      </strong>
    );

    remainingText = remainingText.substring(boldEnd + 2);
  }

  // 남은 텍스트가 있으면 이탤릭 파싱
  if (remainingText) {
    parts.push(
      ...parseItalicText(remainingText, lineIndex, partIndex, parts.length)
    );
  }

  return parts.length > 0 ? parts : [text];
};

// 이탤릭 파싱
const parseItalicText = (
  text: string,
  lineIndex: number,
  partIndex: number,
  baseIndex: number
) => {
  const parts: React.ReactNode[] = [];
  let remainingText = text;

  while (true) {
    const italicStart = remainingText.indexOf('*');
    if (italicStart === -1) break;

    const italicEnd = remainingText.indexOf('*', italicStart + 1);
    if (italicEnd === -1) break;

    // 이탤릭 전 텍스트
    if (italicStart > 0) {
      parts.push(remainingText.substring(0, italicStart));
    }

    // 이탤릭 텍스트
    const italicText = remainingText.substring(italicStart + 1, italicEnd);
    parts.push(
      <em
        key={`italic-${lineIndex}-${partIndex}-${baseIndex}-${parts.length}`}
        className="italic"
      >
        {italicText}
      </em>
    );

    remainingText = remainingText.substring(italicEnd + 1);
  }

  // 남은 텍스트
  if (remainingText) {
    parts.push(remainingText);
  }

  return parts.length > 0 ? parts : [text];
};

const faqData: FAQItem[] = [
  {
    id: 1,
    question: '그로블의 메이커로 활동하고 싶은데 별도의 가입비가 있나요?',
    answer:
      '그로블은 별도의 가입비 없이 메이커로 활동할 수 있습니다. 메이커님이 가진 전문성을 바탕으로 수익을 창출해 보세요!',
  },
  {
    id: 2,
    question: '사업자를 보유하고 있지 않더라도 판매가 가능한가요?',
    answer:
      '네, 그로블은 사업자를 보유하지 않은 개인도 판매가 가능합니다. \n다만, 지속적인 수익이 발생하는 경우에는 세금 신고 및 정산 이슈를 고려해 사업자 등록을 권장드립니다.',
  },
  {
    id: 3,
    question: '무료 콘텐츠도 등록 가능한가요?',
    answer:
      '네, 무료 콘텐츠도 등록이 가능하며 브랜딩 및 데이터 분석 콘텐츠로 활용하실 수 있습니다!',
  },
  {
    id: 4,
    question: '가입은 완료했는데 상품 등록을 어떻게 해야 할 지 모르겠어요',
    answer:
      '상품 등록에 어려움이 있는 메이커 분들은 아래 링크를 참고해 보세요.\n만약 추가적인 어려움이 있을 경우, **채널톡**으로 문의해 주시면 담당자가 상담을 진행해 드릴게요\n · [자료 업로드 가이드](https://paint-crowley-ff2.notion.site/1f7c158365ac8050b4f2e82c9ca3be79?pvs=74)\n· [코칭 업로드 가이드](https://paint-crowley-ff2.notion.site/1f3c158365ac802bae81d2f09f9bfd91?pvs=74)',
  },
  {
    id: 5,
    question: '판매가 이루어졌는데 정산은 어떻게 받을 수 있나요?',
    answer:
      '먼저, 판매가 이루어 지신 것을 축하드립니다! 정산의 경우 매달 말 일 진행되며, 영업일이 아닐 경우 그 다음날 진행됩니다.\n 더 빠른 정산이 필요하신 분들은 채널톡으로 문의해 주세요.',
  },
];

export default function FaqSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-title-3 md:text-title-2 font-bold text-label-normal relative mb-8">
        자주 묻는 질문
      </h2>

      <div className="flex flex-col gap-5">
        {faqData.map((item) => {
          const isOpen = openItems.includes(item.id);

          return (
            <div key={item.id} className=" overflow-hidden">
              {/* 질문 부분 */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex md:items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="25"
                    viewBox="0 0 21 25"
                    fill="none"
                    className={`transition-transform duration-200 ${
                      isOpen ? 'rotate-90' : 'rotate-0'
                    }`}
                  >
                    <path
                      d="M15.7895 11.6168C16.0702 11.7871 16.0702 12.2129 15.7895 12.3832L6.63158 17.9401C6.35088 18.1104 6 17.8975 6 17.5568L6 6.44317C6 6.10253 6.35088 5.88962 6.63158 6.05995L15.7895 11.6168Z"
                      fill="#171717"
                    />
                  </svg>

                  <span className="text-body-1-normal font-bold text-label-normal">
                    {item.question}
                  </span>
                </div>
              </button>

              {/* 답변 부분 */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-7 pt-2">
                  <div className="text-body-1-normal text-label-normal leading-relaxed">
                    {parseContent(item.answer)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
