'use client';

interface GuestAuthCompletedStepProps {
  phoneNumber: string;
  username: string;
  email: string;
}

export default function GuestAuthCompletedStep({
  phoneNumber,
  username,
  email,
}: GuestAuthCompletedStepProps) {
  return (
    <>
      <div className="space-y-4">
        <input
          type="text"
          value={phoneNumber}
          disabled
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900"
        />

        <div className="flex items-center gap-2 text-green-600">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">인증이 완료됐어요</span>
        </div>

        <input
          type="text"
          value={username}
          disabled
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900"
        />

        <input
          type="email"
          value={email}
          disabled
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900"
        />
      </div>
    </>
  );
}


