'use client';

import { useState } from 'react';

/**
 * 대표 콘텐츠 설정 컴포넌트
 */
export default function RepresentativeContent() {
  const [selectedContents, setSelectedContents] = useState<string[]>([
    'content1',
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  const contents = [
    {
      id: 'content1',
      title: '한번에 배우는 월 배우는 계절 재료로 최대 두둥',
      author: '김콘솔',
    },
    {
      id: 'content2',
      title: '한번에 배우는 월 배우는 계절 재료로 최대 두둥',
      author: '김콘솔',
    },
    {
      id: 'content3',
      title: '한번에 배우는 월 배우는 계절 재료로 최대 두둥',
      author: '김콘솔',
    },
    {
      id: 'content4',
      title: '한번에 배우는 월 배우는 계절 재료로 최대 두둥',
      author: '김콘솔',
    },
    {
      id: 'content5',
      title: '한번에 배우는 월 배우는 계절 재료로 최대 두둥',
      author: '김콘솔',
    },
  ];

  const handleToggleContent = (contentId: string) => {
    setSelectedContents((prev) =>
      prev.includes(contentId)
        ? prev.filter((id) => id !== contentId)
        : [...prev, contentId]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-body-1-semibold text-label-normal">
        대표 콘텐츠 설정
      </h3>

      <div className="space-y-3">
        {contents.map((content) => (
          <div key={content.id} className="flex items-start space-x-3">
            <input
              type="checkbox"
              id={content.id}
              checked={selectedContents.includes(content.id)}
              onChange={() => handleToggleContent(content.id)}
              className="mt-1 w-5 h-5 text-primary-normal border-gray-300 rounded focus:ring-primary-normal"
            />

            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-yellow-400 rounded"></div>
              </div>

              <div>
                <h4 className="text-body-2-semibold text-label-normal">
                  {content.title}
                </h4>
                <p className="text-body-3-normal text-label-alternative">
                  {content.author}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded ${
              currentPage === page
                ? 'border border-line-normal text-primary-normal'
                : 'hover:bg-surface-neutral'
            }`}
          >
            {page}
          </button>
        ))}
        <button className="w-8 h-8 rounded hover:bg-surface-neutral">›</button>
      </div>
    </div>
  );
}
