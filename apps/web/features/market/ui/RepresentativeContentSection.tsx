import Image from 'next/image';
import Link from 'next/link';
import type { ContentPreviewCardResponse } from '../types/marketTypes';

interface RepresentativeContentSectionProps {
  content?: ContentPreviewCardResponse;
}

/**
 * 대표 콘텐츠 섹션 컴포넌트
 */
export function RepresentativeContentSection({
  content,
}: RepresentativeContentSectionProps) {
  if (!content) {
    return null;
  }

  const formatPrice = (price: number | null) => {
    if (price === null) return '가격 미정';
    return `${price.toLocaleString()}원`;
  };

  return (
    <section className="mb-9">
      <h2 className="mb-4 text-title-2 font-bold text-label-normal">
        대표 콘텐츠
      </h2>

      <Link
        href={`/products/${content.contentId}`}
        className="group block rounded-xl border border-line-normal bg-white p-6 transition-all hover:shadow-md"
      >
        <div className="flex gap-4">
          {/* 콘텐츠 썸네일 */}
          <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={content.thumbnailUrl}
              alt={content.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* 콘텐츠 정보 */}
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h3 className="mb-2 text-title-3 font-bold text-label-normal">
                {content.title}
              </h3>
              <p className="text-body-1-normal text-label-alternative">
                {content.sellerName}
              </p>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-title-3 font-bold text-label-normal">
                  {formatPrice(content.lowestPrice)}
                  {content.priceOptionLength > 1 && (
                    <span className="ml-1 font-medium">~</span>
                  )}
                </p>
                {content.priceOptionLength > 1 && (
                  <p className="text-caption-1 text-label-alternative">
                    {content.priceOptionLength}개 옵션
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1 text-caption-1 text-label-alternative">
                <span>자세히 보기</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 4L10 8L6 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
