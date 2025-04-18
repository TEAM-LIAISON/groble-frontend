export default function Home() {
  return (
    <div>
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
    </div>
  );
}
