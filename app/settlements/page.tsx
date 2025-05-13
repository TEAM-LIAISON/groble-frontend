import Header from "@/components/header";
import { SearchBar } from "@/components/search-bar";
import { twMerge } from "@/lib/tailwind-merge";
import { Metadata } from "next";
import Link from "next/link";

export const metadata = {
  title: "정산관리",
} satisfies Metadata;

export default async function SettlementsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter = "all" } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header
        title={metadata.title}
        right={
          <Link
            href="/contents"
            className="rounded-full border border-line-normal px-[14px] py-[8px] text-label-1-normal font-medium text-label-alternative"
          >
            내 콘텐츠
          </Link>
        }
      />
      <TabButtons filter={filter} />
      <div className="px-[20px] py-[12px]">
        <SearchBar />
      </div>
      <Content />
      <Content />
      <Content />
      <Content />
    </div>
  );
}

function TabButtons({ filter }: { filter: string }) {
  return (
    <div className="flex px-[20px] py-[12px] text-body-2-normal font-semibold text-label-alternative">
      <Link
        className={twMerge(
          "rounded-4 px-[16px] py-[8px]",
          filter == "all" && "bg-component-fill-alternative text-label-normal",
        )}
        href="?filter=all"
      >
        전체
      </Link>
      <Link
        className={twMerge(
          "rounded-4 px-[16px] py-[8px]",
          filter == "a" && "bg-component-fill-alternative text-label-normal",
        )}
        href="?filter=a"
      >
        결제완료
      </Link>
      <Link
        className={twMerge(
          "rounded-4 px-[16px] py-[8px]",
          filter == "b" && "bg-component-fill-alternative text-label-normal",
        )}
        href="?filter=b"
      >
        결제취소
      </Link>
      <Link
        className={twMerge(
          "rounded-4 px-[16px] py-[8px]",
          filter == "c" && "bg-component-fill-alternative text-label-normal",
        )}
        href="?filter=c"
      >
        정산완료
      </Link>
    </div>
  );
}

function Content() {
  return (
    <article>
      <Link className="flex flex-col p-5" href="/settlements/1">
        <div className="flex items-center justify-between text-label-alternative">
          <span className="font-semibold">
            <span className="text-primary-sub-1">결제완료</span> · 자료
          </span>
          <span className="text-caption-1 font-medium">2025. 2. 5.</span>
        </div>
        <div className="mt-2 mb-3 border-t border-line-normal" />
        <h1 className="line-clamp-2 text-body-1-normal font-semibold text-label-normal">
          이제 누구나 배울 수 있다! 가장 좋은 상품을 여러분께 소개합니다. 이제
          누구나 배울 수 있다! 가장 좋은 상품을 여러분께 소개합니다. 이제 누구나
          배울 수 있다! 가장 좋은 상품을 여러분께 소개합니다.
        </h1>
        <div className="h-2" />
        <div className="text-body-2-normal font-medium">
          <span className="font-bold">135,000</span>원
        </div>
      </Link>
    </article>
  );
}
