"use client";

import Button, { LinkButton } from "@/components/button";
import Popover, { PopoverClose } from "@/components/popover"; // Assuming Popover is a default export for modal usage
import {
  ContentPreviewCardResponse,
  getMySellingContentsResponse,
} from "@/lib/api";
import { toastErrorMessage } from "@/lib/error";
import { twMerge } from "@/lib/tailwind-merge";
import { Temporal } from "@js-temporal/polyfill";
import Image from "next/image";
import Link from "next/link";
import {
  ComponentPropsWithRef,
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import {
  activeContentAction,
  deleteContentAction,
  getMySellingContentsAction,
  stopContentAction,
} from "./actions";
import folder from "./folder.png";

export default function Contents({
  initialResponse: initialResponseFromProps, // Prop 이름 변경으로 명확성 향상
  pageSize = 10, // Default page size
  state, // e.g., "판매중", "검토중" - must be passed by parent
  type, // e.g., "coaching", "document" - must be passed by parent
  userType,
  verificationStatus,
}: {
  initialResponse: getMySellingContentsResponse;
  pageSize?: number;
  state: string;
  type: string;
  userType?: string;
  verificationStatus?: string;
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
      <div className="flex h-full flex-col items-center justify-center">
        <Image src={folder} alt="" width={200} />
        <div className="mt-2 text-title-3 font-bold">아직 상품이 없어요</div>
        <p className="mt-2 text-label-alternative">상품을 등록해볼까요?</p>
        {verificationStatus != "VERIFIED" ? (
          <>
            <Button
              buttonType="button"
              className="mt-8 px-[26px] py-[13px]"
              popoverTarget="requires-maker"
            >
              상품 등록
            </Button>
            <Popover id="requires-maker">
              <div>
                <h2 className="mb-3 text-center text-xl font-bold">
                  메이커 인증이 필요해요
                </h2>
                <p className="mb-6 text-center text-sm text-gray-600">
                  상품을 등록하려면 메이커 인증을 받아야해요
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <PopoverClose popoverTarget="requires-maker" />
                </div>
              </div>
            </Popover>
          </>
        ) : (
          <LinkButton
            className="mt-8 px-[26px] py-[13px]"
            href="/products/register"
          >
            상품 등록
          </LinkButton>
        )}
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
      <div className="flex flex-col gap-3">
        <Link
          className="relative aspect-[4_/_3]"
          href={`/products/${item.contentId}`}
        >
          {item.thumbnailUrl && (
            <Image
              src={item.thumbnailUrl}
              alt=""
              className="rounded-[12px] object-cover"
              fill
            />
          )}
        </Link>
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
          <div className="flex gap-1">
            <h1 className="line-clamp-2 flex-1 text-body-1-normal font-semibold text-label-normal">
              <Link href={`/products/${item.contentId}`}>{item.title}</Link>
            </h1>
            {(item.status == "VALIDATED" || item.status == "REJECTED") && (
              <>
                <button type="button" popoverTarget={`${item.contentId}-more`}>
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
                      d="M11.5 8C10.6716 8 10 7.32843 10 6.5C10 5.67157 10.6716 5 11.5 5C12.3284 5 13 5.67157 13 6.5C13 7.32843 12.3284 8 11.5 8ZM11.5 14C10.6716 14 10 13.3284 10 12.5C10 11.6716 10.6716 11 11.5 11C12.3284 11 13 11.6716 13 12.5C13 13.3284 12.3284 14 11.5 14ZM10 18.5C10 19.3284 10.6716 20 11.5 20C12.3284 20 13 19.3284 13 18.5C13 17.6716 12.3284 17 11.5 17C10.6716 17 10 17.6716 10 18.5Z"
                      fill="#878A93"
                    />
                  </svg>
                </button>
                <div
                  id={`${item.contentId}-more`}
                  popover="auto"
                  className="top-2 min-w-[106px] rounded-8 p-2 px-4 py-3 shadow-lg [position-area:span-left_bottom]"
                >
                  <button
                    type="button"
                    popoverTarget={`${item.contentId}-delete`}
                    className="text-body-1-normal font-medium"
                  >
                    삭제하기
                  </button>
                </div>
              </>
            )}
          </div>
          <Link
            href={`/products/${item.contentId}`}
            className="flex flex-col gap-1"
          >
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
          </Link>
        </div>
      </div>
      {item.status == "ACTIVE" && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            buttonType="button"
            group="outlined"
            type="tertiary"
            size="x-small"
            popoverTarget={`${item.contentId}-stop`}
          >
            중단하기
          </Button>
          <Button
            buttonType="button"
            type="secondary"
            size="x-small"
            popoverTarget={`${item.contentId}-edit`}
          >
            수정하기
          </Button>
        </div>
      )}
      {item.status == "DRAFT" && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            buttonType="button"
            group="outlined"
            type="tertiary"
            size="x-small"
            popoverTarget={`${item.contentId}-delete`}
          >
            삭제하기
          </Button>
          <LinkButton
            type="secondary"
            size="x-small"
            href={`/users/newproduct?contentId=${item.contentId}`}
          >
            수정하기
          </LinkButton>
        </div>
      )}
      {item.status == "VALIDATED" && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            buttonType="button"
            type="secondary"
            size="x-small"
            popoverTarget={`${item.contentId}-edit`}
          >
            수정하기
          </Button>
          <Button
            buttonType="button"
            size="x-small"
            onClick={() =>
              startTransition(async () => {
                const response = await activeContentAction(item.contentId!);
                toastErrorMessage(response);

                if (response.status == 200) toast("판매가 시작되었습니다.");
              })
            }
          >
            판매하기
          </Button>
        </div>
      )}
      {item.status == "REJECTED" && (
        <div className="grid grid-cols-1 gap-2">
          <Button
            buttonType="button"
            type="secondary"
            size="x-small"
            popoverTarget={`${item.contentId}-edit`}
          >
            수정하기
          </Button>
        </div>
      )}
      <Popover id={`${item.contentId}-stop`}>
        <div>
          <h2 className="mb-3 text-xl font-bold">판매를 중단할까요?</h2>
          <p className="mb-6 text-sm text-gray-600">
            언제든 다시 시작할 수 있어요.
            <br />
            [심사완료]에서 판매하기를 선택해주세요.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <PopoverClose popoverTarget={`${item.contentId}-stop`} />
            <Button
              buttonType="button"
              size="small"
              onClick={() =>
                startTransition(async () => {
                  const response = await stopContentAction(item.contentId!);
                  toastErrorMessage(response);

                  if (response.status == 200) toast("판매가 중단되었습니다.");
                })
              }
            >
              중단하기
            </Button>
          </div>
        </div>
      </Popover>
      <Popover id={`${item.contentId}-edit`}>
        <div>
          <h2 className="mb-3 text-xl font-bold">수정하시겠습니까?</h2>
          <p className="mb-6 text-sm text-gray-600">
            수정하기를 시작하면 판매가 중단되며,
            <br />
            수정 후 재심사를 받아야 해요.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <PopoverClose popoverTarget={`${item.contentId}-edit`} />
            <LinkButton
              size="small"
              href={`/products/register?contentId=${item.contentId}`}
            >
              수정하기
            </LinkButton>
          </div>
        </div>
      </Popover>
      <Popover id={`${item.contentId}-delete`}>
        <div>
          <h2 className="mb-3 text-xl font-bold">삭제하시겠습니까?</h2>
          <div className="grid grid-cols-2 gap-2">
            <PopoverClose popoverTarget={`${item.contentId}-delete`} />
            <Button
              buttonType="button"
              size="small"
              onClick={() =>
                startTransition(async () => {
                  const response = await deleteContentAction(item.contentId!);
                  toastErrorMessage(response);

                  if (response.status == 200) toast("삭제가 완료되었습니다.");
                })
              }
            >
              삭제하기
            </Button>
          </div>
        </div>
      </Popover>
    </section>
  );
}
