export default async function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold">Sign In</h1>
      <form className="mt-4 flex w-full max-w-sm flex-col">
        <input
          type="email"
          placeholder="Email"
          className="rounded mb-4 border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded mb-4 border p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded hover:bg-blue-600 p-2"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
