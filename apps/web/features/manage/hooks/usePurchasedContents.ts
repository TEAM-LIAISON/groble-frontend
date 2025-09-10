import { useQuery } from "@tanstack/react-query";
import { getPurchasedContents } from "../api/purchaseApi";
import type { PurchaseFilterType } from "../types/purchaseTypes";

interface UsePurchasedContentsParams {
  state?: PurchaseFilterType;
  page?: number;
}

export function usePurchasedContents({
  state = "",
  page = 0,
}: UsePurchasedContentsParams = {}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["purchased-contents", state, page],
    queryFn: () =>
      getPurchasedContents({
        page,
        size: 9, // 한 페이지당 9개
        sort: "purchasedAt",
        state: state || undefined, // 빈 문자열은 undefined로 변환
      }),
  });

  return {
    items: data?.data?.items ?? [],
    pageInfo: data?.data?.pageInfo,
    isLoading,
    isError,
    error,
  };
}
