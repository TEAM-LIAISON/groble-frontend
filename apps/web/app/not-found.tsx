import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">페이지를 찾을 수 없습니다</h2>
      <p className="mb-4">요청하신 페이지가 존재하지 않습니다.</p>
      <Link
        href="/"
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
