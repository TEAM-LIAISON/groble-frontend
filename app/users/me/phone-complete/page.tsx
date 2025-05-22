import Header, { Back } from "@/components/header";
import PhoneCompleteForm from "./form";

export default function PhoneCompletePage() {
  return (
    <div className="flex h-screen flex-col">
      <Header left={<Back />} />
      <main className="flex flex-1 flex-col items-center justify-center gap-1.5 p-5 text-center">
        <PhoneCompleteForm />
      </main>
    </div>
  );
}
