import Header, { Back } from "@/components/header";
import SetPasswordForm from "./form";

export default function SetPassword() {
  return (
    <>
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <SetPasswordForm />
      </main>
    </>
  );
}
