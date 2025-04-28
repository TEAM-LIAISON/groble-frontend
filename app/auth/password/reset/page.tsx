import Header, { Back } from "@/components/header";
import PasswordForm from "./form";

export default async function PasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;

  return (
    <>
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <PasswordForm token={token} />
      </main>
    </>
  );
}
