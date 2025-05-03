import Header, { Back } from "@/components/header";
import PasswordForm from "./form";

export default function PasswordPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <PasswordForm />
      </main>
    </div>
  );
}
