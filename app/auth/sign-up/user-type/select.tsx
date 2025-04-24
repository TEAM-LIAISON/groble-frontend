"use client";

import { startTransition } from "react";
import { setUserTypeAction } from "./actions";

export function UserTypeSelect({ userType }: { userType: "SELLER" | "BUYER" }) {
  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center gap-1 rounded-[6px] bg-background-alternative p-5"
      onClick={() => startTransition(async () => setUserTypeAction(userType))}
    >
      <div className="flex flex-1 flex-col">
        <div className="text-body-2-normal font-medium text-label-alternative">
          {userType == "SELLER" && "내가 보유한 자산을 판매하고 싶다면"}
          {userType == "BUYER" && "내가 필요한 자산을 구매하고 싶다면"}
        </div>
        <div className="text-headline-1 font-semibold text-label-normal">
          {userType == "SELLER" && "판매자로 가입하기"}
          {userType == "BUYER" && "구매자로 가입하기"}
        </div>
      </div>
      <RightArrow />
    </button>
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
