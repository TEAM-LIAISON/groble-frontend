import NavigationBar from "@/components/navigation-bar";

export default function HomePage() {
  return (
    <>
      <main>
        <a className="p-2 text-accent-cyan underline" href="/auth/sign-in">
          Sign In
        </a>
        <a
          className="p-2 text-accent-cyan underline"
          href="/auth/email-verification/sign-up"
        >
          Sign Up Email Verification
        </a>
        <a
          className="p-2 text-accent-cyan underline"
          href="/auth/sign-up-success"
        >
          Sign Up Success
        </a>
        <a
          className="p-2 text-accent-cyan underline"
          href="/auth/verify-code/sign-up"
        >
          Verify Code
        </a>
        <a className="p-2 text-accent-cyan underline" href="/users/password">
          Password
        </a>
        <a
          className="p-2 text-accent-cyan underline"
          href="/users/password/reset-request"
        >
          Reset Request
        </a>
        <a
          className="p-2 text-accent-cyan underline"
          href="/users/password/reset-request-success"
        >
          Reset Request Success
        </a>
        <a className="p-2 text-accent-cyan underline" href="/auth/terms/agree">
          /auth/terms/agree
        </a>
        <a className="p-2 text-accent-cyan underline" href="/users/me/summary">
          /users/me/summary
        </a>
      </main>
      <NavigationBar />
    </>
  );
}
