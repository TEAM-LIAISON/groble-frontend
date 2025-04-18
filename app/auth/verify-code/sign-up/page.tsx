import Header, { BackButton } from "@/components/header";
import { cookies } from "next/headers";
import VerifyEmailCodeForm from "./form";

export default async function VerifyEmailCode() {
  const cookieStore = await cookies();
  const email = cookieStore.get("Sign-Up-Email")?.value;

  if (!email) throw new Error();

  return (
    <>
      <Header leftIcons={<BackButton />} />
      <main className="flex flex-col gap-8 p-5">
        <VerifyEmailCodeForm email={email} />
      </main>
    </>
  );
}
