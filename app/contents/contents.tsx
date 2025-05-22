"use client";

import { LinkButton } from "@/components/button";
import {
  ContentPreviewCardResponse,
  getMySellingContentsResponse,
} from "@/lib/api";
import { twMerge } from "@/lib/tailwind-merge";
import { Temporal } from "@js-temporal/polyfill";
import Image from "next/image";
import Link from "next/link";
import {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getMySellingContentsAction } from "./actions";

export default function Contents({
  initialResponse: initialResponseFromProps, // Prop 이름 변경으로 명확성 향상
  pageSize = 10, // Default page size
  state, // e.g., "판매중", "검토중" - must be passed by parent
  type, // e.g., "coaching", "document" - must be passed by parent
  userType,
}: {
  initialResponse: getMySellingContentsResponse;
  pageSize?: number;
  state: string;
  type: string;
  userType?: string;
}) {
  const [response, setResponse] = useState<getMySellingContentsResponse>(
    initialResponseFromProps,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentCursor, setCurrentCursor] = useState<string | null | undefined>(
    initialResponseFromProps.status == 200 &&
      initialResponseFromProps.data?.data
      ? initialResponseFromProps.data.data.nextCursor
      : null,
  );
  const observerTargetRef = useRef<HTMLDivElement | null>(null);

  const isInitialMount = useRef(true);
  const prevPropsRef = useRef({ state, type, initialResponseFromProps });

  useEffect(() => {
    if (isInitialMount.current) {
      // 첫 렌더링 시에는 useState가 이미 props로 초기화했으므로,
      // isInitialMount를 false로 설정하고 prevPropsRef만 업데이트합니다.
      prevPropsRef.current = { state, type, initialResponseFromProps };
      isInitialMount.current = false;
      return;
    }

    const hasStateChanged = prevPropsRef.current.state !== state;
    const hasTypeChanged = prevPropsRef.current.type !== type;
    const hasInitialResponseChanged =
      prevPropsRef.current.initialResponseFromProps !==
      initialResponseFromProps;

    if (hasStateChanged || hasTypeChanged) {
      // state 또는 type 필터가 변경된 경우, 새로운 필터로 데이터를 처음부터 다시 가져옵니다.
      const fetchNewDataForFilters = async () => {
        setIsLoading(true);
        try {
          const newInitialData = await getMySellingContentsAction({
            cursor: undefined, // 처음부터 가져오기
            size: pageSize,
            state: state,
            type: type,
          });
          setResponse(newInitialData);
          setCurrentCursor(
            newInitialData.status === 200 && newInitialData.data?.data
              ? newInitialData.data.data.nextCursor
              : null,
          );
        } catch (error) {
          console.error("Error fetching initial data for new filters:", error);
          setResponse({ status: 500, message: "Failed to fetch data" } as any); // 필요에 따라 에러 상태 형태 조정
          setCurrentCursor(null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchNewDataForFilters();
    } else if (hasInitialResponseChanged) {
      // state와 type은 동일하지만 initialResponseFromProps 자체가 변경된 경우
      // (예: 부모 컴포넌트가 현재 필터에 대한 데이터를 다시 검증한 경우)
      // 새로운 prop 값으로 response와 cursor를 업데이트합니다.
      setResponse(initialResponseFromProps);
      setCurrentCursor(
        initialResponseFromProps.status === 200 &&
          initialResponseFromProps.data?.data
          ? initialResponseFromProps.data.data.nextCursor
          : null,
      );
    }

    // 다음 렌더링 시 비교를 위해 prevPropsRef를 업데이트합니다.
    prevPropsRef.current = { state, type, initialResponseFromProps };
  }, [state, type, initialResponseFromProps, pageSize]); // useEffect의 의존성 배열

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
    <div className="mx-auto mb-24 grid max-w-[1080px] grid-cols-1 gap-y-8 md:mb-8 md:grid-cols-3 md:gap-[37.5px]">
      {items.map((item) => (
        <Content key={item.contentId} item={item} userType={userType} />
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
  className,
  item,
  userType,
  ...props
}: {
  item: ContentPreviewCardResponse;
  userType?: string;
} & ComponentPropsWithRef<"section">) {
  return (
    <section
      className={twMerge("flex flex-col gap-4 px-5 md:p-0", className)}
      {...props}
    >
      <Link
        className="flex flex-col gap-3"
        href={`/products/${item.contentId}`}
      >
        <div className="relative aspect-411/335">
          {item.thumbnailUrl && (
            <Image
              src={item.thumbnailUrl}
              alt=""
              className="rounded-[12px] object-cover"
              fill
            />
          )}
        </div>
        <div className="text-caption-1 text-label-neutral">
          {item.status == "ACTIVE" && (
            <span className="font-semibold text-primary-sub-1">판매중</span>
          )}
          {item.status == "DRAFT" && (
            <span className="font-semibold text-primary-sub-1">작성중</span>
          )}
          {item.status == "PENDING" && (
            <span className="font-semibold text-primary-sub-1">심사중</span>
          )}
          {item.status == "VALIDATED" && (
            <span className="font-semibold text-status-success">승인</span>
          )}
          {item.status == "REJECTED" && (
            <span className="font-semibold text-status-error">거절</span>
          )}{" "}
          ·{" "}
          {item.createdAt &&
            Temporal.PlainDateTime.from(item.createdAt)
              .toPlainDate()
              .toString()}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="line-clamp-2 text-body-1-normal font-semibold text-label-normal">
            {item.title}
          </h1>
          <div className="text-label-1-normal font-semibold text-label-alternative">
            {item.sellerName}
          </div>
          <div className="text-body-1-normal font-medium">
            {item.lowestPrice && (
              <>
                <span className="font-bold">
                  {new Intl.NumberFormat().format(item.lowestPrice)}
                </span>
                원
              </>
            )}
          </div>
          <div />
        </div>
      </Link>
      <div className="grid grid-flow-col gap-2">
        <LinkButton
          type="secondary"
          size="x-small"
          href={`/products/${item.contentId}/edit`}
        >
          수정하기
        </LinkButton>
      </div>
    </section>
  );
}
