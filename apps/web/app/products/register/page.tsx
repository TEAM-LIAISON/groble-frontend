// File: src/app/products/register/page.tsx
import { redirect } from "next/navigation";
import { amplitudeEvents } from "@/lib/utils/amplitude";

export default async function RegisterIndexPage() {
  // 상품 등록 페이지 접근 이벤트 트래킹
  await amplitudeEvents.pageView("Product Register Page", {
    page_type: "product_creation",
  });

  // /products/register 로 접근하면 곧장 /info 단계로
  redirect("/products/register/info");
}
