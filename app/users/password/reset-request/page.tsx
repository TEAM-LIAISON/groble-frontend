import Header, { BackButton } from "@/components/header";
import RequestPasswordResetForm from "./form";

export default function RequestPasswordReset() {
  return (
    <>
      <Header leftIcons={<BackButton />} />
      <main className="flex flex-col gap-8 p-5">
        <RequestPasswordResetForm />
      </main>
    </>
  );
}
