import Header, { Back } from "@/components/header";
import SendEmailVerificationForSignUpForm from "./form";

export default function SendEmailVerificationForSignUp() {
  return (
    <>
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <SendEmailVerificationForSignUpForm />
      </main>
    </>
  );
}
