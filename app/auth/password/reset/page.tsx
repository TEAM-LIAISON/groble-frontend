import Header, { Back } from "@/components/header";
import PasswordForm from "./form";

export default function PasswordPage() {
  return (
    <>
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <PasswordForm />
      </main>
    </>
  );
}
