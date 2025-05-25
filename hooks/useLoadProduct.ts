import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNewProductStore } from "@/lib/store/useNewProductStore";
import { getContentDetail } from "@/lib/api/contentApi";

// 콘텐츠 상세 정보 로드
export function useLoadProduct(contentId: string | null, reset: any) {
  const { data, isSuccess } = useQuery({
    queryKey: ["contentDetail", contentId],
    queryFn: () => getContentDetail(contentId!),
    enabled: !!contentId,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isSuccess && data?.data) {
      const c = data.data;
      // zustand 상태
      const store = useNewProductStore.getState();
      store.setTitle(c.title);
      store.setContentType(c.contentType as "COACHING" | "DOCUMENT");
      store.setCategoryId(String(c.categoryId || ""));
      store.setThumbnailUrl(c.thumbnailUrl || "");
      store.setContentIntroduction(c.contentIntroduction || "");
      store.setServiceTarget(c.serviceTarget || "");
      store.setServiceProcess(c.serviceProcess || "");
      store.setMakerIntro(c.makerIntro || "");

      // 옵션 변환 로직
      let coachOpts: any[] = [];
      let docOpts: any[] = [];

      if (c.options && c.options.length > 0) {
        // 코칭 옵션 변환
        coachOpts = c.options
          .filter((option: any) => option.optionType === "COACHING_OPTION")
          .map((option: any) => ({
            optionId: option.optionId,
            name: option.name,
            description: option.description,
            price: option.price,
            coachingPeriod: option.coachingPeriod as
              | "ONE_DAY"
              | "TWO_TO_SIX_DAYS"
              | "MORE_THAN_ONE_WEEK",
            documentProvision: option.documentProvision as
              | "PROVIDED"
              | "NOT_PROVIDED",
            coachingType: option.coachingType as "ONLINE" | "OFFLINE",
            coachingTypeDescription: option.coachingTypeDescription || "",
          }));

        // 문서 옵션 변환
        docOpts = c.options
          .filter((option: any) => option.optionType === "DOCUMENT_OPTION")
          .map((option: any) => {
            let deliveryMethod = null;
            if (option.contentDeliveryMethod) {
              if (option.contentDeliveryMethod === "DOWNLOAD") {
                deliveryMethod = "IMMEDIATE_DOWNLOAD";
              } else if (option.contentDeliveryMethod === "UPLOAD") {
                deliveryMethod = "FUTURE_UPLOAD";
              } else {
                deliveryMethod = option.contentDeliveryMethod;
              }
            }

            return {
              optionId: option.optionId,
              name: option.name,
              description: option.description,
              price: option.price,
              contentDeliveryMethod: deliveryMethod,
              fileUrl: option.fileUrl || null,
              documentFileUrl: option.documentFileUrl || option.fileUrl || null,
              documentLinkUrl: option.documentLinkUrl || null,
            };
          });

        store.setCoachingOptions(coachOpts);
        store.setDocumentOptions(docOpts);
      }

      // react-hook-form reset
      reset({
        title: c.title,
        contentType: c.contentType,
        categoryId: String(c.categoryId || ""),
        thumbnailUrl: c.thumbnailUrl || "",
        coachingOptions: coachOpts,
        documentOptions: docOpts,
      });
    }
  }, [isSuccess, data, reset]);
}
