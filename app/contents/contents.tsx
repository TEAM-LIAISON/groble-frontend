"use client";

import { LinkButton } from "@/components/button";
import { getMySellingContentsResponse } from "@/lib/api";
import { twMerge } from "@/lib/tailwind-merge";
import Image from "next/image";
import Link from "next/link";
import {
  ComponentPropsWithRef,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import appleIcon from "../apple-icon.png";
import { getMySellingContentsAction } from "./actions";

export default function Contents({
  initialResponse,
  pageSize = 10, // Default page size
  state, // e.g., "판매중", "검토중" - must be passed by parent
  type, // e.g., "coaching", "document" - must be passed by parent
}: {
  initialResponse: getMySellingContentsResponse;
  pageSize?: number;
  state: string;
  type: string;
}) {
  const [response, setResponse] =
    useState<getMySellingContentsResponse>(initialResponse);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCursor, setCurrentCursor] = useState<string | null | undefined>(
    initialResponse.status == 200 && initialResponse.data?.data
      ? initialResponse.data.data.nextCursor
      : null,
  );
  const observerTargetRef = useRef<HTMLDivElement | null>(null);

  const loadMoreItems = useCallback(async () => {
    if (isLoading || !currentCursor) {
      return;
    }

    setIsLoading(true);
    try {
      const nextPageResponse = await getMySellingContentsAction({
        cursor: currentCursor as string,
        size: pageSize,
        state: state,
        type: type,
      });

      if (
        nextPageResponse.status === 200 &&
        nextPageResponse.data?.data?.items
      ) {
        setResponse((prev) => {
          const prevPaginatedData =
            prev.status === 200 && prev.data?.data
              ? prev.data.data
              : { items: [], nextCursor: null };
          const prevItems = prevPaginatedData?.items || [];

          const newPaginatedData = nextPageResponse.data.data;
          const newItems = newPaginatedData?.items || [];

          const combinedItems = [
            ...(Array.isArray(prevItems) ? prevItems : []),
            ...(Array.isArray(newItems) ? newItems : []),
          ];

          return {
            ...prev,
            status: 200,
            data: {
              ...prev.data,
              data: {
                ...(prevPaginatedData || {}),
                ...(newPaginatedData || {}),
                items: combinedItems,
                nextCursor: newPaginatedData?.nextCursor,
              },
            },
          } as getMySellingContentsResponse;
        });
        setCurrentCursor(nextPageResponse.data.data.nextCursor);
      } else {
        console.error(
          "Failed to load more items or no more items:",
          nextPageResponse,
        );
        setCurrentCursor(null);
      }
    } catch (error) {
      console.error("Error loading more items:", error);
      setCurrentCursor(null);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, currentCursor, pageSize, state, type]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && currentCursor) {
          loadMoreItems();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTargetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMoreItems, isLoading, currentCursor]);

  if (initialResponse.status !== 200) {
    let errorMessage = "Unknown error";
    // Type guard for error response shape
    if (
      initialResponse &&
      typeof (initialResponse as any).message === "string"
    ) {
      errorMessage = (initialResponse as any).message;
    } else if (initialResponse && initialResponse.status) {
      errorMessage = `Status: ${initialResponse.status}`;
    }

    return (
      <div className="flex h-full flex-grow flex-col items-center justify-center">
        <p className="text-lg font-semibold text-red-600">
          콘텐츠를 불러오는데 실패했습니다.
        </p>
        <p className="text-sm text-label-neutral">{errorMessage}</p>
      </div>
    );
  }

  const items =
    response.status === 200 && response.data?.data
      ? response.data.data.items
      : [];

  if (!items || !Array.isArray(items) || items.length === 0) {
    return (
      <div className="flex h-full flex-grow items-center justify-center">
        <p className="text-label-neutral">등록된 콘텐츠가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {items.map((item) => (
        <Content key={item.contentId} item={item} />
      ))}
      {currentCursor && !isLoading && (
        <div
          ref={observerTargetRef}
          style={{ height: "1px", margin: "20px 0" }}
        />
      )}
      {isLoading && (
        <div className="flex justify-center py-4">
          <p className="text-label-neutral">로딩 중...</p>
        </div>
      )}
    </div>
  );
}

function Content({
  item,
  className,
  ...props
}: ComponentPropsWithRef<"section"> & { item: any }) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\. /g, "-")
        .replace(".", "");
    } catch (e) {
      return dateString;
    }
  };

  const formatPrice = (price?: number) => {
    if (price === undefined || price === null) return "";
    return price.toLocaleString("ko-KR");
  };

  return (
    <section
      className={twMerge("flex flex-col gap-4 px-5", className)}
      {...props}
    >
      <Link
        className="flex flex-col gap-3"
        href={`/contents/${item.contentId}`}
      >
        <div className="relative aspect-411/335 overflow-hidden rounded-[12px]">
          <Image
            src={item.thumbnailUrl || appleIcon}
            alt={item.title || "콘텐츠 썸네일"}
            className="object-cover"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <div className="text-caption-1 text-label-neutral">
          {item.status && <Tag>{item.status}</Tag>}
          {item.status && item.createdAt && " · "}
          {formatDate(item.createdAt)}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="line-clamp-2 text-body-1-normal font-semibold text-label-normal">
            {item.title}
          </h1>
          {item.makerNickname && (
            <div className="text-label-1-normal font-semibold text-label-alternative">
              {item.makerNickname}
            </div>
          )}
          {typeof item.price === "number" && (
            <div className="text-body-1-normal font-medium">
              <span className="font-bold">{formatPrice(item.price)}</span>원
            </div>
          )}
          <div />
        </div>
      </Link>
      <div className="grid grid-flow-col gap-2">
        <LinkButton
          type="secondary"
          size="x-small"
          href={`/contents/${item.contentId}#inquiry`}
        >
          문의하기
        </LinkButton>
        <LinkButton
          type="tertiary"
          size="x-small"
          href={`/contents/${item.contentId}#download`}
          className="bg-[#D8FFF4] text-primary-sub-1"
        >
          다운로드
        </LinkButton>
      </div>
    </section>
  );
}

function Tag({ children }: { children?: ReactNode }) {
  return <span className="font-semibold text-primary-sub-1">{children}</span>;
}
