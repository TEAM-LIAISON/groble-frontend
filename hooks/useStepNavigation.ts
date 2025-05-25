import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useNewProductStore } from "@/lib/store/useNewProductStore";

// 스텝 이동 훅

export function useStepNavigation() {
  const router = useRouter();
  const path = usePathname() || "";
  const params = useSearchParams();
  const id = params.get("contentId") || params.get("id");
  const s = useNewProductStore.getState();

  const goNext = () => {
    let next = "/users/newproduct/step2";
    if (path.includes("step2")) next = "/users/newproduct/step3";
    if (path.includes("step3")) return router.push("/users/myproducts");
    router.push(id ? `${next}?contentId=${id}` : next);
  };

  const goPrev = () => {
    let prev = "/users/newproduct";
    if (path.includes("step2")) prev = "/users/newproduct";
    if (path.includes("step3")) prev = "/users/newproduct/step2";
    router.push(id ? `${prev}?contentId=${id}` : prev);
  };

  return { goNext, goPrev };
}
