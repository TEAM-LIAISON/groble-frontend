import { ChevronIcon } from '@/components/(improvement)/icons';
import WebHeader from '@/components/(improvement)/layout/header';
import Image from 'next/image';
import Link from 'next/link';

export default function UserTypePage({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const { type } = searchParams;

  return (
    <>
      <WebHeader />
      <div className={`w-full flex  justify-center h-[calc(100vh-68px)]`}>
        <div className="flex flex-col max-w-[480px] w-full">
          <h1 className="text-title-3 font-bold text-label-normal mt-[9.06rem] ">
            가입 유형을 선택해 주세요
          </h1>
          <h2 className="text-body-1-normal text-label-alternative mt-[0.12rem]">
            유형에 따라 제공하는 서비스가 달라져요
          </h2>

          <div className="my-8 w-full flex justify-center">
            <Image
              src="/images/groble-3d-1.svg"
              alt="groble-3d-1"
              width={200}
              height={200}
              className=""
            />
          </div>

          <Link
            href={`/auth/sign-up/terms?type=${type}&userType=maker`}
            className="w-full p-5 flex rounded-xl bg-background-alternative hover:brightness-95 items-center justify-between"
          >
            <div className="flex flex-col ">
              <span className="text-body-2-normal text-label-alternative">
                내가 보유한 자산을 판매하고 싶다면
              </span>
              <span className="text-label-normal text-headline-1 font-semibold">
                메이커로 가입하기
              </span>
            </div>
            <ArrowIcon />
          </Link>

          <Link
            href={`/auth/sign-up/terms?type=${type}&userType=buyer`}
            className="w-full p-5 flex rounded-xl bg-background-alternative hover:brightness-95 items-center justify-between mt-[0.81rem]"
          >
            <div className="flex flex-col ">
              <span className="text-body-2-normal text-label-alternative">
                내가 필요한 자산을 구매하고 싶다면
              </span>
              <span className="text-label-normal text-headline-1 font-semibold">
                구매자로 가입하기
              </span>
            </div>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </>
  );
}

const ArrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.47618 5.0425C9.16832 5.35941 9.17566 5.86589 9.49257 6.17375L15.3185 11.8332L9.4764 17.8423C9.16842 18.1591 9.17555 18.6655 9.49234 18.9735C9.80913 19.2815 10.3156 19.2744 10.6236 18.9576L17.0236 12.3747C17.1715 12.2226 17.253 12.0178 17.2499 11.8056C17.2469 11.5934 17.1597 11.3911 17.0074 11.2432L10.6074 5.0261C10.2905 4.71824 9.78404 4.72558 9.47618 5.0425Z"
        fill="#46474C"
      />
    </svg>
  );
};
