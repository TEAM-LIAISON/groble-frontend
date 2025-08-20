import FadeIn from '@/shared/ui/interaction/fade-in';
import {
  BookIcon,
  TeacherIcon,
  DesktopIcon,
  MemoIcon,
  WomanDeveloperIcon,
} from '../assets';

export default function IntroContentSection2() {
  return (
    <FadeIn className="flex flex-col">
      <h2 className="text-title-3 md:text-title-2 font-bold text-label-normal relative">
        이런 메이커를 찾고있어요
      </h2>

      {/* 6개 카드 */}
      <div className="flex md:flex-row gap-3 mt-5 flex-col w-full">
        {/* 1 */}
        <div className="w-full md:w-[12.4rem] h-[11.25rem] px-3 rounded-xl bg-background-alternative flex flex-col justify-center items-center py-[2.37rem] gap-3">
          <BookIcon width={40} height={40} />
          <p className="text-body-2-normal font-semibold text-label-normal leading-6 text-center">
            본인의 노하우가 담긴
            <br />
            전자책을 판매하고 있는 분
          </p>
        </div>

        {/* 2 */}
        <div className="w-full md:w-[12.4rem] h-[11.25rem] px-3 rounded-xl bg-background-alternative flex flex-col justify-center items-center py-[2.37rem] gap-3">
          <TeacherIcon width={40} height={40} />
          <p className="text-body-2-normal font-semibold text-label-normal leading-6 text-center">
            브랜딩·마케팅 코칭을
            <br />
            해본 적이 있는 분
          </p>
        </div>

        {/* 3 */}
        <div className="w-full md:w-[12.4rem] h-[11.25rem] px-3 rounded-xl bg-background-alternative flex flex-col justify-center items-center py-[2.37rem] gap-3">
          <DesktopIcon width={40} height={40} />
          <p className="text-body-2-normal font-semibold text-label-normal leading-6 text-center">
            Notion, PPT 등 템플릿을
            <br />
            만들어본 적이 있는 분
          </p>
        </div>

        {/* 4 */}
        <div className="w-full md:w-[12.4rem] h-[11.25rem] px-3 rounded-xl bg-background-alternative flex flex-col justify-center items-center py-[2.37rem] gap-3">
          <MemoIcon width={40} height={40} />
          <p className="text-body-2-normal font-semibold text-label-normal leading-6 text-center">
            각종 컨설팅을
            <br />
            전문으로 하고 있는 분
          </p>
        </div>

        {/* 5 */}
        <div className="w-full md:w-[12.4rem] h-[11.25rem] px-3 rounded-xl bg-background-alternative flex flex-col justify-center items-center py-[2.37rem] gap-3">
          <WomanDeveloperIcon width={40} height={40} />
          <p className="text-body-2-normal font-semibold text-label-normal leading-6 text-center">
            상세·랜딩 페이지 등을
            <br />
            대행하여 제작할 수 있는 분
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
