import FAB from "@/components/fab";
import Header from "@/components/header";
import NavigationBar from "@/components/navigation-bar";
import { getMySellingContents } from "@/lib/api";
import { twMerge } from "@/lib/tailwind-merge";
import { Metadata } from "next";
import Link from "next/link";
import BasicInformationPage from "./basic-information-page";
import Contents from "./contents";
import DetailedDescriptionsPage from "./detailed-descriptions-page";
import PricingSettingsPage from "./pricing-settings-page";
import ReviewProcessInformationPage from "./review-process-information-page";
import ServiceIntroductionPage from "./service-introduction-page";
import ThumbnailPage from "./thumbnail-page";

export const metadata = {
  title: "내 콘텐츠",
} satisfies Metadata;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    form?:
      | "thumbnail"
      | "basic-information"
      | "pricing-settings"
      | "service-introduction"
      | "detailed-descriptions"
      | "review-process-information";
    type?: "COACHING" | "DOCUMENT";
    state?: "ACTIVE" | "DRAFT" | "PENDING" | "APPROVED";
  }>;
}) {
  const { form, type = "DOCUMENT", state = "ACTIVE" } = await searchParams;

  if (form == "thumbnail") return <ThumbnailPage />;
  else if (form == "basic-information") return <BasicInformationPage />;
  else if (form == "pricing-settings") return <PricingSettingsPage />;
  else if (form == "service-introduction") return <ServiceIntroductionPage />;
  else if (form == "detailed-descriptions") return <DetailedDescriptionsPage />;
  else if (form == "review-process-information")
    return <ReviewProcessInformationPage />;

  const response = await getMySellingContents({
    // @ts-expect-error
    size: 10,
    state,
    type,
  });

  return (
    <div className="flex h-screen flex-col bg-background-normal">
      <Header
        title={metadata.title}
        right={
          <Link
            href="/settlements"
            className="rounded-full border border-line-normal px-[14px] py-[8px] text-label-1-normal font-medium text-label-alternative"
          >
            정산관리
          </Link>
        }
      />
      <TabButtons type={type} />

      <main className="flex flex-1 flex-col">
        <SubTabButtons type={type} state={state} />
        <Contents response={response} />
        <FAB href="?form=thumbnail" />
      </main>
      <NavigationBar />
    </div>
  );
}

function TabButtons({ type }: { type: "COACHING" | "DOCUMENT" }) {
  return (
    <nav className="grid grid-cols-[20px_1fr_1fr_20px] justify-stretch pt-2">
      <div className="border-b-[1.5px] border-line-normal" />
      <Link
        className={twMerge(
          "border-b-[1.5px] border-line-normal p-2 text-center text-headline-1 font-semibold text-line-normal",
          type == "DOCUMENT" && "border-label-normal text-label-normal",
        )}
        href="?type=DOCUMENT"
      >
        자료
      </Link>
      <Link
        className={twMerge(
          "border-b-[1.5px] border-line-normal p-2 text-center text-headline-1 font-semibold text-line-normal",
          type == "COACHING" && "border-label-normal text-label-normal",
        )}
        href="?type=COACHING"
      >
        코칭
      </Link>
      <div className="w-5 border-b-[1.5px] border-line-normal" />
    </nav>
  );
}

function SubTabButtons({
  type,
  state,
}: {
  type: "COACHING" | "DOCUMENT";
  state: "ACTIVE" | "DRAFT" | "PENDING" | "APPROVED";
}) {
  return (
    <nav className="flex flex-wrap px-5 py-3">
      {[
        { state: "ACTIVE", label: "판매중" },
        { state: "DRAFT", label: "작성중" },
        { state: "PENDING", label: "심사중" },
        { state: "APPROVED", label: "심사완료" },
      ].map((item) => (
        <Link
          key={item.state}
          href={`?type=${type}&state=${item.state}`}
          className={twMerge(
            "rounded-4 px-4 py-2 text-body-2-normal font-semibold text-label-alternative",
            item.state == state && "bg-component-fill-strong text-label-normal",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
