// File: src/features/products/register/hooks/useBeforeUnloadWarning.ts
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useNewProductStore } from "../store/useNewProductStore";

/**
 * 상품 등록 흐름(/products/register/*)에서 벗어날 때 스토어를 초기화하고,
 * 브라우저 리로드/탭 닫기 시점에 변경사항이 있으면 경고창을 표시합니다.
 */
export function useBeforeUnloadWarning() {
  const pathname = usePathname() ?? "";
  const resetState = useNewProductStore((s) => s.resetState);
  const getState = useNewProductStore.getState;
  const wasInRegisterRef = useRef(false);

  // —————————————————————————————————————————
  // 1) 등록 페이지 그룹을 벗어날 때 스토어 초기화
  useEffect(() => {
    const isInRegister = pathname.startsWith("/products/register");

    // 첫 렌더링 시점에는 기록만
    if (!wasInRegisterRef.current) {
      wasInRegisterRef.current = isInRegister;
      return;
    }

    // 이전에는 등록 흐름 안에 있었고, 이제 등록 흐름 밖으로 나가면 reset
    if (wasInRegisterRef.current && !isInRegister) {
      resetState();
    }

    // 다음 변화 감지를 위해 상태 업데이트
    wasInRegisterRef.current = isInRegister;
  }, [pathname, resetState]);

  // —————————————————————————————————————————
  // 2) 등록 흐름 안에 있을 때 beforeunload 경고 등록/해제
  useEffect(() => {
    const isInRegister = pathname.startsWith("/products/register");
    if (!isInRegister) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const s = getState();
      const dirty =
        Boolean(s.title) ||
        Boolean(s.thumbnailUrl) ||
        Boolean(s.contentIntroduction) ||
        Boolean(s.serviceTarget) ||
        Boolean(s.serviceProcess) ||
        Boolean(s.makerIntro) ||
        s.coachingOptions.length > 0 ||
        s.documentOptions.length > 0;

      if (dirty) {
        e.preventDefault();
        e.returnValue =
          "변경사항이 저장되지 않을 수 있습니다. 정말 나가시겠습니까?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);
}
