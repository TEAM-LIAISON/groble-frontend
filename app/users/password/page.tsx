import Header, { BackButton } from "@/components/header";
import SetPasswordForm from "./form";

export default function SetPassword() {
  return (
    <>
      <Header leftIcons={<BackButton />} />
      <main className="flex flex-col gap-8 p-5">
        <SetPasswordForm />
      </main>
    </>
  );
}
