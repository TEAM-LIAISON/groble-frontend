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
    return `${price.toLocaleString()}`;
  };

  console.log(content);

  return (
    <section className="">
      <Link
        href={`/products/${content.contentId}`}
        className="group flex gap-[2.38rem] mb-[3rem]"
      >
        <div className="relative h-[15.68em] w-[20.9rem] rounded-xl ">
          <Image
            src={content.thumbnailUrl || ''}
            alt={content.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-col justify-center w-[20.9rem]">
          <h3 className="text-headline-1 font-bold text-label-normal">
            대표 콘텐츠
          </h3>

          <hr className="my-3 border-line-normal" />

          <p className="text-body-1-normal font-semibold text-label-normal line-clamp-2">
            {content.title}
          </p>
          <p className="mt-[0.12rem] text-body-1-normal font-bold text-label-normal">
            {formatPrice(content.lowestPrice)}
            <span className="font-medium">원</span>
          </p>
        </div>
      </Link>
    </section>
  );
}
