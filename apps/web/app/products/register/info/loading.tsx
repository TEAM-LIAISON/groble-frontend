import LoadingSpinner from '@/shared/ui/LoadingSpinner';

// File: src/app/products/register/info/loading.tsx
export default function InfoLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
