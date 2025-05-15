import BottomArea, { BottomLinkButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import { ContentDetailResponse, getContentDetail } from "@/lib/api";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import ContentTabs from "./content-tabs";
import PricingInformation from "./pricing-information";

export const metadata = {
  title: "콘텐츠 상세",
} satisfies Metadata;

export default async function ContentPage({
  params,
}: {
  params: Promise<{ contentId: string }>;
}) {
  const { contentId } = await params;
  const response = await getContentDetail(Number(contentId));

  if (response.status != 200) throw new Error(JSON.stringify(response));

  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header left={<Back />} title={metadata.title} />
      <ContentDetail contentDetail={response.data.data!} />
      <BottomArea>
        <BottomLinkButton href="/contents/1/cancel">판매하기</BottomLinkButton>
      </BottomArea>
    </div>
  );
}

function ContentDetail({
  contentDetail,
}: {
  contentDetail: ContentDetailResponse;
}) {
  return (
    <>
      <div className="mx-5 flex flex-col gap-4">
        {contentDetail.status == "VALIDATED" && <ValidatedMessage />}
        {contentDetail.status == "REJECTED" && (
          <RejectedMessage contentId={contentDetail.contentId!} />
        )}
        <div className="relative mb-4 aspect-[335_/_251]">
          <Image
            src={contentDetail.thumbnailUrl!}
            alt="Content Image"
            fill
            objectFit="cover"
            className="w-full rounded-lg object-cover"
          />
        </div>
        <div>
          <div className="mb-3 flex space-x-2">
            <span className="rounded bg-primary-sub-1 px-2 py-1 text-xs font-semibold text-white">
              {contentDetail.contentType == "COACHING" && "코칭"}
              {contentDetail.contentType == "DOCUMENT" && "자료"}
            </span>
            <span className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">
              AI
            </span>
            <span className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">
              프로세스
            </span>
          </div>

          <h1 className="mb-4 text-xl font-bold text-gray-900">
            {contentDetail.title}
          </h1>

          <div className="flex items-center">
            <img
              src={contentDetail.sellerProfileImageUrl}
              alt="김로블"
              className="mr-3 h-10 w-10 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">
              {contentDetail.sellerName}
            </span>
          </div>
          <PricingInformation contentDetail={contentDetail} />
          <button
            type="button"
            className="mt-5 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
          >
            문의하기
          </button>
          <AdditionalInformation />
        </div>
      </div>
      <ContentTabs contentDetail={contentDetail} />
    </>
  );
}

function ValidatedMessage() {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm">
      <div className="flex items-center gap-1">
        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-800">
          <span className="text-xs font-bold text-white">i</span>
        </div>
        <span className="text-slate-800">심사가 완료되었어요</span>
      </div>
    </div>
  );
}

function RejectedMessage({ contentId }: { contentId: number }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm">
      <div className="flex items-center gap-1">
        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-800">
          <span className="text-xs font-bold text-white">i</span>
        </div>
        <span className="text-slate-800">심사가 반려되었어요</span>
      </div>
      <Link
        href={`/contents/${contentId}/reject-reason`}
        className="text-red-600 underline"
      >
        사유 보기
      </Link>
    </div>
  );
}

function AdditionalInformation() {
  const infoItems = [
    { icon: <CalendarIcon />, text: "코칭 기간 1일" },
    { icon: <LocationIcon />, text: "Zoom 링크 제공 예정" },
    { icon: <PaperclipIcon />, text: "자료 제공" },
  ];

  return (
    <div className="my-3 flex flex-col gap-3 border-t border-gray-200 pt-6">
      {infoItems.map((item, index) => (
        <AdditionalInformationItem
          key={index}
          icon={item.icon}
          text={item.text}
        />
      ))}
    </div>
  );
}

function AdditionalInformationItem({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex-shrink-0 text-xl">{icon}</div>
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.45964 1.66602C6.11446 1.66602 5.83464 1.94584 5.83464 2.29102V3.54102H3.95964C2.69398 3.54102 1.66797 4.56703 1.66797 5.83268V15.8327C1.66797 17.0983 2.69398 18.1243 3.95964 18.1243H15.6263C16.892 18.1243 17.918 17.0983 17.918 15.8327V5.83268C17.918 4.56703 16.892 3.54102 15.6263 3.54102H13.7513V2.29102C13.7513 1.94584 13.4715 1.66602 13.1263 1.66602C12.7811 1.66602 12.5013 1.94584 12.5013 2.29102V3.54102H7.08464V2.29102C7.08464 1.94584 6.80481 1.66602 6.45964 1.66602ZM12.5013 5.20768V4.79102H7.08464V5.20768C7.08464 5.55286 6.80481 5.83268 6.45964 5.83268C6.11446 5.83268 5.83464 5.55286 5.83464 5.20768V4.79102H3.95964C3.38434 4.79102 2.91797 5.25739 2.91797 5.83268V7.29102H16.668V5.83268C16.668 5.25739 16.2016 4.79102 15.6263 4.79102H13.7513V5.20768C13.7513 5.55286 13.4715 5.83268 13.1263 5.83268C12.7811 5.83268 12.5013 5.55286 12.5013 5.20768ZM16.668 8.54102H2.91797V15.8327C2.91797 16.408 3.38434 16.8743 3.95964 16.8743H15.6263C16.2016 16.8743 16.668 16.408 16.668 15.8327V8.54102ZM13.1263 10.8327C13.1263 10.3724 13.4994 9.99935 13.9596 9.99935C14.4199 9.99935 14.793 10.3724 14.793 10.8327C14.793 11.2929 14.4199 11.666 13.9596 11.666C13.4994 11.666 13.1263 11.2929 13.1263 10.8327ZM13.9596 13.3327C13.4994 13.3327 13.1263 13.7058 13.1263 14.166C13.1263 14.6263 13.4994 14.9993 13.9596 14.9993C14.4199 14.9993 14.793 14.6263 14.793 14.166C14.793 13.7058 14.4199 13.3327 13.9596 13.3327ZM8.95964 10.8327C8.95964 10.3724 9.33273 9.99935 9.79297 9.99935C10.2532 9.99935 10.6263 10.3724 10.6263 10.8327C10.6263 11.2929 10.2532 11.666 9.79297 11.666C9.33273 11.666 8.95964 11.2929 8.95964 10.8327ZM9.79297 13.3327C9.33273 13.3327 8.95964 13.7058 8.95964 14.166C8.95964 14.6263 9.33273 14.9993 9.79297 14.9993C10.2532 14.9993 10.6263 14.6263 10.6263 14.166C10.6263 13.7058 10.2532 13.3327 9.79297 13.3327ZM4.79297 10.8327C4.79297 10.3724 5.16606 9.99935 5.6263 9.99935C6.08654 9.99935 6.45964 10.3724 6.45964 10.8327C6.45964 11.2929 6.08654 11.666 5.6263 11.666C5.16606 11.666 4.79297 11.2929 4.79297 10.8327ZM5.6263 13.3327C5.16606 13.3327 4.79297 13.7058 4.79297 14.166C4.79297 14.6263 5.16606 14.9993 5.6263 14.9993C6.08654 14.9993 6.45964 14.6263 6.45964 14.166C6.45964 13.7058 6.08654 13.3327 5.6263 13.3327Z"
        fill="#878A93"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.86951 3.80592C6.23029 2.44514 8.07591 1.68066 10.0003 1.68066C11.9248 1.68066 13.7704 2.44514 15.1312 3.80592C16.492 5.16671 17.2564 7.01232 17.2753 8.93676C17.3818 10.8612 16.9456 12.7068 15.8178 14.0356L15.5826 14.2733L9.65651 16.991C7.82055 18.7622 5.42105 18.2412 4.01442 16.9186C3.30667 16.2531 2.79876 15.3478 2.71804 14.3519C2.63574 13.3364 3.00376 12.2929 3.92735 11.4018L9.76882 5.76626L9.8738 5.66942C10.9675 4.71723 12.3491 5.05188 13.1469 5.80207C13.563 6.19342 13.8714 6.73484 13.9208 7.34422C13.9719 7.97323 13.7407 8.60766 13.1957 9.13377L13.1941 9.1354L8.34141 13.7847C8.09222 14.0234 7.69644 14.015 7.45762 13.7659C7.21888 13.5168 7.22728 13.121 7.47634 12.8821L12.329 8.23289C12.623 7.94835 12.6935 7.67407 12.6749 7.44513C12.6547 7.1963 12.5214 6.93034 12.29 6.71271C11.8476 6.29673 11.2275 6.18978 10.734 6.58088L10.6371 6.66551L4.79567 12.3011C4.12182 12.9512 3.91407 13.6353 3.96397 14.251C4.01548 14.8861 4.34751 15.5161 4.87054 16.008C5.92559 17 7.55423 17.2821 8.78819 16.0918L14.7151 10.3732L14.9039 10.182C15.8082 9.22183 16.1055 8.20294 16.0294 7.26366C15.9466 6.2422 15.4157 5.24885 14.6012 4.48289C13.0143 2.9907 10.541 2.50018 8.60508 4.19074L8.41953 4.36164L3.63682 8.9702C3.38832 9.20958 2.99253 9.20227 2.75303 8.95392C2.51358 8.70542 2.52093 8.30966 2.7693 8.07013L7.55202 3.46157L7.79453 3.2394Z"
        fill="#878A93"
      />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.79453 3.2394C10.3233 1.03522 13.5299 1.75989 15.4573 3.57225C16.4566 4.5119 17.1633 5.78053 17.2753 7.16274C17.3818 8.47693 16.9456 9.8359 15.8178 11.0356L15.5826 11.2733L9.65651 16.991C7.82055 18.7622 5.42105 18.2412 4.01442 16.9186C3.30667 16.2531 2.79876 15.3478 2.71804 14.3519C2.63574 13.3364 3.00376 12.2929 3.92735 11.4018L9.76882 5.76626L9.8738 5.66942C10.9675 4.71723 12.3491 5.05188 13.1469 5.80207C13.563 6.19342 13.8714 6.73484 13.9208 7.34422C13.9719 7.97323 13.7407 8.60766 13.1957 9.13377L13.1941 9.1354L8.34141 13.7847C8.09222 14.0234 7.69644 14.015 7.45762 13.7659C7.21888 13.5168 7.22728 13.121 7.47634 12.8821L12.329 8.23289C12.623 7.94835 12.6935 7.67407 12.6749 7.44513C12.6547 7.1963 12.5214 6.93034 12.29 6.71271C11.8476 6.29673 11.2275 6.18978 10.734 6.58088L10.6371 6.66551L4.79567 12.3011C4.12182 12.9512 3.91407 13.6353 3.96397 14.251C4.01548 14.8861 4.34751 15.5161 4.87054 16.008C5.92559 17 7.55423 17.2821 8.78819 16.0918L14.7151 10.3732L14.9039 10.182C15.8082 9.22183 16.1055 8.20294 16.0294 7.26366C15.9466 6.2422 15.4157 5.24885 14.6012 4.48289C13.0143 2.9907 10.541 2.50018 8.60508 4.19074L8.41953 4.36164L3.63682 8.9702C3.38832 9.20958 2.99253 9.20227 2.75303 8.95392C2.51358 8.70542 2.52093 8.30966 2.7693 8.07013L7.55202 3.46157L7.79453 3.2394Z"
        fill="#878A93"
      />
    </svg>
  );
}
