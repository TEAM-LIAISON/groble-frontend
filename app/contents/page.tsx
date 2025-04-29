import Header from "@/components/header";
import NavigationBar from "@/components/navigation-bar";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Content from "./[id]/content";

interface AssetsSearchParams {
  type: "assets";
  filter: "all" | "a" | "b" | "c";
}

interface CoachingSearchParams {
  type: "coaching";
  filter: "all" | "aa" | "bb" | "cc";
}

export default async function ContentsPage({
  searchParams,
}: {
  searchParams: Promise<AssetsSearchParams | CoachingSearchParams>;
}) {
  const { type = "assets", filter = "all" } = await searchParams;

  return (
    <>
      <Header
        title="내 컨텐츠"
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
      <SubTabButtons type={type} filter={filter} />
      <main className="flex flex-col gap-[32px]">
        <Content />
        <Content />
        <Content />
      </main>
      <NavigationBar />
    </>
  );
}

function TabButtons({ type }: { type: "assets" | "coaching" }) {
  return (
    <nav className="grid grid-cols-[20px_1fr_1fr_20px] justify-stretch pt-2">
      <div className="border-b-[1.5px] border-line-normal" />
      <Link
        className={twMerge(
          "border-b-[1.5px] border-line-normal p-2 text-center text-headline-1 font-semibold text-line-normal",
          type == "assets" && "border-label-normal text-label-normal",
        )}
        href="?type=assets"
      >
        자료
      </Link>
      <Link
        className={twMerge(
          "border-b-[1.5px] border-line-normal p-2 text-center text-headline-1 font-semibold text-line-normal",
          type == "coaching" && "border-label-normal text-label-normal",
        )}
        href="?type=coaching"
      >
        코칭
      </Link>
      <div className="w-5 border-b-[1.5px] border-line-normal" />
    </nav>
  );
}

function SubTabButtons({ type, filter }: { type: string; filter: string }) {
  return (
    <nav className="flex overflow-y-scroll px-5 py-3">
      {type == "assets" && (
        <>
          <Link
            href="?type=assets&filter=all"
            className={twMerge(
              "rounded-4 px-4 py-2 text-body-2-normal font-semibold text-label-alternative",
              filter == "all" && "bg-component-fill-strong text-label-normal",
            )}
          >
            전체
          </Link>
          <Link
            href="?type=assets&filter=a"
            className={twMerge(
              "rounded-4 px-4 py-2 text-body-2-normal font-semibold text-label-alternative",
              filter == "a" && "bg-component-fill-strong text-label-normal",
            )}
          >
            결제
          </Link>
          <Link
            href="?type=assets&filter=b"
            className={twMerge(
              "rounded-4 px-4 py-2 text-body-2-normal font-semibold text-label-alternative",
              filter == "b" && "bg-component-fill-strong text-label-normal",
            )}
          >
            기간만료
          </Link>
          <Link
            href="?type=assets&filter=c"
            className={twMerge(
              "rounded-4 px-4 py-2 text-body-2-normal font-semibold text-label-alternative",
              filter == "c" && "bg-component-fill-strong text-label-normal",
            )}
          >
            취소
          </Link>
        </>
      )}
      {type == "coaching" && (
        <>
          <Link
            href="?type=coaching&filter=all"
            className={twMerge(
              "rounded-4 px-4 py-2 text-body-2-normal font-semibold text-label-alternative",
              filter == "all" && "bg-component-fill-strong text-label-normal",
            )}
          >
            전체
          </Link>
          <Link
            href="?type=coaching&filter=aa"
            className={twMerge(
              "rounded-4 px-4 py-2 text-body-2-normal font-semibold text-label-alternative",
              filter == "aa" && "bg-component-fill-strong text-label-normal",
            )}
          >
            결제완료
          </Link>
          <Link
            href="?type=coaching&filter=bb"
            className={twMerge(
              "rounded-4 px-4 py-2 text-body-2-normal font-semibold text-label-alternative",
              filter == "bb" && "bg-component-fill-strong text-label-normal",
            )}
          >
            코칭완료
          </Link>
          <Link
            href="?type=coaching&filter=cc"
            className={twMerge(
              "rounded-4 px-4 py-2 text-body-2-normal font-semibold text-label-alternative",
              filter == "cc" && "bg-component-fill-strong text-label-normal",
            )}
          >
            결제취소
          </Link>
        </>
      )}
    </nav>
  );
}
