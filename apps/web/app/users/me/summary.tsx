"use client";

import type {
  getUserMyPageSummaryResponse,
  UserMyPageSummaryResponse,
} from "@/lib/api";
import { twMerge } from "@/lib/tailwind-merge";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { UrlObject } from "url";
import profileImage from "./profile-image.png";
import { SignOutPopover } from "./settings/sign-out";
import { ChevronIcon } from "@/components/(improvement)/icons";

export function Summary({
  response,
  detail,
  settings,
}: {
  response: getUserMyPageSummaryResponse;
  detail: ReactNode;
  settings: ReactNode;
}) {
  const [page, setPage] = useState<"DETAIL" | "SETTINGS">("DETAIL");
  const summaryData = response.data?.data as
    | UserMyPageSummaryResponse
    | undefined;

  return (
    <div className="flex justify-center">
      <div className="mt-9 max-w-[1080px] flex-1 md:grid md:grid-cols-[392px_auto]">
        <div className="flex flex-col gap-4">
          <SummaryProfileButton
            nickname={summaryData?.nickname}
            userType={summaryData?.userType}
            profileImageUrl={summaryData?.profileImageUrl}
          />
          <ItemList>
            {(summaryData?.verificationStatus === "PENDING" ||
              summaryData?.verificationStatus === "FAILED") && (
              <Link
                href="/users/maker/select-type"
                className="flex cursor-pointer items-center justify-between rounded-xl border-[1.5px] border-dashed border-status-error bg-[#FEECEC] px-4 py-5 hover:brightness-[102%]"
              >
                <div className="flex flex-col gap-[0.12rem]">
                  <span className="text-body-1-normal font-semibold text-label-normal">
                    콘텐츠를 등록하려면 메이커 인증이 필요해요
                  </span>
                  <span className="text-body-1-norma text-status-error">
                    인증하러 가기
                  </span>
                </div>
                <ChevronIcon
                  direction="right"
                  className="h-[1.5rem] w-[1.5rem] text-status-error"
                />
              </Link>
            )}
            {summaryData?.verificationStatus && (
              <ItemGroup>
                <Item
                  icon={<Verify />}
                  rightText={
                    <>
                      {summaryData?.verificationStatus == "PENDING" && (
                        <span className="text-status-error">인증필요</span>
                      )}
                      {summaryData?.verificationStatus == "IN_PROGRESS" && (
                        <span className="text-primary-sub-1">인증진행중</span>
                      )}
                      {summaryData?.verificationStatus == "FAILED" && (
                        <span className="text-status-error">인증실패</span>
                      )}
                      {summaryData?.verificationStatus == "VERIFIED" && (
                        <span className="text-status-success">인증완료</span>
                      )}
                    </>
                  }
                  href=""
                >
                  인증상태
                </Item>
              </ItemGroup>
            )}

            <ItemGroup>
              <Item icon={<OrderList />} href="">
                구매내역
              </Item>
            </ItemGroup>
            {summaryData?.userType == "SELLER" && (
              <ItemGroup>
                <Item icon={<Wallet />} href="">
                  정산관리
                </Item>
              </ItemGroup>
            )}
            <ItemGroup>
              <Item icon={<OneOnOneChat />} href="">
                1:1 문의하기
              </Item>
              <Item
                icon={<Information />}
                href="https://paint-crowley-ff2.notion.site/1f8c158365ac801e9781db1791a7129d?pvs=4&utm_source=homepage&utm_medium=mypage"
              >
                공지사항
              </Item>
              <Item
                icon={<Question />}
                href="https://paint-crowley-ff2.notion.site/1f8c158365ac80c493d6cf3ebb656b33?pvs=4&utm_source=homepage&utm_medium=mypage"
              >
                자주 묻는 질문
              </Item>
            </ItemGroup>
            <ItemGroup className="hidden md:flex">
              <button
                className="hidden items-center gap-2 text-left md:flex"
                onClick={() =>
                  setPage(page == "DETAIL" ? "SETTINGS" : "DETAIL")
                }
              >
                <Setting />
                설정
              </button>
              <button
                popoverTarget="sign-out"
                className="flex items-center gap-2 text-left"
              >
                <Logout />
                로그아웃
              </button>
              <SignOutPopover />
            </ItemGroup>
          </ItemList>
        </div>
        {page == "DETAIL" && detail}
        {page == "SETTINGS" && settings}
      </div>
    </div>
  );
}

export function SummaryProfileButton({
  nickname,
  userType,
  profileImageUrl,
  className,
}: {
  nickname?: string;
  userType?: string;
  profileImageUrl?: string;
  className?: string;
}) {
  return (
    <>
      <Link
        className={twMerge("flex items-center gap-3 px-5 md:hidden", className)}
        href="/users/me/detail"
      >
        <TopProfile
          profileImageUrl={profileImageUrl}
          nickname={nickname}
          userType={userType}
        />
      </Link>
      <div
        className={twMerge("hidden items-center gap-3 px-5 md:flex", className)}
      >
        <TopProfile
          profileImageUrl={profileImageUrl}
          nickname={nickname}
          userType={userType}
        />
      </div>
    </>
  );
}

function TopProfile({
  profileImageUrl,
  nickname,
  userType,
}: {
  profileImageUrl?: string;
  nickname?: string;
  userType?: string;
}) {
  return (
    <>
      {profileImageUrl ? (
        <div className="relative h-[64px] w-[64px] rounded-full">
          <Image
            src={profileImageUrl}
            alt=""
            fill
            objectFit="cover"
            className="rounded-full border border-line-neutral"
          />
        </div>
      ) : (
        <Image src={profileImage} alt="" className="h-[64px] w-[64px]" />
      )}
      <div className="flex flex-1 flex-col">
        <h1 className="text-heading-1 font-semibold text-label-normal md:font-bold">
          {nickname ?? "알 수 없음"}
        </h1>
        <span className="text-body-2-normal font-semibold text-primary-sub-1">
          {userType == "SELLER" && "메이커"}
          {userType == "BUYER" && "구매자"}
        </span>
      </div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="md:hidden"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.22618 5.04238C8.91832 5.35929 8.92566 5.86577 9.24257 6.17363L15.0685 11.8331L9.2264 17.8421C8.91842 18.1589 8.92555 18.6654 9.24234 18.9734C9.55913 19.2814 10.0656 19.2743 10.3736 18.9575L16.7736 12.3746C16.9215 12.2224 17.003 12.0177 16.9999 11.8055C16.9969 11.5933 16.9097 11.391 16.7574 11.2431L10.3574 5.02598C10.0405 4.71812 9.53404 4.72546 9.22618 5.04238Z"
          fill="#1D212C"
        />
      </svg>
    </>
  );
}

export function ItemList({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 p-5 text-body-1-normal font-semibold">
      {children}
    </div>
  );
}

export function ItemGroup({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-7 rounded-[12px] bg-background-normal px-4 py-5 md:bg-background-alternative",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Item({
  icon,
  children,
  href,
  rightText,
  className,
}: {
  icon?: ReactNode;
  children?: ReactNode;
  href: string | UrlObject;
  rightText?: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={twMerge("flex items-center gap-2", className)}>
      {icon}
      <span className="flex-1">{children}</span>
      {rightText}
    </Link>
  );
}

export function Verify() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-[#C2C4C8] md:fill-label-alternative"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5979 2.11926C10.3341 1.71617 11.1599 1.50488 11.9992 1.50488C12.8385 1.50488 13.6643 1.71617 14.4005 2.11926C14.9397 2.41445 15.418 2.80556 15.8131 3.27151C16.4255 3.2182 17.0445 3.27813 17.6386 3.45034C18.4485 3.6851 19.1859 4.12088 19.7822 4.71714C20.3784 5.31341 20.8142 6.05079 21.049 6.8607C21.2212 7.45483 21.2811 8.07383 21.2278 8.68627C21.6938 9.0813 22.0849 9.55966 22.3801 10.0988C22.7831 10.835 22.9944 11.6608 22.9944 12.5001C22.9944 13.3394 22.7831 14.1652 22.3801 14.9014C22.0848 15.4407 21.6936 15.9191 21.2275 16.3142C21.2804 16.9254 21.2205 17.5431 21.0488 18.1361C20.8146 18.9447 20.38 19.6811 19.7853 20.277C19.1907 20.8729 18.4552 21.309 17.6471 21.5449C17.0545 21.7178 16.437 21.779 15.8257 21.7275C15.4305 22.1959 14.9512 22.5892 14.4106 22.886C13.6732 23.2909 12.8455 23.5032 12.0042 23.5032C11.1629 23.5032 10.3352 23.2909 9.59781 22.886C9.05763 22.5894 8.57867 22.1965 8.18361 21.7285C7.57288 21.7812 6.95571 21.7212 6.36324 21.5496C5.55462 21.3154 4.81822 20.8809 4.22232 20.2862C3.62642 19.6916 3.19031 18.9561 2.95443 18.1479C2.78162 17.5559 2.72038 16.9389 2.77173 16.3281C2.30139 15.9329 1.9064 15.4531 1.60826 14.9116C1.20155 14.1729 0.988281 13.3434 0.988281 12.5001C0.988281 11.6568 1.20155 10.8273 1.60826 10.0886C1.9064 9.54707 2.30139 9.06728 2.77172 8.67207C2.72038 8.06129 2.78162 7.44429 2.95443 6.85224C3.19031 6.04412 3.62642 5.30863 4.22232 4.71397C4.81822 4.11932 5.55462 3.68475 6.36324 3.45056C6.9562 3.27884 7.57391 3.21893 8.18513 3.27181C8.58021 2.80573 9.05866 2.41452 9.5979 2.11926ZM15.7061 11.2072C16.0967 10.8167 16.0967 10.1835 15.7061 9.79302C15.3156 9.40249 14.6824 9.40249 14.2919 9.79302L10.999 13.0859L9.70613 11.793C9.31561 11.4025 8.68244 11.4025 8.29192 11.793C7.90139 12.1835 7.90139 12.8167 8.29192 13.2072L10.2919 15.2072C10.6824 15.5978 11.3156 15.5978 11.7061 15.2072L15.7061 11.2072Z"
      />
    </svg>
  );
}

export function OrderList() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-[#C2C4C8] md:fill-label-alternative"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.85636 2.19995C5.01904 2.19995 4.216 2.53258 3.62392 3.12466C3.03185 3.71674 2.69922 4.51977 2.69922 5.35709V18.2142C2.69922 19.4304 3.18236 20.5968 4.04234 21.4568C4.90233 22.3168 6.06873 22.8 7.28493 22.8H18.7135C19.9297 22.8 21.0961 22.3168 21.9561 21.4568C22.8161 20.5968 23.2992 19.4304 23.2992 18.2142V15.0571H19.0135V5.35709C19.0135 4.51977 18.6809 3.71674 18.0888 3.12466C17.4967 2.53258 16.6937 2.19995 15.8564 2.19995H5.85636ZM7.28243 6.78279C7.47264 6.59258 7.73063 6.48572 7.99964 6.48572H13.7139C13.9829 6.48572 14.2409 6.59258 14.4311 6.7828C14.6213 6.97301 14.7282 7.231 14.7282 7.5C14.7282 7.76901 14.6213 8.027 14.4311 8.21721C14.2409 8.40743 13.9829 8.51429 13.7139 8.51429H7.99964C7.73063 8.51429 7.47264 8.40743 7.28243 8.21721C7.09221 8.027 6.98535 7.76901 6.98535 7.5C6.98535 7.231 7.09221 6.97301 7.28243 6.78279ZM7.28243 11.0685C7.47265 10.8783 7.73063 10.7714 7.99964 10.7714H13.7139C13.9829 10.7714 14.2409 10.8783 14.4311 11.0685C14.6213 11.2587 14.7282 11.5167 14.7282 11.7857C14.7282 12.0547 14.6213 12.3127 14.4311 12.5029C14.2409 12.6931 13.9829 12.8 13.7139 12.8H7.99964C7.73063 12.8 7.47265 12.6931 7.28243 12.5029C7.09221 12.3127 6.98535 12.0547 6.98535 11.7857C6.98535 11.5167 7.09221 11.2587 7.28243 11.0685ZM7.99964 15.0571C7.73063 15.0571 7.47265 15.164 7.28243 15.3542C7.09221 15.5444 6.98535 15.8024 6.98535 16.0714C6.98535 16.3404 7.09221 16.5984 7.28243 16.7886C7.47265 16.9789 7.73063 17.0857 7.99964 17.0857H10.8568C11.1258 17.0857 11.3838 16.9789 11.574 16.7886C11.7642 16.5984 11.8711 16.3404 11.8711 16.0714C11.8711 15.8024 11.7642 15.5444 11.574 15.3542C11.3838 15.164 11.1258 15.0571 10.8568 15.0571H7.99964ZM19.0137 17.076V20.7441C19.5814 20.6771 20.1135 20.4211 20.5218 20.0128C21.0014 19.5332 21.2708 18.8828 21.2708 18.2046V17.076H19.0137Z"
      />
    </svg>
  );
}

export function Wallet() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-[#C2C4C8] md:fill-label-alternative"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.3918 3.54022C17.0913 3.48019 16.7811 3.49001 16.485 3.56891L9 5.49991H19C18.9998 5.1935 18.9291 4.89123 18.7935 4.61645C18.6579 4.34167 18.461 4.10172 18.218 3.91512C17.9749 3.72851 17.6923 3.60025 17.3918 3.54022ZM3.05546 7.55546C3.57118 7.03973 4.27065 6.75 5 6.75H19C19.7293 6.75 20.4288 7.03973 20.9445 7.55546C21.4603 8.07118 21.75 8.77065 21.75 9.5V18.5C21.75 19.2293 21.4603 19.9288 20.9445 20.4445C20.4288 20.9603 19.7293 21.25 19 21.25H5C4.27065 21.25 3.57118 20.9603 3.05546 20.4445C2.53973 19.9288 2.25 19.2293 2.25 18.5V9.5C2.25 8.77065 2.53973 8.07118 3.05546 7.55546ZM15.6161 13.1161C15.8505 12.8817 16.1685 12.75 16.5 12.75C16.8315 12.75 17.1495 12.8817 17.3839 13.1161C17.6183 13.3505 17.75 13.6685 17.75 14C17.75 14.3315 17.6183 14.6495 17.3839 14.8839C17.1495 15.1183 16.8315 15.25 16.5 15.25C16.1685 15.25 15.8505 15.1183 15.6161 14.8839C15.3817 14.6495 15.25 14.3315 15.25 14C15.25 13.6685 15.3817 13.3505 15.6161 13.1161Z"
      />
    </svg>
  );
}

export function OneOnOneChat() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-[#C2C4C8] md:fill-label-alternative"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.7023 17.6868C22.5305 16.1403 23 14.3727 23 12.5C23 6.42487 18.0751 1.5 12 1.5C5.92487 1.5 1 6.42487 1 12.5C1 18.5751 5.92487 23.5 12 23.5C13.8303 23.5 15.5603 23.0515 17.0816 22.258L19.888 23.1182C20.5727 23.3281 21.3173 23.1558 21.8403 22.6667C22.3633 22.1775 22.5849 21.4461 22.4212 20.7489L21.7023 17.6868ZM6 15.7629V14.4271H7.41718V10.529H6.25527V9.42405L6.45747 9.38673C7.04894 9.27757 7.45006 9.13817 7.78639 8.93422L7.84279 8.90002H8.91774V14.4271H10.1853V15.7629H6ZM14.2898 15.7629V14.4271H15.707V10.529H14.545V9.42405L14.7472 9.38673C15.3387 9.27757 15.7398 9.13817 16.0762 8.93422L16.1326 8.90002H17.2075V14.4271H18.4751V15.7629H14.2898ZM12.125 12.4863C12.6266 12.4863 13.0469 12.0896 13.0469 11.5382C13.0469 10.9843 12.6327 10.5728 12.125 10.5728C11.6173 10.5728 11.2031 10.9843 11.2031 11.5382C11.2031 12.0896 11.6234 12.4863 12.125 12.4863ZM13.0469 14.9268C13.0469 15.489 12.6245 15.875 12.125 15.875C11.6255 15.875 11.2031 15.489 11.2031 14.9268C11.2031 14.373 11.6173 13.9615 12.125 13.9615C12.6327 13.9615 13.0469 14.373 13.0469 14.9268Z"
      />
    </svg>
  );
}

export function Information() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-[#C2C4C8] md:fill-label-alternative"
    >
      <path d="M13 9.5H11V7.5H13M13 17.5H11V11.5H13M12 2.5C10.6868 2.5 9.38642 2.75866 8.17317 3.2612C6.95991 3.76375 5.85752 4.50035 4.92893 5.42893C3.05357 7.3043 2 9.84784 2 12.5C2 15.1522 3.05357 17.6957 4.92893 19.5711C5.85752 20.4997 6.95991 21.2362 8.17317 21.7388C9.38642 22.2413 10.6868 22.5 12 22.5C14.6522 22.5 17.1957 21.4464 19.0711 19.5711C20.9464 17.6957 22 15.1522 22 12.5C22 11.1868 21.7413 9.88642 21.2388 8.67317C20.7362 7.45991 19.9997 6.35752 19.0711 5.42893C18.1425 4.50035 17.0401 3.76375 15.8268 3.2612C14.6136 2.75866 13.3132 2.5 12 2.5Z" />
    </svg>
  );
}

export function Question() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-[#C2C4C8] md:fill-label-alternative"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.5C10.6868 2.5 9.38642 2.75866 8.17317 3.2612C6.95991 3.76375 5.85752 4.50035 4.92893 5.42893C3.05357 7.3043 2 9.84784 2 12.5C2 15.1522 3.05357 17.6957 4.92893 19.5711C5.85752 20.4997 6.95991 21.2362 8.17317 21.7388C9.38642 22.2413 10.6868 22.5 12 22.5C14.6522 22.5 17.1957 21.4464 19.0711 19.5711C20.9464 17.6957 22 15.1522 22 12.5C22 11.1868 21.7413 9.88642 21.2388 8.67317C20.7362 7.45991 19.9997 6.35752 19.0711 5.42893C18.1425 4.50035 17.0401 3.76375 15.8268 3.2612C14.6136 2.75866 13.3132 2.5 12 2.5ZM11.9337 11.3838C11.1703 11.8659 10.7552 12.3682 10.7552 13.982V14.1695H12.7239V13.982C12.7306 13.1315 13.0721 12.7164 13.7953 12.2945C14.6927 11.7588 15.2886 11.069 15.2953 9.93735C15.2886 8.23646 13.8891 7.29896 11.9471 7.29896C10.186 7.29896 8.73284 8.18958 8.70605 10.1516H10.8355C10.8489 9.4753 11.3645 9.07351 11.9337 9.08021C12.5096 9.07351 12.9717 9.4619 12.9784 10.0445C12.9717 10.6271 12.523 11.0021 11.9337 11.3838ZM10.5676 16.4823C10.5542 15.826 11.11 15.2903 11.773 15.2903C12.4158 15.2903 12.985 15.826 12.9917 16.4823C12.985 17.1586 12.4158 17.701 11.773 17.701C11.11 17.701 10.5542 17.1586 10.5676 16.4823Z"
      />
    </svg>
  );
}

export function Setting() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.7213 2.33879C14.4672 2.1217 14.1437 2.00275 13.8095 2.00342H10.1893C9.47232 2.00342 8.9243 2.52686 8.81575 3.17814L8.81386 3.18946L8.54511 5.08568C8.26693 5.22621 8.00292 5.38245 7.75311 5.54837L5.9617 4.8288L5.947 4.82346C5.33397 4.60054 4.60015 4.81979 4.2468 5.45395L2.44951 8.57802L2.44814 8.58041C2.13051 9.13626 2.19694 9.92729 2.81506 10.3789L4.28961 11.5265C4.27545 11.6814 4.26665 11.841 4.26665 12.0002C4.26665 12.1494 4.27097 12.3063 4.28112 12.4658L2.77162 13.6406L2.76145 13.649C2.51059 13.8558 2.33918 14.1432 2.27643 14.4621C2.21368 14.7811 2.26347 15.112 2.41731 15.3984L2.42431 15.4114L4.23797 18.5475C4.60717 19.2092 5.34565 19.3661 5.90122 19.1893L5.93444 19.1787L7.7424 18.4525C7.99462 18.6205 8.25817 18.7758 8.53579 18.9155L8.8071 20.8297L8.81331 20.8595C8.9412 21.4734 9.46721 21.997 10.1893 21.997H13.8107C14.4933 21.997 15.0951 21.503 15.1886 20.7938L15.4547 18.9163C15.7321 18.7775 15.9975 18.6225 16.2507 18.4535L18.0383 19.1716L18.053 19.1769C18.6657 19.3997 19.3989 19.1809 19.7526 18.5476L21.5648 15.414L21.5704 15.4037C21.888 14.8214 21.78 14.0647 21.2035 13.6286L19.7204 12.4627C19.7291 12.3112 19.7333 12.1573 19.7333 12.0002C19.7333 11.8476 19.7291 11.6916 19.7191 11.5344L21.2284 10.3597L21.2386 10.3513C21.4894 10.1446 21.6608 9.85722 21.7236 9.53824C21.7863 9.21926 21.7365 8.88839 21.5827 8.602L21.5757 8.58898L19.7596 5.44858C19.5968 5.16273 19.3387 4.94308 19.0304 4.8281C18.7198 4.71231 18.3783 4.71016 18.0664 4.82203L18.0497 4.82802L16.2576 5.54785C16.0054 5.37987 15.7418 5.22452 15.4642 5.08488L15.1973 3.20082L15.1954 3.18899C15.1442 2.85799 14.976 2.55633 14.7213 2.33879ZM9.54796 12.0002C9.54796 10.6537 10.6535 9.54815 12 9.54815C13.3465 9.54815 14.452 10.6537 14.452 12.0002C14.452 13.3467 13.3465 14.4522 12 14.4522C10.6535 14.4522 9.54796 13.3467 9.54796 12.0002Z"
        fill="#878A93"
      />
    </svg>
  );
}

export function Logout() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-[#C2C4C8] md:fill-label-alternative"
    >
      <path d="M13.496 21H6.5C5.395 21 4.5 19.849 4.5 18.429V5.57C4.5 4.151 5.395 3 6.5 3H13.5M16 15.5L19.5 12L16 8.5M9.5 11.996H19.5" />
    </svg>
  );
}
