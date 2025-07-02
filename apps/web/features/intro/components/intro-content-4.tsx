import Image from 'next/image';
import { TripleArrowIcon } from '../assets';

export default function IntroContentSection4() {
  return (
    <div className="flex flex-col">
      <h2 className="text-title-3 md:text-title-2 font-bold text-label-normal relative">
        얼리메이커를 위한 혜택
      </h2>

      <div className="mt-5 bg-background-alternative rounded-xl py-9 px-5 md:px-8 flex flex-col">
        <span className="text-heading-1 text-primary-sub-2">#1</span>
        <h3 className="text-title-3 font-bold text-label-normal">
          판매 수수료 인하
        </h3>
        <p className="mt-1 tracking-[0.01888rem] text-caption-1 text-label-alternative">
          *6월 30일까지 가입한 메이커 대상, 3개월간 1.5% 수수료 고정 (업계
          평균10~20%)
          <br />  추후 인상건에 대해서는 사전에 안내드릴 예정입니다.
        </p>
        <div className="flex flex-col md:flex-row gap-[1.12rem] md:gap-[3.44rem] items-center justify-center py-9">
          <div className="relative md:w-[294px] md:h-[148px] w-[295px] h-[102px]">
            <Image src="/images/intro/section4_1.svg" alt="section4_1" fill />
          </div>
          <TripleArrowIcon direction="right" className="md:block hidden" />
          <TripleArrowIcon
            direction="down"
            className="md:hidden block"
            width={40}
            height={30}
          />

          <Image
            src="/images/intro/section4_2.svg"
            alt="section4_2"
            width={295}
            height={282}
            className="md:block hidden"
          />
          <Image
            src="/images/intro/section4_2_1.svg"
            alt="section4_2_1"
            width={271}
            height={103}
            className="md:hidden block"
          />
        </div>
      </div>

      {/* 2,3 */}
      <div className="flex flex-col md:flex-row mt-3 gap-3 w-full">
        {/* 2 */}
        <div className="bg-background-alternative py-9 px-5 md:px-8 w-full rounded-xl">
          <span className="text-heading-1 text-primary-sub-2">#2</span>
          <h2 className="text-title-3 md:text-title-2 font-bold text-label-normal relative">
            얼리메이커를 위한 혜택
          </h2>
          <p className="text-body-2-normal text-label-neutral">
            일회성 거래로 끝나지 않도록 고객 관리 지원
          </p>
          <div className="mt-7 flex flex-col gap-2">
            {/* 1-1 */}
            <div
              className="bg-white rounded-lg p-4 flex gap-2 items-center "
              style={{
                boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Image
                src="/images/intro/chart-3d.svg"
                alt="section4_3"
                width={72}
                height={72}
              />
              <div className="flex flex-col gap-1">
                <p className="text-body-1-normal font-bold text-label-normal">
                  자동화 메시지
                </p>
                <p className="text-label-1-normal text-label-neutral">
                  고객 행동에 맞춰 메시지와
                  <br className="md:hidden" /> 쿠폰 자동으로 발송
                </p>
              </div>
            </div>
            {/* 1-2 */}
            <div
              className="bg-white rounded-lg p-4 flex gap-2 items-center "
              style={{
                boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Image
                src="/images/intro/bell-3d.svg"
                alt="section4_3"
                width={72}
                height={72}
              />
              <div className="flex flex-col gap-1">
                <p className="text-body-1-normal font-bold text-label-normal">
                  그룹 알림 발송
                </p>
                <p className="text-label-1-normal text-label-neutral">
                  지정된 고객 그룹에게 메시지와 <br className="md:hidden" />
                  쿠폰 발송
                </p>
              </div>
            </div>

            {/* 1-3 */}
            <div
              className="bg-white rounded-lg p-4 flex gap-2 items-center "
              style={{
                boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Image
                src="/images/intro/coupon-3d.svg"
                alt="section4_3"
                width={72}
                height={72}
              />
              <div className="flex flex-col gap-1">
                <p className="text-body-1-normal font-bold text-label-normal">
                  맞춤 쿠폰 생성
                </p>
                <p className="text-label-1-normal text-label-neutral">
                  할인 방식과 조건을 설정해
                  <br className="md:hidden" />
                  특정 상품 또는 전체 상품에 적용
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 */}
        <div className="bg-background-alternative py-9 px-5 md:px-8 w-full rounded-xl">
          <span className="text-heading-1 text-primary-sub-2">#3</span>
          <h2 className="text-title-3 md:text-title-2 font-bold text-label-normal relative">
            대시보드 제공
          </h2>
          <p className="text-body-2-normal text-label-neutral">
            수익, 조회수, 고객 흐름을 한눈에 볼 수 있는 맞춤형 대시보드 제공
          </p>

          <Image
            src="/images/intro/dashboard.svg"
            alt="dashboard-3d"
            width={431}
            height={307}
            className="mt-7"
          />
        </div>
      </div>
    </div>
  );
}
