import Image from 'next/image';
import { ArrowIcon } from '../assets';

export default function IntroContentSection3() {
  return (
    <div className="flex flex-col">
      <h2 className="text-title-3 md:text-title-2 font-bold text-label-normal relative">
        그로블 서비스 흐름
      </h2>
      <div className="mt-5 flex md:flex-row flex-col items-center gap-3">
        {/* 1 */}
        <div className="rounded-lg border border-dashed border-label-assistive p-4 flex flex-row md:flex-col items-center justify-center w-full md:w-[14.5rem] md:h-[14.5rem]">
          <Image
            src="/images/intro/user-3d.svg"
            alt="users-3d"
            width={120}
            height={120}
          />
          <div className="flex flex-col items-start md:items-center">
            <p className="mt-1 text-body-1-normal font-bold text-label-normal">
              메이커로 가입하기
            </p>
            <p className="mt-1 text-label-1-normal text-label-neutral leading-5 text-start md:text-center ">
              간편한 인증만으로
              <br /> 누구나 메이커가 될 수 있어요!
            </p>
          </div>
        </div>
        <ArrowIcon direction="right" className="md:block hidden" />
        <ArrowIcon direction="down" className="md:hidden block" />

        {/* 2 */}
        <div className="rounded-lg border border-dashed border-label-assistive p-4 flex flex-row md:flex-col items-center justify-center w-full md:w-[14.5rem] md:h-[14.5rem]">
          <Image
            src="/images/intro/calender-3d.svg"
            alt="calender-3d"
            width={120}
            height={120}
          />
          <div className="flex flex-col items-start md:items-center">
            <p className="mt-1 text-body-1-normal font-bold text-label-normal">
              상품 등록하고 판매 시작하기
            </p>
            <p className="mt-1 text-label-1-normal text-label-neutral leading-5 text-start md:text-center tracking-tight">
              내가 만든 콘텐츠를 손쉽게 등록하고
              <br />
              바로 판매할 수 있어요.
            </p>
          </div>
        </div>
        <ArrowIcon direction="right" className="md:block hidden" />
        <ArrowIcon direction="down" className="md:hidden block" />

        {/* 3 */}
        <div className="rounded-lg border border-dashed border-label-assistive p-4 flex flex-row md:flex-col items-center justify-center w-full md:w-[14.5rem] md:h-[14.5rem]">
          <Image
            src="/images/intro/message-3d.svg"
            alt="message-3d"
            width={120}
            height={120}
          />
          <div className="flex flex-col items-start md:items-center">
            <p className="mt-1 text-body-1-normal font-bold text-label-normal tracking-tight">
              고객 관리 기능으로 전환 높이기
            </p>
            <p className="mt-1 text-label-1-normal text-label-neutral leading-5 text-start md:text-center tracking-tight">
              구매자와 잠재 고객을 그룹화하고
              <br />
              메시지·쿠폰으로 전환을 높여보세요!
            </p>
          </div>
        </div>
        <ArrowIcon direction="right" />

        {/* 4 */}
        <div className="rounded-lg border border-dashed border-label-assistive p-4 flex flex-row md:flex-col items-center justify-center w-full md:w-[14.5rem] md:h-[14.5rem]">
          <Image
            src="/images/intro/money-3d.svg"
            alt="money-3d"
            width={120}
            height={120}
          />
          <div className="flex flex-col items-start md:items-center">
            <p className="mt-1 text-body-1-normal font-bold text-label-normal">
              자동으로 판매 정산받기
            </p>
            <p className="mt-1 text-label-1-normal text-label-neutral leading-5 text-start md:text-center tracking-tight">
              판매가 완료되면 설정한 주기에 따라
              <br />
              수익이 자동 정산돼요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
