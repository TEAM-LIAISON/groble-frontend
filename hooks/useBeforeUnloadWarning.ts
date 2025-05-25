import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useNewProductStore } from "@/lib/store/useNewProductStore";

// 브라우저 뒤로가기 시 변경사항이 저장되지 않을 경우 경고 메시지 표시
export function useBeforeUnloadWarning() {
  const pathname = usePathname();
  const router = useRouter();
  const { resetState } = useNewProductStore();
  const previousPathRef = useRef<string | null>(null);

  // 상품 등록 관련 페이지인지 확인 (더 정확한 패턴 매칭)
  const isProductRegistrationPage = pathname?.startsWith("/users/newproduct");
  const wasPreviouslyProductRegistrationPage =
    previousPathRef.current?.startsWith("/users/newproduct");

  // 변경사항이 있는지 확인하는 함수
  const hasUnsavedChanges = () => {
    const s = useNewProductStore.getState();
    return (
      s.title ||
      s.thumbnailUrl ||
      s.contentIntroduction ||
      s.serviceTarget ||
      s.serviceProcess ||
      s.makerIntro ||
      s.coachingOptions.length > 0 ||
      s.documentOptions.length > 0
    );
  };

  useEffect(() => {
    // 이전 경로가 상품 등록 페이지였는데 현재 페이지가 상품 등록 페이지가 아닌 경우
    if (wasPreviouslyProductRegistrationPage && !isProductRegistrationPage) {
      console.log("상품 등록 페이지에서 벗어남 - 데이터 초기화:", {
        previous: previousPathRef.current,
        current: pathname,
      });
      resetState();
    }

    // 현재 경로를 이전 경로로 저장
    previousPathRef.current = pathname;

    // 상품 등록 페이지가 아닌 경우 즉시 데이터 초기화
    if (!isProductRegistrationPage) {
      console.log("상품 등록 페이지가 아님 - 데이터 초기화:", pathname);
      resetState();
      return;
    }

    console.log("상품 등록 페이지 - 데이터 보호:", pathname);

    // 브라우저 새로고침/닫기 시 경고
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges()) {
        e.preventDefault();
        e.returnValue =
          "변경사항이 저장되지 않을 수 있습니다. 정말로 나가시겠습니까?";
      }
    };

    // Next.js 클라이언트 사이드 라우팅 감지
    const handleRouteChange = (url: string) => {
      // 현재 페이지가 상품 등록 페이지이고, 이동하려는 페이지가 상품 등록 페이지가 아닌 경우
      if (isProductRegistrationPage && !url.startsWith("/users/newproduct")) {
        if (hasUnsavedChanges()) {
          const confirmed = window.confirm(
            "변경사항이 저장되지 않을 수 있습니다. 정말로 나가시겠습니까?",
          );
          if (!confirmed) {
            // 라우팅을 막기 위해 에러를 던집니다
            throw "Route change aborted by user";
          }
        }
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Next.js 13+ App Router에서는 router.events가 없으므로
    // 대신 popstate 이벤트와 링크 클릭을 감지합니다
    const handlePopState = (e: PopStateEvent) => {
      if (isProductRegistrationPage && hasUnsavedChanges()) {
        const confirmed = window.confirm(
          "변경사항이 저장되지 않을 수 있습니다. 정말로 나가시겠습니까?",
        );
        if (!confirmed) {
          // 브라우저 히스토리를 원래대로 되돌립니다
          window.history.pushState(null, "", pathname);
        }
      }
    };

    // 링크 클릭 감지
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href]") as HTMLAnchorElement;

      if (link && link.href) {
        const url = new URL(link.href);
        const targetPath = url.pathname;

        // 외부 링크이거나 상품 등록 페이지 내부 이동이 아닌 경우
        if (
          isProductRegistrationPage &&
          !targetPath.startsWith("/users/newproduct") &&
          url.origin === window.location.origin &&
          hasUnsavedChanges()
        ) {
          const confirmed = window.confirm(
            "변경사항이 저장되지 않을 수 있습니다. 정말로 나가시겠습니까?",
          );
          if (!confirmed) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleLinkClick, true);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleLinkClick, true);
    };
  }, [
    pathname,
    isProductRegistrationPage,
    wasPreviouslyProductRegistrationPage,
    resetState,
  ]);
}
