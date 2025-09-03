import FadeIn from '@/shared/ui/interaction/fade-in';
import {
  BookIcon,
  TeacherIcon,
  DesktopIcon,
  MemoIcon,
  WomanDeveloperIcon,
} from '../assets';

const makerCards = [
  {
    id: 1,
    icon: BookIcon,
    text: [
      '본인의 노하우가',
      '담긴 전자책을',
      '판매하고 있는 분'
    ]
  },
  {
    id: 2,
    icon: TeacherIcon,
    text: [
      '브랜딩·마케팅',
      '코칭을 해본 적이',
      '있는 분'
    ]
  },
  {
    id: 3,
    icon: DesktopIcon,
    text: [
      'Notion, PPT 등',
      '템플릿을 만든',
      '경험이 있는 분'
    ]
  },
  {
    id: 4,
    icon: MemoIcon,
    text: [
      '각종 컨설팅을',
      '전문으로 하고',
      '있는 분'
    ]
  },
  {
    id: 5,
    icon: WomanDeveloperIcon,
    text: [
      '상세 및',
      '랜딩 페이지를',
      '제작할 수 있는 분'
    ]
  }
];

export default function IntroContentSection2() {
  return (
    <FadeIn className="flex flex-col px-5">
      <h2 className="text-title-2 md:text-title-2 font-bold text-label-normal relative">
        이런 메이커를 찾고있어요
      </h2>

      {/* 6개 카드 */}
      <div className="flex md:flex-row gap-3 mt-5 flex-col w-full">
        {makerCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className="w-full md:w-[12.4rem] h-fit px-3 rounded-xl bg-background-alternative flex flex-col justify-center items-center py-[30px] gap-3"
            >
              <IconComponent width={40} height={40} />
              <p className="text-label-1-normal font-semibold text-label-normal leading-6 text-center">
                {card.text.map((line, index) => (
                  <span key={`${card.id}-line-${index}`}>
                    {line}
                    {index < card.text.length - 1 && (
                      <>
                        <span className="hidden md:inline"><br /></span>
                        <span className="md:hidden">{index === 0 ? <br /> : ' '}</span>
                      </>
                    )}
                  </span>
                ))}
              </p>
            </div>
          );
        })}
      </div>
    </FadeIn>
  );
}
