// File: src/app/products/register/page.tsx
import { redirect } from "next/navigation";

export default function RegisterIndexPage() {
  // /products/register 로 접근하면 곧장 /info 단계로
  redirect("/products/register/info");
}
