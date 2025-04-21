import { BottomButton } from "@/components/button";
import Header, { BackButton } from "@/components/header";

export default function RequestPasswordResetSuccess() {
  return (
    <div className="flex h-screen flex-col">
      <Header leftIcons={<BackButton />} />
      <main className="flex flex-1 flex-col items-center justify-center gap-1.5 p-5 text-center">
        <LargeCheck />
        <div>
          <h1 className="text-title-3 font-bold">
            비밀번호 재설정을 위한
            <br />
            메일을 보냈어요
          </h1>
          <p className="text-body-2-normal font-medium text-label-alternative">
            메일함을 확인해주세요
          </p>
        </div>
        <div className="fixed right-0 bottom-0 left-0 flex flex-col">
          <BottomButton>확인</BottomButton>
        </div>
      </main>
    </div>
  );
}

function LargeCheck() {
  return (
    <svg
      width="118"
      height="137"
      viewBox="0 0 118 137"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.33203 65.4398C5.91749 69.822 8.80415 75.5578 11.8418 80.3432C21.4071 95.4117 31.9222 110.479 42.9971 124.486C45.5058 127.658 48.2684 132.465 51.5134 134.989C53.8591 136.814 55.2279 130.914 55.9844 129.312C57.655 125.774 58.5739 121.543 59.8167 117.815C65.8322 99.7682 73.7564 82.168 81.6751 64.872C91.1752 44.1217 102.233 19.9558 116.024 1.56787"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
