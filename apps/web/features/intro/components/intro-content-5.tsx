import { ArrowRightIcon } from '@radix-ui/react-icons';
import { ArrowIcon } from '../assets';
import { ChevronIcon } from '@/components/(improvement)/icons';
import Link from 'next/link';

export default function IntroContentSection5() {
  return (
    <div className="flex flex-col">
      <h2 className="text-title-3 md:text-title-2 font-bold text-label-normal relative">
        콘텐츠 종류별 판매가이드
      </h2>

      <div className="mt-5 flex flex-col gap-2">
        {/* 자료 */}
        <Link
          href="https://paint-crowley-ff2.notion.site/1f7c158365ac8050b4f2e82c9ca3be79?pvs=74"
          target="_blank"
          className="rounded-lg bg-background-alternative px-5 md:px-8 py-8 flex justify-between cursor-pointer items-center hover:brightness-95"
        >
          <div className="flex flex-col gap-1">
            <p className="text-primary-sub-1 text-headline-1 md:text-title-3 font-bold">
              자료
            </p>
            <p className="text-label-1-normal md:text-body-1-normal text-label-neutral">
              #전자책 #문서 #템플릿
            </p>
          </div>

          <div className="rounded-full w-9 h-9 bg-primary-sub-1 flex justify-center items-center">
            <ChevronIcon className="w-[24px] h-[24px] text-white" />
          </div>
        </Link>

        {/* 코칭 */}
        <Link
          href="https://paint-crowley-ff2.notion.site/1f3c158365ac802bae81d2f09f9bfd91?pvs=74"
          target="_blank"
          className="rounded-lg bg-background-alternative px-5 md:px-8 py-8 flex justify-between cursor-pointer items-center hover:brightness-95"
        >
          <div className="flex flex-col gap-1">
            <p className="text-primary-sub-1 text-headline-1 md:text-title-3 font-bold">
              코칭
            </p>
            <p className="text-label-1-normal md:text-body-1-normal text-label-neutral">
              #강의 #컨설팅 #제작 및 대행
            </p>
          </div>

          <div className="rounded-full w-9 h-9 bg-primary-sub-1 flex justify-center items-center">
            <ChevronIcon className="w-[24px] h-[24px] text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
}
