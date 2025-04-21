import Header, { Back } from "@/components/header";

export default function SelectType() {
  return (
    <div className="flex h-screen flex-col">
      <Header left={<Back />} />
      <main className="flex flex-1 flex-col items-stretch justify-between gap-8 p-5">
        <div className="flex flex-col">
          <h1 className="text-heading-1 font-semibold">
            가입 유형을 선택해주세요
          </h1>
          <p className="text-body-2-normal font-medium text-label-alternative">
            유형에 따라 제공하는 서비스가 달라져요
          </p>
        </div>
        <div className="flex justify-center">
          <svg
            width="223"
            height="223"
            viewBox="0 0 223 223"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="111.509" cy="111.695" r="111.144" fill="#D9D9D9" />
          </svg>
        </div>
        <ul className="flex flex-col gap-3">
          <li>
            <a className="flex items-center gap-1 rounded-[6px] bg-background-alternative p-5">
              <div className="flex flex-1 flex-col">
                <div className="text-body-2-normal font-medium text-label-alternative">
                  내가 보유한 자산을 판매하고 싶다면
                </div>
                <div className="text-headline-1 font-semibold text-label-normal">
                  판매자로 가입하기
                </div>
              </div>
              <RightArrow />
            </a>
          </li>
          <li>
            <a className="flex items-center gap-1 rounded-[6px] bg-background-alternative p-5">
              <div className="flex flex-1 flex-col">
                <div className="text-body-2-normal font-medium text-label-alternative">
                  내가 필요한 자산을 구매하고 싶다면
                </div>
                <div className="text-headline-1 font-semibold text-label-normal">
                  구매자로 가입하기
                </div>
              </div>
              <RightArrow />
            </a>
          </li>
        </ul>
      </main>
    </div>
  );
}

function RightArrow() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.22618 5.0425C8.91832 5.35941 8.92566 5.86589 9.24257 6.17375L15.0685 11.8332L9.2264 17.8423C8.91842 18.1591 8.92555 18.6655 9.24234 18.9735C9.55913 19.2815 10.0656 19.2744 10.3736 18.9576L16.7736 12.3747C16.9215 12.2226 17.003 12.0178 16.9999 11.8056C16.9969 11.5934 16.9097 11.3911 16.7574 11.2432L10.3574 5.0261C10.0405 4.71824 9.53404 4.72558 9.22618 5.0425Z"
        fill="#46474C"
      />
    </svg>
  );
}
