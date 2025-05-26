import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useNewProductStore } from "@/lib/store/useNewProductStore";

// 브라우저 뒤로가기 시 변경사항이 저장되지 않을 경우 경고 메시지 표시
export function useBeforeUnloadWarning() {
  const pathname = usePathname();
  const { resetState } = useNewProductStore();
  const previousPathRef = useRef<string | null>(null);

  // 상품 등록 관련 페이지인지 확인 (더 정확한 패턴 매칭)
  const isProductRegistrationPage = pathname?.startsWith("/users/newproduct");
  const wasPreviouslyProductRegistrationPage =
    previousPathRef.current?.startsWith("/users/newproduct");

  useEffect(() => {
    // 이전 경로가 상품 등록 페이지였는데 현재 페이지가 상품 등록 페이지가 아닌 경우
    if (wasPreviouslyProductRegistrationPage && !isProductRegistrationPage) {
      resetState();
    }

    // 현재 경로를 이전 경로로 저장
    previousPathRef.current = pathname;

    // 상품 등록 페이지가 아닌 경우 즉시 데이터 초기화
    if (!isProductRegistrationPage) {
      resetState();
      return;
    }

    const handler = (e: BeforeUnloadEvent) => {
      const s = useNewProductStore.getState();
      const dirty =
        s.title ||
        s.thumbnailUrl ||
        s.contentIntroduction ||
        s.serviceTarget ||
        s.serviceProcess ||
        s.makerIntro ||
        s.coachingOptions.length > 0 ||
        s.documentOptions.length > 0;

      if (dirty) {
        e.preventDefault();
        e.returnValue =
          "변경사항이 저장되지 않을 수 있습니다. 정말로 나가시겠습니까?";
      }
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [
    pathname,
    isProductRegistrationPage,
    wasPreviouslyProductRegistrationPage,
    resetState,
  ]);
}
