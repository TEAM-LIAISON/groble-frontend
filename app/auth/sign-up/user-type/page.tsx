import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import { UserTypeSelect } from "./select";

export const metadata: Metadata = {
  title: "유형 선택",
};

export default function UserTypePage() {
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
            <UserTypeSelect userType="SELLER" />
          </li>
          <li>
            <UserTypeSelect userType="BUYER" />
          </li>
        </ul>
      </main>
    </div>
  );
}
