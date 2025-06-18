// File: src/app/products/register/info/page.tsx
import WebHeader from '@/components/(improvement)/layout/header';
import InfoStep from '@/features/products/register/info/InfoStep';

export const dynamic = 'force-dynamic';

export default function InfoPage() {
  return (
    <>
      <WebHeader />
      <InfoStep />
    </>
  );
}
