import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import { cookies } from "next/headers";
import TermsForm from "./form";

export const metadata: Metadata = {
  title: "약관 동의",
};

export default async function TermsPage() {
  return (
    <>
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <TermsForm
          userType={
            (await cookies()).get("Sign-Up-User-Type")?.value as
              | "SELLER"
              | "BUYER"
          }
        />
      </main>
    </>
  );
}
