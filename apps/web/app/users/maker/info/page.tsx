'use client';

import WebHeader from '@/components/(improvement)/layout/header';
import MakerInfoForm from '@/features/makerAuth/ui/MakerInfoForm';
import { Button, ButtonLoadingSpinner } from '@groble/ui';
import { useMakerInfo } from '@/features/makerAuth/hooks/useMakerInfo';
import { Suspense } from 'react';

function MakerInfoContent() {
  const { isValid, isSubmitting, handleSubmit } = useMakerInfo();

  return (
    <>
      <WebHeader mobileBack="back" />
      <div className="w-full flex justify-center h-[calc(100vh-68px)] md:pt-10">
        <div className="flex flex-col max-w-[480px] w-full p-5 md:p-0">
          <div>
            <MakerInfoForm />
          </div>

          <div className="mt-auto mb-5 w-full">
            <Button
              onClick={handleSubmit}
              disabled={!isValid}
              className="w-full"
              size="large"
              type="primary"
            >
              {isSubmitting ? <ButtonLoadingSpinner /> : '인증 요청'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function MakerInfoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MakerInfoContent />
    </Suspense>
  );
}
