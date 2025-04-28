import NavigationBar from "@/components/navigation-bar";

export default function HomePage() {
  return (
    <>
      <main>
        <a className="p-2 text-accent-cyan underline" href="/auth/sign-in">
          /auth/sign-in
        </a>
        <a className="p-2 text-accent-cyan underline" href="/auth/me/summary">
          /auth/me/summary
        </a>
      </main>
      <NavigationBar />
    </>
  );
}
