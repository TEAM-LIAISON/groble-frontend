'use client';

import { ChevronIcon } from '@/components/(improvement)/icons';
import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: '그로블의 메이커로 활동하고 싶은데 별도의 가입비가 있나요?',
    answer:
      '그로블은 별도의 가입비 없이 메이커로 활동할 수 있어요. 메이커님의 전문성을 바탕으로 수익을 창출해 보세요!',
  },
  {
    id: 2,
    question: '그로블의 메이커로 활동하고 싶은데 별도의 가입비가 있나요?',
    answer:
      '그로블은 별도의 가입비 없이 메이커로 활동할 수 있어요. 메이커님의 전문성을 바탕으로 수익을 창출해 보세요!',
  },
  {
    id: 3,
    question: '그로블의 메이커로 활동하고 싶은데 별도의 가입비가 있나요?',
    answer:
      '그로블은 별도의 가입비 없이 메이커로 활동할 수 있어요. 메이커님의 전문성을 바탕으로 수익을 창출해 보세요!',
  },
];

export default function FaqSection() {
  const [openItems, setOpenItems] = useState<number[]>([]); // 기본적으로 두 번째 항목 열려있음

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
                  <p className="text-body-1-normal text-label-normal leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
